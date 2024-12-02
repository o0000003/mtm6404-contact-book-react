import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import db from "../db";

function ContactDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      const snapshot = await getDoc(doc(db, "contacts", id));
      if (snapshot.exists()) {
        setContact(snapshot.data());
      }
    };
    fetchContact();
  }, [id]);

  const deleteContact = async () => {
    await deleteDoc(doc(db, "contacts", id));
    navigate("/");
  };

  return contact ? (
    <div className="contact-details-container">
      <h1 className="contact-name">
        {contact.firstName} {contact.lastName}
      </h1>
      <p className="contact-info">Email: {contact.email}</p>
      <div className="action-buttons">
        <Link to={`/edit/${id}`} className="edit-btn">
          Edit
        </Link>
        <button onClick={deleteContact} className="delete-btn">
          Delete
        </button>
        <Link to="/" className="back-btn">
          Back to List
        </Link>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
}

export default ContactDetails;
