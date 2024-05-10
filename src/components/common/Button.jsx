/** @jsxImportSource @emotion/react */

import { Link } from "react-router-dom";
import { css } from "@emotion/react";

export default function Button(props) {
  return (
    <Link
      css={css`
        width: ${props.width || "350px"};
        height: ${props.height || "30px"};
        margin: ${props.margin};
        background-color: ${props.backgroundColor || "#829FD7"};
        color: ${props.textColor || "white"};
        font-size: ${props.fontSize || "18px"};
        font-weight: ${props.fontWeight || "500"};
        border: ${props.border || "none"};  
        border-radius: ${props.borderRadius || "20px"};
        display: ${props.display || "flex"};
        justify-content: center;
        align-items: center;
        text-align: center;
        line-height: ${props.lineHeight || "none"};  
        cursor: pointer;
        text-decoration: none;
        padding: 10px 20px;
      `}
      {...props}
    >
      {props.children}
    </Link>
  );
}
