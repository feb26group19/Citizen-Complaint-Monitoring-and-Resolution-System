import { useEffect,useState } from "react";
import { useSelector } from "react-redux";

export default function MyComplaints() {

  const [complaints,setComplaints] =
    useState([]);

  const user =
    useSelector(state => state.auth.user);

  useEffect(() => {

    fetch(
      `http://localhost:8082/complaints/user/${user.uid}`
    )
    .then(res => res.json())
    .then(data => setComplaints(data));

  }, []);

  return (

    <div className="container mt-4">

      <h2>My Complaints</h2>

      <table className="table table-bordered">

        <thead>
          <tr>
            <th>ID</th>
            <th>Problem Area</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {
            complaints.map(c => (

              <tr key={c.cid}>
                <td>{c.cid}</td>
                <td>{c.addProblemArea}</td>
                <td>{c.description}</td>
                <td>{c.status}</td>
              </tr>

            ))
          }

        </tbody>

      </table>

    </div>
  );
}