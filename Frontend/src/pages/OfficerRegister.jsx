import React, { useState } from "react";

export default function OfficerRegister() {
  const [formData, setFormData] = useState({
    uname: "",
    password: "",
    fullname: "",
    address: "",
    phone: "",
    email: "",
    deptId: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const clearForm = () => {
    setFormData({
      uname: "",
      password: "",
      fullname: "",
      address: "",
      phone: "",
      email: "",
      deptId: "",
    });

    setConfirmPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    if (
      !formData.uname ||
      !formData.password ||
      !formData.fullname ||
      !formData.address ||
      !formData.phone ||
      !formData.email ||
      !formData.deptId
    ) {
      setIsSuccess(false);
      setMessage("Please fill all fields.");
      return;
    }

    if (formData.password !== confirmPassword) {
      setIsSuccess(false);
      setMessage("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:8081/users/registerOfficer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            deptId: Number(formData.deptId),
          }),
        }
      );

      const result = await response.text();

      if (response.ok) {
        setIsSuccess(true);
        setMessage("Officer Registered Successfully.");
        clearForm();
      } else {
        setIsSuccess(false);
        setMessage(result);
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage("Unable to connect to Spring Boot Server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="card shadow-lg">

        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">
            Register Department Officer
          </h3>
        </div>

        <div className="card-body">

          {message && (
            <div
              className={`alert ${
                isSuccess
                  ? "alert-success"
                  : "alert-danger"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="row">

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Username
                </label>

                <input
                  type="text"
                  name="uname"
                  className="form-control"
                  value={formData.uname}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Full Name
                </label>

                <input
                  type="text"
                  name="fullname"
                  className="form-control"
                  value={formData.fullname}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="mb-3">
              <label className="form-label">
                Address
              </label>

              <textarea
                rows="3"
                name="address"
                className="form-control"
                value={formData.address}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="row">

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Phone
                </label>

                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength={10}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="mb-3">
              <label className="form-label">
                Department
              </label>

              <select
                name="deptId"
                className="form-select"
                value={formData.deptId}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select Department
                </option>

                <option value="1">
                  Water Supply Department
                </option>

                <option value="2">
                  Road & Transport Department
                </option>

                <option value="3">
                  Sanitation Department
                </option>

                <option value="4">
                  Electricity Department
                </option>

              </select>
            </div>

            <div className="mb-3">

              <label className="form-label">
                Password
              </label>

              <div className="input-group">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

            </div>

            <div className="mb-4">

              <label className="form-label">
                Confirm Password
              </label>

              <div className="input-group">

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  required
                />

                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                >
                  {showConfirmPassword
                    ? "Hide"
                    : "Show"}
                </button>

              </div>

            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading
                ? "Registering..."
                : "Register Officer"}
            </button>

          </form>

        </div>

      </div>
    </div>
  );
}