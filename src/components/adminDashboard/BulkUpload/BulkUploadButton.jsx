"use client";

import { supabase } from "@/lib/supabase";
import Papa from "papaparse";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoCloseSharp } from "react-icons/io5";
import { InsertEducation } from "./insertEducation";
import { InsertProfessionalIds } from "./insertProfessionalIds";
import useBulkUpload from "./useBulkUpload";
import { InsertTraining } from "./insertTraining";
import { InsertSpeciality } from "./insertSpeciality";
import { InsertHospitalAffiliationsPrivileges } from "./insertHospitalAffiliationsPrivilages";
import { InsertHospitalAffiliationsArrangements } from "./insertHospitalAffiliationsArrangements";
import { InsertPayers } from "./insertPayers";
import { InsertCredentialingContacts } from "./insertCredentialingContacts";
import { InsertEmployment } from "./insertEmployment";
import { InsertProfessionalReferences } from "./insertProfessionalReferences";

export default function BulkUploadButton() {
  const [file, setFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [progress, setProgress] = useState(0); // Track progress
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
          header: true,
          complete: (result) => {
            rows = result.data;
          },
        });
      } else {
        alert("Unsupported file type. Please upload a .csv file.");
        setProgress(0);
        return;
      }

      const userUuid = localStorage.getItem("user_uuid");
      if (!userUuid) {
        alert("User UUID not found in local storage.");
        setProgress(0);
        return;
      }

      toast.loading("Please Wait");
      try {
        var providerId = null;
        var professionalId = null;
        const totalRows = rows.length;

        // Split the rows into related tables
        for (let i = 0; i < totalRows; i++) {
          const row = rows[i];
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

            // home_address
            home_address_line_1,
            home_address_line_2,
            home_address_city,
            home_address_state,
            home_address_zip_code,

            // service_location_address
            service_location_address_line_1,
            service_location_address_line_2,
            service_location_address_city,
            service_location_address_state,
            service_location_address_zip_code,

            // mailing_address
            mailing_address_line_1,
            mailing_address_line_2,
            mailing_address_city,
            mailing_address_state,
            mailing_address_zip_code,

            // contact info
            personal_home_phone,
            personal_cell_phone,
            personal_email,
            personal_work_email,

            // emergency_contact_info
            emergency_contact_name,
            emergency_contact_relation,
            emergency_contact_cell_phone,
            emergency_contact_email,

            // professional+ID
            npi_1,
            npi_2,
            tax_id,
            upin,
          } = row;

          if (last_name !== undefined) {
            if (
              first_name !== "" &&
              middle_initial !== "" &&
              last_name !== "" &&
              provider_title !== ""
            ) {
              const homeAddress = await insertAddress({
                address_line_1: home_address_line_1,
                address_line_2: home_address_line_2,
                city: home_address_city,
                state: home_address_state,
                zip_code: home_address_zip_code,
              });

              const serviceLocationAddress = await insertAddress({
                address_line_1: service_location_address_line_1,
                address_line_2: service_location_address_line_2,
                city: service_location_address_city,
                state: service_location_address_state,
                zip_code: service_location_address_zip_code,
              });

              const mailingAddress = await insertAddress({
                address_line_1: mailing_address_line_1,
                address_line_2: mailing_address_line_2,
                city: mailing_address_city,
                state: mailing_address_state,
                zip_code: mailing_address_zip_code,
              });

              const personalContact = await insertContact({
                home_phone: personal_home_phone,
                cell_phone: personal_cell_phone,
                email: personal_email,
                work_email: personal_work_email,
              });

              const emergencyContact = await insertContact({
                contact_name: emergency_contact_name,
                cell_phone: emergency_contact_name,
                relation: emergency_contact_relation,
                email: emergency_contact_cell_phone,
                work_email: emergency_contact_email,
              });

              const { data: providerData, error: providerError } = await supabase
                .from("providers_info")
                .insert({
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
                })
                .select()
                .single();
              providerId = providerData.uuid;
              if (providerError) throw new Error(providerError.message);

              const { data: professionalData, error: professionalError } = await supabase
                .from("professional_ids")
                .insert({
                  provider_id: providerId,
                  npi_1: npi_1 || "",
                  npi_2: npi_2 || "",
                  tax_id: tax_id,
                  upin: upin,
                })
                .select()
                .single();
              professionalId = professionalData.uuid;
              if (professionalError) throw new Error(professionalError.message);
            }

            // Insert data into related tables
            await InsertProfessionalIds({ professionalId: professionalId, row: row });
            await InsertEducation({ providerId: providerId, row: row });
            await InsertTraining({ providerId: providerId, row: row });
            await InsertSpeciality({ providerId: providerId, row: row });
            await InsertHospitalAffiliationsPrivileges({ providerId: providerId, row: row });
            await InsertHospitalAffiliationsArrangements({ providerId: providerId, row: row });
            await InsertPayers({ providerId: providerId, row: row });
            await InsertCredentialingContacts({ providerId: providerId, row: row });
            await InsertEmployment({ providerId: providerId, row: row });
            await InsertProfessionalReferences({ providerId: providerId, row: row });
          }

          // Update progress
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
        className="px-4 py-3 flex flex-row justify-center items-center gap-4 bg-secondary text-white rounded-lg"
      >
        Bulk Upload Providers
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded">
            <div className="flex justify-end items-center">
              <button onClick={() => setIsModalOpen(false)}>
                <IoCloseSharp />
              </button>
            </div>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Upload CSV</h2>
              <a href="/assets/Providers Sample.csv" className="">
                Download Sample File
              </a>
            </div>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="my-4"
            />
            <button
              onClick={handleUpload}
              className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
            >
              Start Upload
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
