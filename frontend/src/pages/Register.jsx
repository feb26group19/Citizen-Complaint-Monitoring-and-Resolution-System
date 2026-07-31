import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contactnumber, setContactNumber] = useState("");
  const [roleid, setRoleId] = useState("2");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const clearForm = () => {
    setFirstname("");
    setLastname("");
    setUsername("");
    setEmail("");
    setContactNumber("");
    setPassword("");
    setConfirmPassword("");
    setRoleId("2");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    if (
      !firstname ||
      !lastname ||
      !username ||
      !email ||
      !contactnumber ||
      !password ||
      !confirmPassword
    ) {
      setIsSuccess(false);
      setMessage("Please fill all the fields.");
      return;
    }

    const emailRegex =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(email)) {
      setIsSuccess(false);
      setMessage("Please enter a valid email.");
      return;
    }

    if (!/^[0-9]{10}$/.test(contactnumber)) {
      setIsSuccess(false);
      setMessage(
        "Please enter a valid 10-digit contact number."
      );
      return;
    }

    if (password.length < 6) {
      setIsSuccess(false);
      setMessage(
        "Password should contain at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setIsSuccess(false);
      setMessage("Passwords do not match.");
      return;
    }

   const user = {
  firstname: firstname,
  lastname: lastname,
  username: username,
  email: email,
  contactnumber: contactnumber,
  password: password
};

    let endpoint = "";

if (roleid === "2") {

  endpoint = "http://localhost:8081/user/registerCitizen";

} else if (roleid === "4") {

  endpoint = "http://localhost:8081/user/registerNgo";

} else {

  setIsSuccess(false);
  setMessage("Invalid role selected.");
  return;

}

    try {
      setLoading(true);

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        setIsSuccess(true);
        setMessage(
          "Registration Successful! Redirecting to Login..."
        );

        clearForm();

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        const error = await response.text();

        setIsSuccess(false);

        setMessage(error || "Registration Failed.");
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

                {/* Left Side */}

                <div
                  className="col-md-5 text-white d-flex flex-column justify-content-center align-items-center p-5"
                  style={{
                    background:
                      "linear-gradient(180deg,#198754,#157347)",
                  }}
                >
                  <h2 className="fw-bold mb-3 text-center">
                    Complaint Monitoring
                  </h2>

                  <h5 className="mb-4 text-center">
                    & Resolution System
                  </h5>

                  <p className="text-center">
                  
                  </p>

                  <img
                    src="https://cdn-icons-png.flaticon.com/512/942/942748.png"
                    alt="Register"
                    className="img-fluid mt-3"
                    style={{
                      maxHeight: "180px",
                    }}
                  />
                </div>

                {/* Right Side */}

                <div className="col-md-7">

                  <div className="card-body p-5">

                    <h3 className="fw-bold mb-4 text-center">
                      Create Account
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

                      <div className="row">

                        <div className="col-md-6 mb-3">
                          <label className="form-label fw-bold">
                            First Name
                          </label>

                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter First Name"
                            value={firstname}
                            onChange={(e) =>
                              setFirstname(e.target.value)
                            }
                            required
                          />
                        </div>

                        <div className="col-md-6 mb-3">
                          <label className="form-label fw-bold">
                            Last Name
                          </label>

                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Last Name"
                            value={lastname}
                            onChange={(e) =>
                              setLastname(e.target.value)
                            }
                            required
                          />
                        </div>

                      </div>

                      <div className="mb-3">

                        <label className="form-label fw-bold">
                          Username
                        </label>

                        <input
                          type="text"
                          className="form-control"
                          placeholder="Choose Username"
                          value={username}
                          onChange={(e) =>
                            setUsername(e.target.value)
                          }
                          required
                        />

                      </div>

                      <div className="mb-3">

                        <label className="form-label fw-bold">
                          Email Address
                        </label>

                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter Email"
                          value={email}
                          onChange={(e) =>
                            setEmail(e.target.value)
                          }
                          required
                        />

                      </div>

                      <div className="row">

                        <div className="col-md-6 mb-3">

                          <label className="form-label fw-bold">
                            Contact Number
                          </label>

                          <input
                            type="tel"
                            className="form-control"
                            placeholder="10-digit Mobile"
                            value={contactnumber}
                            onChange={(e) =>
                              setContactNumber(
                                e.target.value
                              )
                            }
                            maxLength={10}
                            required
                          />

                        </div>

                        <div className="col-md-6 mb-3">

                          <label className="form-label fw-bold">
                            Register As
                          </label>

                          <select
                            className="form-select"
                            value={roleid}
                            onChange={(e) =>
                              setRoleId(e.target.value)
                            }
                          >
                            <option value="2">
                              Citizen
                            </option>

                            <option value="4">
                              NGO
                            </option>

                          </select>

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
                            className="form-control"
                            placeholder="Create Password"
                            value={password}
                            onChange={(e) =>
                              setPassword(
                                e.target.value
                              )
                            }
                            required
                          />

                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() =>
                              setShowPassword(
                                !showPassword
                              )
                            }
                          >
                            {showPassword
                              ? "Hide"
                              : "Show"}
                          </button>

                        </div>

                      </div>                      <div className="mb-4">

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
                              setConfirmPassword(
                                e.target.value
                              )
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
                            Citizens can register online
                          </li>

                          <li>
                            NGOs can register online
                          </li>

                          <li>
                            Department Officer accounts
                            are created only by the
                            System Administrator
                          </li>

                          <li>
                            Please use a valid email
                            address and mobile number
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