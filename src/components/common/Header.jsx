/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div
      css={css`
        height: 70px;
        display: flex;
        align-items: center;
      `}
    >
      <div
        css={css`
          margin-left: auto;
          padding: 6px 18px;
          align-items: center;
          justify-content: center;
          border-radius: 30px;
          background: #e6edf9;
          cursor: pointer;
          color: #737373;
          font-size: 17px;
          font-weight: 400;
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
            margin: "0px 30px 0px 7px",
          }}
        />
      </Link>
    </div>
  );
}
