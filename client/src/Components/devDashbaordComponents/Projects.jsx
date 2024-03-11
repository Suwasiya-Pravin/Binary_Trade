import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "../../assets/product.jpg";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const UpdateProject = ({ project, onUpdate }) => {
  const handleUpdate = async () => {
    onUpdate();
  };
  console.log(project)
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: project.title,
    description: project.description,
    category: project.category._id,
    demoLink: project.demoLink,
    price: project.price,
    additionalNotes: project.additionalNotes,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/v1/category/all");
        setCategories(response.data.category);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    setFormData({ ...formData, category: event.target.value });
  };

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {

      const response = await axios.put(`/api/v1/projects/single/${project._id}`, formData);

      console.log("Project updated:", response.data);
      alert("project update successfully");
      // Reset form fields
      setFormData({
        title: "",
        slug:"",
        description: "",
        category: "",
        demoLink: "",
        price: "",
        additionalNotes: "",
      });
      console.log("project update sucessfully");
      onUpdate();
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <div className="signup-section publish-r">
      <div style={{display:"flex",justifyContent:"space-between"}}>
      <h1>Update Project</h1>
      <button className="btn btn-delete" onClick={handleUpdate}>Cancel</button>
      </div>
      <hr />
      <form className="form-signup" onSubmit={handleSubmit}>
        <div className="input">
          <label>Title</label>
          <input
            type="text"
            placeholder="Please Enter Your Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="input">
          <label>Description</label>
          <textarea
            rows={5}
            type="text"
            placeholder="Please Enter Your Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="input">
          <label>Category</label>
          <select value={formData.category} onChange={handleCategoryChange}>
            <option selected>Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="input">
          <label>Demo Link</label>
          <input
            type="text"
            placeholder="Please Enter Your Demo Link"
            name="demoLink"
            value={formData.demoLink}
            onChange={handleInputChange}
          />
        </div>
        <div className="input">
          <label>Price</label>
          <input
            type="text"
            placeholder="Please Enter Your Price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>
        <div className="input">
          <label>Aditional Notes</label>
          <textarea
            rows={5}
            type="text"
            placeholder="Please Enter Your Aditional Notes"
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleInputChange}
          />
        </div>

        <div className="submit ">
          <button className="btn">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

const ProjectCard = ({ project, onEdit,onDelete }) => {
  const navigate=useNavigate();
    const HandleDelete=async(id,onDelete)=>{
        try{
        await axios.delete(`/api/v1/projects/single/${id}`);
        toast.error("project deleted successfully")
        onDelete();
        }
        catch(error){
            console.log(error.message)
        }
    }


  return (
    <div className="productCard p-card-dashboard transcation">
      <div className="flex-row">
        <img src={Image} alt={"portfolio website"} />
        <div style={{cursor:'pointer'}} onClick={()=>{navigate(`/projects/${project.slug}`)}}>
          <h4 className="productCategory">{project.category.name}</h4>
          <h3 className="productName">{project.title}</h3>
          <p>₹ {project.price}</p>
          <p>{project.status}</p>
        </div>
      </div>
      <div className="update-delete-button">
        <button className="btn btn-update" onClick={() => onEdit(project)}>
          Update
        </button>
        <button className="btn btn-delete" onClick={()=>HandleDelete(project._id,onDelete)}>Delete</button>
      </div>
    </div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const fetchProjects = async () => {
    try {
      const response = await axios.get("/api/v1/users/projects");

      setProjects(response.data.data);
      console.log(response.data.data)
    } catch (error) {
      console.error("Error fetching projects:", error.message);
    }
  };
  useEffect(() => {
    fetchProjects();
  }, []);
  const handleEdit = (project) => {
    setEditingProject(project);
  };

  const handleUpdate = () => {
    setEditingProject(null);
    fetchProjects();
  };
  const onDelete=()=>{
    fetchProjects();
  }
  return (
    <div className="signup-section publish-r ">
      <h1>All Projects</h1>
      <hr />
      {editingProject ? (
        <UpdateProject project={editingProject} onUpdate={handleUpdate} />
      ) : (
        projects.map((project) => (
          <ProjectCard
            project={project}
            onEdit={handleEdit}
            onDelete={onDelete}
            key={project._id}
          />
        ))
      )}
      {projects.length<=0?"No Projects to show":""}
    </div>
  );
};

export default Projects;
