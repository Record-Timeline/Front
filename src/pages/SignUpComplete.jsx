/** @jsxImportSource @emotion/react */

import Logo from "../assets/images/recodeTimelineLogo.svg";
import Button from "../components/common/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { css } from "@emotion/react";

export default function SignUpComplete() {
  const nickName = "레타";
  return (
    <div
      css={css`
        height: 100vh;
        font-size: 18px;
        color: #272727;
      `}
    >
      <img
        css={css`
          width: 200px;
          margin: 30px 0px 0px 35px;
        `}
        src={Logo}
        alt="레코드 타임라인"
      />
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          height: 80%;
          font-size: 32px;
          white-space: pre-wrap;
        `}
      >
        <CheckCircleIcon style={{ fontSize: "60px" }} />
        <div
          css={css`
            display: flex;
            font-weight: 600;
            margin: 40px 0px 10px 0px;
            font-size: 35px;
          `}
        >
          <div
            css={css`
              color: #829fd7;
            `}
          >
            {nickName}
          </div>
          님 환영합니다!
        </div>
        레코드 타임라인 회원가입이 완료되었습니다.
        <div
          css={css`
            display: flex;
            margin: 40px 0px 0px 0px;
          `}
        >
          <Button
            width="120px"
            height="40px"
            backgroundColor="#A4A3A3"
            margin="0px 10px 0px 0px"
            to="/"
          >
            메인으로
          </Button>
          <Button width="90px" to="/login" height="40px">
            로그인
          </Button>
        </div>
      </div>
    </div>
  );
}
