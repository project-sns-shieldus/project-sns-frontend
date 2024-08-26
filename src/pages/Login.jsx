import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";
import logo from "../assets/img/delta-blu.svg";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("로그인 시도:", { username, password });
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <div className="login-logo">
          <img src={logo} alt="Delta Logo" />
          <a>Delta</a>
        </div>
        <input
          type="text"
          placeholder="사용자 이름"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="login-btn"
          type="button"
          onClick={() => navigate("/home")}
        >
          <a>LOGIN</a>
        </button>
        <div className="signup-link">
          <a>계정이 없으신가요? </a>
          <span onClick={() => navigate("/signup")}>회원가입</span>
        </div>
      </form>
    </div>
  );
}

export default Login;
