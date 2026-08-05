import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function MyComplaints() {

  const [complaints, setComplaints] = useState([]);
  const [feedbackText, setFeedbackText] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [message, setMessage] = useState("");

  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = () => {
    fetch(`http://localhost:8082/complaints/user/${user.uid}`)
      .then(res => res.json())
      .then(data => setComplaints(data));
  };

  const submitFeedback = async () => {

    if (feedbackText.trim() === "") {
      alert("Please enter feedback");
      return;
    }

    const body = {
      uid: user.uid,
      cid: selectedComplaint.cid,
      textbox: feedbackText
    };

    try {

      const res = await fetch(
        "http://localhost:8082/complaints/feedback",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );

      const data = await res.text();

      setMessage(data);
      setSelectedComplaint(null);
      setFeedbackText("");

    } catch (err) {
      alert("Unable to submit feedback");
    }
  };

  return (

    <div className="container mt-4">

      <h2>My Complaints</h2>

      {
        message &&
        <div className="alert alert-success">
          {message}
        </div>
      }

      <table className="table table-bordered">

        <thead>
          <tr>
            <th>ID</th>
            <th>Problem Area</th>
            <th>Description</th>
            <th>Status</th>
            <th>Feedback</th>
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

                <td>

                  {
                    c.status === "Resolved" ?

                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => setSelectedComplaint(c)}
                      >
                        Give Feedback
                      </button>

                      :

                      <span className="text-muted">
                        Not Available
                      </span>

                  }

                </td>

              </tr>

            ))
          }

        </tbody>

      </table>

      {
        selectedComplaint &&

        <div className="card p-3 mt-4">

          <h5>

            Feedback for Complaint #{selectedComplaint.cid}

          </h5>

          <textarea

            className="form-control"

            rows="4"

            value={feedbackText}

            onChange={(e) => setFeedbackText(e.target.value)}

          />

          <button

            className="btn btn-primary mt-3"

            onClick={submitFeedback}

          >

            Submit Feedback

          </button>

        </div>

      }

    </div>

  );

}