/** @jsxImportSource @emotion/react */

import React from "react";
import { css } from "@emotion/react";

export default function ProfileNickName({ profileImgSrc, nickName }) {
  return (
    <div
      css={css({
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        margin: "40px 0px 20px 0px",
        fontSize: "21px",
        fontWeight: "500",
      })}
    >
      <img
        src={profileImgSrc}
        alt="프로필 이미지"
        css={css({
          width: "150px",
          marginBottom: "20px",
        })}
      />
      <div>{nickName}</div>
    </div>
  );
}
