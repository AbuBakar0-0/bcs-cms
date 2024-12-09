import { validateAlphanumeric, validateNumber } from "@/utils/utility";
import axios from "axios";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const DEFAULT_STATE = {
  legal_business_name: "",
  doing_business_name: "",
  npi_2: "",
  tax_id: "",
  taxonomy_code_1: "",
  taxonomy_code_2: "",
  service_address_1: "",
  service_address_2: "",
  service_city: "",
  service_state: "",
  service_zip: "",
  service_phone: "",
  service_fax: "",
  service_email: "",
  service_appointment_phone: "",
  mailing_address_1: "",
  mailing_address_2: "",
  mailing_city: "",
  mailing_state: "",
  mailing_zip: "",
  mailing_phone: "",
  mailing_fax: "",
  mailing_email: "",
  correspondence_address_1: "",
  correspondence_address_2: "",
  correspondence_city: "",
  correspondence_state: "",
  correspondence_zip: "",
  correspondence_phone: "",
  correspondence_fax: "",
  correspondence_email: "",
  practice_contact_name: "",
  practice_contact_email: "",
  practice_contact_work_phone: "",
  practice_contact_cell_phone: "",
  practice_contact_type: "",
  ptan_medicare_number: "",
  medicaid_number: "",
  practice_id: "",
};

