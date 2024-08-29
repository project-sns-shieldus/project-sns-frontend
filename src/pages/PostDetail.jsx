import React, { useState, useEffect, useRef } from 'react';
import '../css/PostDetail.css';
import moreHorizontal from 'src/assets/img/MoreHorizontal.svg';
import moreVertical from 'src/assets/img/More vertical.svg';
import heart from 'src/assets/img/Heart.svg';
import edit from 'src/assets/img/Edit 3.svg';
import sendIcon from 'src/assets/img/Comment.svg';
import deleteIcon from 'src/assets/img/Delete.svg';

export default function PostDetail() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    const [isCommentBoxVisible, setIsCommentBoxVisible] = useState(false);
    const [comment, setComment] = useState('');
    const modalRef = useRef(null);

    const toggleModal = (event) => {
        const buttonRect = event.target.getBoundingClientRect();
        setModalPosition({ top: buttonRect.bottom + window.scrollY, left: buttonRect.left + window.scrollX });
        setIsModalOpen(!isModalOpen);
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

    const handleSendClick = () => {
        // TODO: Send comment to the server (implement API call here)
        console.log('Comment sent:', comment);

        // Reset state after sending comment
        setIsCommentBoxVisible(false);
        setComment('');
    };

    const handleDeleteClick = () => {
        // Reset state if cancel is clicked
        setIsCommentBoxVisible(false);
        setComment('');
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
                        <p className='user-name'>username</p>
                    </div>
                    <img
                        className='post-detail-option'
                        src={moreHorizontal}
                        alt="More options"
                        onClick={toggleModal}
                    />
                </div>

                <img
                    src='https://media.4-paws.org/1/e/d/6/1ed6da75afe37d82757142dc7c6633a532f53a7d/VIER%20PFOTEN_2019-03-15_001-2886x1999-1920x1330.jpg'
                    alt="Post"
                />
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
                                <p className='post-detail-commenter-user-name'>username</p>
                                <textarea
                                    className='post-detail-comments-new'
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
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
                <div className='post-detail-comments-box'>
                    <div className='post-detail-comments'>
                        <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' alt="Commenter" />
                        <div>
                            <p className='post-detail-commenter-user-name'>username</p>
                            <p className='post-detail-comments-content'>댓글 예시 댓글 예시 댓글 예시 댓글 예시 댓글 예시 댓글 예시 댓글 예시 댓글 예시 댓글 예시 댓글 예시 댓글 예시 댓글 예시 댓글 예시 </p>
                        </div>
                    </div>
                    <img
                        className='comment-option'
                        src={moreVertical}
                        alt="Comment options"
                        onClick={toggleModal}
                    />
                </div>

                {isModalOpen && (
                    <div
                        className="modal"
                        ref={modalRef}
                        style={{ top: modalPosition.top, left: modalPosition.left }}
                    >
                        <ul>
                            <li onClick={handleMenuClick}><img src={edit}/>댓글 수정</li>
                            <li onClick={handleMenuClick}><img src={sendIcon}/>답글 달기</li>
                            <li onClick={handleMenuClick}><img src={deleteIcon}/>댓글 삭제</li>
                        </ul>

                        {/* 
                        내가 쓴 댓글이 안닐 시 아래 모달이 떠야 합니다!

                        <ul>
                            <li onClick={handleMenuClick}><img src={sendIcon}/>답글 달기</li>
                            <li onClick={handleMenuClick}><img src={deleteIcon}/>댓글 삭제</li>
                        </ul>
                        */}
                    </div>
                )}
            </div>
        </div>
    );
}
