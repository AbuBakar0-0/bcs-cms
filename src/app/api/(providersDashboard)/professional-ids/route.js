import { supabase } from "@/lib/supabase";

const convertToDate = (dateString) => {
	if (!dateString) return null;
	const date = new Date(dateString);
	return !isNaN(date) ? date.toISOString() : null;
};

export async function POST(request) {
	try {
		const formData = await request.json();
		const { provider_id } = formData;

		// 1. First, insert the professional_ids record
		const { data: professionalId, error: professionalIdsError } = await supabase
			.from("professional_ids")
			.insert({
				provider_id,
				npi_1: formData.npi1,
				npi_2: formData.npi2,
				tax_id: formData.taxId,
				upin: formData.upin,
			})
			.select("uuid")
			.single();

		if (professionalIdsError) {
			throw new Error(
				`Error inserting professional IDs: ${professionalIdsError.message}`
			);
		}

		// Function to insert records into info_numbers table
		const insertArrayField = async (fieldName, data) => {
			console.log(`Inserting ${fieldName} data:`, data);
			const insertedFields = [];

			for (const item of data) {
				const hasFieldKey = `has${
					fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
				}`;
				if (item[hasFieldKey] === "No") continue;

				if (!item.number || !item.state) {
					console.warn(`Skipping invalid ${fieldName} record:`, item);
					continue;
				}

				const effectiveDate = convertToDate(item.effectiveDate);
				const expiryDate = convertToDate(item.expiryDate);

				const { data: insertedData, error } = await supabase
					.from("info_numbers")
					.insert({
						professional_id: professionalId.uuid,
						effective_date: effectiveDate,
						expiry_date: expiryDate,
						issue_state: item.state,
						value: item.number,
						type: fieldName,
					})
					.select("uuid")
					.single();

				if (error) {
					console.error(`Error inserting ${fieldName}:`, error);
					throw new Error(`Error inserting ${fieldName}: ${error.message}`);
				}

				insertedFields.push(insertedData.uuid);
			}
			return insertedFields;
		};

		const medicareIds = await insertArrayField("medicare", formData.medicare);
		const medicaidIds = await insertArrayField("medicaid", formData.medicaid);
		const stateLicenseIds = await insertArrayField(
			"state_license",
			formData.stateLicense
		);
		const cliaIds = await insertArrayField("clia", formData.clia);
		const deaIds = await insertArrayField("dea", formData.dea);
		const cdsIds = await insertArrayField("cds", formData.cds);

		const { data: professionalMalpractice, error: profMalpracticeError } =
			await supabase
				.from("malpractices_info")
				.insert({
					insurance_name: formData.professionalLiabilityPolicyName,
					policy_number: formData.professionalLiabilityPolicyNumber,
					effective_date: convertToDate(
						formData.professionalLiabilityEffectiveDate
					),
					expiry_date: convertToDate(formData.professionalLiabilityExpiryDate),
					aggregate: formData.professionalLiabilityAggregate,
				})
				.select("uuid")
				.single();

		if (profMalpracticeError) {
			throw new Error(
				`Error inserting professional malpractice: ${profMalpracticeError.message}`
			);
		}

		const { data: generalMalpractice, error: genMalpracticeError } =
			await supabase
				.from("malpractices_info")
				.insert({
					insurance_name: formData.generalLiabilityPolicyName,
					policy_number: formData.generalLiabilityPolicyNumber,
					effective_date: convertToDate(formData.generalLiabilityEffectiveDate),
					expiry_date: convertToDate(formData.generalLiabilityExpiryDate),
					aggregate: formData.generalLiabilityAggregate,
				})
				.select("uuid")
				.single();

		if (genMalpracticeError) {
			throw new Error(
				`Error inserting general malpractice: ${genMalpracticeError.message}`
			);
		}

		const { error: updateError } = await supabase
			.from("professional_ids")
			.update({
				professional_malpractice_info: professionalMalpractice.uuid,
				general_malpractice_info: generalMalpractice.uuid,
			})
			.eq("uuid", professionalId.uuid);

		if (updateError) {
			throw new Error(
				`Error updating malpractice info: ${updateError.message}`
			);
		}

		// Insert web portal credentials
		const insertPortalCredential = async (
			type,
			username,
			password,
			obj = {}
		) => {
			if (!username || !password) return null;

			console.log("inserting -> ", type, " with ", username, password);

			const insertData = {
				professional_id: professionalId.uuid,
				username,
				password,
				type,
			};

			if (type === "caqh" && obj.userId) insertData.user_id = obj.userId;

			if (type === "other" && obj.platformName)
				insertData.platform_name = obj.platformName;

			const { data, error } = await supabase
				.from("web_portals")
				.insert(insertData)
				.select("uuid")
				.single();

			if (error) {
				throw new Error(
					`Error inserting ${type} credentials: ${error.message}`
				);
			}
			return data.uuid;
		};
		// Insert all portal credentials
		await Promise.all(
			[
				...[
					"pecos",
					"uhc",
					"optum",
					"availity",
					"medicaid",
					"bankLogin",
					"echo",
					"payspan",
					"billing",
					"edi",
					"fax",
					"molina",
				].map((type) => {
					const username = formData[`${type}Username`];
					const password = formData[`${type}Password`];
					return insertPortalCredential(type, username, password);
				}),
				insertPortalCredential(
					"caqh",
					formData.caqhUsername,
					formData.caqhPassword,
					{
						userId: formData.caqhUserId,
					}
				),
				insertPortalCredential(
					"other",
					formData.otherUsername,
					formData.otherPassword,
					{
						platformName: formData.otherPlatformName,
					}
				),
			].filter(Boolean)
		);

		return new Response(
			JSON.stringify({
				message: "Professional information saved successfully",
				professionalId: professionalId.uuid,
			}),
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error saving professional information:", error);
		return new Response(
			JSON.stringify({
				message: error.message || "Failed to save professional information",
			}),
			{ status: 500 }
		);
	}
}

export async function GET(request) {
	try {
		const searchParams = request.nextUrl.searchParams;
		const provider_id = searchParams.get("provider_id");

		if (!provider_id) {
			return new Response(
				JSON.stringify({ message: "Provider ID is required" }),
				{ status: 400 }
			);
		}

		// 1. Get professional IDs basic info
		const { data: professionalData, error: professionalError } = await supabase
			.from("professional_ids")
			.select(
				`
		  *,
		  professional_malpractice:professional_malpractice_info(
			insurance_name,
			policy_number,
			effective_date,
			expiry_date,
			aggregate
		  ),
		  general_malpractice:general_malpractice_info(
			insurance_name,
			policy_number,
			effective_date,
			expiry_date,
			aggregate
		  )
		`
			)
			.eq("provider_id", provider_id);

		// Handle no data found case
		if (!professionalData || professionalData.length === 0) {
			return new Response(
				JSON.stringify({ message: "No data found for this provider" }),
				{ status: 200 }
			);
		}

		const professionalRecord = professionalData[professionalData.length - 1];

		const { data: infoNumbers, error: infoError } = await supabase
			.from("info_numbers")
			.select("*")
			.eq("professional_id", professionalRecord.uuid);

		if (infoError) {
			throw new Error(`Error fetching info numbers: ${infoError.message}`);
		}

		// 3. Get web portal credentials
		const { data: portalCredentials, error: portalError } = await supabase
			.from("web_portals")
			.select("*")
			.eq("professional_id", professionalRecord.uuid);

		if (portalError) {
			throw new Error(
				`Error fetching portal credentials: ${portalError.message}`
			);
		}

		const transformedData = {
			hasNPI:
				professionalRecord?.npi_1 || professionalRecord?.npi_2 ? "Yes" : "No",
			npi1: professionalRecord?.npi_1 || "",
			npi2: professionalRecord?.npi_2 || "",
			taxId: professionalRecord?.tax_id || "",
			upin: professionalRecord?.upin || "",

			medicare: transformInfoNumbers(infoNumbers || [], "medicare"),
			medicaid: transformInfoNumbers(infoNumbers || [], "medicaid"),
			stateLicense: transformInfoNumbers(infoNumbers || [], "state_license"),
			clia: transformInfoNumbers(infoNumbers || [], "clia"),
			dea: transformInfoNumbers(infoNumbers || [], "dea"),
			cds: transformInfoNumbers(infoNumbers || [], "cds"),

			professionalLiabilityPolicyName:
				professionalRecord?.professional_malpractice?.insurance_name || "",
			professionalLiabilityPolicyNumber:
				professionalRecord?.professional_malpractice?.policy_number || "",
			professionalLiabilityEffectiveDate:
				professionalRecord?.professional_malpractice?.effective_date || "",
			professionalLiabilityExpiryDate:
				professionalRecord?.professional_malpractice?.expiry_date || "",
			professionalLiabilityAggregate:
				professionalRecord?.professional_malpractice?.aggregate || "",

			generalLiabilityPolicyName:
				professionalRecord?.general_malpractice?.insurance_name || "",
			generalLiabilityPolicyNumber:
				professionalRecord?.general_malpractice?.policy_number || "",
			generalLiabilityEffectiveDate:
				professionalRecord?.general_malpractice?.effective_date || "",
			generalLiabilityExpiryDate:
				professionalRecord?.general_malpractice?.expiry_date || "",
			generalLiabilityAggregate:
				professionalRecord?.general_malpractice?.aggregate || "",

			...transformPortalCredentials(portalCredentials || []),
		};

		return new Response(JSON.stringify(transformedData), { status: 200 });
	} catch (error) {
		console.error("Error fetching professional information:", error);
		return new Response(
			JSON.stringify({
				message: error.message || "Failed to fetch professional information",
			}),
			{ status: 500 }
		);
	}
}
function transformInfoNumbers(infoNumbers, type) {
	const typeData = infoNumbers?.filter((item) => item.type === type) || [];
	if (typeData.length === 0) {
		return [
			{
				number: "",
				state: "",
				effectiveDate: "",
				expiryDate: "",
				[`has${type.charAt(0).toUpperCase() + type.slice(1)}`]: "Select Option",
			},
		];
	}

	return typeData.map((item) => ({
		number: item.value,
		state: item.issue_state,
		effectiveDate: item.effective_date,
		expiryDate: item.expiry_date,
		[`has${type.charAt(0).toUpperCase() + type.slice(1)}`]: "Yes",
	}));
}

function transformPortalCredentials(credentials) {
	const portalData = {
		caqhUserId: "",
		caqhUsername: "",
		caqhPassword: "",

		otherPlatformName: "",
		otherUsername: "",
		otherPassword: "",

		pecosUsername: "",
		pecosPassword: "",
		uhcUsername: "",
		uhcPassword: "",
		optumUsername: "",
		optumPassword: "",
		availityUsername: "",
		availityPassword: "",
		medicaidUsername: "",
		medicaidPassword: "",
		bankLoginUsername: "",
		bankLoginPassword: "",
		echoUsername: "",
		echoPassword: "",
		payspanUsername: "",
		payspanPassword: "",
		billingUsername: "",
		billingPassword: "",
		ediUsername: "",
		ediPassword: "",
		faxUsername: "",
		faxPassword: "",
		molinaUsername: "",
		molinaPassword: "",
	};

	credentials?.forEach((cred) => {
		if (cred.type === "caqh") {
			portalData.caqhUserId = cred.user_id || "";
			portalData.caqhUsername = cred.username || "";
			portalData.caqhPassword = cred.password || "";
		} else if (cred.type === "other") {
			portalData.otherPlatformName = cred.platform_name || "";
			portalData.otherUsername = cred.username || "";
			portalData.otherPassword = cred.password || "";
		} else {
			portalData[`${cred.type}Username`] = cred.username || "";
			portalData[`${cred.type}Password`] = cred.password || "";
		}
	});

	return portalData;
}
