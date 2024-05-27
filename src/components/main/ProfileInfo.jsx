import React from "react";
import { css } from "@emotion/react";
import ProfileNickName from "./ProfileNickName";
import testProfileImg from "../../assets/images/testProfileImg.png";

export default function ProfileInfo({
                                      profileImgSrc,
                                      nickName,
                                      introduce,
                                      followers,
                                    }) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <ProfileNickName src={profileImgSrc || testProfileImg} nickName={nickName} />
      {introduce && ( // introduce가 존재하는 경우에만 렌더링
        <div
          css={css`
            width: 145px;
            text-align: center;
            font-size: 14px;
            font-weight: 400;
            word-break: keep-all;
          `}
        >
          {introduce.length > 25 ? `${introduce.slice(0, 25)}...` : introduce}
        </div>
      )}
      <div
        css={css`
          text-align: center;
          color: #6d6d6d;
          font-size: 13px;
          font-weight: 400;
          margin-top: 10px;
        `}
      >
        팔로워 {followers}명
      </div>
    </div>
  );
}
