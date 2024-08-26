import "../css/HeaderContainer.css";
import HeaderLogo from "./HeaderLogo";
import HeaderMenu from "./HeaderMenu";

export default function HeaderContainer() {
  return (
    <div className="Header">
      <HeaderLogo></HeaderLogo>
      <HeaderMenu></HeaderMenu>
    </div>
  );
}
