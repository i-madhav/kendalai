"use client";
import React, { useState } from "react"; 
import UpdateGetAddress from "../../listing/_components/UpdateGetAddress";
import UpdatePropertyForm from "../../listing/_components/UpdatePropertyForm";
const Editpage = ({params}:{params:{id:string}}) => {
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  return (
    <div>
      {showPropertyForm ? (
        <UpdatePropertyForm setShowPropertyForm={setShowPropertyForm} id={params.id}/>
      ) : (
        <UpdateGetAddress setShowPropertyForm={setShowPropertyForm} />
      )}
    </div>
  );
};

export default Editpage;