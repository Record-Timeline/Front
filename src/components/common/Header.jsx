/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div
      css={css`
        width: 100%;
        height: 90px;
        display: flex;
        align-items: center;
        margin-top: 30px;
      `}
    >
      <div
        css={css`
          margin-left: auto;
          padding: 6px 18px;
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
        시작하기
      </div>
      <Link to="/search">
        <SearchIcon
          style={{
            fontSize: "30px",
            cursor: "pointer",
            color: "#525252",
            margin: "0px 40px 0px 12px",
          }}
        />
      </Link>
    </div>
  );
}
