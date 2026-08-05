import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8082/complaints/feedback/all"
      );
      setFeedbacks(res.data);
    } catch (err) {
      console.error("Error fetching feedback:", err);
      alert("Failed to load feedback.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">

      <div className="card shadow">

        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Citizen Feedback</h4>
        </div>

        <div className="card-body">

          {loading ? (
            <div className="text-center">
              Loading...
            </div>
          ) : (
            <div className="table-responsive">

              <table className="table table-bordered table-hover">

                <thead className="table-light">

                  <tr>
                    <th>Feedback ID</th>
                    <th>Complaint ID</th>
                    <th>Citizen ID</th>
                    <th>Feedback</th>
                    <th>Date</th>
                  </tr>

                </thead>

                <tbody>

                  {feedbacks.length === 0 ? (

                    <tr>
                      <td colSpan="5" className="text-center">
                        No Feedback Available
                      </td>
                    </tr>

                  ) : (

                    feedbacks.map((f) => (

                      <tr key={f.fid}>

                        <td>{f.fid}</td>

                        <td>{f.cid}</td>

                        <td>{f.uid}</td>

                        <td>{f.textbox}</td>

                        <td>{f.feedbackDate}</td>

                      </tr>

                    ))

                  )}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}