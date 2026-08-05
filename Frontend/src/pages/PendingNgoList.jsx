import { useEffect, useState } from "react";
import axios from "axios";

function PendingNgoList() {

  const [ngos, setNgos] = useState([]);

  useEffect(() => {
    loadPendingNgos();
  }, []);

  const loadPendingNgos = () => {
    axios
      .get("http://localhost:8081/users/pending-ngos")
      .then((res) => {
        setNgos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const approveNgo = (ngoId) => {
    axios
      .put(`http://localhost:8081/users/approve-ngo/${ngoId}`)
      .then(() => {
        alert("NGO Approved Successfully");
        loadPendingNgos();
      })
      .catch((err) => {
        console.log(err);
      });
  };
const rejectNgo = (ngoId) => {
  axios
    .put(`http://localhost:8081/users/reject-ngo/${ngoId}`)
    .then(() => {
      alert("NGO Rejected Successfully");
      loadPendingNgos();
    })
    .catch((err) => {
      console.log(err);
    });
};
  return (
    <div className="container mt-4">

      <h2>Pending NGO Approvals</h2>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>NGO ID</th>
            <th>NGO Name</th>
            <th>Registration No</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {ngos.map((ngo) => (
            <tr key={ngo.ngoId}>
              <td>{ngo.ngoId}</td>
              <td>{ngo.ngoName}</td>
              <td>{ngo.regNo}</td>
              <td>{ngo.email}</td>
              <td>{ngo.phone}</td>

             <td>

  <button
    className="btn btn-success me-2"
    onClick={() => approveNgo(ngo.ngoId)}
  >
    Approve
  </button>

  <button
    className="btn btn-danger"
    onClick={() => rejectNgo(ngo.ngoId)}
  >
    Reject
  </button>

</td>

            </tr>
          ))}

        </tbody>
      </table>

    </div>
  );
}

export default PendingNgoList;