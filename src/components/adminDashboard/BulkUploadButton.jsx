"use client";

import { supabase } from "@/lib/supabase";
import Papa from "papaparse";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoCloseSharp } from "react-icons/io5";

export default function BulkUploadButton() {
    const [file, setFile] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

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
                return;
            }

            const userUuid = localStorage.getItem("user_uuid");
            if (!userUuid) {
                alert("User UUID not found in local storage.");
                setIsLoading(false);
                return;
            }
            toast.loading("Please Wait");
            try {
                // Split the rows into related tables
                for (let row of rows) {
                    const {
                        first_name,
                        middle_initial,
                        last_name,
                        provider_title,
                        ssn,
                        gender,
                        dob,
                        birth_city,
                        birth_state,
                        birth_country,
                        license_id,
                        state_issued,
                        issue_date,
                        expiry_date,
                        home_address_line_1,
                        home_address_line_2,
                        home_address_city,
                        home_address_state,
                        home_address_zip_code,
                        service_location_address_line_1,
                        service_location_address_line_2,
                        service_location_address_city,
                        service_location_address_state,
                        service_location_address_zip_code,
                        mailing_address_line_1,
                        mailing_address_line_2,
                        mailing_address_city,
                        mailing_address_state,
                        mailing_address_zip_code,
                        personal_home_phone,
                        personal_cell_phone,
                        personal_email,
                        personal_work_email,
                        emergency_contact_name,
                        emergency_contact_relation,
                        emergency_contact_cell_phone,
                        emergency_contact_email,
                    } = row;

                    if (first_name != "") {
                        // Insert addresses
                        const { data: homeAddress, error: homeAddressError } = await supabase
                            .from("addresses")
                            .insert({
                                address_line_1: home_address_line_1,
                                address_line_2: home_address_line_2,
                                city: home_address_city,
                                state: home_address_state,
                                zip_code: home_address_zip_code,
                            })
                            .select()
                            .single();

                        if (homeAddressError) throw new Error(homeAddressError.message);

                        const { data: serviceLocationAddress, error: serviceLocationError } = await supabase
                            .from("addresses")
                            .insert({
                                address_line_1: service_location_address_line_1,
                                address_line_2: service_location_address_line_2,
                                city: service_location_address_city,
                                state: service_location_address_state,
                                zip_code: service_location_address_zip_code,
                            })
                            .select()
                            .single();

                        if (serviceLocationError) throw new Error(serviceLocationError.message);

                        const { data: mailingAddress, error: mailingAddressError } = await supabase
                            .from("addresses")
                            .insert({
                                address_line_1: mailing_address_line_1,
                                address_line_2: mailing_address_line_2,
                                city: mailing_address_city,
                                state: mailing_address_state,
                                zip_code: mailing_address_zip_code,
                            })
                            .select()
                            .single();

                        if (mailingAddressError) throw new Error(mailingAddressError.message);

                        // Insert contacts
                        const { data: personalContact, error: personalContactError } = await supabase
                            .from("contacts")
                            .insert({
                                home_phone: personal_home_phone,
                                cell_phone: personal_cell_phone,
                                email: personal_email,
                                work_email: personal_work_email,
                            })
                            .select()
                            .single();

                        if (personalContactError) throw new Error(personalContactError.message);

                        const { data: emergencyContact, error: emergencyContactError } = await supabase
                            .from("contacts")
                            .insert({
                                cell_phone: emergency_contact_name,
                                relation: emergency_contact_relation,
                                email: emergency_contact_cell_phone,
                                work_email: emergency_contact_email,
                            })
                            .select()
                            .single();

                        if (emergencyContactError) throw new Error(emergencyContactError.message);

                        // Insert provider info with references to other tables
                        const { error: providerError } = await supabase.from("providers_info").insert({
                            added_by: userUuid,
                            first_name: first_name,
                            middle_initial: middle_initial,
                            last_name: last_name,
                            provider_title: provider_title,
                            ssn: ssn,
                            gender: gender,
                            dob: dob,
                            birth_city: birth_city,
                            birth_state: birth_state,
                            birth_country: birth_country,
                            license_id: license_id,
                            state_issued: state_issued,
                            issue_date: issue_date,
                            expiry_date: expiry_date,
                            home_address_id: homeAddress.uuid,
                            service_location_address_id: serviceLocationAddress.uuid,
                            mailing_address_id: mailingAddress.uuid,
                            contact_id: personalContact.uuid,
                            emergency_contact_id: emergencyContact.uuid,
                        });

                        if (providerError) throw new Error(providerError.message);
                    }
                }
                toast.dismiss();
                toast.success("Data inserted successfully!")
                window.location.reload();
            } catch (error) {
                toast.dismiss();
                toast.error("Error inserting data: ${error.message}");
            }
            setIsModalOpen(false);
        };

        reader.readAsText(file);
    };

    return (
        <div className="p-4">
            {/* Button to trigger modal */}
            <button
                onClick={() => setIsModalOpen(true)}
                className={`px-4 py-3 flex flex-row justify-center items-center gap-4 bg-secondary text-white rounded-lg`}

            >
                Bulk Upload
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold">Upload CSV</h2>
                            <button onClick={() => setIsModalOpen(false)}>
                            <IoCloseSharp />

                            </button>
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
                        
                    </div>
                </div>
            )}
        </div>
    );
}
