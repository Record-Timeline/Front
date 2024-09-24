/** @jsxImportSource @emotion/react */

import React, {useEffect, useState} from "react";
import {css} from "@emotion/react";
import {useParams, useLocation, useSearchParams} from 'react-router-dom';

export default function Comment() {
  return(
    <div
      css={css({
        width: "760px",
        margin: "0 auto",
        border: "1px solid black",
      })}
    >
      댓글
    </div>
  )
}