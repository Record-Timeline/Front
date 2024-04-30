import "./Main.css"
import React from "react";
import MainTimeline from "../components/timeline/MainTimeline";
import Button from "../components/common/Button";
import styled from "styled-components";

export default function Main() {
    return (
        <div className="Main">
            <h1 className="MyTimeline">My Timeline</h1>
            <h5 className="MyTimeline">내 커리어를 타임라인으로 기록해보세요</h5>
            <section>
                <MainTimeline />
                <MainTimeline />
                <MainTimeline />
                <Button
                    width="760px"
                    height="70px"
                    margin="0 auto"
                    backgroundColor="#f8f6f6"
                    textColor="#717171"
                    fontSize="35px"
                >
                    +
                </Button>
            </section>
        </div>
    );
}
