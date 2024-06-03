/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export default function OutlineButton({ onClick, children, ...props }) {
  return (
    <button
      css={css`
          color: ${props.color || "#595959"};
          border: ${props.border || "1px solid #595959"};
          margin: ${props.margin};
          padding: ${props.padding || "6px 13px"} ;
          font-size: ${props.fontSize || "13px"};
          font-weight: 500;
        background-color: white;
        border-radius: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        text-decoration: none;
      `}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
