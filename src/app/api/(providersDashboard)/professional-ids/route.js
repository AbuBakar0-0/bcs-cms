import { supabase } from "@/lib/supabase";
const convertToDate = (dateString) => {
	const date = new Date(dateString);
	return !isNaN(date) ? date.toISOString() : null;
};
export async function POST(request) {
	try {
		const formData = await request.json();
		const { provider_id } = formData;
		console.log(provider_id);
		return;
		// Inserting Medicare, Medicaid, State License, CLIA, DEA, CDS information
		const insertArrayField = async (fieldName, data) => {
			// console.log(data, "--------", fieldName);
			const insertedFields = [];
			for (const item of data) {
				const effectiveDate = convertToDate(item.effectiveDate);
				const expiryDate = convertToDate(item.expiryDate);
				const { data: insertedData, error } = await supabase
					.from("professional_numbers")
					.insert({
						effective_date: effectiveDate || item.effectiveDate,
						expiry_date: expiryDate || item.expiryDate,
						issue_state: item.state,
						value: item.number,
						type: fieldName,
					})
					.select("uuid")
					.single();

				if (error) {
					throw new Error(`Error inserting ${fieldName}: ${error.message}`);
				}

				insertedFields.push(insertedData.uuid);
			}
			return insertedFields;
		};

		const medicareIds = await insertArrayField(
			"medicare_id",
			formData.medicare
		);
		const medicaidIds = await insertArrayField("medica_id", formData.medicaid);
		const stateLicenseIds = await insertArrayField(
			"state_license_id",
			formData.stateLicense
		);
		const cliaIds = await insertArrayField("clia_id", formData.clia);
		const deaIds = await insertArrayField("dea_id", formData.dea);
		const cdsIds = await insertArrayField("cds_id", formData.cds);

		const insertLiabilityFields = async (
			policyNumber,
			effectiveDate,
			expiryDate,
			aggregate
		) => {
			const { data: insertedData, error } = await supabase
				.from("malpractice_info")
				.insert({
					policy_number: policyNumber,
					effective_date: effectiveDate,
					expiry_date: expiryDate,
					aggregate: aggregate,
				})
				.select("uuid")
				.single();

			if (error) {
				throw new Error(`Error inserting : ${error.message}`);
			}

			return insertedData.uuid;
		};

		const professionalMalpracticeUuid = await insertLiabilityFields(
			formData.professionalLiabilityPolicyNumber,
			formData.professionalLiabilityEffectiveDate,
			formData.professionalLiabilityExpiryDate,
			formData.professionalLiabilityAggregate
		);

		const generalMalpracticeUuid = await insertLiabilityFields(
			formData.generalLiabilityPolicyNumber,
			formData.generalLiabilityEffectiveDate,
			formData.generalLiabilityExpiryDate,
			formData.generalLiabilityAggregate
		);

		const insertPortalCredentials = async (portalData) => {
			const portalCredentials = [];

			for (const [type, { username, password }] of Object.entries(portalData)) {
				const { data: insertedData, error } = await supabase
					.from("web_portal")
					.insert({
						username: username,
						password: password,
						type: type,
					})
					.select("uuid")
					.single();

				if (error) {
					throw new Error(
						`Error inserting ${type} credentials: ${error.message}`
					);
				}

				portalCredentials.push(insertedData.uuid);
			}

			return portalCredentials;
		};

		const portalData = {
			pecos: {
				username: formData.pecosUsername,
				password: formData.pecosPassword,
			},
			uhc: {
				username: formData.uhcUsername,
				password: formData.uhcPassword,
			},
			optum: {
				username: formData.optumUsername,
				password: formData.optumPassword,
			},
			availity: {
				username: formData.availityUsername,
				password: formData.availityPassword,
			},
			medicaid: {
				username: formData.medicaidUsername,
				password: formData.medicaidPassword,
			},
		};

		const portalCredentialsIds = await insertPortalCredentials(portalData);
		const { data: insertedData, error } = await supabase
			.from("web_portal")
			.insert({
				caqh_user_id: formData.caqhUserId,
				username: formData.caqhUsername,
				password: formData.caqhPassword,
				type: "caqh",
			})
			.select("uuid")
			.single();
		if (error) {
			throw new Error(`Error inserting  credentials: ${error.message}`);
		}

		portalCredentialsIds.push(insertedData.uuid);
		const { data: professionalId, error: professionalIdsError } = await supabase
			.from("professional_ids")
			.insert({
				npi_1: formData.npi1,
				npi_2: formData.npi2,
				tax_id: formData.taxId,
				upin: formData.upin,
				info_numbers_ids: [
					...medicareIds,
					...medicaidIds,
					...stateLicenseIds,
					...cliaIds,
					...deaIds,
					...cdsIds,
				],
				professional_malpractice_info: professionalMalpracticeUuid,
				general_malpractice_info: generalMalpracticeUuid,
				web_portal_ids: portalCredentialsIds,
			})
			.select("uuid")
			.single();

		if (professionalIdsError)
			throw new Error(
				`Error inserting provider: ${professionalIdsError.message}`
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
			{ status: 404 }
		);
	}
}
