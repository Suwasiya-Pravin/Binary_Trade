import React, { useEffect, useState } from "react";
// import { GlobalContext } from "../../GlobalState";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";
import "../../pages/ProjectPage/Projects.css";
const Home = () => {
  const data = process.env.REACT_APP_TEST_DATA
  console.log('env val',data);
  // const { globalState } = useContext(GlobalContext);
  const [projects, setProjects] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setIsMounted(true);
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
  const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    const starIcons = [];
    for (let i = 0; i < fullStars; i++) {
      starIcons.push(<i key={i} className="fas fa-star text-blue-600"></i>);
    }
    if (halfStar) {
      starIcons.push(
        <i key="half" className="fas fa-star-half-alt text-blue-600"></i>
      );
    }
    for (let i = 0; i < emptyStars; i++) {
      starIcons.push(
        <i
          key={i + fullStars + halfStar}
          className="far fa-star text-blue-800"></i>
      );
    }

    return <div className="star-rating">{starIcons}</div>;
  };
  const testimonialsData = [
    {
      id: 1,
      name: "John cook",
      position: "CEO, Tech Solutions Inc.",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut elit vitae nisi lobortis consectetur.",
      avatar: "https://via.placeholder.com/150", // URL to the avatar image
      company: "Tech Solutions Inc.",
      logo: "https://via.placeholder.com/50", // URL to the company logo image
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Lead Developer, Software Co.",
      message:
        "Sed pulvinar sapien at sem consequat, quis interdum orci congue. Morbi non libero ut elit tincidunt ultrices.",
      avatar: "https://via.placeholder.com/150", // URL to the avatar image
      company: "Software Co.",
      logo: "https://via.placeholder.com/50", // URL to the company logo image
    },
    {
      id: 3,
      name: "Pravin",
      position: "Lead Developer, Software Co.",
      message:
        "Sed pulvinar sapien at sem consequat, quis interdum orci congue. Morbi non libero ut elit tincidunt ultrices.",
      avatar: "https://via.placeholder.com/150", // URL to the avatar image
      company: "Software Co.",
      logo: "https://via.placeholder.com/50", // URL to the company logo image
    },
    // Add more testimonials as needed
  ];
  const startIndex = projects.length - 3;
  console.log(projects);
  return (
    <div>
      <div className="hero px-7">
        <h1 className="hero-h1 text-4xl md:text-7xl mb-5">
          Welcome to <span className="gradient">Binary Trade</span>
        </h1>
        <p>Your one-stop shop for all software needs.</p>
        <button
          onClick={() => navigate("/projects")}
          className="bg-blue-600 text-white">
          Shop Now
        </button>
        
        <div className="area">
          <ul className="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>

      <div className="featured-projects pt-8 px-7 md:px-16 bg-bl">
        <h2 className="text-3xl md:text-4xl mb-10 gradient">
          Featured Projects
        </h2>
        <div className="flex gap-5 md:gap-10 flex-col md:flex-row justify-start">
          {projects.slice(startIndex).map((product) => {
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
                  <h4 className=" text-blue-600 mb-2">
                    {product.category.name}
                  </h4>
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
      </div>
      <div className="py-4 px-7 md:px-16 bg-bl text-white">
        <h2 className="text-3xl md:text-4xl my-10 gradient">Categories</h2>
        <div className=" flex justify-center md:justify-start items-center gap-3 flex-wrap">
          {categories.map((category) => (
            <div
              key={category._id}
              className="category categoryHover w-full md:w-auto p-5  bg-black-200 mb-5 rounded-lg shadow-xl ">
              <p>
                <i className="fa-solid fa-icons text-blue-600 mr-3 text-2xl"></i>{" "}
                {category.name}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="how-it-works py-12 px-7 md:px-16 bg-bl text-white ">
        <div className="mx-auto">
          <h2 className="md:text-4xl text-3xl font-normal mb-8 md:mb-16 gradient">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div className=" category categoryHover flex items-center mb-6 p-5 rounded-lg">
              <div className=" mr-4 flex-shrink-0">
                <i className="fa-solid fa-window-restore text-5xl text-blue-600"></i>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Browse Projects</h3>
                <p>
                  Discover a wide range of software projects across various
                  categories.
                </p>
              </div>
            </div>
            <div className=" category categoryHover flex items-center mb-6 p-5 rounded-lg">
              <div className="mr-4 flex-shrink-0">
                <i className="fa-brands fa-figma text-5xl text-blue-600"></i>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
                <p>Easy to integrate and easy to usable with great UX and UI</p>
              </div>
            </div>
            <div className=" category categoryHover flex items-center mb-6 p-5 rounded-lg">
              <div className="mr-4 flex-shrink-0">
                <i className="fa-solid fa-shield-halved text-5xl text-blue-600"></i>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Secure Transactions
                </h3>
                <p>
                  Enjoy secure transactions and payments through our platform.
                </p>
              </div>
            </div>
            <div className=" category categoryHover flex items-center mb-6 p-5 rounded-lg">
              <div className="mr-4 flex-shrink-0">
                <i className="fa-solid fa-flask text-5xl text-blue-600"></i>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Efficient Solutions
                </h3>
                <p>
                  Find efficient and customized software solutions tailored to
                  your needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" py-12 bg-bl text-white ">
        <div className="px-7 md:px-16">
          <h2 className="text-4xl font-normal  mb-8 gradient">Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonialsData.map((testimonial) => (
              <div
                key={testimonial.id}
                className="category categoryHover rounded-lg shadow-md p-6 ">
                <div className="flex items-center mb-4 ">
                  <img
                    src="https://source.unsplash.com/random/150x150?person1"
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">
                      {testimonial.name}
                    </h3>
                    <p>{testimonial.position}</p>
                  </div>
                </div>
                <p className=" mb-4">{testimonial.message}</p>
                <div className="flex items-start justify-start ">
                  <p className="text-sm">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Categories, How It Works, Testimonials, Featured Developers, and Footer sections are not implemented */}
    </div>
  );
};

export default Home;
