import useBulkUpload from "./useBulkUpload";


export const InsertEducationTraining = async ({ providerData, row }) => {
    const { insertAddress } = useBulkUpload();
    
    const { first_name,
        middle_initial,
        last_name,
        provider_title,
        education_type,
        professional_school,
        degree,
        education_start_date,
        education_end_date,
        education_state,
        education_country,
    } = row


    let isSameProvider = false;
    if (first_name == "" && middle_initial == "" && last_name == "" && provider_title == "") {
        isSameProvider = true;
    }

    if (isSameProvider) {

    }



}
