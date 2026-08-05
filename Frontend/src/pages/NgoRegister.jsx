import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function NgoRegister() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    uname: "",
    password: "",
    ngoName: "",
    regNo: "",
    address: "",
    phone: "",
    email: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      ngoName: "",
      regNo: "",
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
      !formData.ngoName ||
      !formData.regNo ||
      !formData.address ||
      !formData.phone ||
      !formData.email
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
        "http://localhost:8081/users/registerNgo",
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
        setMessage("NGO Registered Successfully.");

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
        background: "linear-gradient(135deg,#74ebd5 0%, #9face6 100%)",
      }}
    >

      <div className="container">

        <div className="row justify-content-center">

          <div className="col-lg-8">

            <div className="card shadow-lg border-0">

              <div className="card-body p-5">

                <h2 className="text-center mb-4">
                  NGO Registration
                </h2>

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
                    <label>Username</label>
                    <input
                      type="text"
                      name="uname"
                      className="form-control"
                      value={formData.uname}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label>NGO Name</label>
                    <input
                      type="text"
                      name="ngoName"
                      className="form-control"
                      value={formData.ngoName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label>Registration Number</label>
                    <input
                      type="text"
                      name="regNo"
                      className="form-control"
                      value={formData.regNo}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label>Address</label>
                    <textarea
                      name="address"
                      className="form-control"
                      rows="3"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="row">

                    <div className="col-md-6 mb-3">
                      <label>Phone</label>
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
                      <label>Email</label>
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

                    <label>Password</label>

                    <div className="input-group">

                      <input
                        type={showPassword ? "text" : "password"}
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

                    <label>Confirm Password</label>

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
                      : "Register NGO"}
                  </button>

                  <div className="text-center mt-4">

                    <p>Already have an account?</p>

                    <Link
                      to="/login"
                      className="btn btn-outline-primary"
                    >
                      Login
                    </Link>

                  </div>

                </form>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}