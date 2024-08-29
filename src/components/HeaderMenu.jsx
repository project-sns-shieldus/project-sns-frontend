import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../css/HeaderMenu.css";
import "../css/Modal.css";
import message from "src/assets/img/Message circle.svg";
import bell from "src/assets/img/Bell.svg";
import compass from "src/assets/img/Compass.svg";
import user from "src/assets/img/User.svg";
import vertical from "src/assets/img/More vertical.svg";
import link from "src/assets/img/Link.svg";
import option from "src/assets/img/Option.svg";
import logout from "src/assets/img/Logout.svg";

function HeaderMenu() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef(null);
    const buttonRef = useRef(null);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const closeModal = (e) => {
        if (
            modalRef.current && !modalRef.current.contains(e.target) &&
            buttonRef.current && !buttonRef.current.contains(e.target)
        ) {
            setIsModalOpen(false);
        }
    };

    const handleMenuClick = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        document.addEventListener("mousedown", closeModal);

        // Cleanup the event listener when the component unmounts
        return () => {
            document.removeEventListener("mousedown", closeModal);
        };
    }, []);

    return (
        <>
            <div className="image-container">
                <Link to="/message"><img src={message} alt="메세지 아이콘" /></Link>
                <Link to="/notification"><img src={bell} alt="알림 아이콘" /></Link>
                <Link to="/Navigate"><img src={compass} alt="탐색 아이콘" /></Link>
                <Link to="/Profile"><img src={user} alt="유저 아이콘" /></Link>
                <img
                    src={vertical}
                    alt="더보기 아이콘"
                    onClick={toggleModal}
                    ref={buttonRef}
                />
                {isModalOpen && (
                    <div className="modal" ref={modalRef}>
                        <ul>
                            <li onClick={handleMenuClick}><img src={link}/>링크 복사</li>
                            <li onClick={handleMenuClick}><img src={option}/>설정</li>
                            <li onClick={handleMenuClick}><img src={logout}/>로그아웃</li>
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
}

export default HeaderMenu;
