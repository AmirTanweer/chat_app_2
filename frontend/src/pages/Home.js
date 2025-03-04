import React,{useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPaperclip, faSmile, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import SideBar from "../components/SideBar";
import Chat from "../components/Chat";

const Home = () => {
 

   
  

    return (
      
    <section style={{ backgroundColor: "#CDC4F9" }}>
      <div className="container py-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card" id="chat3" style={{ borderRadius: "15px" }}>
              <div className="card-body">
                <div className="row">
                  {/* Left Sidebar (Chat List) */}
                  <SideBar FontAwesomeIcon={FontAwesomeIcon} faSearch={faSearch}/>
                  {/* Chat Window */}
                  <Chat/>
                  
                </div> {/* End Row */}
              </div> {/* End Card Body */}
            </div> {/* End Card */}
          </div> {/* End Col */}
        </div> {/* End Row */}
      </div> {/* End Container */}
    </section>
  );


};

export default Home;
