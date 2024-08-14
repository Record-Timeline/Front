/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

export default function Header(props) {

  return (
    <div
      css={css`
        width: 100%;
        height: 50px;
        background-color: ${props.backgroundColor || "none"};
        display: flex;
        align-items: center;
        padding: 50px 0px 10px 0px;
      `}
    >
      <div
        css={css`
          margin-left: auto;
          padding: 8px 18px;
          align-items: center;
          justify-content: center;
          border-radius: 30px;
          background: #829fd7;
          cursor: pointer;
          color: #ffffff;
          font-size: 15px;
          font-weight: 200;
        `}
      >
        {/* 로그인 되어있으면 "내 타임라인" 버튼, 로그인 안 되어있으면 "시작하기" 버튼 */}
        {!!localStorage.getItem("token") ? (
          <Link to={"/mytimeline"} css={css`
            text-decoration: none;
              color: white;
        `}>내 타임라인</Link>
        ) : (
          <Link to={"/login"} css={css`
            text-decoration: none;
              color: white;
        `}>시작하기</Link>
        )}
      </div>
      <Link to="/search">
        <SearchIcon
          style={{
            fontSize: "30px",
            cursor: "pointer",
            color: "#525252",
            margin: "5px 40px 0px 12px",
          }}
        />
      </Link>
    </div>
  );
}
