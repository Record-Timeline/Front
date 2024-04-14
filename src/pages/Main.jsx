import "./Main.css"
import React from "react";
import MainTimeline from "../components/timeline/MainTimeline";

export default function Main() {
  return (
    <div className="Main">
      <h1 className="MyTimeline">My Timeline</h1>
      <h5 className="MyTimeline">내 커리어를 타임라인으로 기록해보세요</h5>
      <section>
        <MainTimeline />
      </section>
    </div>
  );
}