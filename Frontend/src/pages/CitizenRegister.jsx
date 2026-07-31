import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function CitizenRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    uname: "",
    password: "",
    fullname: "",
    address: "",
    phone: "",
    email: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [isSuccess, setIsSuccess] = useState(false);

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
      !formData.email
    ) {
      setIsSuccess(false);
      setMessage("Please fill all fields.");
      return;
    }

    const emailRegex =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(formData.email)) {
      setIsSuccess(false);
      setMessage("Please enter a valid email.");
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      setIsSuccess(false);
      setMessage("Phone number must contain exactly 10 digits.");
      return;
    }

    if (formData.password.length < 6) {
      setIsSuccess(false);
      setMessage("Password should contain at least 6 characters.");
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
        "http://localhost:8081/users/registerCitizen",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.text();

      if (response.ok) {
        setIsSuccess(true);

        setMessage(result);

        clearForm();

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setIsSuccess(false);
        setMessage(result);
      }
    } catch (err) {
      setIsSuccess(false);
      setMessage("Unable to connect to Spring Boot Server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid py-5"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#d4fc79 0%, #96e6a1 100%)",
      }}
    >
      <div className="container">

        <div className="row justify-content-center">

          <div className="col-lg-10">

            <div
              className="card shadow-lg border-0"
              style={{ borderRadius: "18px" }}
            >

              <div className="row g-0">

                <div
                  className="col-md-5 text-white d-flex flex-column justify-content-center align-items-center p-5"
                  style={{
                    background:
                      "linear-gradient(180deg,#198754,#157347)",
                  }}
                >
                  <h2 className="fw-bold text-center">
                    Citizen Registration
                  </h2>

                  <p className="text-center mt-3">
                    Create your citizen account to submit
                    complaints and track their status.
                  </p>

                  <img
                    src="https://cdn-icons-png.flaticon.com/512/456/456212.png"
                    alt="Citizen"
                    className="img-fluid mt-4"
                    style={{
                      maxHeight: "180px",
                    }}
                  />
                </div>

                <div className="col-md-7">

                  <div className="card-body p-5">

                    <h3 className="fw-bold text-center mb-4">
                      Create Citizen Account
                    </h3>

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
                                          <div className="mb-3">
                        <label className="form-label fw-bold">
                          Username
                        </label>

                        <input
                          type="text"
                          name="uname"
                          className="form-control"
                          placeholder="Enter Username"
                          value={formData.uname}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-bold">
                          Full Name
                        </label>

                        <input
                          type="text"
                          name="fullname"
                          className="form-control"
                          placeholder="Enter Full Name"
                          value={formData.fullname}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-bold">
                          Address
                        </label>

                        <textarea
                          name="address"
                          className="form-control"
                          rows="3"
                          placeholder="Enter Address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                        ></textarea>
                      </div>

                      <div className="row">

                        <div className="col-md-6 mb-3">
                          <label className="form-label fw-bold">
                            Mobile Number
                          </label>

                          <input
                            type="text"
                            name="phone"
                            className="form-control"
                            placeholder="10 Digit Mobile"
                            maxLength={10}
                            value={formData.phone}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="col-md-6 mb-3">
                          <label className="form-label fw-bold">
                            Email Address
                          </label>

                          <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>

                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-bold">
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
                            placeholder="Create Password"
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
                            {showPassword
                              ? "Hide"
                              : "Show"}
                          </button>

                        </div>

                      </div>

                      <div className="mb-4">
                        <label className="form-label fw-bold">
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
                            placeholder="Confirm Password"
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
                        className="btn btn-success w-100 fw-bold py-2"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                            ></span>
                            Registering...
                          </>
                        ) : (
                          "Register"
                        )}
                      </button>

                      <div className="text-center mt-4">
                        <p className="mb-2">
                          Already have an account?
                        </p>

                        <Link
                          to="/login"
                          className="btn btn-outline-success"
                        >
                          Login Here
                        </Link>
                      </div>

                      <hr className="my-4" />

                      <div className="alert alert-light border">
                        <h6 className="fw-bold">
                          Important Notice
                        </h6>

                        <ul className="mb-0">
                          <li>
                            Register as a Citizen to submit complaints.
                          </li>

                          <li>
                            Track complaint status anytime.
                          </li>

                          <li>
                            Use a valid email address and phone number.
                          </li>

                          <li>
                            Keep your password secure.
                          </li>
                        </ul>
                      </div>

                    </form>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}