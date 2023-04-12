import React, { useContext } from "react";
import "./Posts.css";
// import Kratos from '../../assets/kratos.jpg'
// import GoW from '../../assets/GoW.jpg'
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SendIcon from "@mui/icons-material/Send";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { commentContext } from "../../context/comments";
import DefaultProfilePic from '../../assets/userdefault.png'
import { Link } from "react-router-dom";
function Posts({ dat, id, likePosts, UnlikePosts, comms, createComment }) {
  const { comment, setComment } = useContext(commentContext);

  return (
    <div className="Post">
      <div className="post_header">
        <img
          src={
            dat.postedBy.photo
              ? dat.postedBy.photo
              : DefaultProfilePic
          }
          alt=""
        />
        <p>
          <Link
            to={
              JSON.parse(localStorage.getItem("users"))._id === dat.postedBy._id
                ? "/profile"
                : `/profiles/${dat.postedBy._id}`
            }
          >
            {dat.postedBy.userName}
          </Link>
        </p>
      </div>
      <div className="post_content">
        <img src={dat.photo} alt="" />
      </div>
      <div className="post_footer">
        <div className="post_actions">
          <div className="post_like">
            {dat.likes.includes(
              JSON.parse(localStorage.getItem("users"))._id
            ) ? (
              <FavoriteIcon
                className="unlike"
                sx={{ color: "crimson" }}
                onClick={() => {
                  UnlikePosts(dat._id);
                }}
              />
            ) : (
              <FavoriteBorderIcon
                className="like"
                onClick={() => {
                  likePosts(dat._id);
                }}
              />
            )}
            <svg
            onClick={() => {
              comms(dat);
            }}
            aria-label="Comment"
            class="x1lliihq x1n2onr6"
            color="rgb(255, 255, 255)"
            fill="rgb(168, 168, 168)"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="20"
          >
            <title>Comment</title>
            <path
              d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
              fill="none"
              stroke="currentColor"
              stroke-linejoin="round"
              stroke-width="2"
            ></path>
          </svg>
            <p>{dat.likes.length} likes</p>
          </div>
        </div>
        <div className="post_caption">
          <p>
            <span>{dat.postedBy.userName}</span> {dat.body}
          </p>
        </div>
        <div className="view_comments">
          <p
            onClick={() => {
              comms(dat);
            }}
          >
            <b>{dat.comments?.length?`View all ${dat.comments?.length} comments`:""}</b>
          </p>
        </div>
        <div className="comment_box">
          <input
            type="text"
            name="comment"
            id="name"
            placeholder="Enter a comment..."
            onChange={(e) => setComment(e.target.value)}
          />
          <button onClick={() => createComment(comment, id)}>
            <SendIcon sx={{ backgroundColor: "#000" }} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Posts;
