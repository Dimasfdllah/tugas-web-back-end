import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const ModalMoney = ({ isOpen, isClose, readData, onDelete, onUpdate }) => {
  const [savings, setSavings] = useState([]);

  const handleData = (data) => {
    setSavings(data);
    console.log(data);
  };

  return (
    <div className={`modal-container ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <h2>History</h2>
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Name</th>
              <th>Amount</th>
              <th>Description</th>
            </tr>
          </thead>
          {readData.map((item) => (
            <tbody key={item.id}>
              <tr>
                <td>{`${new Date(item.createdAt).getDate()}-${
                  new Date(item.createdAt).getMonth() + 1
                }-${new Date(item.createdAt).getFullYear()}/${new Date(
                  item.createdAt
                ).getHours()}:${new Date(item.createdAt).getMinutes()}`}</td>
                <td>{item.name}</td>
                <td>{item.amount}</td>
                <td>{item.description}</td>
                <td>
                  <div className="button-modal">
                    <div className="delete">
                      <button onClick={() => onDelete(item.id)}>Take</button>
                    </div>
                    <div className="update">
                      <button onClick={() => onUpdate(item.id)}>Update</button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
        <div className="close" onClick={isClose}>
          <FaTimes className="closeIcon" />
        </div>
      </div>
    </div>
  );
};

export default ModalMoney;
