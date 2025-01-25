"use client";
import React, { useState } from "react";
import GetAddress from "../_components/GetAddress";
import PropertyForm from "../_components/PropertyForm";

const page = () => {
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  return (
    <div>
      {showPropertyForm ? (
        <PropertyForm setShowPropertyForm={setShowPropertyForm}/>
      ) : (
        <GetAddress setShowPropertyForm={setShowPropertyForm} />
      )}
    </div>
  );
};

export default page;