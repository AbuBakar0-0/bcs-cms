"use client";

import React, { createContext, useState, useEffect, useContext } from "react";

// Create the context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const defaultUserData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    is_verified: true,
    role: "",
    admin_dashboard: false,
    provider_dashboard: false,
    organization_management: false,
    document_center: false,
    credentialing_status: false,
    payers: false,
    user_management: false,
    hr_hiring: false,
    reporting: false,
    providers_information: false,
    professiona_ids: false,
    education_training: false,
    specialities: false,
    practice_profiles: false,
    practice_location: false,
    hospital_affiliations: false,
    payers_setup: false,
    credentialing_contacts: false,
    employment_information: false,
    professional_references: false,
    documents: false,
  };

  const [userData, setUserData] = useState(defaultUserData);

  // Load user data from localStorage on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserData = JSON.parse(localStorage.getItem("userData"));
      if (storedUserData) {
        setUserData(storedUserData);
      }
    }
  }, []);

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("userData", JSON.stringify(userData));
    }
  }, [userData]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to use the userData context
export const useUserData = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserProvider");
  }
  return context;
};
