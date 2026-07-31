import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";


export default function LoginComp() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();



    const handleSubmit = async (e) => {

        e.preventDefault();
        setMessage("");

        try {

            const response = await fetch(
                "http://localhost:8081/user/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        username,
                        password,
                    }),
                }
            );



            if (!response.ok) {

                const error = await response.text();

                throw new Error(
                    error || "Invalid Username or Password"
                );

            }



            const data = await response.json();



            // ==============================
            // DEBUG LOGIN RESPONSE
            // ==============================

            console.log(
                "LOGIN RESPONSE:",
                data
            );


            console.log(
                "ROLE ID:",
                data.role?.rid
            );



            // ==============================
            // STORE USER IN REDUX
            // ==============================

            dispatch(

                loginSuccess({

                    user: data,

                    token: null,

                })

            );



            setMessage(
                "Login Successful!"
            );



            // ==============================
            // ROLE BASED REDIRECTION
            // ==============================


            if (!data.role) {

                setMessage(
                    "Role information not found."
                );

                return;
            }



            const roleId = data.role.rid;



            switch(roleId) {


                // Admin
                case 1:

                    navigate("/admin");

                    break;



                // Citizen
                case 2:

                    navigate("/user");

                    break;



                // NGO
                case 3:

                    navigate("/ngo");

                    break;



                // Officer
                case 4:

                    navigate("/officer");

                    break;



                default:

                    setMessage(
                        "Invalid role assigned."
                    );

            }



        }
        catch(err) {

            console.log(
                "LOGIN ERROR:",
                err.message
            );


            setMessage(
                err.message
            );

        }

    };




    return (

        <div
            className="container mt-5"
            style={{
                maxWidth:"400px"
            }}
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

                            value={username}

                            onChange={(e)=>
                                setUsername(e.target.value)
                            }

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

                            onChange={(e)=>
                                setPassword(e.target.value)
                            }

                            required

                        />


                    </div>





                    <button

                        type="submit"

                        className="btn btn-primary w-100"

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