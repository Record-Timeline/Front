/** @jsxImportSource @emotion/react */

import * as React from 'react'
import {useState} from "react";
import {css} from "@emotion/react";
import Button from "../common/Button";
import {FiLock, FiUnlock} from "react-icons/fi";
import CustomizedSelects from "../timeline/CustomizedSelects";
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import dayjs from "dayjs";

const label = {inputProps: {'aria-label': 'Checkbox demo'}};

export default function ReadSubTimelinePost({item, onDelete, onEdit}) {
  const [isChecked, setIsChecked] = useState(false); // 타임라인 체크 circle 상태
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [like, setLike] = useState(204); // 좋아요 수 임의로 설정
  const [bookmark, setBookmark] = useState(53) // 북마크 수 임의로 설정

  const onClickLike = () => {
    if (isLiked) {
      setLike(like - 1); // 좋아요 해제 시 좋아요 수 감소
    } else {
      setLike(like + 1); // 좋아요 누를 시 좋아요 수 증가
    }
    setIsLiked(!isLiked); // 좋아요 상태 토글
  }

  const onClickBookmark = () => {
    if (isBookmarked) {
      setBookmark(bookmark - 1); // 북마크 해제 시 북마크 수 감소
    } else {
      setBookmark(bookmark + 1) // 북마크 누를 시 북마크 수 증가
    }
    setIsBookmarked(!isBookmarked); // 북마크 상태 토글
  }

  return (
    <div>
      <div css={css({marginBottom: "20px"})}>
        <div // SubTimelineItem2 (상단에 뜨는 아이템) (회색 박스)
          css={css({
            width: "680px",
            height: "65px",
            background: "#f8f6f6",
            borderRadius: "30px",
            boxShadow: "0 0 8px 0 rgba(0, 0, 0, 0.04)",
            textAlign: "center",
            margin: "0 auto", /* 페이지 중앙에 나타나도록 설정 */
            marginTop: "20px",
            marginBottom: "32px",
            display: "flex",
          })}
        >
          <div // 체크표시
            done={isChecked}
            onClick={() => setIsChecked(!isChecked)}
            css={css`
                width: 21px;
                height: 21px;
                border-radius: 50%;
                border: 3px solid #829FD7;
                float: left;
                display: inline-block;
                margin-top: 22px;
                margin-left: 35px;
                margin-right: 15px;
                cursor: pointer;
                background-color: ${isChecked ? "#829FD7" : "#f8f6f6"}; // 선 때문에 뚫린 원일 때도 배경 색 설정
            `}
          />
          <div // 기간
            css={css({
              // flex: "1.5",
              width: "200px",
              color: "#666",
              fontSize: "15px",
              fontStyle: "normal",
              fontWeight: "500",
              lineHeight: "65px",
              //float: left;
              textAlign: "left",
              marginLeft: "10px",
              display: "inline-block",
              // border: "1px solid black",
            })}
          >
            {dayjs(item.startDate).format('YYYY.MM.DD')} ~ {item.endDate ? dayjs(item.endDate).format('YYYY.MM.DD') : '진행중'}
          </div>
          <div // 타임라인 제목
            css={css({
              flex: "1",
              fontSize: "15px",
              //font-weight: 550;
              color: "#212121",
              //float: left;
              textAlign: "left",
              lineHeight: "65px",
              display: "inline-block",
              // border: "1px solid black",
            })}
          >
            {item.title}
          </div>
          <div // 공개 여부 (자물쇠 아이콘) (이 버전 vs 아래 버전 논의)
            css={css({
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "10px",
              marginRight: "40px",
              // border: "1px solid black",
            })}
          >
            {item.isPublic ? <FiUnlock/> : <FiLock/>} {/* 비공개면 FiLock, 공개면 FiUnlock : 삼항 연산자*/}
          </div>
        </div>
        <div // 텍스트 나오는 박스
          css={css({
            width: "680px",
            height: "570px",
            background: "#f8f6f6",
            borderRadius: "30px",
            boxShadow: "0 0 8px 0 rgba(0, 0, 0, 0.04)",
            textAlign: "left",
            margin: "0 auto", /* 페이지 중앙에 나타나도록 설정 */
          })}
        >
          <div
            css={css({
              height: "550px",
              fontSize: "15px",
              color: "#525252",
              padding: "50px",
              // overflowY: "scroll",
            })}
          >
            프로젝트 기획이란 프로젝트의 범위, 목표, 결과물, 일정, 필요한 자원, 위험을 설명하는 상세한 로드맵을 수립하는 것을 의미합니다. 프로젝트 기획은 프로젝트의 전반적인 목표, 주요
            이정표, 개별적인 작업에 대한 명확한 그림을 제공한다는 점에서 중요합니다.<br/>
            <br/>
            1단계: 프로젝트의 범위 설정<br/>
            이 단계에서는 프로젝트의 경계, 즉, 프로젝트에 포함되는 것과 포함되지 않는 것을 파악하기만 하면 됩니다. 그리고 어떤 목표를 달성해야 프로젝트가 성공적이었다고 말할 수 있는지를 생각해봐야
            하죠.
            수익 또는 고객 만족도 상승, 매출 또는 고객 기반 성장, 비용 절감 등이 그 예가 될 수 있습니다. 목표는 프로젝트의 결과물과 작업을 정하는 데도 도움이 됩니다.
            이 단계는 기획의 토대를 마련한다는 점에서 중요합니다. 또한, 프로젝트에 관한 큰 그림을 제공함으로써 팀 전체의 의욕을 높여주기도 하죠.<br/>
            <br/>
            2단계: 성공 측정 방식 설정<br/>
            3단계: 프로젝트를 작은 단위의 작업으로 분류<br/>
            4단계: 프로젝트 일정 수립<br/>
            5단계: 자원과 예산 배정<br/>
            6단계: 위험 식별<br/>
            ...

            {/*<br/><br/>*/} {/* 글 나오는 화면 바꾸기 예시 */}

            {/*프로젝트 기획이란 프로젝트의 범위, 목표, 결과물, 일정, 필요한 자원, 위험을 설명하는 상세한 로드맵을 수립하는 것을 의미합니다. 프로젝트 기획은 프로젝트의 전반적인 목표, 주요*/}
            {/*이정표, 개별적인 작업에 대한 명확한 그림을 제공한다는 점에서 중요합니다.<br/>*/}
            {/*<br/>*/}
            {/*1단계: 프로젝트의 범위 설정<br/>*/}
            {/*이 단계에서는 프로젝트의 경계, 즉, 프로젝트에 포함되는 것과 포함되지 않는 것을 파악하기만 하면 됩니다. 그리고 어떤 목표를 달성해야 프로젝트가 성공적이었다고 말할 수 있는지를 생각해봐야 하죠.*/}
            {/*수익 또는 고객 만족도 상승, 매출 또는 고객 기반 성장, 비용 절감 등이 그 예가 될 수 있습니다. 목표는 프로젝트의 결과물과 작업을 정하는 데도 도움이 됩니다.*/}
            {/*이 단계는 기획의 토대를 마련한다는 점에서 중요합니다. 또한, 프로젝트에 관한 큰 그림을 제공함으로써 팀 전체의 의욕을 높여주기도 하죠.<br/>*/}
            {/*<br/>*/}
            {/*2단계: 성공 측정 방식 설정<br/>*/}
            {/*3단계: 프로젝트를 작은 단위의 작업으로 분류<br/>*/}
            {/*4단계: 프로젝트 일정 수립<br/>*/}
            {/*5단계: 자원과 예산 배정<br/>*/}
            {/*6단계: 위험 식별<br/>*/}
            {/*...*/}
          </div>
        </div>
        <div // 좋아요, 북마크 감싸는 div
          css={css({
            width: "700px",
            textAlign: "right",
            margin: "0 auto",
            marginTop: "20px",
            // border: "1px solid #000",
          })}
        >
          <Checkbox
            like={isLiked} // 좋아요 버튼 눌렀는지 여부
            onClick={onClickLike}
            {...label}
            icon={<FavoriteBorder/>}
            checkedIcon={<Favorite/>}
            css={css({
              display: "inline-block",
              "&.Mui-checked": {
                color: "#A9BDE5",
              },
            })}
          />
          <p css={css({display: "inline-block",})}>{like}</p>
          <Checkbox
            bookmark={isBookmarked} // 북마크 버튼 눌렀는지 여부
            onClick={onClickBookmark}
            {...label}
            icon={<BookmarkBorderIcon/>}
            checkedIcon={<BookmarkIcon/>}
            css={css({
              display: "inline-block",
              "&.Mui-checked": {
                color: "#F7DB79",
              },
            })}
          />
          <p css={css({display: "inline-block", marginRight: "20px"})}>{bookmark}</p>
        </div>
        <div // 수정, 삭제 버튼 감싸는 div
          css={css({
            textAlign: "center",
            // marginTop: "20px",
            marginBottom: "50px",
            // border: "1px solid #f8f6f6",
          })}
        >
          <Button
            onClick={() => onDelete(item)}
            width="120px"
            height="40px"
            margin="0px 15px"
            backgroundColor="#FFF"
            textColor="#F19797"
            fontSize="15px"
            border="2px solid #FFBDBD"
            borderRadius="50px"
            display="inline-block"
            lineHeight="18px"
          >
            삭제하기
          </Button>
          <Button
            onClick={() => onEdit(item)}
            width="120px"
            height="40px"
            margin="0px 15px"
            backgroundColor="#FFF"
            textColor="#7286AD"
            fontSize="15px"
            border="2px solid #829FD7"
            borderRadius="50px"
            display="inline-block"
            lineHeight="18px"
          >
            수정하기
          </Button>
        </div>
      </div>
    </div>
  );
}
