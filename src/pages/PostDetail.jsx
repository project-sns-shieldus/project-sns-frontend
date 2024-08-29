import React, { useState, useEffect, useRef } from 'react';
import '../css/PostDetail.css';
import moreHorizontal from 'src/assets/img/MoreHorizontal.svg';
import moreVertical from 'src/assets/img/More vertical.svg';
import heart from 'src/assets/img/Heart.svg';
import edit from 'src/assets/img/Edit 3.svg';
import sendIcon from 'src/assets/img/Comment.svg';
import deleteIcon from 'src/assets/img/Delete.svg';
import { useParams } from 'react-router-dom';
import { postApi } from '../api/controller/postApi';
import { commentApi } from '../api/controller/commentApi';

export default function PostDetail() {
    const { id } = useParams();
    const currentUserId = localStorage.getItem("userId");
    const currentUsername = localStorage.getItem("username");

    const [post, setPost] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPostOptions, setIsPostOptions] = useState(false);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    const [isCommentBoxVisible, setIsCommentBoxVisible] = useState(false);
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
        setIsModalOpen(!isModalOpen);

        if (isPost) {
            setIsPostOptions(true);  // Show options for the post (edit, delete)
        } else {
            setIsPostOptions(false);  // Show edit if comment is owned by current user
        }
    };

    const closeModal = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setIsModalOpen(false);
        }
    };

    const handleMenuClick = () => {
        setIsModalOpen(false);
    };

    const handleEditClick = () => {
        setIsCommentBoxVisible(true);
    };

    const handleSendClick = async () => {
        console.log('Comment sent:', commentContent);

        try {
            await commentApi.createComment(id, localStorage.getItem("userId"), commentContent);
        } catch (error) {
            console.error("Error sending comment:", error);
        }

        setIsCommentBoxVisible(false);
        setCommentContent('');
        fetchCommentList();
    };

    const handleDeleteClick = () => {
        setIsCommentBoxVisible(false);
        setCommentContent('');
    };

    useEffect(() => {
        document.addEventListener("mousedown", closeModal);

        return () => {
            document.removeEventListener("mousedown", closeModal);
        };
    }, []);


    return (
        <div className='post-detail-container'>
            <div className='post-detail-box'>
                <div className='post-detail-user-basic-info'>
                    <div className='post-detail-user-info'>
                        <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' alt="User" />
                        <p className='user-name'>{post?.user?.username}</p>
                    </div>
                    <img
                        className='post-detail-option'
                        src={moreHorizontal}
                        alt="More options"
                        onClick={(e) => toggleModal(e, true)}
                    />
                </div>

                {/* Conditional rendering of the post image */}
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

                {/* Conditional Comment Box */}
                {isCommentBoxVisible && (
                    <div className='post-detail-comments-box'>
                        <div className='post-detail-comments'>
                            <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' alt="Commenter" />
                            <div>
                                <p className='post-detail-commenter-user-name'>{localStorage.getItem("username")}</p>
                                <textarea
                                    className='post-detail-comments-new'
                                    value={commentContent}
                                    onChange={(e) => setCommentContent(e.target.value)}
                                    placeholder="Write a comment..."
                                />
                            </div>
                        </div>
                        <div className="comment-actions">
                            <img
                                src={sendIcon}
                                alt="Send"
                                onClick={handleSendClick}
                                style={{ cursor: 'pointer', marginRight: '10px' }}
                            />
                            <img
                                src={deleteIcon}
                                alt="Delete"
                                onClick={handleDeleteClick}
                                style={{ cursor: 'pointer' }}
                            />
                        </div>
                    </div>
                )}

                {/* Comments Section */}
                {commentList?.map((comment) => (
                    <div className='post-detail-comments-box' key={comment.id}>
                        <div className='post-detail-comments'>
                            <img src={comment.user.profileImage || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} alt="Commenter" />
                            <div>
                                <p className='post-detail-commenter-user-name'>{comment.user.username}</p>
                                <p className='post-detail-comments-content'>{comment.content}</p>
                            </div>
                        </div>
                        <img
                            className='comment-option'
                            src={moreVertical}
                            alt="Comment options"
                            onClick={(e) => toggleModal(e, false, comment.user.username)} // Pass the comment's userId
                        />

                        {/* Modal for each comment */}
                        {isModalOpen && modalPosition.commentId === comment.id && (

                            <div
                                className="modal"
                                ref={modalRef}
                                style={{ top: modalPosition.top, left: modalPosition.left }}
                            >
                                {isPostOptions === true ? (
                                    <ul>
                                        <li onClick={handleMenuClick}><img src={edit} alt="edit" /> 게시물 수정</li>
                                        <li onClick={handleMenuClick}><img src={deleteIcon} alt="delete" /> 게시물 삭제</li>
                                    </ul>
                                ) : (
                                    <ul>
                                        {comment.user.username === localStorage.getItem("username") ? (
                                            <>
                                                <li onClick={handleMenuClick}><img src={edit} alt="edit" /> Edit</li>
                                                <li onClick={handleMenuClick}><img src={sendIcon} alt="reply" /> Reply</li>
                                                <li onClick={handleMenuClick}><img src={deleteIcon} alt="delete" /> Delete</li>
                                            </>
                                        ) : (
                                            <>
                                                <li onClick={handleMenuClick}><img src={sendIcon} alt="reply" /> Reply</li>
                                                <li onClick={handleMenuClick}><img src={deleteIcon} alt="delete" /> Delete</li>
                                            </>
                                        )}
                                    </ul>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
