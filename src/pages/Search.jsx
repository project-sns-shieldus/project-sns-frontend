import React, { useState } from 'react';
import { userApi } from '../api/controller/userApi';

export default function Search() {
    const [searchUserId, setSearchUserId] = useState("");
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    // 사용자 검색
    const handleSearch = async () => {
        try {
            const response = await userApi.getUser(searchUserId);
            setUser(response.data);
            setError(""); // 오류 메시지 초기화
        } catch (err) {
            console.error("사용자 검색 중 오류 발생:", err);
            setError("사용자를 찾을 수 없습니다.");
            setUser(null);
        }
    };

    // 팔로우 기능
    const handleFollow = async () => {
        const loggedInUserId = localStorage.getItem('userId'); // 로그인된 사용자 ID
        try {
            await userApi.addFollowing(loggedInUserId, user.userId);
            alert("팔로우 성공!");
        } catch (err) {
            console.error("팔로우 중 오류 발생:", err);
            setError("팔로우에 실패했습니다.");
        }
    };

    return (
        <div>
            <h1>사용자 검색</h1>
            <input
                type="text"
                placeholder="유저 ID를 입력하세요"
                value={searchUserId}
                onChange={(e) => setSearchUserId(e.target.value)}
            />
            <button onClick={handleSearch}>검색</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {user && (
                <div style={{ marginTop: '10px', border: '1px solid #ccc', padding: '10px' }}>
                    <p>유저 이름: {user.username}</p>
                    <p>유저 ID: {user.userId}</p>
                    <button onClick={handleFollow}>팔로우</button>
                </div>
            )}
        </div>
    );
}
