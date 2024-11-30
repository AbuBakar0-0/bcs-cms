import { useEffect, useState } from "react";
import { DEFAULT_EDUCATION, DEFAULT_TRAINING, degrees } from "./utilis";
import { format, parse } from "date-fns";
import { useParams } from "next/navigation";
import submitForm from "@/hooks/postData";

export function formatDate(date) {
  const parsedDate = parse(date, "yyyy-MM-dd", new Date());

  const formattedValue = format(parsedDate, "MM/dd/yyyy");
  return formattedValue;
}

export const useEducationAndTraining = () => {
  const [education, showEducation] = useState(false);
  const [training, showTraining] = useState(false);

  const [educationEntries, setEducationEntries] = useState([]);
  const [trainingEntries, setTrainingEntries] = useState([]);

  const [newEducationEntry, setNewEducationEntry] = useState(DEFAULT_EDUCATION);
  const [newTrainingEntry, setNewTrainingEntry] = useState(DEFAULT_TRAINING);

  const [editEducationId, setEditEducationId] = useState(null);
  const [editTrainingId, setEditTrainingId] = useState(null);
  const { id: provider_id } = useParams();

  const fetchEducationEntries = async () => {
    try {
      const url = `/api/education?provider_id=${provider_id}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch education data");
      }

      const data = await response.json();

      setEducationEntries(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchTrainingEntries = async () => {
    try {
      const response = await fetch(
        `/api/training?provider_id=${provider_id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch training data");
      }

      const data = await response.json();
      setTrainingEntries(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchEducationEntries();
    fetchTrainingEntries();
  }, []);

  const handleEducation = () => {
    showEducation((prev) => !prev);
    if (editEducationId !== null) {
      const entryToEdit = educationEntries.find(
        (entry) => entry.uuid === editEducationId
      );
      setNewEducationEntry(entryToEdit);
    }
  };

  const handleTraining = () => {
    showTraining((prev) => !prev);
    if (editTrainingId !== null) {
      const entryToEdit = trainingEntries.find(
        (entry) => entry.uuid === editTrainingId
      );
      setNewTrainingEntry(entryToEdit);
    }
  };
  const handleEducationChange = (e) => {
    const { name, value } = e.target;
    setNewEducationEntry((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTrainingChange = (e) => {
    const { name, value } = e.target;
    setNewTrainingEntry((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addEducationEntry = async () => {
    newEducationEntry.provider_id = provider_id;
    const response = await fetch("/api/education", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEducationEntry),
    });

    fetchEducationEntries();
    // try {
    //   let response;
    //   if (editEducationId) {
    //     response = await fetch("/api/education", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ ...newEducationEntry, id: editEducationId }),
    //     });
    //   } else {
    //     response = await fetch("/api/education", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ ...newEducationEntry, provider_id }),
    //     });
    //   }

    //   if (!response.ok) {
    //     throw new Error("Failed to save education entry");
    //   }

    //   const savedEntry = await response.json();

    //   if (editEducationId) {
    //     setEducationEntries((prev) =>
    //       prev.map((entry) =>
    //         entry.uuid === editEducationId ? { ...savedEntry } : entry
    //       )
    //     );
    //   } else {
    //     setEducationEntries((prev) => [
    //       ...prev,
    //       { ...savedEntry, uuid: savedEntry.uuid || Date.now() },
    //     ]);
    //   }

    //   setNewEducationEntry(DEFAULT_EDUCATION);
    //   setEditEducationId(null);
    //   showEducation(false);
    // } catch (error) {
    //   console.error("Error:", error);
    //   alert("Failed to save education entry. Please try again.");
    // }
  };

  const addTrainingEntry = async () => {
    newTrainingEntry.provider_id = provider_id;
    const response = await fetch("/api/training", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTrainingEntry),
    });
    fetchTrainingEntries();
    // try {
    //   let response;
    //   if (editTrainingId) {
    //     response = await fetch("/api/professional-training", {
    //       method: "PUT",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         ...newTrainingEntry,
    //         id: editTrainingId,
    //         provider_id,
    //       }),
    //     });
    //   } else {
    //     response = await fetch("/api/professional-training", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(newTrainingEntry),
    //     });
    //   }

    //   if (!response.ok) {
    //     throw new Error("Failed to save training entry");
    //   }

    //   const savedEntry = await response.json();

    //   if (editTrainingId) {
    //     setTrainingEntries((prev) =>
    //       prev.map((entry) =>
    //         entry.uuid === editTrainingId ? { ...savedEntry } : entry
    //       )
    //     );
    //   } else {
    //     setTrainingEntries((prev) => [
    //       ...prev,
    //       { ...savedEntry, uuid: savedEntry.uuid || Date.now() },
    //     ]);
    //   }

    //   setNewTrainingEntry(DEFAULT_TRAINING);
    //   setEditTrainingId(null);
    //   showTraining(false);
    // } catch (error) {
    //   console.error("Error:", error);
    //   alert("Failed to save training entry. Please try again.");
    // }
  };

  // Delete entry
  const deleteEducationEntry = async (uuid) => {
    try {
      const response = await fetch("/api/education", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: uuid }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete education entry");
      }

      setEducationEntries((prev) =>
        prev.filter((entry) => entry.uuid !== uuid)
      );
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to delete education entry. Please try again.");
    }
  };

  const deleteTrainingEntry = async (uuid) => {
    try {
      const response = await fetch("/api/professional-training", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: uuid }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete training entry");
      }

      setTrainingEntries((prev) => prev.filter((entry) => entry.uuid !== uuid));
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to delete training entry. Please try again.");
    }
  };

  const editEducationEntry = (uuid) => {
    setEditEducationId(uuid);
    alert(uuid);
    const entryToEdit = educationEntries.find((entry) => entry.uuid === uuid);
    setNewEducationEntry({
      ...entryToEdit,
      start_date: formatDate(entryToEdit.start_date),
      end_date: formatDate(entryToEdit.end_date),
    });
    showEducation(true);
  };

  const editTrainingEntry = (uuid) => {
    setEditTrainingId(uuid);
    const entryToEdit = trainingEntries.find((entry) => entry.uuid === uuid);
    console.log(entryToEdit);
    setNewTrainingEntry({
      ...entryToEdit,
      address_id: entryToEdit.address_id,
      country: entryToEdit.country || "",
      state: entryToEdit.state || "",
      county: entryToEdit.county || "",
      start_date: formatDate(entryToEdit.start_date),
      end_date: formatDate(entryToEdit.end_date),
      hospital_name: entryToEdit.hospital_name || "",
      affiliated_university: entryToEdit.affiliated_university || "",
      email: entryToEdit.email || "",
      training_type: entryToEdit.training_type || "",
      type_of_program: entryToEdit.type_of_program || "",
      department: entryToEdit.department || "",
      speciality: entryToEdit.speciality || "",
      is_completed: entryToEdit.is_completed || "",
    });
    showTraining(true);
  };
  return {
    // States
    education,
    training,
    educationEntries,
    trainingEntries,
    newEducationEntry,
    newTrainingEntry,
    editEducationId, // Add this
    editTrainingId,

    // Methods
    handleEducation,
    handleTraining,
    handleEducationChange,
    handleTrainingChange,
    addEducationEntry,
    addTrainingEntry,
    deleteEducationEntry,
    deleteTrainingEntry,
    editEducationEntry,
    editTrainingEntry,
  };
};
