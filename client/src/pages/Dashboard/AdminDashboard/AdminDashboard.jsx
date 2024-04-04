import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Modal } from "antd";
import "./AdminDashboard.css";
// import Image from "../../../assets/product.jpg";
import { toast } from "react-toastify";
import { GlobalContext } from "../../../GlobalState";
const Users = () => {
  const [users, setUsers] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [selected, setSelected] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selected === "all") {
          const response = await axios.get("/api/v1/users/get-all");
          if (response.status === 200) {
            setUsers(response.data.data);
          }
        } else if (selected === "developer") {
          const response = await axios.get("/api/v1/users/get-developers");

          if (response.status === 200) {
            setDevelopers(response.data.data);
          }
        } else if (selected === "buyer") {
          const response = await axios.get("/api/v1/users/get-buyers");

          if (response.status === 200) {
            setBuyers(response.data.data);
          }
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [selected]);

  return (
    <div className="signup-section publish-r">
      <h1>Users</h1>
      <hr />
      <div className="button-group">
        <button className="category" onClick={() => setSelected("all")}>All</button>
        <button className="category" onClick={() => setSelected("developer")}>Developers</button>
        <button className="category" onClick={() => setSelected("buyer")}>Buyers</button>
      </div>
      <div className="users-table-container">
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>User Type</th>
            </tr>
          </thead>
          <tbody>
            {selected === "all" &&
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.userType}</td>
                </tr>
              ))}
            {selected === "developer" &&
              developers.map((developer) => (
                <tr key={developer._id}>
                  <td>{developer.firstname}</td>
                  <td>{developer.lastname}</td>
                  <td>{developer.username}</td>
                  <td>{developer.email}</td>
                  <td>{developer.userType}</td>
                </tr>
              ))}
            {selected === "buyer" &&
              buyers.map((buyer) => (
                <tr key={buyer._id}>
                  <td>{buyer.firstname}</td>
                  <td>{buyer.lastname}</td>
                  <td>{buyer.username}</td>
                  <td>{buyer.email}</td>
                  <td>{buyer.userType}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const fetchProjects = async () => {
    try {
      const response = await axios.get("/api/v1/projects/all-admin");
      const data = response.data.data;
      setProjects(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchProjects();
  }, []);
  const handleAccept = async (projectId) => {
    try {
      const response = await axios.put(`/api/v1/projects/approve/${projectId}`);
      if(response.data.success){
        toast.success("project approve");
      } 
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (projectId) => {
    try {
      const response = await axios.put(`/api/v1/projects/reject/${projectId}`);
      if(response.data.success){
        toast.error("project Rejected");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleProjectClick = (project) => {
    setSelectedProject(project);
    showModal();
  };
  const handleOk = () => {
    setSelectedProject(null);
    hideModal();
  };

  const handleCancel = () => {
    setSelectedProject(null);
    hideModal();
  };

  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };
  return (
    <div className="signup-section publish-r users-table-container">
      <h1>Projects</h1>
      <hr />
      <table >
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Developer</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project._id}>
              <td onClick={() => handleProjectClick(project)}>
                {project.title}
              </td>
              <td>{project.category.name}</td>
              <td>{`${project.developer.username} (${project.developer.email})`}</td>
              <td>{project.status}</td>
              <td className="button-group pr-buttons">
                <button onClick={() => handleAccept(project._id)}>
                  Accept
                </button>
                <button onClick={() => handleReject(project._id)}>
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        title="Project Details"
        className="project-details-modal"
        visible={modalVisible}
        onOk={handleOk}
        footer={null}
        onCancel={handleCancel}>
        {selectedProject && (
          <>
            <img src={selectedProject.image} alt={selectedProject.title} />
            <p className="project-details-id">ID: {selectedProject._id}</p>
            <p className="project-details-name">
              <u>Name</u> : {selectedProject.title}
            </p>
            <p className="project-details-category">
              <u>Category</u> : {selectedProject.category.name}
            </p>
            <p className="project-details-developer">
              <u>Developer</u> :{" "}
              {`${selectedProject.developer.username} (${selectedProject.developer.email})`}
            </p>
            <p className="project-details-description">
              <u>Description</u> : {selectedProject.description}
            </p>
            <p className="project-details-price">
              <u>synopsis</u> : <a download href={selectedProject.synopsis}>Download</a>
            </p>
            <p className="project-details-price">
              <u>Source Code</u> : <a download href={selectedProject.sourceCode}>Download</a>
            </p>
            <p className="project-details-price">
              <u>price</u> : {selectedProject.price}
            </p>
            <p className="project-details-demo-link">
              <a href={selectedProject.demoLink}>demo</a>
            </p>
          </>
        )}
      </Modal>
    </div>
  );
};

const Contact = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('/api/v1/contact/getall');
        setContacts(response.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        toast.error("Failed to fetch contacts");
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <div className="signup-section publish-r">
        <h1 className="text-3xl font-bold text-center mb-6">Contacts</h1>
        <hr className="mb-6" />

        <div className="grid grid-cols-1 gap-4">
          {contacts.map(contact => (
            <div key={contact._id} className="category  categoryHover rounded-lg p-4 shadow-md">
              <p><span className="font-bold">Name: </span> {contact.name}</p>
              <p><span className="font-bold">Email: </span> {contact.email}</p>
              <p><span className="font-bold">Message: </span> {contact.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Account = () => {
  const { globalState, setGlobalState } = useContext(GlobalContext);
  const [formData, setFormData] = useState({
    firstname: globalState.firstname,
    lastname: globalState.lastname,
    username: globalState.username,
    mobile: globalState.mobile,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to your API endpoint
      const response = await axios.put("/api/v1/users/update-user", formData);
      console.log("Response from server:", response.data);
      setGlobalState(response.data.data);
      toast.success("Profile Updated Successfully");
      // Handle success or any other logic here
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div className="signup-section publish-r">
      <h1>Account Details</h1>
      <hr />
      <form onSubmit={handleSubmit} className="form-signup">
        <div className="msg-box">
          <div className="input">
            <label>Firstname</label>
            <input
              type="text"
              name="firstname"
              placeholder="Please Enter Your Firstname"
              value={formData.firstname}
              onChange={handleInputChange}
            />
          </div>
          <div className="input">
            <label>Lastname</label>
            <input
              type="text"
              name="lastname"
              placeholder="Please Enter Your Lastname"
              value={formData.lastname}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="input">
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Please Enter Your Username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="input">
          <label>Mobile Number</label>
          <input
            type="text"
            name="mobile"
            placeholder="Please Enter Your Mobile Number"
            value={formData.mobile}
            onChange={handleInputChange}
          />
        </div>
        <div className="submit ">
          <button className="btn">Submit</button>
        </div>
      </form>
    </div>
  );
};
const Catagory = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingName, setEditingName] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/v1/category/all");

        if (response.status === 200) {
          setCategories(response.data.category);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchCategories();
  }, []);
  const handleEdit = (category) => {
    setEditingCategory(category);
    setEditingName(category.name);
  };
  const handleUpdate = async (slug) => {
    try {
      const response = await axios.patch(`/api/v1/category/update/${slug}`, {
        name: editingName,
      });

      if (response.status === 200) {
        setCategories(
          categories.map((category) =>
            category._id === editingCategory._id
              ? response.data.category
              : category
          )
        );
        setEditingCategory(null);
        setEditingName("");
        toast.success("Category Updated Successfully");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async (slug) => {
    try {
      await axios.delete(`/api/v1/category/delete/${slug}`);
      toast.success("Category deleted successfullly");
      setCategories(categories.filter((category) => category.slug !== slug));
    } catch (e) {
      console.log(e);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/category/create", {
        name,
      });

      if (response.status === 201) {
        console.log(response.data.data);
        toast.success("category added successfully");
      }
    } catch (e) {
      console.log(e.message);
      toast.error("Something Went wrong");
    }
  };
  return (
    <div className="signup-section publish-r ">
      <h1>All Catagory</h1>
      <br />
      <form onSubmit={handleSubmit} className="form-signup">
        <div className="addCategory">
          <div className="msg-box">
            <div className="input">
              <input
                type="text"
                name="name"
                placeholder="Please Enter Category Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="submit">
              <button className="btn">Add</button>
            </div>
          </div>
        </div>
      </form>
      <hr />
      {categories.map((category) => (
        <div
          key={category._id}
          className="productCard p-card-dashboard transcation">
          {editingCategory && editingCategory._id === category._id ? (
            <>
              <div className="flex-row">
                <div>
                  <input
                   className="border p-2 w-full"
                    type="text"
                    name="name"
                    placeholder="Please Enter Category Name"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                  />
                </div>
              </div>
              <div className="update-delete-button">
                <button
                  className="btn btn-update"
                  onClick={() => handleUpdate(category.slug)}>
                  Update
                </button>
                <button
                  className="btn btn-delete"
                  onClick={() => setEditingCategory(null)}>
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex-row">
                <div>
                  <h4 className="productCategory text-xl">{category.name}</h4>
                </div>
              </div>
              <div className="update-delete-button">
                <button
                  className="btn btn-update"
                  onClick={() => handleEdit(category)}>
                  Update
                </button>
                <button
                  className="btn btn-delete"
                  onClick={() => handleDelete(category.slug)}>
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

const UserDashboard = () => {
  const [currentPage, setCurrentPage] = useState("Users");

  const renderPage = () => {
    switch (currentPage) {
      case "Users":
        return <Users />;
      case "Account":
        return <Account />;
      case "Projects":
        return <Projects />;
      case "Contact":
        return <Contact />;
      case "Catagory":
        return <Catagory />;
      default:
        return (
          <div className="default-page">
            {/* Add your profile overview here */}
          </div>
        );
    }
  };

  return (
    <div className="user-dashboard bg-bl text-white ">
      <div className="navigation-menu">
        <h2>Navigation Menu</h2>
        <ul>
          <li
            className={currentPage === "Account" ? "menu-active" : ""}
            onClick={() => setCurrentPage("Account")}>
            Account Details
          </li>
          <li
            className={currentPage === "Users" ? "menu-active" : ""}
            onClick={() => setCurrentPage("Users")}>
            Users
          </li>
          <li
            className={currentPage === "Projects" ? "menu-active" : ""}
            onClick={() => setCurrentPage("Projects")}>
            Projects
          </li>
          <li
            className={currentPage === "Catagory" ? "menu-active" : ""}
            onClick={() => setCurrentPage("Catagory")}>
            Catagory
          </li>
          <li
            className={currentPage === "Contact" ? "menu-active" : ""}
            onClick={() => setCurrentPage("Contact")}>
            Contacts
          </li>
        </ul>
      </div>
      <div className="page-content">{renderPage()}</div>
    </div>
  );
};

export default UserDashboard;
