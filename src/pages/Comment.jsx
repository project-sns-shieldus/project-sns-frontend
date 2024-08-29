import React, { useState, useRef, useEffect } from 'react';
import moreVertical from 'src/assets/img/More Vertical.svg';
import edit from 'src/assets/img/Edit 3.svg';
import sendIcon from 'src/assets/img/Comment.svg';
import deleteIcon from 'src/assets/img/Delete.svg';

export default function Comment({ comment, currentUserId, currentUsername }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
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

    useEffect(() => {
        document.addEventListener("mousedown", closeModal);
        return () => {
            document.removeEventListener("mousedown", closeModal);
        };
    }, []);

    const handleMenuClick = () => {
        setIsModalOpen(false);
    };

    const handleEditClick = () => {
        setIsModalOpen(false);
        // Add your edit logic here
    };

    const handleDeleteClick = () => {
        setIsModalOpen(false);
        // Add your delete logic here
    };

    return (
        <div className='post-detail-comments-box'>
            <div className='post-detail-comments'>
                <img
                    src={comment.user.profileImage || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
                    alt="Commenter"
                />
                <div>
                    <p className='post-detail-commenter-user-name'>{comment.user.username}</p>
                    <p className='post-detail-comments-content'>{comment.content}</p>
                </div>
            </div>
            <img
                className='comment-option'
                src={moreVertical}
                alt="Comment options"
                onClick={toggleModal}
            />

            {isModalOpen && (
                <div
                    className="modal"
                    ref={modalRef}
                    style={{ top: modalPosition.top, left: modalPosition.left }}
                >
                    <ul>
                        {comment.user.username === currentUsername ? (
                            <>
                                <li onClick={handleEditClick}><img src={edit} alt="edit" /> Edit</li>
                                <li onClick={handleMenuClick}><img src={sendIcon} alt="reply" /> Reply</li>
                                <li onClick={handleDeleteClick}><img src={deleteIcon} alt="delete" /> Delete</li>
                            </>
                        ) : (
                            <>
                                <li onClick={handleMenuClick}><img src={sendIcon} alt="reply" /> Reply</li>
                                <li onClick={handleDeleteClick}><img src={deleteIcon} alt="delete" /> Delete</li>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}
