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
              maxRating: rating,
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
  return (
    <div className="pr-div">
      <div className="productPage">
        <div className="filters">
          <h3>Filters</h3>
          <label className="price">
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
          <label className="rating">
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
          {projects.map((product) => {
            return (
              <div key={product._id} className="productCard">
                <div>
                  <img src={product.image} alt={product.name} />
                </div>
                <div
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`/projects/${product.slug}`)}>
                  <h4 className="productCategory">{product.category.name}</h4>
                  <h3 className="productName">{product.title}</h3>
                  <p>₹ {product.price}</p>
                  <p className="productRating">
                    Rating: { product && product.overAllRating}
                  </p>
                </div>
              </div>
            );
          })}
          {projects.length<=0?"No Project to Show":""}
        </div>
      </div>
    </div>
  );
};

export default Products;
