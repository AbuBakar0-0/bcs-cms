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
		const insertPortalCredential = async (type, username, password) => {
			if (!username || !password) return null;

			const { data, error } = await supabase
				.from("web_portals")
				.insert({
					professional_id: professionalId.uuid,
					username,
					password,
					type,
				})
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
				insertPortalCredential(
					"pecos",
					formData.pecosUsername,
					formData.pecosPassword
				),
				insertPortalCredential(
					"uhc",
					formData.uhcUsername,
					formData.uhcPassword
				),
				insertPortalCredential(
					"optum",
					formData.optumUsername,
					formData.optumPassword
				),
				insertPortalCredential(
					"availity",
					formData.availityUsername,
					formData.availityPassword
				),
				insertPortalCredential(
					"medicaid",
					formData.medicaidUsername,
					formData.medicaidPassword
				),
				insertPortalCredential(
					"caqh",
					formData.caqhUsername,
					formData.caqhPassword
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
