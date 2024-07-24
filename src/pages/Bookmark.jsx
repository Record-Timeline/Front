/** @jsxImportSource @emotion/react */

import React from "react";
import { css } from "@emotion/react";
import SearchPostBox from "../components/main/SearchPostBox";
import Header from "../components/common/Header";

export default function Bookmark() {
  const bookmarkPostNum = 3; // 북마크 한 게시글 수

  const interestMapping = {
    "Marketing_Promotion": "마케팅/홍보/조사",
    "Accounting_Tax_Finance": "회계/세무/재무",
    "GeneralAffairs_LegalAffairs_Affairs": "총무/법무/사무",
    "IT_Data": "IT개발/데이터",
    "Design": "디자인",
    "Service": "서비스",
    "Construction_Architecture": "건설/건축",
    "MedicalCare": "의료",
    "Education": "교육",
    "Media_Culture_Sports": "미디어/문화/스포츠",
  };

  return (
    <div>
      <Header/>
      <div
        css={css({
          color: "#313131",
          textAlign: "center",
          fontSize: "30px",
          fontWeight: "700",
          margin: "20px 0 30px 0",
        })}
      >
        북마크한 게시물 <p css={css({color: "#939393", display: "inline-block", marginLeft: "8px"})}>{bookmarkPostNum}</p>
      </div>
      <div
        css={css({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        })}
      >
        <SearchPostBox
          key={1}
          nickName={"밍밍몽뮤뮤"}
          title={"헐~"}
          category={interestMapping["IT_Data"]}
          commentNum={20}
          heartNum={15}
          scrapNum={30}
          startDate={"2024-07-15"}
          endDate={"2024-07-31"}
          maintimelineId={4}
          memeberId={103}
        />
        <SearchPostBox
          key={2}
          nickName={"binni"}
          title={"안녕하세요"}
          category={interestMapping["IT_Data"]}
          commentNum={20}
          heartNum={15}
          scrapNum={30}
          startDate={"2024-07-15"}
          endDate={"2024-07-31"}
          maintimelineId={4}
          memeberId={103}
        />
        <SearchPostBox
          key={3}
          nickName={"별그리는바다"}
          title={"해가뜨기전에"}
          category={interestMapping["IT_Data"]}
          commentNum={20}
          heartNum={15}
          scrapNum={30}
          startDate={"2024-07-15"}
          endDate={"2024-07-31"}
          maintimelineId={4}
          memeberId={103}
        />
      </div>
    </div>
  );
}
