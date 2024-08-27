import "../css/HeaderMenu.css";
import message from "src/assets/img/Message circle.svg";
import bell from "src/assets/img/Bell.svg";
import compass from "src/assets/img/Compass.svg";
import user from "src/assets/img/User.svg";
import vertical from "src/assets/img/More vertical.svg";
import { Link } from "react-router-dom";

function HeaderMenu() {
    return (
        <>
            <div className="image-container">
                <Link to="/message"><img src={message} alt="메세지 아이콘" /></Link>
                <Link to="/notification"><img src={bell} alt="알림 아이콘" /></Link>
                <Link to="/Navigate"><img src={compass} alt="탐색 아이콘" /></Link>
                <Link to="/Profile"><img src={user} alt="유저 아이콘" /></Link>
                <img src={vertical} alt="더보기 아이콘" />
            </div>
        </>
    );
}
export default HeaderMenu;
