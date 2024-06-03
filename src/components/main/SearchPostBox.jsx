/** @jsxImportSource @emotion/react */

import React from "react";
import { css } from "@emotion/react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
export default function SearchPostBox({
  nickName,
  title,
  category,
  commentNum,
  heartNum,
  scrapNum,
  startDate,
                                        endDate,
}) {
  return (
    <div
      css={css`
        display: flex;
        width: 720px;
        flex-direction: column;
        border: 1px solid #b8b6b6;
        border-radius: 5px;
        margin-top: 10px;
        font-size: 14px;
        padding: 15px 20px;
        color: #474747;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <div>{nickName}</div>
        <div
          css={css`
            margin-left: 10px;
            margin-top: -3px;
            text-align: center;
            border-radius: 30px;
            background: #d9d9d9;
            padding: 2px 8px;
          `}
        >
          {category}
        </div>
      </div>

      <div
        css={css`
          font-weight: 600;
          font-size: 21px;
          color: black;
          margin: 3px 0px 2px 0px;
        `}
      >
        {title}
      </div>
      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <div>댓글 {commentNum}</div>
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          <FavoriteBorderIcon
            style={{
              fontSize: "17px",
              margin: " 0px 2px 0px 8px",
            }}
          />
          {heartNum}
        </div>
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          <BookmarkBorderIcon
            style={{
              fontSize: "18px",
              margin: " 0px 1px 0px 8px",
            }}
          />
          {scrapNum}
        </div>
        <div
          css={css`
            margin-left: 12px;
          `}
        >
          {  startDate
          } ~ {  endDate
        }
        </div>
      </div>
    </div>
  );
}
