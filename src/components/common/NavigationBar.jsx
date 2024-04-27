/** @jsxImportSource @emotion/react */

import Logo from "../../assets/images/recodeTimelineLogo.svg";
import { css } from "@emotion/react";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
export default function NavigationBar() {
  const [isExpanded, setIsExpanded] = useState(true); // 네비게이션 바 펼친 상태 & 접힌 상태

  const toggleNavigationBar = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div
      css={css`
        width: ${isExpanded ? "350px" : "300px"};
        box-shadow: ${isExpanded ? "1px 0px 5px -3px #8b8b8b" : "none"};
        height: 100vh;
        display: flex;
        flex-direction: column;
        transition: width 0.2s ease; // 네비게이션 바 없어지는 모션
      `}
    >
      <div
        css={css({
          display: "flex",
          alignItems: "center",
          margin: "30px 20px 0px 38px",
        })}
      >
        <img
          src={Logo}
          alt="record timeline"
          css={css`
            width: ${isExpanded ? "180px" : "0px"};
            overflow: hidden;
          `}
        />
        {isExpanded ? (
          <KeyboardDoubleArrowLeftIcon
            onClick={toggleNavigationBar}
            style={{
              fontSize: "28px",
              color: "#666666",
              cursor: "pointer",
              marginLeft: "auto",
            }}
          />
        ) : (
          <>
            <MenuIcon
              onClick={toggleNavigationBar}
              style={{
                fontSize: "28px",
                color: "#333333",
                cursor: "pointer",
              }}
            />
            <img
              src={Logo}
              alt="record timeline"
              css={css({
                width: "165px",
                marginLeft: "10px",
              })}
            />
          </>
        )}
      </div>
    </div>
  );
}
