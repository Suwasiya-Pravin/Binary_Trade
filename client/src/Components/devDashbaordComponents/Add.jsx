import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "../../../node_modules/react-toastify/dist/ReactToastify.css";

const Add = () => {
  
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    demoLink: "",
    additionalNotes: "",
    category: "",
    image: "",
    synopsis: "",
    sourceCode:""
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

  const imageUpload=async(image)=>{
    if (image) {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append("file", image);
        formDataToSend.append("upload_preset", "ir8ualcu");
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dflpiutd9/image/upload",
          formDataToSend
        );
        setFormData((pre) => ({
          ...pre,
          image: response.data.secure_url,
        }));
        toast.success("image save success");
        console.log("Image uploaded successfully", response.data.secure_url);
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
      }
    }
  }
  const pdfUpload=async(pdffile)=>{
    if (pdffile) {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append("file", pdffile);
        formDataToSend.append("upload_preset", "ir8ualcu");
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dflpiutd9/image/upload",
          formDataToSend
        );
        setFormData((pre) => ({
          ...pre,
          synopsis: response.data.secure_url,
        }));
        toast.success("pdf save success");
        console.log("PDF uploaded successfully", response.data.secure_url);
      } catch (error) {
        console.error("Error uploading PDF to Cloudinary:", error);
      }
    }
  }

  const zipUpload=async(zip)=>{
    if(zip){
      const formData = new FormData();
      formData.append('file', zip);
      formData.append('upload_preset', 'ir8ualcu'); // replace with your upload preset
      try{
        const res = await axios.post('https://api.cloudinary.com/v1_1/dflpiutd9/upload', formData); // replace 'dflpiutd9' with your cloud name
        console.log(res.data);
        
        setFormData((pre) => ({
          ...pre,
          sourceCode: res.data.secure_url,
        }));
        toast.success("zip save success");
      }
      catch(err){
        console.log(err);
      }
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/v1/projects/create", formData);
      console.log("Project created:", response.data);
      toast.success("Project added Successfully");
      setFormData({
        title: "",
        description: "",
        category: "",
        demoLink: "",
        price: "",
        additionalNotes: "",
        image: "",
        synopsis: "",
      });
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <>
      <div className="signup-section publish-r">
        <h1>Add Project</h1>
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
            <label>image</label>
            <input
              type="file"
              placeholder="Please Enter Your Price"
              name="image"
              onChange={(e) => {
                imageUpload(e.target.files[0]);
              }}
            />
          </div>
          <div className="input">
            <label>pdf</label>
            <input
              type="file"
              placeholder="Please Enter Your Price"
              name="pdf"
              onChange={(e) => {
                pdfUpload(e.target.files[0]);
              }}
            />
          </div>
          <div className="input">
            <label>zip</label>
            <input
              type="file"
              placeholder="Please Enter Your Price"
              name="zip"
              onChange={(e) => {
                zipUpload(e.target.files[0]);
              }}
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
            <button disabled={(formData.synopsis && formData.image && formData.sourceCode)?false:true} className="btn">Submit</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Add;
