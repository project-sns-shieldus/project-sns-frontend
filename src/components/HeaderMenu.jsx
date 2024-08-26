import "../css/HeaderMenu.css";
import message from "src/assets/img/Message circle.svg";
import bell from "src/assets/img/Bell.svg";
import compass from "src/assets/img/Compass.svg";
import user from "src/assets/img/User.svg";
import vertical from "src/assets/img/More vertical.svg";

function HeaderMenu() {
  return (
    <>
      <div className="image-container">
        <img src={message} alt="메세지 아이콘" />
        <img src={bell} alt="알림 아이콘" />
        <img src={compass} alt="탐색 아이콘" />
        <img src={user} alt="유저 아이콘" />
        <img src={vertical} alt="더보기 아이콘" />
      </div>
    </>
  );
}
export default HeaderMenu;
