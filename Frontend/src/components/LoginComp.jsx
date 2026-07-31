import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

export default function LoginComp() {

  const [uname, setUname] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();
    setMessage("");

    try {

      const response = await fetch(
        "http://localhost:8081/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uname,
            password,
          }),
        }
      );

      if (!response.ok) {

        const errorMessage = await response.text();

        console.log("Backend Error =", errorMessage);

        throw new Error(errorMessage);

      }

      const data = await response.json();

      console.log("LOGIN RESPONSE =", data);

      dispatch(
        loginSuccess({
          user: data,
          token: null,
        })
      );

      setMessage("Login Successful!");

      switch (data.rid) {

        case 1:
          navigate("/admin");
          break;

        case 2:
          navigate("/user");
          break;

        case 3:
          navigate("/ngo");
          break;

        case 4:
          navigate("/officer");
          break;

        default:
          setMessage("Invalid Role");
      }

    } catch (err) {

      console.log("Error =", err.message);

      if (err.message.includes("pending admin approval")) {

        setMessage(
          "Your NGO registration is pending admin approval."
        );

      } else if (err.message.includes("rejected")) {

        setMessage(
          "Your NGO registration has been rejected by the admin."
        );

      } else if (err.message.includes("Invalid Username or Password")) {

        setMessage(
          "Invalid Username or Password"
        );

      } else {

        setMessage(err.message);

      }
    }
  };

  return (

    <div
      className="container mt-5"
      style={{ maxWidth: "400px" }}
    >

      <div className="card shadow p-4">

        <h3 className="text-center mb-4">
          Login
        </h3>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">

            <label className="form-label">
              Username
            </label>

            <input
              type="text"
              className="form-control"
              value={uname}
              onChange={(e) => setUname(e.target.value)}
              required
            />

          </div>

          <div className="mb-3">

            <label className="form-label">
              Password
            </label>

            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>

          <button
            className="btn btn-primary w-100"
            type="submit"
          >
            Login
          </button>

        </form>

        {message && (

          <div
            className={`alert mt-3 ${
              message === "Login Successful!"
                ? "alert-success"
                : "alert-danger"
            }`}
          >
            {message}
          </div>

        )}

      </div>

    </div>

  );
}