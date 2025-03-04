import React from "react";

const SideBar = () => {
  return (
    <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
      <div className="p-3">
        {/* Search Bar */}
        <div className="input-group rounded mb-3">
          <input
            type="search"
            className="form-control rounded"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-addon"
          />
          <span className="input-group-text border-0" id="search-addon">
            <i className="fas fa-search"></i>
          </span>
        </div>

        {/* Chat List */}
        <div style={{ position: "relative", height: "400px", overflowY: "auto" }}>
          <ul className="list-unstyled mb-0">
            {[
              { name: "John Doe", status: "bg-success", message: "Hello, Are you there?", time: "Just now", badge: 3 },
              { name: "Alexa Chung", status: "bg-warning", message: "Lorem ipsum dolor sit.", time: "5 mins ago", badge: 2 },
              { name: "Danny McChain", status: "bg-success", message: "Lorem ipsum dolor sit.", time: "Yesterday" },
              { name: "Ashley Olsen", status: "bg-danger", message: "Lorem ipsum dolor sit.", time: "Yesterday" },
              { name: "Kate Moss", status: "bg-warning", message: "Lorem ipsum dolor sit.", time: "Yesterday" },
              { name: "Ben Smith", status: "bg-success", message: "Lorem ipsum dolor sit.", time: "Yesterday" },
            ].map((user, index) => (
              <li key={index} className="p-2 border-bottom">
                <a href="#!" className="d-flex justify-content-between">
                  <div className="d-flex flex-row">
                    <div>
                      <img
                        src={`https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava${index + 1}-bg.webp`}
                        alt="avatar"
                        className="d-flex align-self-center me-3"
                        width="60"
                      />
                      <span className={`badge ${user.status} badge-dot`}></span>
                    </div>
                    <div className="pt-1">
                      <p className="fw-bold mb-0">{user.name}</p>
                      <p className="small text-muted">{user.message}</p>
                    </div>
                  </div>
                  <div className="pt-1">
                    <p className="small text-muted mb-1">{user.time}</p>
                    {user.badge && <span className="badge bg-danger rounded-pill float-end">{user.badge}</span>}
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
