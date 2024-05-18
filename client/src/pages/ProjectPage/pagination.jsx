import React, { useState, useEffect } from "react";
import "./Projects.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Products = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage, setProjectsPerPage] = useState(6);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const fetchProjects = async () => {
        try {
          const response = await axios.get("/api/v1/projects/all");
          setProjects(response.data.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchProjects();
    }
  }, [isMounted]);

  useEffect(() => {
    if (price > 0 || rating > 0) {
      const fetchProjects = async () => {
        try {
          const response = await axios.get("/api/v1/projects/filter", {
            params: {
              minRating: 0,
              maxRating: rating || 5,
              minPrice: 0,
              maxPrice: price,
            },
          });

          setProjects(response.data.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchProjects();
    }
  }, [price, rating]);

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    const starIcons = [];
    for (let i = 0; i < fullStars; i++) {
      starIcons.push(<i key={i} className="fas fa-star  text-blue-600 "></i>);
    }
    if (halfStar) {
      starIcons.push(<i key="half" className="fas fa-star-half-alt text-blue-600"></i>);
    }
    for (let i = 0; i < emptyStars; i++) {
      starIcons.push(
        <i key={i + fullStars + halfStar} className="far fa-star text-blue-600"></i>
      );
    }

    return <div className="star-rating">{starIcons}</div>;
  };

  return (
    <div className="pr-div relative bg-bl text-white">
      <div className="productPage">
        <div className="filters ">
          <h3>Filters</h3>
          <label className="price category rounded-lg">
            Price range: {price}
            <input
              type="range"
              min="0"
              max="10000"
              step={100}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <label className="rating category rounded-lg">
            Rating range: {rating}
            <input
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </label>
        </div>
        <div className="products">
          {currentProjects.map((product) => {
            return (
              <div key={product._id} className="productCard">
                <div className="productImage">
                  <img src={product.image} alt={product.name} />
                </div>
                <div
                  style={{
                    cursor: "pointer",
                    padding: "13px",
                  }}
                  onClick={() => navigate(`/projects/${product.slug}`)}>
                  <h4 className=" text-blue-600 mb-2">{product.category.name}</h4>
                  <h3 className="productName">{product.title}</h3>
                  <p>₹ {product.price}</p>
                  <p className="productRating">
                    <StarRating rating={product.overAllRating || 0} />
                  </p>
                </div>
              </div>
            );
          })}
          {projects.length <= 0 ? "No Project to Show" : ""}
        </div>
        <div className="pagination">
          <button onClick={() => paginate(currentPage - 1)}>&laquo;</button>
          {[...Array(Math.ceil(projects.length / projectsPerPage))].map(
            (page, index) => (
              <button
                key={index}
                className={` ${currentPage === index + 1 ? "bg-blue-500" : "bg-white"} `}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            )
          )}
          <button onClick={() => paginate(currentPage + 1)}>&raquo;</button>
        </div>
      </div>
    </div>
  );
};

export default Products;