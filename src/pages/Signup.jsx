import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Signup.css";
import logo from "../assets/img/delta-blu.svg";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 회원가입 처리 로직
    alert("회원가입이 완료되었습니다.");
    navigate("/"); // 회원가입 완료 후 팝업 노출 후 로그인 페이지로 이동
  };

  const handleCancel = () => {
    navigate("/"); // 취소 시 로그인 페이지로 이동
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSignup}>
        <div className="catchphrase">
          <div className="signup-logo">
            <img src={logo} alt="Delta Logo" />
            <a>Delta</a>
          </div>
          <p>Delta와 함께 새로운 경험을 시작하세요.</p>
        </div>
        <input
          type="text"
          placeholder="사용자 이름"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="이메일 주소"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <div className="button-group">
          <button
            type="button"
            onClick={handleCancel}
            className="cancel-button"
          >
            <a>가입 취소</a>
          </button>
          <button type="submit" className="signup-button">
            <a>회원가입</a>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
