/** @jsxImportSource @emotion/react */

import * as React from "react";
import {useState} from "react";
import { css } from "@emotion/react";
import Button from  "./Button"
import ProfileNickName from "../main/ProfileNickName";
import testProfileImg from "../../assets/images/testProfileImg.png";

export default function Profile() {
    const nickName = "닉네임"; // 테스트 닉네임
    const interestCategory = "개발자"; // 테스트 관심분야
    const followers = 20;
    const followings = 30;

    return (
        <div
            css={css({
                width: "100%",
                height: "340px",
                marginBottom: "80px",
                backgroundColor: "#F2F5FA"
            })}
        >
            <div // 사진, 닉네임, 관심분야, 소개 감싸는 div
                css={css({
                    display: "inline-block",
                    alignItems: "left",
                    flexDirection: "column",
                    margin: "40px 0px 0px 400px",
                    // border: "1px solid lightgray",
                })}
            >
                <img // 프로필 이미지
                    src={testProfileImg}
                    alt="프로필 이미지"
                    css={css({
                        width: "100px",
                        display: "inline-block",
                        verticalAlign: "bottom",
                        // border: "1px solid lightgray",
                    })}
                />
                <div css={css({display: "inline-block",})}>
                    <div
                        css={css({
                            fontSize: "25px",
                            fontWeight: "700",
                            marginLeft: "25px",
                            display: "inline-block",
                        })}
                    >
                        {nickName}
                    </div>
                    <div
                        css={css({
                            fontSize: "15px",
                            color: "#5D5D5D",
                            marginLeft: "5px",
                            display: "inline-block"
                        })}
                    >
                        님의 타임라인
                    </div>
                    <div // 관심 분야
                        css={css({
                            width: "80px",
                            borderRadius: "20px",
                            backgroundColor: "#829FD7",
                            color: "white",
                            textAlign: "center",
                            fontSize: "15px",
                            fontWeight: "200",
                            marginTop: "3px",
                            // marginBottom: "10px",
                            marginLeft: "25px",
                            padding: "4px 0px",
                        })}
                    >
                        {interestCategory}
                    </div>
                </div>
                <div
                    css={css({
                        height: "65px",
                        fontSize: "15px",
                        color: "black",
                        marginLeft: "60px",
                        borderLeft: "3px solid #6E6E6E",
                        verticalAlign: "bottom",
                        display: "inline-block",
                        padding: "10px 15px",
                    })}
                >
                    어쩌구 저쩌구 하고싶은 개발자 누구누구 입니다~<br/>
                    프론트엔드, 백엔드 모두 공부중입니다 ~_~
                </div>
                <div>
                    <Button
                        width="120px"
                        height="35px"
                        lineHeight="15px" // 나중에 깨지면 지우기
                        margin="28px 0 0 0"
                        backgroundColor="#fff"
                        border="1px solid #D7D7D7"
                        textColor="#424242"
                        fontSize="15px"
                        borderRadius="30px"
                        css={css({display: "inline-block",})}
                    >
                        팔로우
                    </Button>
                    <Button
                        width="150px"
                        height="35px" // 나중에 깨지면 지우기
                        lineHeight="15px"
                        margin="28px 0 0 230px"
                        backgroundColor="none"
                        border="2px solid #829FD7"
                        textColor="#7286AD"
                        fontSize="15px"
                        borderRadius="30px"
                        css={css({display: "inline-block"})}
                    >
                        경력 사항 보기
                    </Button>
                </div>
                <div
                    css={css({
                        width: "250px",
                        height: "78px",
                        borderRadius: "30px",
                        backgroundColor: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                        marginTop: "15px",
                    })}
                >
                    <div css={css({marginLeft: "20px"})}>
                        <div css={css({textAlign: "center", fontSize: "20px"})}>
                            {followers}
                        </div>
                        <div css={css({textAlign: "center", fontSize: "13px"})}>
                            팔로워
                        </div>
                    </div>
                    <div css={css({marginRight: "20px"})}>
                        <div css={css({textAlign: "center", fontSize: "20px"})}>
                            {followings}
                        </div>
                        <div css={css({textAlign: "center", fontSize: "13px"})}>
                            팔로잉
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
