"use client";
import Button from "@/components/ui/Button";
import HeadingLine from "@/components/ui/HeadingLine";
import DateInput from "@/components/ui/inputFields/DateInput";
import Dropdown from "@/components/ui/inputFields/DropDown";
import PasswordInput from "@/components/ui/inputFields/PasswordInput";
import TextInput from "@/components/ui/inputFields/TextInput";
import NavBottom from "@/components/ui/NavBottom";
import { stateAbbreviations } from "@/data/stateAbbreviations";
import { CgTrash } from "react-icons/cg";
import { CiLink } from "react-icons/ci";
import { IoAddCircleOutline } from "react-icons/io5";
import { capitalize, useProfessionalIdsForm } from "./useProffesionalIds";

const ProfessionalIds = () => {
  const {
    formData,
    handleChange,
    handleAddField,
    handleRemoveField,
    handleSubmit,
    loading,
  } = useProfessionalIdsForm();

  const renderMultiEntryField = (field, title, numberLabel) => (
    <>
      {formData[field].map((entry, index) => (
        <div
          className="w-full flex flex-wrap justify-start items-end gap-4"
          key={index}
        >
          <Dropdown
            title={`Do you have ${title}?`}
            options={["Yes", "No"]}
            width="w-1/6"
            name={`has${capitalize(field)}`}
            value={entry[`has${capitalize(field)}`]}
            onChange={(e) => handleChange(e, index, field)}
          />
          <TextInput
            title={numberLabel}
            width="w-1/6"
            name="number"
            value={entry.number}
            required={!(entry[`has${capitalize(field)}`] === "No")}
            onChange={(e) => handleChange(e, index, field)}
            readonly={entry[`has${capitalize(field)}`] !== "Yes"}
            maxLength={title == "State License" ? 15 : 10}
            is_number={title == "Medicaid"}
          />
          <Dropdown
            title="Issue State"
            options={stateAbbreviations}
            name="state"
            required={!(entry[`has${capitalize(field)}`] === "No")}
            value={entry.state}
            onChange={(e) => handleChange(e, index, field)}
            readonly={entry[`has${capitalize(field)}`] !== "Yes"}
          />
          <DateInput
            title="Effective Date"
            name="effectiveDate"
            value={entry.effectiveDate}
            width="w-1/8"
            required={!(entry[`has${capitalize(field)}`] === "No")}
            onChange={(e) => handleChange(e, index, field)}
            readonly={entry[`has${capitalize(field)}`] !== "Yes"}
          />
          <DateInput
            title="Expiry Date"
            name="expiryDate"
            width="w-1/8"
            required={!(entry[`has${capitalize(field)}`] === "No")}
            value={entry.expiryDate}
            onChange={(e) => handleChange(e, index, field)}
            readonly={entry[`has${capitalize(field)}`] !== "Yes"}
          />
          <div className="flex gap-2">
            {index === 0 && (
              <Button
                title="Add"
                onClick={(e) => {
                  e.preventDefault();
                  handleAddField(field);
                }}
                icon={<IoAddCircleOutline className="size-6" />}
                className="bg-secondary text-white"
                type="button"
              />
            )}
            {index > 0 && (
              <Button
                title="delete"
                icon={<CgTrash className="size-6" />}
                onClick={(e) => {
                  e.preventDefault();
                  handleRemoveField(field, index);
                }}
                type="button"
              />
            )}
          </div>
        </div>
      ))}
    </>
  );

  const renderInsuranceSection = (prefix, title) => (
    <>
      <div className="text-lg w-full">{title}</div>
      <div className="w-full flex flex-wrap justify-start gap-4 items-start">
        <TextInput
          title="Insurance Name"
          width="w-1/5"
          name={`${prefix}PolicyName`}
          value={formData[`${prefix}PolicyName`]}
          onChange={(e) => handleChange(e)}
        />
        <TextInput
          title="Policy #"
          name={`${prefix}PolicyNumber`}
          value={formData[`${prefix}PolicyNumber`]}
          onChange={(e) => handleChange(e)}
          maxLength={20}
        />
        <DateInput
          title="Effective Date"
          name={`${prefix}EffectiveDate`}
          value={formData[`${prefix}EffectiveDate`]}
          onChange={(e) => handleChange(e)}
        />
        <DateInput
          title="Expiry Date"
          name={`${prefix}ExpiryDate`}
          value={formData[`${prefix}ExpiryDate`]}
          onChange={(e) => handleChange(e)}
        />
        <Dropdown
          title="Aggregate"
          width="w-[23.9%]"
          options={[
            "1,000,000 - 2,000,000",
            "1,000,000 - 3,000,000",
            "2,000,000 - 4,000,000",
          ]}
          name={`${prefix}Aggregate`}
          value={formData[`${prefix}Aggregate`]}
          onChange={(e) => handleChange(e)}
        />
      </div>
    </>
  );

  const renderPortalCredentials = (prefix, title, link) => (
    <div
      className={`${
        prefix === "other" || prefix === "caqh" || prefix=="bankLogin"? "w-[99%]" : "w-[49%]"
      } flex flex-wrap justify-start gap-4 items-end`}
    >
      {prefix === "caqh" && (
        <TextInput
          title="CAQH User Id"
          width="w-[22%]"
          required={false}
          name={`${prefix}UserId`}
          value={formData[`${prefix}UserId`] || ""}
          onChange={(e) => handleChange(e)}
        />
      )}
      {prefix.toLowerCase() === "banklogin" && (
        <TextInput
          title="Bank Name"
          width="w-[22%]"
          required={false}
          name="bankName"
          value={formData.bankName || ""}
          onChange={(e) => handleChange(e)}
        />
      )}
      {prefix === "other" && (
        <TextInput
          title="Other Platform Name"
          width="w-[22%]"
          required={false}
          name="otherPlatformName"
          value={formData.otherPlatformName || ""}
          onChange={(e) => handleChange(e)}
        />
      )}
      <TextInput
        title={`${title} Username`}
        width={prefix === "caqh" || prefix === "other" || prefix==="bankLogin"? "w-[28%]" : "w-[40%]"}
        name={`${prefix}Username`}
        required={false}
        value={formData[`${prefix}Username`] || ""}
        onChange={(e) => handleChange(e)}
      />
      <PasswordInput
        title={`${title} Password`}
        width={prefix === "caqh" || prefix === "other" ? "w-[28%]" : "w-[40%]"}
        name={`${prefix}Password`}
        required={false}
        value={formData[`${prefix}Password`] || ""}
        onChange={(e) => handleChange(e)}
      />
      {prefix === "caqh" && (
        <DateInput
          title="CAQH ReAttestation Date"
          width="w-[10%]"
          required={false}
          name={`${prefix}ExpiryDate`}
          value={formData[`${prefix}ExpiryDate`] || ""}
          onChange={(e) => handleChange(e)}
        />
      )}
      {link && (
        <a
          href={link}
          className="bg-secondary text-white size-10 flex justify-center items-center rounded-lg"
        >
          <CiLink className="size-8" />
        </a>
      )}
      {prefix === "other" && (
        <span className="bg-secondary px-5 py-3 rounded-lg text-white flex flex-row justify-center items-center gap-4">
          <IoAddCircleOutline /> Add
        </span>
      )}
    </div>
  );

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      <HeadingLine title="Professional Information" />

      <div className="w-full flex flex-wrap justify-start gap-4 items-end">
        <Dropdown
          title="Do you have an individual NPI #"
          options={["Yes", "No"]}
          width="w-1/6"
          name="hasNPI"
          value={formData.hasNPI}
          onChange={(e) => handleChange(e)}
        />

        <TextInput
          title="NPI 1 (if applicable)"
          width="w-1/6"
          type="text"
          required={true}
          maxLength={10}
          name="npi1"
          is_number={true}
          readonly={formData.hasNPI != "Yes"}
          value={formData.npi1}
          onChange={(e) => handleChange(e)}
        />
        <TextInput
          title="NPI 2 (if applicable)"
          required={false}
          name="npi2"
          type="text"
          maxLength={10}
          is_number={true}
          readonly={formData.hasNPI != "Yes"}
          value={formData.npi2}
          onChange={(e) => handleChange(e)}
        />
        <TextInput
          title="Tax ID #"
          type="text"
          name="taxId"
          is_number={true}
          maxLength={9}
          required={true}
          value={formData.taxId}
          onChange={(e) => handleChange(e)}
        />
        <TextInput
          title="UPIN #"
          name="upin"
          is_number={false}
          maxLength={10}
          value={formData.upin}
          onChange={(e) => handleChange(e)}
        />
      </div>

      {renderMultiEntryField("medicare", "Medicare", "Ind. Medicare PTAN #")}
      {renderMultiEntryField("medicaid", "Medicaid", "Ind. Medicaid #")}
      {renderMultiEntryField(
        "stateLicense",
        "State License",
        "State License #"
      )}
      {renderMultiEntryField("clia", "CLIA", "Ind. CLIA #")}
      {renderMultiEntryField("dea", "DEA", "Ind. DEA #")}
      {renderMultiEntryField("cds", "CDS", "Ind. CDS #")}

      <HeadingLine title="Medical Malpractice Information" />
      {renderInsuranceSection(
        "professionalLiability",
        "Professional Liability Insurance"
      )}
      {renderInsuranceSection(
        "generalLiability",
        "General Liability Insurance"
      )}

      <HeadingLine title="Web Portal Info" />
      <div className="w-full flex flex-wrap">
        {renderPortalCredentials(
          "pecos",
          "Pecos",
          "https://pecos.cms.hhs.gov/pecos/login.do#headingLv1"
        )}
        {renderPortalCredentials(
          "uhc",
          "UHC",
          "https://www.uhcprovider.com/en/resource-library/provider-portal-resources.html"
        )}
        {renderPortalCredentials(
          "optum",
          "Optum",
          "https://www.uhcprovider.com/en/resource-library/provider-portal-resources.html"
        )}
        {renderPortalCredentials(
          "availity",
          "Availity",
          "https://apps.availity.com/web/onboarding/availity-fr-ui/#/login"
        )}
        {renderPortalCredentials("medicaid", "Medicaid")}
        {renderPortalCredentials("echo", "ECHO")}
        {renderPortalCredentials("payspan", "Payspan")}
        {renderPortalCredentials("billing", "Billing Software")}
        {renderPortalCredentials("edi", "EDI")}
        {renderPortalCredentials("fax", "FAX")}
        {renderPortalCredentials("molina", "Molina")}
        {renderPortalCredentials(
          "caqh",
          "CAQH",
          "https://proview.caqh.org/Login/Index?ReturnUrl=%2fpo"
        )}
        {renderPortalCredentials("bankLogin", "Bank Login")}
        {renderPortalCredentials("other", "Other")}
      </div>

      <NavBottom onSave={handleSubmit} loading={loading} />
    </div>
  );
};

export default ProfessionalIds;
