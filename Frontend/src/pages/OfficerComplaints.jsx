import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function OfficerComplaints() {

  const [complaints, setComplaints] = useState([]);

  const user = useSelector(
    state => state.auth.user
  );

  useEffect(() => {

    console.log("Logged User:", user);

    if (!user || !user.deptId) {
      return;
    }

    fetch(
      `http://localhost:8082/complaints/department/${user.deptId}`
    )
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to fetch complaints");
        }
        return res.json();
      })
      .then(data => {
        console.log("Complaints:", data);
        setComplaints(data);
      })
      .catch(err => {
        console.error("Error fetching complaints:", err);
      });

  }, [user]);

  const updateStatus = async (cid, status) => {

    try {

      const response = await fetch(
        "http://localhost:8082/complaints/status",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            cid,
            status
          })
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      setComplaints(
        complaints.map(c =>
          c.cid === cid
            ? { ...c, status }
            : c
        )
      );

    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (!user) {
    return <h4>Loading User Information...</h4>;
  }

  return (
    <div className="container mt-4">

      <h2 className="mb-4">
        Department Complaints
      </h2>

      <table className="table table-bordered table-striped">

        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Problem Area</th>
            <th>Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {complaints.length > 0 ? (
            complaints.map(c => (

              <tr key={c.cid}>

                <td>{c.cid}</td>

                <td>{c.uid}</td>

                <td>{c.addProblemArea}</td>

                <td>{c.description}</td>

                <td>
                  <span
                    className={
                      c.status === "Resolved"
                        ? "badge bg-success"
                        : c.status === "In Progress"
                        ? "badge bg-warning text-dark"
                        : "badge bg-danger"
                    }
                  >
                    {c.status}
                  </span>
                </td>

                <td>

                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() =>
                      updateStatus(
                        c.cid,
                        "In Progress"
                      )
                    }
                  >
                    In Progress
                  </button>

                  <button
                    className="btn btn-success btn-sm"
                    onClick={() =>
                      updateStatus(
                        c.cid,
                        "Resolved"
                      )
                    }
                  >
                    Resolve
                  </button>

                </td>

              </tr>

            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No complaints found
              </td>
            </tr>
          )}

        </tbody>

      </table>

    </div>
  );
}