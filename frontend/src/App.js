import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phonebook, setPhonebook] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8000/get-phone").then((res) => {
      setPhonebook(
        res.data.data.phoneNumbers.map((entry) => ({ ...entry, newPhone: "" }))
      );
    });
  }, [name,phone]);

  const addNewNumber = () => {
    Axios.post("http://localhost:8000/add-phone", { name, phone }).then(() => {
      setPhonebook([
        ...phonebook,
        { _id: Date.now(), name, phone, newPhone: "" },
      ]);
      setName("");
      setPhone("");
    });
  };

  const updatePhone = (id) => {
    const updatedEntry = phonebook.find((entry) => entry._id === id);
    if (!updatedEntry.newPhone) return;

    Axios.patch("http://localhost:8000/update-phone", {
      id,
      newPhone: updatedEntry.newPhone,
    })
      .then(() => {
        setPhonebook(
          phonebook.map((entry) =>
            entry._id === id
              ? { ...entry, phone: entry.newPhone, newPhone: "" }
              : entry
          )
        );
      })
      .catch((err) => console.error("Update Error", err));
  };

  const handleNewPhoneChange = (id, value) => {
    setPhonebook(
      phonebook.map((entry) =>
        entry._id === id ? { ...entry, newPhone: value } : entry
      )
    );
  };

  const deletePhone = (id) => {
    Axios.delete(`http://localhost:8000/delete-phone/${id}`).then(() => {
      setPhonebook(phonebook.filter((val) => val._id !== id));
    });
  };

  return (
    <div className="container">
      <h1 className="title">PhoneBook</h1>

      <div className="form">
        <label>Name:</label>
        <input
          type="text"
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          pattern="[A-Za-z]+"
        />
        <label>Phone:</label>
        <input
          type="number"
          className="input"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter number"
        />
        <button className="add-btn" onClick={addNewNumber}>
          Add New Number
        </button>
      </div>

      <hr />

      <div className="phone-list">
        {phonebook.map((val) => (
          <div key={val._id} className="phone-card">
            <h2 className="phone-name">{val.name}</h2>
            <h3 className="phone-number">{val.phone}</h3>

            <input
              type="number"
              className="input update-input"
              placeholder="Update Phone..."
              value={val.newPhone}
              onChange={(e) => handleNewPhoneChange(val._id, e.target.value)}
            />
            <button
              className="btn update-btn"
              onClick={() => updatePhone(val._id)}
            >
              Update
            </button>

            <button
              className="btn delete-btn"
              onClick={() => deletePhone(val._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
