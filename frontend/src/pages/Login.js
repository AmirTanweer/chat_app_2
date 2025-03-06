import React, { useContext, useState, useEffect } from "react";
import { Await, Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/Auth/AuthContext";
import ChatContext from "../context/Chat/ChatContext";
import Spinner from "../components/Spinner";
import SocketContext from "../context/Socket/SocketContext";

const Login = () => {
  const { sendUserName ,sendLoggedInUserData} = useContext(SocketContext);
  const navigate = useNavigate();
  const { getAllChats } = useContext(ChatContext);
  const { Logging, getUserDetails, userData } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [luserData, setLUserData] = useState({ email: "", password: "" });
  const [alert, setAlert] = useState({ message: "", type: "" });

  // Auto redirect if user is already logged in
  useEffect(() => {
    if (userData?._id) {
      navigate("/");
    }
  }, [userData, navigate]);

  const handleChange = (e) => {
    setLUserData((prevUserData) => ({
      ...prevUserData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ message: "", type: "" });

    try {
      const res = await Logging(luserData);
      // console.log('res -> ',res)
      if (res?.success) {
        // console.log("inside if")
        setAlert({ message: "Login successful! Redirecting...", type: "success" });
        
        // Fetch user details and chats
       let userDetails= await getUserDetails();
       // console.log('userDetails -> ',userDetails.user)

       //Send loggedIn user details to socket
       await sendLoggedInUserData(userDetails.user)

        await getAllChats();

        
        


        // console.log('before navigating')
        // Redirect after a short delay
        setTimeout(() => navigate("/"), 1000);
      } else {
        setAlert({ message: res?.message || "Login failed. Please try again.", type: "danger" });
      }
    } catch (error) {
      setAlert({ message: "An error occurred. Please try again.", type: "danger" });
      // console.log(error)
    }

    setLoading(false);
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>

                    {alert.message && (
                      <div className={`alert alert-${alert.type} text-center`} role="alert">
                        {alert.message}
                      </div>
                    )}

                    <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Your Email"
                            onChange={handleChange}
                            value={luserData.email}
                            name="email"
                            required
                          />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            onChange={handleChange}
                            value={luserData.password}
                            name="password"
                            required
                          />
                        </div>
                      </div>

                      <div className="form-check d-flex justify-content-center mb-5">
                        <label className="form-check-label">
                          Don't Have an Account? <Link to="/signup">Signup</Link>
                        </label>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                          {loading ? <Spinner /> : "Login"}
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="Sample"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
