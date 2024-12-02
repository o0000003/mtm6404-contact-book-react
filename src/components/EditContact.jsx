import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import db from "../db";

function EditContact() {
  const { id } = useParams(); // Extract the contact ID from the URL
  const navigate = useNavigate();
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the contact details from Firestore
    const fetchContact = async () => {
      const contactDoc = await getDoc(doc(db, "contacts", id));
      if (contactDoc.exists()) {
        setContact(contactDoc.data());
      } else {
        console.error("Contact not found");
      }
      setLoading(false);
    };
    fetchContact();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "contacts", id), contact);
      navigate(`/contact/${id}`); // Redirect to the contact's details view
    } catch (error) {
      console.error("Error updating contact: ", error);
    }
  };

  return (
    <div>
      <h1>Edit Contact</h1>
      {loading ? (
        <p>Loading contact...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              First Name:
              <input
                type="text"
                name="firstName"
                value={contact.firstName}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Last Name:
              <input
                type="text"
                name="lastName"
                value={contact.lastName}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={contact.email}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <button type="submit">Update Contact</button>
          <button type="button" onClick={() => navigate(`/contact/${id}`)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

export default EditContact;
