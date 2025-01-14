import { useProviders } from "@/hooks/useProvider";
import { format, parse } from "date-fns";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  documentsList,
  initialFormData,
  statusOptions
} from "./utilis";

export function formatDate(date) {
  const parsedDate = parse(date, "yyyy-MM-dd", new Date());

  const formattedValue = format(parsedDate, "MM/dd/yyyy");
  return formattedValue;
}

export const useDocuments = () => {
  const [showForm, setShowForm] = useState(false);
  const [showOrganizationForm, setShowOrganizationForm] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id: provider_id } = useParams();

  const [organizationList, setOrganizationList] = useState([]);

  const [organizationListWithName, setOrganizationListWithName] = useState([]);

  const { getProviderByName } = useProviders();

  const validators = {
    title: (value) => {
      if (!value || value === "Select Document")
        return "Document Type is required";
      if (!documentsList.includes(value)) return "Invalid Document Type";
    },
    provider: (value) => {
      if (!value || value === "Select Provider") return "Provider is required";
    },
    status: (value) => {
      if (!value || value === "Select Status") return "Status is required";
      if (!statusOptions.includes(value)) return "Invalid Status";
    },
  };

  const validateForm = () => {
    const errors = [];

    for (const [field, validator] of Object.entries(validators)) {
      const error = validator(formData[field]);
      if (error) errors.push(error);
    }
    console.log(errors);
    return errors;
  };

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/documents?uuid=${localStorage.getItem("user_uuid")}`
      );
      if (!response.ok) throw new Error("Failed to fetch documents");
      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      console.error("Error fetching documents:", error);
      toast.error("Failed to fetch documents");
    } finally {
      setLoading(false);
    }
  };

  const getOrganizations = async () => {
    try {
      const response = await fetch(
        `/api/get-business?uuid=${localStorage.getItem("user_uuid")}`
      );
      if (!response.ok) throw new Error("Failed to fetch documents");
      const data = await response.json();
      const orgList = [];
      data.map((item) => orgList.push(item.legal_business_name));
      setOrganizationList(orgList);

      const orgListwithName = [];
      data.map((item) =>
        orgListwithName.push({
          uuid: item.uuid,
          name: item.legal_business_name,
        })
      );

      setOrganizationListWithName(orgListwithName);
    } catch (error) {
      console.error("Error fetching documents:", error);
      toast.error("Failed to fetch documents");
    } finally {
    }
  };

  useEffect(() => {
    getOrganizations();
    fetchDocuments();
  }, []);

  const resetForm = () => {
    setFormData(initialFormData);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      ["Select Provider", "Select Document", "Select Status"].includes(value)
    ) {
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getUuidByName = (jsonList, targetName) => {
    const foundItem = jsonList.find((item) => item.name === targetName);
    return foundItem ? foundItem.uuid : null; // Return the uuid if found, else null
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    toast.loading("Please Wait");
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== "") {
          if (key === "provider" && value != undefined) {
            const provider = getProviderByName(value);
            formDataToSend.append("provider_id", provider.uuid);
          } else if (key === "organization" && value != undefined) {
            const organizationUuid = getUuidByName(
              organizationListWithName,
              value
            );
            formDataToSend.append("organization_id", organizationUuid);
          } else {
            formDataToSend.append(key, value);
          }
        }
      });

      const response = await fetch("/api/documents", {
        method: isEditing ? "PUT" : "POST",
        body: formDataToSend,
      });

      if (!response.ok) throw new Error("Failed to save document");
      toast.dismiss();
      await fetchDocuments();
      setShowForm(false);
      resetForm();
      toast.success(
        `Document ${isEditing ? "updated" : "created"} successfully`
      );
      window.location.reload(true);
    } catch (error) {
      console.error("Error saving document:", error);
      toast.error("Failed to save document");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (doc) => {
    setFormData({
      title: doc.title || "",
      provider:
        doc.providers_info.first_name + " " + doc.providers_info.last_name ||
        "",
      status: doc.status || "",
      effective_date: doc.effective_date || "",
      expiry_date: doc.expiry_date || "",
      file: doc.url || "",
      existing_url: doc.url || "",
      existing_file_public_id: doc.file_public_id || "",
      uuid: doc.uuid || "",
    });
    setIsEditing(true);
    setShowForm(true);
  };

  const handleEditOrganization = (doc) => {
    setFormData({
      title: doc.title || "",
      organization: doc.practice_profiles.legal_business_name,
      status: doc.status || "",
      effective_date: doc.effective_date || "",
      expiry_date: doc.expiry_date || "",
      file: doc.url || "",
      existing_url: doc.url || "",
      existing_file_public_id: doc.file_public_id || "",
      uuid: doc.uuid || "",
    });
    setIsEditing(true);
    setShowOrganizationForm(true);
  };

  const handleDelete = async (doc) => {
    setLoading(true);
    toast.loading("Deleting");
    try {
      const response = await fetch("/api/documents", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uuid: doc.uuid,
          file_public_id: doc.file_public_id,
          reason_to_delete: doc.reason,
        }),
      });

      if (!response.ok) throw new Error("Failed to delete document");
      toast.dismiss();
      await fetchDocuments();
      toast.success("Document deleted successfully");
    } catch (error) {
      console.error("Error deleting document:", error);
      toast.error("Failed to delete document");
    } finally {
      setLoading(false);
    }
  };

  const handleView = (doc) => {
    if (!doc.url) {
      toast.error("No document file available");
      return;
    }

    if (doc.url.endsWith(".pdf")) {
      const urlParts = doc.url.split("/");
      const docId = urlParts[urlParts.length - 1].replace(".pdf", "");
      const folder = urlParts[urlParts.length - 2];
      const viewUrl = `https://res.cloudinary.com/db7z9hknv/image/upload/f_auto,q_auto/v1/${folder}/${docId}`;
      window.open(viewUrl, "_blank");
    } else {
      window.open(doc.url, "_blank");
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setShowOrganizationForm(false);
    if (!showForm) {
      resetForm();
    }
  };

  const toggleOrganizationForm = () => {
    setShowForm(false);
    setShowOrganizationForm(!showOrganizationForm);
  };

  return {
    showForm,
    showOrganizationForm,
    documents,
    formData,
    isEditing,
    loading,
    organizationList,

    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleView,
    toggleForm,
    toggleOrganizationForm,
    handleEditOrganization,
    resetForm,
  };
};
