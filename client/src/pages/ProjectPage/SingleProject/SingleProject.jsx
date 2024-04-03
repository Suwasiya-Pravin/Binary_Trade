import { useState, useEffect, useContext } from "react";
import "./SingleProject.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "antd/es/modal/Modal";
import { GlobalContext } from "../../../GlobalState";
import { toast } from "react-toastify";
import "../../../../node_modules/react-toastify/dist/ReactToastify.css";

const SingleProject = () => {
  let { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState({});
  const [favoriteProjects, setFavoriteProjects] = useState([]);
  const [selectedTab, setSelectedTab] = useState("Description");
  const [isWishlist, setIsWishlist] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { globalState } = useContext(GlobalContext);
  const [order, setOrder] = useState([]);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          `/api/v1/projects/single/slug/${slug}`
        );
        setProject(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchFavoriteProjects = async () => {
      try {
        const res = await axios.get("/api/v1/users/all-favorites");
        setFavoriteProjects(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    const orderAllUser = async () => {
      try {
        const res = await axios.get(`/api/v1/order/get-order`);
        setOrder(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFavoriteProjects();
    fetchProjects();
    orderAllUser();
    // eslint-disable-next-line
  }, []);
  console.log(order);
  useEffect(() => {
    if (globalState.userType === "buyer") {
      const isFavorite = favoriteProjects.some(
        (favorite) => favorite._id === project._id
      );
      console.log(project._id);
      setIsWishlist(isFavorite);
    } // eslint-disable-next-line
  }, [favoriteProjects, project]);

  const toggleWishlist = async () => {
    if (isWishlist) {
      try {
        const response = await axios.delete("/api/v1/users/delete-favorite", {
          data: {
            projectId: project._id,
          },
        });
        console.log(response.data);
        setIsWishlist(!isWishlist);
        toast.warning("Project deleted from wishlist");
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      // Add to favorites
      try {
        const response = await axios.post("/api/v1/users/add-favorite", {
          projectId: project._id,
        });
        console.log(response.data);
        setIsWishlist(!isWishlist);
        toast.success("Project added to wishlist");
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const renderPage = () => {
    switch (selectedTab) {
      case "Description":
        return (
          <CompleteDesc
            description={project.description}
            synopsis={project.synopsis}
          />
        );
      case "PublishReview":
        return <PublishReviewForm slug={slug} />;
      case "AllReview":
        return <AllReviews slug={slug} />;
      default:
        return (
          <div className="p-4 bg-white rounded shadow">
            {/* Add your profile overview here */}
          </div>
        );
    }
  };
  const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    const starIcons = [];
    for (let i = 0; i < fullStars; i++) {
      starIcons.push(<i key={i} className="fas fa-star text-blue-800"></i>);
    }
    if (halfStar) {
      starIcons.push(
        <i key="half" className="fas fa-star-half-alt text-blue-800"></i>
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

  if (!project) return <div>Loading...</div>;
  return (
    <div className="single-P-Div bg-bl text-white">
      <div className="singleProject">
        <div className="ProjectInfo br-2">
          <div className="productImage h-full">
            {globalState.userType === "buyer" ? (
              <i
                style={{
                  color: isWishlist ? "red" : "#a6a9b0",
                  cursor: "pointer",
                }}
                onClick={() => toggleWishlist()}
                className="fa-solid fa-heart wishlist"></i>
            ) : (
              ""
            )}
            <img src={project.image} alt={project.title} />
          </div>
          <div className="productDescription relative category ">
            <h2 className=" text-blue-600 mb-2 ">
              {project.category && project.category.name}
            </h2>

            {/* {project.category.name} */}
            <p className="productTitle">{project.title}</p>
            <p className="absolute top-0 right-0 p-5">
              <a
                href={project.demoLink}
                rel="noreferrer"
                target="_blank"
                style={{ textDecoration: "underline" }}>
                <i class="fa-solid fa-arrow-up-right-from-square text-sm rounded bg-blue-800 text-white p-2"></i>
              </a>
            </p>
            <p className="productOwner mb-3">
              Made By : {"    "}
              <span
                className="hover:text-blue-800 font-semibold "
                onClick={showModal}>
                {project.developer && project.developer.username}
              </span>
            </p>

            <p className="productRating">
              <StarRating rating={project.overAllRating || 0} />
            </p>
            <div className="flex w-full justify-between items-center">
              <p className=" text-2xl text-blue-600">
                <s className="text-black-700">
                  ₹ {parseInt(project.price * 1.3)}
                </s>{" "}
                ₹ {project.price}
              </p>
              <div>
                {order.map((or) => {
                    if (
                      or.project._id === project._id &&
                      or.project.sourceCode
                    ) {
                      return (
                        <button key={or.project._id} className="bg-blue-600 text-white p-3 rounded">
                          <a href={`${or.project.sourceCode}`}>Download</a>
                        </button>
                      );
                    }
                    return null;
                  })
                  .filter(Boolean)
                  .slice(0, 1)}
                {!order.some((or) => or.project._id === project._id) && (
                  <button
                    key={project._id}
                    className="bg-blue-600 text-white p-3 rounded"
                    onClick={() => {
                      navigate(`/payment/${project.slug}`);
                    }}>
                    Buy Now
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="ProjectNavigation br-2 category">
          <p onClick={() => setSelectedTab("Description")}>Description</p>
          <p onClick={() => setSelectedTab("PublishReview")}>Publish Review</p>
          <p onClick={() => setSelectedTab("AllReview")}>All Review</p>
        </div>
        <div className="ProjectDetails">{renderPage()}</div>
      </div>
      <Modal
        className="modal"
        title="Developer Info"
        footer={null}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <h1 style={{ font: "54px" }}>
          {project.developer && project.developer.firstname}{" "}
          {project.developer && project.developer.lastname}
        </h1>
        <p>
          <a
            rel="noreferrer"
            target="_blank"
            href={project.developer && project.developer.socialMedia}>
            GitHub
          </a>
        </p>
        <p>{project.developer && project.developer.bio}</p>
      </Modal>
    </div>
  );
};

const CompleteDesc = ({ description, synopsis }) => {
  return (
    <div className="desc category p-5">
      <div className="d">
        {description}
        <br />
        <br />
        <br />
        Below is Download Button for Synopsis for Project..
        <div className="mt-3">
          <button className="btn">
            <a className="text-white" href={synopsis} download>
              Download
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

const PublishReviewForm = ({ slug }) => {
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const { globalState } = useContext(GlobalContext);
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`/api/v1/projects/review/${slug}`, {
        reviewer: globalState._id, // replace with the actual reviewer ID
        title,
        rating: step,
        comment,
      });
      toast.success("Review Publish Successfully");
      console.log(response.data);
      setStep(0);
      setComment("");
      setTitle("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="signup-section publish-r">
      <form onSubmit={handleSubmit} className="form-signup">
        <div className="msg-box">
          <div className="input">
            <label>title</label>
            <input
              type="text"
              placeholder="Please Enter Your Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="input">
            <label>Rating: {step}</label>
            <input
              type="range"
              value={step}
              onChange={(e) => setStep(e.target.value)}
              min={1}
              max={5}
              step={1}
              placeholder="Please Enter Your Email"
            />
          </div>
        </div>
        <div className="input">
          <label>Comment</label>
          <textarea
            rows={5}
            type="text"
            placeholder="Please Enter Your Message"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <hr />
        <div className="submit ">
          <button className="btn">Submit</button>
        </div>
      </form>
    </div>
  );
};

const AllReviews = ({ slug }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/v1/projects/review/${slug}`);
        setReviews(response.data.reviews);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviews();
  }, [slug]);
  console.log(reviews);
  return (
    <div className="allReview">
      {reviews.map((review, index) => (
        <div className="review" key={index}>
          <div className="header">
            <h3>
              {review.reviewer.firstname} {review.reviewer.lastname}
            </h3>
            <h2>{review.rating}</h2>
          </div>
          <div className="r-desc">
            <h1>{review.title}</h1>
            <p>{review.comment}</p>
          </div>
          <div className="date">
            <p>{new Date(review.createdAt).toDateString()}</p>
          </div>
        </div>
      ))}
      {reviews.length > 0 ? " " : "No review for this project"}
    </div>
  );
};

export default SingleProject;
