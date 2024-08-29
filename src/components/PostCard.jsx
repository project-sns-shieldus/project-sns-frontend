import React, { useEffect, useState } from "react";
import "../css/PostCard.css";
import heartIcon from "../assets/img/Heart.svg";
import commentIcon from "../assets/img/Edit 3.svg";
import LikeComponent from "../components/LikeComponent";

import { imageApi } from "../api/controller/imageApi"; // imageApi import

export default function PostCard({ post }) {
  const [images, setImages] = useState([]); // 이미지 상태 추가

  // 이미지 가져오기
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await imageApi.getImagesByPostId(post.postId);
        setImages(response.data);
      } catch (error) {
        console.error("이미지 로드 중 오류 발생:", error);
      }
    };

    fetchImages();
  }, [post.postId]); // postId가 변경될 때마다 이미지 가져오기

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-author-avatar">
          {/* 아바타 이미지 또는 기본 아이콘 */}
          <img
            src={post.authorAvatar || "/src/assets/img/User-1.svg"}
            alt="Avatar"
          />
        </div>
        <h3 className="post-author-name">{post.postId}</h3>
      </div>

      {/* 이미지 렌더링 */}
      <div className="post-images">
        {images.map((image) => (
          <img
            key={image.imageId}
            src={`http://localhost:8080/uploads/${image.fileName}`} // 백엔드 서버의 URL로 변경
            alt="Post"
            className="post-image"
          />
        ))}
      </div>
      {/* 공백과 줄 바꿈을 유지하며 텍스트 렌더링 */}
      <p className="post-content" style={{ whiteSpace: "pre-wrap" }}>
        {post.content}
      </p>

      <div className="post-actions">
        <button className="like-button">
          {/* <img src={heartIcon} alt="Like" /> */}
          <LikeComponent postId={post.postId} />
        </button>
        <button className="comment-button">
          <img src={commentIcon} alt="Comment" />
          댓글 달기
        </button>
      </div>
    </div>
  );
}
