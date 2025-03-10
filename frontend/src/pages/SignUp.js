import React, {useState} from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/Auth/AuthContext";
import { useContext } from "react";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
const SignUp = () => {
    const navigate=useNavigate();
    const {SignUp}=useContext(AuthContext)
    const [loading,setLoading]=useState(false)
    const [userData,setUserData]=useState({name:'',email:'',password:'',cpassword:''})
    
    const [alert, setAlert] = useState({ message: "", type: "" }); // Alert state
    const handleChange=(e)=>{
        
        setUserData((prevUserData)=>({
            ...prevUserData,
            [e.target.name]:e.target.value
        }))

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Show spinner
        setAlert({ message: "", type: "" }); // Reset alert
    
        try {
          let res = await SignUp(userData);
          console.log("Response -> ", res);
    
          if (res) {
            setAlert({ message: "Sign-up successful! Redirecting to login...", type: "success" });
            setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
          } else {
            setAlert({ message: "Sign-up failed. Please try again.", type: "danger" });
          }
        } catch (error) {
          setAlert({ message: "An error occurred. Please try again.", type: "danger" });
        }
    
        setLoading(false); // Hide spinner
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
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Sign up
                    </p>
                    {/* Alert Message */}
                    {alert.message && (
                      <div className={`alert alert-${alert.type} text-center`} role="alert">
                        {alert.message}
                      </div>
                    )}

                    <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Your Name"
                            onChange={handleChange}
                            value={userData.name}
                            name="name"
                          />
                          
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Your Email"
                            onChange={handleChange}
                            value={userData.email}
                            name="email"
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
                            value={userData.password}
                            name="password"
                          />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Repeat your password"
                            onChange={handleChange}
                            value={userData.cpassword}
                            name="cpassword"
                          />
                        </div>
                      </div>

                      <div className="form-check d-flex justify-content-center mb-5">
                        <label className="form-check-label">
                          Already have an Account? <Link to="/login">Login</Link>
                        </label>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button type="submit" className="btn btn-primary btn-lg">
                        {loading ? <Spinner /> : "Register"} {/* Show spinner if loading */}
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

export default SignUp;