export const usePracticeLocations = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLocationForm, setShowLocationForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(DEFAULT_STATE);

  const [profiles, setProfiles] = useState([]);
  const [fullProfile, setFullProfile] = useState([]);

  const [dropLocations, setDropLocations] = useState([]);
  const [dropFullLocations, setDropFullLocations] = useState([]);

  const [providers, setProviders] = useState([]);
  const [fullProviders, setFullProviders] = useState([]);

  const [handleLink, setHandleLink] = useState(false);

  const[links,setLinks]=useState([]);


  const handleSetLink = () => {
    setHandleLink(!handleLink);
  };

  const linkDefaultState = {
    business_id: "",
    provider_id: "",
  };

  const [finalFormData, setFinalFormData] = useState({
    business_id: "",
    provider_id: "",
  });

  const [linkFormData, setLinkFormData] = useState(linkDefaultState);

  const { id: provider_id } = useParams();
  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      setLoading(true); // Ensure loading starts when fetching begins.

      // Fetch practice locations
      const response = await fetch(
        `/api/practice-location?uuid=${provider_id}`
      );
      if (!response.ok) throw new Error("Failed to fetch");
      const { data } = await response.json();
      setLocations(data || []);

      const formattedLocations = data.map((item) => item.doing_business_name);
      setDropLocations(formattedLocations || []);

      const formattedDropFullLocations = data.map((item) => ({
        name: item.doing_business_name,
        uuid: item.uuid,
      }));
      setDropFullLocations(formattedDropFullLocations);

      // Fetch practice profiles
      const userUuid = localStorage.getItem("user_uuid");
      const { data: profileData } = await axios.get(
        `/api/get-practice-profiles`,
        { params: { uuid: userUuid } }
      );
      const formattedProfiles = profileData.map(
        (item) => item.legal_business_name
      );
      setProfiles(formattedProfiles);

      const formattedFullProfiles = profileData.map((item) => ({
        name: item.legal_business_name,
        uuid: item.uuid,
      }));
      setFullProfile(formattedFullProfiles);

      const { data: providerData } = await axios.get(
        `/api/providersDashboard`,
        { params: { uuid: userUuid } }
      );

      const formattedProviders = providerData.providers.map(
        (item) =>
          item.first_name + " " + item.middle_initial + " " + item.last_name
      );
      setProviders(formattedProviders || []);

      const formattedFullProviders = providerData.providers.map((item) => ({
        name:
          item.first_name + " " + item.middle_initial + " " + item.last_name,
        uuid: item.uuid,
      }));

      setFullProviders(formattedFullProviders);


      const res=await axios.get(`/api/get-links?uuid=${localStorage.getItem("user_uuid")}`);
      setLinks(res.data);
      console.log(res.data);

    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false); // Stop loading after the operation
    }
  };

  const validateForm = () => {
    if (!formData.legal_business_name?.trim()) {
      toast.error("Legal Business Name is required");
      return false;
    }

    if (!formData.service_address_1?.trim()) {
      toast.error("Service Address is required");
      return false;
    }

    if (!formData.service_city?.trim()) {
      toast.error("Service City is required");
      return false;
    }

    if (!formData.service_state) {
      toast.error("Service State is required");
      return false;
    }

    if (!formData.service_zip) {
      toast.error("Service Zip Code is required");
      return false;
    }

    if (!formData.service_phone) {
      toast.error("Service Phone is required");
      return false;
    }

    if (!formData.mailing_address_1?.trim()) {
      toast.error("Mailing Address is required");
      return false;
    }

    if (!formData.mailing_city?.trim()) {
      toast.error("Mailing City is required");
      return false;
    }

    if (!formData.mailing_state) {
      toast.error("Mailing State is required");
      return false;
    }

    if (!formData.mailing_zip) {
      toast.error("Mailing Zip Code is required");
      return false;
    }

    if (!formData.correspondence_address_1?.trim()) {
      toast.error("Correspondence Address is required");
      return false;
    }

    if (!formData.correspondence_city?.trim()) {
      toast.error("Correspondence City is required");
      return false;
    }

    if (!formData.correspondence_state) {
      toast.error("Correspondence State is required");
      return false;
    }

    if (!formData.correspondence_zip) {
      toast.error("Correspondence Zip Code is required");
      return false;
    }

    if (
      !formData.practice_contact_type ||
      formData.practice_contact_type === "Select Person"
    ) {
      toast.error("Practice Contact Person is required");
      return false;
    }

    if (!formData.practice_contact_name?.trim()) {
      toast.error("Practice Contact Name is required");
      return false;
    }

    if (formData.npi_2 && !validateNumber(formData.npi_2, 10, "NPI")) {
      return false;
    }

    if (formData.tax_id && !validateNumber(formData.tax_id, 9, "Tax ID")) {
      return false;
    }

    if (formData.ptan_medicare_number) {
      if (
        !validateAlphanumeric(
          formData.ptan_medicare_number,
          10,
          "PTAN/Medicare number"
        )
      ) {
        return false;
      }
    }

    if (formData.medicaid_number) {
      if (
        !validateAlphanumeric(formData.medicaid_number, 10, "Medicaid number")
      ) {
        return false;
      }
    }

    const phoneFields = [
      { value: formData.service_phone, name: "Service Phone" },
      { value: formData.service_appointment_phone, name: "Appointment Phone" },
      { value: formData.practice_contact_work_phone, name: "Work Phone" },
      { value: formData.practice_contact_cell_phone, name: "Cell Phone" },
    ];

    for (const field of phoneFields) {
      if (field.value && !validateNumber(field.value, 10, field.name)) {
        return false;
      }
    }

    const zipFields = [
      { value: formData.service_zip, name: "Service Zip" },
      { value: formData.mailing_zip, name: "Mailing Zip" },
      { value: formData.correspondence_zip, name: "Correspondence Zip" },
    ];

    for (const field of zipFields) {
      if (field.value && !validateNumber(field.value, [5, 9], field.name)) {
        return false;
      }
    }

    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (["Select Code", "Select State", "Select Person"].includes(value))
      return;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getUuidByName = (name, data) => {
    const profile = data.find((item) => item.name === name);
    return profile ? profile.uuid : null; // Return UUID or null if not found
  };

  const handleLegalBusinessName = (e) => {
    const { value } = e.target; // Extract the value from the event
    const uuid = getUuidByName(value, fullProfile); // Get the UUID corresponding to the name

    setFormData((prev) => ({
      ...prev,
      legal_business_name: value, // Update the selected legal business name
      practice_id: uuid, // Set the practice_id based on the UUID
    }));
  };

  const resetForm = () => {
    setFormData(DEFAULT_STATE);
    setEditingId(null);
  };

  const handleLocation = () => {
    resetForm();
    setShowLocationForm(!showLocationForm);
  };

  const handleEdit = (locationId) => {
    const locationToEdit = locations.find((loc) => loc.uuid === locationId);
    if (locationToEdit) {
      setEditingId(locationId);
      setFormData({
        ...DEFAULT_STATE,
        ...locationToEdit,
      });
      setShowLocationForm(true);
    }
  };

  const handleDelete = async (locationId) => {
    if (window.confirm("Are you sure you want to delete this location?")) {
      const loadingToast = toast.loading("Deleting location...");

      try {
        const response = await fetch(`/api/practice-location/${locationId}`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Failed to delete");

        setLocations((prev) => prev.filter((loc) => loc.uuid !== locationId));
        toast.success("Location deleted successfully");
      } catch (error) {
        console.error("Error deleting location:", error);
        toast.error("Failed to delete location");
      } finally {
        toast.dismiss(loadingToast);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      return;
    }
    const loadingToast = toast.loading("Saving location...");

    try {
      const url = editingId
        ? `/api/practice-location/${editingId}`
        : "/api/practice-location";

      const response = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, provider_id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || "Failed to save location");
      }
      toast.success(`Location ${editingId ? "updated" : "added"} successfully`);

      await fetchLocations();
      resetForm();
      setShowLocationForm(false);
    } catch (error) {
      console.error("Error saving location:", error);
      toast.error(error.message || "Failed to save location");
    } finally {
      setLoading(false);
      toast.dismiss(loadingToast);
    }
  };

  const copyServiceToMailing = () => {
    setFormData((prev) => ({
      ...prev,
      mailing_address_1: prev.service_address_1,
      mailing_address_2: prev.service_address_2,
      mailing_city: prev.service_city,
      mailing_state: prev.service_state,
      mailing_zip: prev.service_zip,
      mailing_phone: prev.service_phone,
      mailing_fax: prev.service_fax,
      mailing_email: prev.service_email,
    }));
  };

  const copyMailingToCorrespondence = () => {
    setFormData((prev) => ({
      ...prev,
      correspondence_address_1: prev.mailing_address_1,
      correspondence_address_2: prev.mailing_address_2,
      correspondence_city: prev.mailing_city,
      correspondence_state: prev.mailing_state,
      correspondence_zip: prev.mailing_zip,
      correspondence_phone: prev.mailing_phone,
      correspondence_fax: prev.mailing_fax,
      correspondence_email: prev.mailing_email,
    }));
  };

  const handleDropFullLocation = (e) => {
    const { name, value } = e.target; // Extract name and value from the event

    const profile = dropFullLocations.find((item) => item.name == value);
    finalFormData.business_id = profile.uuid;
    setFinalFormData((prev) => ({
      ...prev,
      business_id: profile ? profile.uuid : "", // Update provider_id with the found UUID or reset if not found
    }));
    setLinkFormData((prev) => ({
      ...prev,
      [name]: value, // Dynamically update the state based on the input name
    }));
  };

  const handleFullProviders = (e) => {
    const { name, value } = e.target; // Extract name and value from the event

    const profile = fullProviders.find((item) => item.name == value);
    setFinalFormData((prev) => ({
      ...prev,
      provider_id: profile ? profile.uuid : "", // Update provider_id with the found UUID or reset if not found
    }));
    setLinkFormData((prev) => ({
      ...prev,
      [name]: value, // Dynamically update the state based on the input name
    }));
  };

  const handleSubmitLink = async () => {
    try {
      toast.loading("Submitting");
      const response = await axios.post("/api/handle-link", finalFormData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.dismiss();
      toast.success("Linked Successfully")
      return response.data; // Return the response data if needed
    } catch (error) {
      toast.error("Error saving") 
      console.error("Error submitting link data:", error);
      throw error; // Re-throw the error to handle it in the calling function
    }
  };

  return {
    locations,
    loading,
    showLocationForm,
    dropLocations,
    formData,
    profiles,
    providers,
    editingId,
    profiles,
    linkFormData,
    handleLink,
    links,

    handleDropFullLocation,
    handleFullProviders,
    handleSetLink,
    handleInputChange,
    handleLocation,
    handleEdit,
    handleDelete,
    handleLegalBusinessName,
    handleSubmit,
    handleSubmitLink,
    copyServiceToMailing,
    copyMailingToCorrespondence,
  };
};
