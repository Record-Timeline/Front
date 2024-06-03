/** @jsxImportSource @emotion/react */

import React from "react";
import { css } from "@emotion/react";
import testProfileImg from "../../assets/images/testProfileImg.png"

export default function ProfileNickName({ profileImgSrc, nickName }) {
  return (
    <div
      css={css({
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        marginBottom: "10px",
        fontSize: "19px",
        fontWeight: "500",
      })}
    >
      <img
        src={profileImgSrc? profileImgSrc : testProfileImg}
        alt="프로필 이미지"
        css={css({
          width: "130px",
          marginBottom: "20px",
        })}
      />
      <div>{nickName}</div>
    </div>
  );
}
