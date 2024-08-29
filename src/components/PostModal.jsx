import React, { useState } from "react";
import { postApi } from "../api/controller/postApi";
import { imageApi } from "../api/controller/imageApi";
import "../css/PostModal.css";
import xIcon from "../assets/img/X.svg";

export default function PostModal({ onClose }) {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async () => {
    const userId = localStorage.getItem("userId");

    try {
      const response = await postApi.createPost(userId, content);
      const postId = response.data.postId;

      if (image) {
        const formData = new FormData();
        formData.append("fileName", image);
        await imageApi.createImage(postId, formData);
      }

      alert("게시물이 성공적으로 업로드되었습니다.");
      onClose();
    } catch (error) {
      console.error("게시물 업로드 중 오류 발생:", error);
      alert("게시물 업로드에 실패했습니다.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <span>username</span>
          <button onClick={onClose} className="close-modal">
            {/* X */}
            <img src={xIcon}></img>
          </button>
        </div>
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder="텍스트 입력란..."
        />
        <input type="file" onChange={handleImageChange} />
        <button onClick={handleSubmit} className="submit-post">
          <p>게시</p>
        </button>
      </div>
    </div>
  );
}
