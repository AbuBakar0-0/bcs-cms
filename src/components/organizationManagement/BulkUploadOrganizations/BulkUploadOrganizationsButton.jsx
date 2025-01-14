"use client";

import useBulkUpload from "@/components/adminDashboard/BulkUpload/useBulkUpload";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";
import Papa from "papaparse";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoCloseSharp } from "react-icons/io5";

export default function BulkUploadOrganizationButton() {
    const { id: provider_id } = useParams();
    const [progress, setProgress] = useState(0); // Track progress

    const [file, setFile] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

    const { insertAddress, insertContact } = useBulkUpload();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return alert("Please select a file.");

        const reader = new FileReader();

        reader.onload = async (event) => {
            const resultData = event.target.result;
            let rows = [];

            // Parse CSV data
            if (file.name.endsWith(".csv")) {
                Papa.parse(resultData, {
                    header: true, // Ensure keys are mapped
                    complete: (result) => {
                        rows = result.data;
                    },
                });
            } else {
                alert("Unsupported file type. Please upload a .csv file.");
                setIsLoading(false);
                setProgress(0);
                return;
            }

            const userUuid = localStorage.getItem("user_uuid");
            if (!userUuid) {
                alert("User UUID not found in local storage.");
                setIsLoading(false);
                setProgress(0);
                return;
            }
            toast.loading("Please Wait");
            try {

                var legal_business_name = "";
                var practice_id = "";
                const totalRows = rows.length;

                // Split the rows into related tables
                for (let i = 0; i < totalRows; i++) {
                    const row = rows[i];
                    const {
                        practice_profile_practice_type,
                        practice_profile_type_of_service_provided,
                        practice_profile_credentialing_type,
                        practice_profile_npi_2,
                        practice_profile_tax_id,
                        practice_profile_legal_business_name,
                        practice_profile_doing_business_name,
                        practice_profile_taxonomy_code_1,
                        practice_profile_taxonomy_code_2,
                        practice_profile_service_location_address_line_1,
                        practice_profile_service_location_address_line_2,
                        practice_profile_service_location_city,
                        practice_profile_service_location_state,
                        practice_profile_service_location_zip_code,
                        practice_profile_service_location_phone,
                        practice_profile_service_location_appointment_phone,
                        practice_profile_service_location_fax,
                        practice_profile_service_location_email,
                        practice_profile_mailing_address_line_1,
                        practice_profile_mailing_address_line_2,
                        practice_profile_mailing_city,
                        practice_profile_mailing_state,
                        practice_profile_mailing_zip_code,
                        practice_profile_mailing_phone,
                        practice_profile_mailing_fax,
                        practice_profile_mailing_email,
                        practice_profile_correspondance_address_line_1,
                        practice_profile_correspondance_address_line_2,
                        practice_profile_correspondance_city,
                        practice_profile_correspondance_state,
                        practice_profile_correspondance_zip_code,
                        practice_profile_correspondance_phone,
                        practice_profile_correspondance_fax,
                        practice_profile_correspondance_email,
                        practice_profile_medicare_number,
                        practice_profile_medicaid_number,
                        practice_start_date,
                        practice_profile_contact_person,
                        practice_profile_contact_name,
                        practice_profile_contact_work_email,
                        practice_profile_contact_work_phone,
                        practice_profile_contact_cell_phone,

                        //location data
                        practice_location_doing_business_name, location_name, practice_location_npi_2, practice_location_tax_id, practice_location_taxonomy_code_1, practice_location_taxonomy_code_2, practice_location_service_location_address_line_1, practice_location_service_location_address_line_2, practice_location_service_location_city, practice_location_service_location_state, practice_location_service_location_zip_code, practice_location_service_location_phone, practice_location_service_location_appointment_phone, practice_location_service_location_fax, practice_location_service_location_email, practice_location_mailing_address_line_1, practice_location_mailing_address_line_2, practice_location_mailing_city, practice_location_mailing_state, practice_location_mailing_zip_code, practice_location_mailing_phone, practice_location_mailing_fax, practice_location_mailing_email, practice_location_correspondance_address_line_1, practice_location_correspondance_address_line_2, practice_location_correspondance_city, practice_location_correspondance_state, practice_location_correspondance_zip_code, practice_location_correspondance_phone, practice_location_correspondance_fax, practice_location_correspondance_email, practice_location_medicare_number, practice_location_medicaid_number, practice_location_contact_person, practice_location_contact_name, practice_location_contact_work_email, practice_location_contact_work_phone, practice_location_contact_cell_phone,


                    } = row;

                    if (practice_profile_type_of_service_provided != undefined) {
                        if (practice_profile_practice_type != "" &&
                            practice_profile_type_of_service_provided != "" &&
                            practice_profile_credentialing_type != "") {
                            const serviceAddress = await insertAddress({
                                address_line_1: practice_profile_service_location_address_line_1,
                                address_line_2: practice_profile_service_location_address_line_2,
                                city: practice_profile_service_location_city,
                                state: practice_profile_service_location_state,
                                zip_code: practice_profile_service_location_zip_code,
                            });

                            const serviceContact = await insertContact({
                                cell_phone: practice_profile_service_location_phone,
                                fax: practice_profile_service_location_fax,
                                work_phone: practice_profile_service_location_appointment_phone,
                                email: practice_profile_service_location_email
                            });

                            const mailingAddress = await insertAddress({
                                address_line_1: practice_profile_mailing_address_line_1,
                                address_line_2: practice_profile_mailing_address_line_2,
                                city: practice_profile_mailing_city,
                                state: practice_profile_mailing_state,
                                zip_code: practice_profile_mailing_zip_code,
                            });

                            const mailingContact = await insertContact({
                                cell_phone: practice_profile_mailing_phone,
                                fax: practice_profile_mailing_fax,
                                email: practice_profile_mailing_email
                            });

                            const correspondanceAddress = await insertAddress({
                                address_line_1: practice_profile_correspondance_address_line_1,
                                address_line_2: practice_profile_correspondance_address_line_2,
                                city: practice_profile_correspondance_city,
                                state: practice_profile_correspondance_state,
                                zip_code: practice_profile_correspondance_zip_code,
                            });

                            const correspondanceContact = await insertContact({
                                cell_phone: practice_profile_correspondance_phone,
                                fax: practice_profile_correspondance_fax,
                                email: practice_profile_correspondance_email
                            });

                            const profileContact = await insertContact({
                                relation: practice_profile_contact_person,
                                contact_name: practice_profile_contact_name,
                                work_email: practice_profile_contact_work_email,
                                home_phone: practice_profile_contact_work_phone,
                                cell_phone: practice_profile_contact_cell_phone,
                            });

                            const { data: practiceProfileData, error: practiceProfileError } = await supabase
                                .from("practice_profiles")
                                .insert({
                                    provider_id: provider_id,
                                    practice_type: practice_profile_practice_type,
                                    type_of_service_provided: practice_profile_type_of_service_provided,
                                    credentialing_type: practice_profile_credentialing_type,
                                    npi_2: practice_profile_npi_2,
                                    tax_id: practice_profile_tax_id,
                                    legal_business_name: practice_profile_legal_business_name,
                                    doing_business_name: practice_profile_doing_business_name,
                                    taxonomy_code_1: practice_profile_taxonomy_code_1,
                                    taxonomy_code_2: practice_profile_taxonomy_code_2,
                                    service_address_id: serviceAddress.uuid,
                                    service_contact_id: serviceContact.uuid,
                                    mailing_address_id: mailingAddress.uuid,
                                    mailing_contact_id: mailingContact.uuid,
                                    correspondance_address_id: correspondanceAddress.uuid,
                                    correspondance_contact_id: correspondanceContact.uuid,
                                    ptan_medicare_number: practice_profile_medicare_number,
                                    medicaid_number: practice_profile_medicaid_number,
                                    start_date: practice_start_date,
                                    practice_contact_id: profileContact.uuid
                                })
                                .select()
                                .single();

                            if (practiceProfileError) throw new Error(practiceProfileError.message);

                            legal_business_name = practice_profile_legal_business_name;
                            practice_id = practiceProfileData.uuid;
                        }



                        const serviceAddress = await insertAddress({
                            address_line_1: practice_location_service_location_address_line_1,
                            address_line_2: practice_location_service_location_address_line_2,
                            city: practice_location_service_location_city,
                            state: practice_location_service_location_state,
                            zip_code: practice_location_service_location_zip_code,
                        });

                        const serviceContact = await insertContact({
                            cell_phone: practice_location_service_location_phone,
                            fax: practice_location_service_location_fax,
                            work_phone: practice_location_service_location_appointment_phone,
                            email: practice_location_service_location_email
                        });

                        const mailingAddress = await insertAddress({
                            address_line_1: practice_location_mailing_address_line_1,
                            address_line_2: practice_location_mailing_address_line_2,
                            city: practice_location_mailing_city,
                            state: practice_location_mailing_state,
                            zip_code: practice_location_mailing_zip_code,
                        });

                        const mailingContact = await insertContact({
                            cell_phone: practice_location_mailing_phone,
                            fax: practice_location_mailing_fax,
                            email: practice_location_mailing_email
                        });

                        const correspondanceAddress = await insertAddress({
                            address_line_1: practice_location_correspondance_address_line_1,
                            address_line_2: practice_location_correspondance_address_line_2,
                            city: practice_location_correspondance_city,
                            state: practice_location_correspondance_state,
                            zip_code: practice_location_correspondance_zip_code,
                        });

                        const correspondanceContact = await insertContact({
                            cell_phone: practice_location_correspondance_phone,
                            fax: practice_location_correspondance_fax,
                            email: practice_location_correspondance_email
                        });

                        const profileContact = await insertContact({
                            relation: practice_location_contact_person,
                            contact_name: practice_location_contact_name,
                            work_email: practice_location_contact_work_email,
                            home_phone: practice_location_contact_work_phone,
                            cell_phone: practice_location_contact_cell_phone,
                        });


                        const { data: practiceLocationData, error: practiceLocationError } = await supabase
                            .from("practice_locations")
                            .insert({
                                provider_id: provider_id,
                                legal_business_name: legal_business_name,
                                doing_business_name: practice_location_doing_business_name,
                                location_name: location_name,
                                npi_2: practice_location_npi_2,
                                tax_id: practice_location_tax_id,
                                taxonomy_code_1: practice_location_taxonomy_code_1,
                                taxonomy_code_2: practice_location_taxonomy_code_2,
                                service_address_id: serviceAddress.uuid,
                                service_contact_id: serviceContact.uuid,
                                mailing_address_id: mailingAddress.uuid,
                                mailing_contact_id: mailingContact.uuid,
                                correspondence_address_id: correspondanceAddress.uuid,
                                correspondence_contact_id: correspondanceContact.uuid,
                                ptan_medicare_number: practice_location_medicare_number,
                                medicaid_number: practice_location_medicaid_number,
                                practice_contact_id: profileContact.uuid,
                                practice_id: practice_id
                            })
                            .select()
                            .single();

                        if (practiceLocationError) throw new Error(practiceLocationError.message);
                    }



                    setProgress(((i + 1) / totalRows) * 100);


                }
                toast.dismiss();
                toast.success("Data inserted successfully!");
                window.location.reload();
            } catch (error) {
                toast.dismiss();
                toast.error(`Error inserting data: ${error.message}`);
            }
            setIsModalOpen(false);
            setProgress(0); // Reset progress after upload

        };

        reader.readAsText(file);
    };

    return (
        <div className="p-4">
            {/* Button to trigger modal */}
            <button
                onClick={() => setIsModalOpen(true)}
                className={`w-max px-4 py-3 flex flex-row justify-center items-center gap-4 bg-secondary text-white rounded-lg`}
            >
                Bulk Upload Organizations
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded">
                        <div className="flex justify-end items-center">
                            <button onClick={() => setIsModalOpen(false)}>
                                <IoCloseSharp />
                            </button>
                        </div>
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold">Upload CSV</h2>
                            <a href="/assets/Organizations Sample.csv" className="" >Download Sample File</a>
                        </div>
                        <input
                            type="file"
                            accept=".csv"
                            onChange={handleFileChange}
                            className="my-4"
                        />
                        <button
                            onClick={handleUpload}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Upload Data
                        </button>
                        {progress > 0 && (
                            <div className="mt-4">
                                <div className="bg-gray-200 w-full h-2 rounded">
                                    <div
                                        className="bg-blue-500 h-2 rounded"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                                <p className="text-center">{Math.round(progress)}% Uploaded</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
