import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function SubmitComplaint() {

  const user = useSelector(
    (state) => state.auth.user
  );

  const [locations, setLocations] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [formData, setFormData] = useState({
    lid: "",
    deptId: "",
    sinceWhen: "",
    addProblemArea: "",
    description: ""
  });

  const [message, setMessage] = useState("");

  useEffect(() => {

    fetch("http://localhost:8082/location/all")
      .then(res => res.json())
      .then(data => setLocations(data));

    fetch("http://localhost:8082/departments")
      .then(res => res.json())
      .then(data => setDepartments(data));

  }, []);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const response = await fetch(
      "http://localhost:8082/complaints/register",
      {
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          uid: user.uid,
          ...formData
        })
      }
    );

    const data = await response.text();

    setMessage(data);

    setFormData({
      lid:"",
      deptId:"",
      sinceWhen:"",
      addProblemArea:"",
      description:""
    });
  };

  return (

    <div>

      <h2 className="mb-4">
        Submit Complaint
      </h2>

      <form onSubmit={handleSubmit}>

        {/* Location */}

        <div className="mb-3">

          <label>
            Location
          </label>

          <select
            className="form-control"
            name="lid"
            value={formData.lid}
            onChange={handleChange}
            required
          >

            <option value="">
              Select Location
            </option>

            {locations.map(loc => (

              <option
                key={loc.lid}
                value={loc.lid}
              >
                {loc.name}
              </option>

            ))}

          </select>

        </div>

        {/* Department */}

        <div className="mb-3">

          <label>
            Department
          </label>

          <select
            className="form-control"
            name="deptId"
            value={formData.deptId}
            onChange={handleChange}
            required
          >

            <option value="">
              Select Department
            </option>

            {departments.map(dep => (

              <option
                key={dep.deptId}
                value={dep.deptId}
              >
                {dep.name}
              </option>

            ))}

          </select>

        </div>

        {/* Since When */}

        <div className="mb-3">

          <label>
            Since When
          </label>

          <input
            type="datetime-local"
            className="form-control"
            name="sinceWhen"
            value={formData.sinceWhen}
            onChange={handleChange}
            required
          />

        </div>

        {/* Problem Area */}

        <div className="mb-3">

          <label>
            Problem Area
          </label>

          <input
            type="text"
            className="form-control"
            name="addProblemArea"
            value={formData.addProblemArea}
            onChange={handleChange}
            required
          />

        </div>

        {/* Description */}

        <div className="mb-3">

          <label>
            Description
          </label>

          <textarea
            rows="5"
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />

        </div>

        <button
          className="btn btn-primary"
          type="submit"
        >
          Submit Complaint
        </button>

      </form>

      {message &&

        <div className="alert alert-success mt-3">
          {message}
        </div>

      }

    </div>

  );
}