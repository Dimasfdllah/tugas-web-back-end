import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalMoney from "../component/ModalMoney";

const SavingsApp = () => {
  const [savings, setSavings] = useState([]);
  const [newSaving, setNewSaving] = useState({
    name: "",
    amount: 0,
    description: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMessage, setIsMessage] = useState("");

  useEffect(() => {
    document.title = "Saving";
    fetchSavings();
  }, []);

  const fetchSavings = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/savings");
      console.log(response.data);
      setSavings(response.data);
    } catch (error) {
      console.error("Error fetching savings:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(value);

    // console.log({
    //   ...newSaving,
    //   [name]: value,
    // });
    setNewSaving({
      ...newSaving,
      [name]: value,
    });
  };

  const addSaving = async (e) => {
    e.preventDefault();
    // console.log(newSaving.amount);
    if (!newSaving.name || newSaving.amount === 0 || !newSaving.description) {
      return setIsMessage("Isi dong formnya");
    } else {
      try {
        await axios.post("http://localhost:3001/api/savings", newSaving);
        // console.log({
        //   name: "",
        //   amount: 0,
        //   description: "",
        // });
        setNewSaving({
          name: "",
          amount: 0,
          description: "",
        });

        fetchSavings();
        alert("Tabungan berhasil ditambahkan, uangnya sudah masuk!");
        setIsMessage(null);
      } catch (error) {
        console.error("Error adding saving:", error);
      }
    }
  };

  const updateSaving = async (savingId) => {
    try {
      if (!newSaving.name) {
        console.error("Error updating saving: 'name' cannot be null");
        return;
      }

      await axios.put(
        `http://localhost:3001/api/savings/${savingId}`,
        newSaving
      );

      // Ambil daftar terbaru setelah pembaruan berhasil
      fetchSavings();
    } catch (error) {
      console.error("Error updating saving:", error);
    }
  };

  const deleteSaving = async (savingId) => {
    try {
      await axios.delete(`http://localhost:3001/api/savings/${savingId}`);
      alert('uang kamu sudah masuk rekening')
      fetchSavings();
    } catch (error) {
      console.error("Error deleting saving:", error);
    }
  };

  function modalButton(e) {
    e.preventDefault();
    setIsModalOpen(true);
  }

  return (
    <section className="container-saving">
      <div className="title-saving">
        <p>Save your money</p>
      </div>
      <div className="content-saving">
        <form onSubmit={addSaving}>
          <div className="list">
            <div className="saving name">
              <label htmlFor="name">Name</label>
              <br />
              <input
                type="text"
                name="name"
                value={newSaving.name}
                onChange={handleInputChange}
                placeholder="Your name"
              />
            </div>
            <div className="saving amount">
              <label htmlFor="amount">Amount</label>
              <br />
              <input
                type="number"
                name="amount"
                value={newSaving.amount}
                onChange={handleInputChange}
              />
            </div>
            <div className="saving description">
              <label htmlFor="description">Description</label>
              <br />
              <input
                type="text"
                name="description"
                value={newSaving.description}
                onChange={handleInputChange}
                placeholder="Desciption..."
              />
            </div>
          </div>
          {isMessage && <p className="error-message" style={{ color: "red" }}>{isMessage}</p>}
          <button className="save">Save Money</button>
        </form>
        <button className="modal-button" onClick={modalButton}>
          View Your History
        </button>
        {isModalOpen && (
          <ModalMoney
            isOpen={isModalOpen}
            isClose={() => setIsModalOpen(false)}
            readData={savings}
            onDelete={deleteSaving}
            onUpdate={updateSaving}
          />
        )}
      </div>
    </section>
  );
};

export default SavingsApp;
