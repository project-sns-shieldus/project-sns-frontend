import { Link } from "react-router-dom";
import "../css/HeaderContainer.css";
import HeaderLogo from "./HeaderLogo";
import HeaderMenu from "./HeaderMenu";

export default function HeaderContainer() {
    return (
        <div className="Header">
            <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit'}}><HeaderLogo/></Link>
            <HeaderMenu></HeaderMenu>
        </div>
    );
}
