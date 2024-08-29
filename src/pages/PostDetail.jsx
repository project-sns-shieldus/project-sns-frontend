import React, { useState, useEffect, useRef } from 'react';
import '../css/PostDetail.css';
import moreHorizontal from 'src/assets/img/MoreHorizontal.svg';
import heart from 'src/assets/img/Heart.svg';
import edit from 'src/assets/img/Edit 3.svg';
import sendIcon from 'src/assets/img/Comment.svg';
import deleteIcon from 'src/assets/img/Delete.svg';
import { useParams } from 'react-router-dom';
import { postApi } from '../api/controller/postApi';
import { commentApi } from '../api/controller/commentApi';
import Comment from './Comment';

export default function PostDetail() {
    const { id } = useParams();
    const currentUserId = localStorage.getItem("userId");
    const currentUsername = localStorage.getItem("username");

    const [post, setPost] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPostOptions, setIsPostOptions] = useState(false);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    const [commentContent, setCommentContent] = useState('');
    const [commentList, setCommentList] = useState([]);
    const modalRef = useRef(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await postApi.getPostById(id);
                setPost(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching post data:", error);
            }
        };

        fetchPost();
    }, [id]);

    useEffect(() => {
        fetchCommentList();
    }, []);

    const fetchCommentList = async () => {
        try {
            const response = await commentApi.getCommentsByPostId(id);
            setCommentList(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching comment list data", error);
        }
    };

    const toggleModal = (event, isPost, commentUsername) => {
        const buttonRect = event.target.getBoundingClientRect();
        setModalPosition({ top: buttonRect.bottom + window.scrollY, left: buttonRect.left + window.scrollX });
        setIsModalOpen(true);

        if (isPost) {
            setIsPostOptions(true);
        } else {
            setIsPostOptions(false);
        }
    };

    const closeModal = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setIsModalOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", closeModal);

        return () => {
            document.removeEventListener("mousedown", closeModal);
        };
    }, []);

    const handleEditClick = () => {
        setIsModalOpen(false);
        // 수정 로직 작성
        setCommentContent(post.content);
    };

    const handleDeleteClick = () => {
        setIsModalOpen(false);
        // 삭제 로직 작성
        console.log("Delete post");
    };

    return (
        <div className='post-detail-container'>
            <div className='post-detail-box'>
                <div className='post-detail-user-basic-info'>
                    <div className='post-detail-user-info'>
                        <img src={post?.user?.profileImage || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} alt="User" />
                        <p className='user-name'>{post?.user?.username}</p>
                    </div>
                    <img
                        className='post-detail-option'
                        src={moreHorizontal}
                        alt="More options"
                        onClick={(e) => toggleModal(e, true)}
                    />
                </div>

                {post?.images?.length > 0 && (
                    <>
                        <img
                            src={`http://localhost:8080/uploads/${post.images[0].fileName}`}
                            alt="Post"
                        />
                        <p className='post-detail-content'>{post.content}</p>
                    </>
                )}

                <div className='post-detail-functions'>
                    <img src={heart} alt="Like" />
                    <img src={edit} alt="Edit" onClick={handleEditClick} />
                </div>

                {/* Comment Section */}
                <div className='post-detail-comments-section'>
                    {commentList?.map((comment) => (
                        <Comment
                            key={comment.id}
                            comment={comment}
                            currentUserId={currentUserId}
                            currentUsername={currentUsername}
                            toggleModal={toggleModal}
                        />
                    ))}
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <div
                        className="modal"
                        ref={modalRef}
                        style={{ top: modalPosition.top, left: modalPosition.left }}
                    >
                        <ul>
                            {isPostOptions ? (
                                <>
                                    <li onClick={handleEditClick}><img src={edit} alt="edit" /> Edit Post</li>
                                    <li onClick={handleDeleteClick}><img src={deleteIcon} alt="delete" /> Delete Post</li>
                                </>
                            ) : (
                                <>
                                    <li onClick={() => setIsModalOpen(false)}><img src={sendIcon} alt="reply" /> Reply</li>
                                </>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
