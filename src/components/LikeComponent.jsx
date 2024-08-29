import React, { useState, useEffect } from "react";
import "../css/LikeComponent.css";
import heartIcon from "../assets/img/Heart.svg";
import filledHeartIcon from "../assets/img/filled-Heart.svg";
import { postLikeApi } from "../api/controller/postLikeApi";

const LikeComponent = ({ postId }) => {
  const [hasLiked, setHasLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  // const [likeId, setLikeId] = useState(null);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchLikes = async () => {
      // console.log(`Fetching likes for post: ${postId}`);

      try {
        const response = await postLikeApi.getLikesByPostId(postId, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(
          "Likes fetched successfully. Total likes:",
          response.data.length
        );

        setLikesCount(response.data.length);

        // 누가 좋아요를 눌렀는지 출력 및 내 userId 확인
        console.log("Users who liked this post:");
        response.data.forEach((like) => {
          if (like.user.userId === parseInt(userId, 10)) {
            setHasLiked(true);
          }
        });
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };

    fetchLikes();
  }, [postId, userId, token]);

  // 이때 LikeId가 undefined로 나옴
  const handleLike = async () => {
    if (hasLiked) {
      console.log(
        "You have already liked this post. Like action will not proceed."
      );
      return; // 좋아요가 이미 눌린 상태에서 다시 눌리지 않도록 처리
    }

    try {
      const response = await postLikeApi.likePost(postId, userId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setHasLiked(true);
      setLikesCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <div className="heart-compo">
      <img
        src={hasLiked ? filledHeartIcon : heartIcon}
        alt="Like"
        className={`heart-icon ${hasLiked ? "liked" : ""}`}
        onClick={handleLike}
        style={{ cursor: hasLiked ? "not-allowed" : "pointer" }} // 좋아요가 눌린 상태면 커서를 비활성화
      />
      <p className="like-value">{likesCount} Likes</p>
    </div>
  );
};

export default LikeComponent;
