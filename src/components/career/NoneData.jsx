/** @jsxImportSource @emotion/react */

import * as React from 'react';
import {css} from "@emotion/react";

export default function NoneData({messege}) {
  return (
    <div
      css={css({
        width: "530px",
        height: "100px",
        background: "opacity",
        borderRadius: "30px",
        boxShadow: "0 0 8px 0 rgba(0, 0, 0, 0.04)",
        margin: "0 auto", // 페이지 중앙에 나타나도록 설정
        marginTop: "10px",
        marginBottom: "20px",
        display: "flex", // 내부 요소를 정렬하기 위한 flex 설정
        justifyContent: "center", // 텍스트 가운데 정렬 (수평)
        alignItems: "center", // 텍스트 가운데 정렬 (수직)
      })}
    >
      {messege}
    </div>
  )
}