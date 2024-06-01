/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export default function OutlineButton({ onClick, children, ...props }) {
  return (
    <button
      css={css`
        border: 1px solid #595959;
        color: #595959;
        background-color: white;
        padding: 6px 13px;
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
