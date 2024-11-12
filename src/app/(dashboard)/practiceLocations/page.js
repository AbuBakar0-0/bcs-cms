"use client";

import HeadingLine from "@/components/ui/HeadingLine";
import TextInput from "@/components/ui/inputFields/TextInput";

function PracticeLocations() {

    const [readonly, setReadOnly] = useState(false);
    const [providerTitle, setProviderTitle] = useState("");

    const handleReadonly = () => {
        setReadOnly(!readonly);
    };

    return (
        <>
            <div className="w-full flex flex-col justify-center items-center gap-4">

                {/* Personal Information */}
                <HeadingLine title={"Practice Profile"} />

                <div className="w-full flex flex-wrap justify-start gap-4 items-start">
                    <div className="w-full flex flex-wrap justify-start gap-4 items-start">
                        <span className="w-full uppercase">Type of service Provided</span>
                        <div className="w-1/7 flex flex-row justify-start items-center gap-4">
                            <input type="radio" name="solo" id="" />Solo Primary Care
                        </div>
                        <div className="w-1/7 flex flex-row justify-start items-center gap-4">
                            <input type="radio" name="solo" id="" />Solo Speciality Care
                        </div>
                        <div className="w-1/7 flex flex-row justify-start items-center gap-4">
                            <input type="radio" name="solo" id="" />Group Primary Care
                        </div>
                        <div className="w-1/7 flex flex-row justify-start items-center gap-4">
                            <input type="radio" name="solo" id="" />Group Speciality Care
                        </div>

                        <div className="w-1/7 flex flex-row justify-start items-center gap-4">
                            <input type="radio" name="solo" id="" />Group of Multi-Speciality
                        </div>


                    </div>

                    <div className="w-full flex flex-wrap justify-start gap-4 items-start">
                        <span className="w-full uppercase">Practice type</span>
                        <div className="w-1/7 flex flex-row justify-start items-center gap-4">
                            <input type="radio" name="med" id="" />Medical
                        </div>
                        <div className="w-1/7 flex flex-row justify-start items-center gap-4">
                            <input type="radio" name="med" id="" />Dental
                        </div>
                        <div className="w-1/7 flex flex-row justify-start items-center gap-4">
                            <input type="radio" name="med" id="" />Behavioural Health
                        </div>
                        <div className="w-1/7 flex flex-row justify-start items-center gap-4">
                            <input type="radio" name="med" id="" />Vision
                        </div>
                        <div className="w-1/7 flex flex-row justify-start items-center gap-4">
                            <input type="radio" name="med" id="" />Multi Speciality
                        </div>


                    </div>
                    <TextInput title={"Practice Name"} label={"first_name"} />
                    <TextInput title={"NPI #"} label={"first_name"} />
                    <TextInput title={"Tax ID"} label={"first_name"} />

                    <div className="w-full flex flex-wrap justify-start gap-4 items-start">
                        <TextInput title={"Service Location Address 1"} label={"Service Location_address"} />
                        <TextInput title={"Service Location Address 2"} label={"Service Location_address_2"} required={false} />
                        <TextInput title={"City"} label={"city"} />
                        <div className="w-1/5">
                            <label htmlFor="state_issued" className="block mb-2 text-sm font-medium text-black">State <span className="text-red-500">*</span></label>
                            <select name="state_issued" id="state_issued" className="bg-gray-50 border border-gray-300 text-black text-sm r/ounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-semibold">
                                {stateAbbreviations.map((item, index) => (
                                    <option value={item} key={index}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <TextInput title={"Zip"} label={"zip"} />
                        <TextInput title={"Practice Ph."} label={"cell_phone"} />
                        <TextInput title={"Practice Fax"} label={"cell_phone"} />
                        <TextInput title={"Practice Email"} label={"email"} type="email" />
                        
                    </div>
                    <div className="w-full flex flex-wrap justify-start gap-4 items-start">
                        <TextInput title={"Billing/ Mailing  Location Address 1"} label={"Billing/ Mailing  Location_address"} />
                        <TextInput title={"Billing/ Mailing  Location Address 2"} label={"Billing/ Mailing  Location_address_2"} required={false} />
                        <TextInput title={"City"} label={"city"} />
                        <div className="w-1/5">
                            <label htmlFor="state_issued" className="block mb-2 text-sm font-medium text-black">State <span className="text-red-500">*</span></label>
                            <select name="state_issued" id="state_issued" className="bg-gray-50 border border-gray-300 text-black text-sm r/ounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-semibold">
                                {stateAbbreviations.map((item, index) => (
                                    <option value={item} key={index}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <TextInput title={"Zip"} label={"zip"} />
                        <TextInput title={"Practice Ph."} label={"cell_phone"} />
                        <TextInput title={"Practice Fax"} label={"cell_phone"} />
                        <TextInput title={"Practice Email"} label={"email"} type="email" />
                        
                    </div>

                    <div className="w-full flex flex-wrap justify-start gap-4 items-start">
                        <TextInput title={"Correspondance  Location Address 1"} label={"Correspondance  Location_address"} />
                        <TextInput title={"Correspondance  Location Address 2"} label={"Correspondance  Location_address_2"} required={false} />
                        <TextInput title={"City"} label={"city"} />
                        <div className="w-1/5">
                            <label htmlFor="state_issued" className="block mb-2 text-sm font-medium text-black">State <span className="text-red-500">*</span></label>
                            <select name="state_issued" id="state_issued" className="bg-gray-50 border border-gray-300 text-black text-sm r/ounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-semibold">
                                {stateAbbreviations.map((item, index) => (
                                    <option value={item} key={index}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <TextInput title={"Zip"} label={"zip"} />
                        <TextInput title={"Practice Ph."} label={"cell_phone"} />
                        <TextInput title={"Practice Fax"} label={"cell_phone"} />
                        <TextInput title={"Practice Email"} label={"email"} type="email" />
                        
                    </div>

                    
                    
                    <div className="w-full flex flex-wrap justify-start items-center gap-5">
                        
                        
                        <TextInput title={"PTAN/Medicare number"} label={"medicaid"} />
                        <TextInput title={"PTAN/Medicaid number"} label={"medicaid"} />

                        <div className="w-full flex flex-col justify-start items-start gap-4">
                            <span className="w-full uppercase">Are you currently practicing at this location</span>
                            <div className="w-1/7 flex flex-row justify-start items-center gap-4">
                                <input type="checkbox" name="solo" id="" />Yes
                            </div>
                            <div className="w-1/7 flex flex-row justify-start items-center gap-4">
                                <input type="checkbox" name="solo" id="" />No
                            </div>
                        </div>
                        <div className="w-full flex flex-col justify-start items-start gap-4">
                            <TextInput title={"If no expected start date"} label={"medicaid"} type={"date"} />
                        </div>
                        <div className="w-full flex flex-col justify-start items-start gap-4">
                            <span className="w-full uppercase">Do you want this location to be listed in directory?</span>
                            <div className="w-1/7 flex flex-row justify-start items-center gap-4">
                                <input type="checkbox" name="solo" id="" />Yes
                            </div>
                            <div className="w-1/7 flex flex-row justify-start items-center gap-4">
                                <input type="checkbox" name="solo" id="" />No
                            </div>
                        </div>
                        <TextInput title={"Office manager or staff contact"} label={"medicaid"} />
                        <TextInput title={"Cell Ph."} label={"cell_phone"} />
                        <TextInput title={"FAX"} label={"cell_phone"} />
                        <TextInput title={"Credentialing Contact"} label={"cell_phone"} />
                        <TextInput title={"Address Line"} label={"cell_phone"} />
                        <TextInput title={"City"} label={"city"} />
                        <div className="w-1/5">
                            <label htmlFor="state_issued" className="block mb-2 text-sm font-medium text-black">State <span className="text-red-500">*</span></label>
                            <select name="state_issued" id="state_issued" className="bg-gray-50 border border-gray-300 text-black text-sm r/ounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-semibold">
                                {stateAbbreviations.map((item, index) => (
                                    <option value={item} key={index}>{item}</option>
                                ))}
                            </select>
                        </div>

                        <TextInput title={"Country"} label={"zip"} />
                        <TextInput title={"Zip"} label={"zip"} />
                    </div>

                    <div className="w-full flex flex-wrap justify-start gap-4 items-start">
                        <TextInput title={"Billing Company Name (if applicable)"} label={"cell_phone"} />
                        <TextInput title={"Address Line"} label={"cell_phone"} />
                        <TextInput title={"City"} label={"city"} />
                        <div className="w-1/5">
                            <label htmlFor="state_issued" className="block mb-2 text-sm font-medium text-black">State <span className="text-red-500">*</span></label>
                            <select name="state_issued" id="state_issued" className="bg-gray-50 border border-gray-300 text-black text-sm r/ounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-semibold">
                                {stateAbbreviations.map((item, index) => (
                                    <option value={item} key={index}>{item}</option>
                                ))}
                            </select>
                        </div>

                        <TextInput title={"Country"} label={"zip"} />
                        <TextInput title={"Zip"} label={"zip"} />
                    </div>


                    {/* Conditionally rendered text field when "Other" is selected */}
                    {providerTitle === "Other" && (
                        <TextInput title={"Please Specify"} label={"other_provider_title"} />
                    )}

                    <TextInput title={"SSN"} label={"ssn"} />
                    <div className="w-1/5">
                        <label htmlFor="gender" className="block mb-2 text-sm font-medium text-black">
                            Gender <span className="text-red-500">*</span>
                        </label>
                        <select name="gender" id="gender" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-semibold">
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>
                {/* <div className="w-1/5">
                        <label htmlFor="country_of_citizenship" className="block mb-2 text-sm font-medium text-black">Country of Citizenship <span className="text-red-500">*</span></label>
                        <select name="country_of_citizenship" id="country_of_citizenship" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-semibold">
                        </select>
                    </div>
                    <div className="w-1/5">
                        <label htmlFor="citizenship_type" className="block mb-2 text-sm font-medium text-black">Citizenship Type <span className="text-red-500">*</span></label>
                        <select name="citizenship_type" id="citizenship_type" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-semibold">
                        </select>
                    </div> */}


                <div className="w-full flex flex-wrap justify-start gap-4 items-start">

                    <TextInput title={"Driver License or ID"} label={"driver_license_id"} />
                    <div className="w-1/5">
                        <label htmlFor="state_issued" className="block mb-2 text-sm font-medium text-black">State Issued <span className="text-red-500">*</span></label>
                        <select name="state_issued" id="state_issued" className="bg-gray-50 border border-gray-300 text-black text-sm r/ounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-semibold">
                            {stateAbbreviations.map((item, index) => (
                                <option value={item} key={index}>{item}</option>
                            ))}
                        </select>
                    </div>
                    <TextInput title={"Issue Date"} label={"issue_date"} type="date" />
                    <TextInput title={"Expiration Date"} label={"expiration_date"} type="date" />



                </div>

                {/* Professional Information
                <HeadingLine title={"Professional Information"} />

                <div className="w-full flex flex-wrap justify-start gap-4 items-start">
                    <TextInput title={"Fluent Language"} label={"languages"} required={false} />
                </div> */}

                {/* Home Address */}
                <HeadingLine title={"Home Address"} />

                <div className="w-full flex flex-wrap justify-start gap-4 items-start">
                    <TextInput title={"Street Address 1"} label={"street_address"} />
                    <TextInput title={"Street Address 2"} label={"street_address_2"} required={false} />
                </div>
                <div className="w-full flex flex-wrap justify-start gap-4 items-start">
                    <TextInput title={"City"} label={"city"} />
                    <div className="w-1/5">
                        <label htmlFor="state_issued" className="block mb-2 text-sm font-medium text-black">State Issued <span className="text-red-500">*</span></label>
                        <select name="state_issued" id="state_issued" className="bg-gray-50 border border-gray-300 text-black text-sm r/ounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-semibold">
                            {stateAbbreviations.map((item, index) => (
                                <option value={item} key={index}>{item}</option>
                            ))}
                        </select>
                    </div>
                    <TextInput title={"Zip"} label={"zip"} />
                </div>
                <div className="w-full flex flex-wrap justify-start gap-4 items-center">
                    <input type="checkbox" onClick={handleReadonly} /> Same as Home Address
                </div>
                <div className="w-full flex flex-wrap justify-start gap-4 items-start">
                    <TextInput title={"Mailing Address 1"} label={"mailing_address"} />
                    <TextInput title={"Mailing Address 2"} label={"mailing_address_2"} />
                </div>
                <div className="w-full flex flex-wrap justify-start gap-4 items-start">
                    <TextInput title={"City"} label={"city"} />
                    <div className="w-1/5">
                        <label htmlFor="state_issued" className="block mb-2 text-sm font-medium text-black">State Issued <span className="text-red-500">*</span></label>
                        <select name="state_issued" id="state_issued" className="bg-gray-50 border border-gray-300 text-black text-sm r/ounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-semibold">
                            {stateAbbreviations.map((item, index) => (
                                <option value={item} key={index}>{item}</option>
                            ))}
                        </select>
                    </div>
                    <TextInput title={"Zip"} label={"zip"} />
                </div>


                {/* Contact Information */}
                <HeadingLine title={"Contact Information"} />

                <div className="w-full flex flex-wrap justify-start gap-4 items-start">
                    <TextInput title={"Home Ph."} label={"home_phone"} />

                    <TextInput title={"Work Email"} label={"work_email"} type="email" />

                </div>

                {/* Emergency Contact Information */}
                <HeadingLine title={"Emergency Contact Information"} />

                <div className="w-full flex flex-wrap justify-start gap-4 items-start">
                    <TextInput title={"Contact Name"} label={"emergency_contact_name"} />
                    <TextInput title={"Relation"} label={"relation"} />
                    <TextInput title={"Cell Ph."} label={"emergency_cell_phone"} />
                    <TextInput title={"Email"} label={"emergency_email"} type="email" />
                </div>

                <div className="w-full flex flex-wrap justify-start gap-4 items-start">

                </div>
                <button className="px-4 py-3 rounded-lg bg-secondary text-white">
                    Save & Next
                </button>
            </div >
        </>
    )
}

export default PracticeLocations