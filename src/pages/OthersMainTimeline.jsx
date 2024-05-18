/** @jsxImportSource @emotion/react */

import * as React from "react";
import {useState} from "react";
import {css} from "@emotion/react";
import OthersProfile from "../components/common/OthersProfile";
import OthersTimelineItem from "../components/othersTimeline/OthersTimelineItem";

export default function OthersMainTimeline() {
    const [isDone, setIsDone] = useState(false);

    return (
        <div
            css={css({ // 주석 --> 타임라인 간의 선
                // position: "relative", // 상대적 위치 설정
                // '&::after': { // 타임라인 아이템들 사이에 선 추가
                //     content: '""',
                //     position: 'absolute',
                //     left: '541px', // 체크 표시 위치에 맞게 조정 --> 선 위치 절대적인거 수정해야됨
                //     top: '48px', // 첫 번째 아이템의 중간부터 시작
                //     width: '2px',
                //     height: 'calc(100% - 75px)', // 전체 높이에서 첫 번째 아이템 높이만큼 제외
                //     backgroundColor: '#E2E2E2', // 선의 색상
                // },
            })}
        >
            <OthersProfile />
            <OthersTimelineItem isDone={true}/>
            <OthersTimelineItem />
            <OthersTimelineItem isDone={true}/>
            <OthersTimelineItem />
        </div>
    )
}
