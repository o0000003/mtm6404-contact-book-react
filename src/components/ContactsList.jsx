import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import db from "../db";

function ContactsList() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      const snapshot = await getDocs(collection(db, "contacts"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setContacts(data.sort((a, b) => a.lastName.localeCompare(b.lastName)));
    };
    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter((contact) =>
    `${contact.firstName} ${contact.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="contacts-container">
      <h1 className="contacts-heading">Contact List</h1>
      <input
        type="text"
        className="search-input"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul className="contacts-list">
        {filteredContacts.map((contact) => (
          <li key={contact.id} className="contact-item">
            <Link to={`/contact/${contact.id}`} className="contact-link">
              {contact.firstName} {contact.lastName}
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/new" className="add-contact-btn">
        Add New Contact
      </Link>
    </div>
  );
}

export default ContactsList;
