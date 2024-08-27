import { Route, Routes, useParams, useLocation, Navigate } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import SignUpComplete from "./pages/SignUpComplete";
import NavigationBar from "./components/common/NavigationBar";
import MainTimeline from "./pages/MainTimeline";
import Bookmark from "./pages/Bookmark";
import Search from "./pages/Search";
import SearchResult from "./pages/SearchResult";
import SubTimeline from "./pages/SubTimeline";
import OthersMainTimeline from "./pages/OthersMainTimeline";
import OthersSubTimeline from "./pages/OthersSubTimeline";
import ModifyProfile from "./pages/ModifyProfile";
import Follow from "./pages/Follow";
import OtherFollow from "./pages/OtherFollow";
import { CssBaseline } from "@mui/material";
import FindPassword from "./pages/FindPassword";
import FindPasswordCertification from "./pages/FindPasswordCertification";
import FindPasswordChange from "./pages/FindPasswordChange"
import PasswordChangeComplete from "./pages/PasswordChangeComplete";
import { useSelector } from 'react-redux';

function App() {
  const location = useLocation();
  const myMemberId = useSelector(state => state.memberId);
  const hideNavBarRoutes = ["/login", "/signup", "/signup/complete"];
  const shouldHideNavBar = () => {
    return hideNavBarRoutes.includes(location.pathname);
  };

  function ProtectedRoute({ element }) {
    const { memberId, mainTimelineId } = useParams();

    // Redux 상태의 myMemberId와 현재 URL에서의 memberId 파라미터와 비교
    if (String(myMemberId) === String(memberId)) {  // 멤버 ID가 같은 경우
      if(mainTimelineId) {
        // mainTimelineId가 있을 때는 서브 타임라인으로 이동
        return <Navigate to={`/subtimeline/${mainTimelineId}`} replace />;
      } else {
        // mainTimelineId가 없을 때는 메인 타임라인으로 이동
        return <Navigate to="/mytimeline" replace />;
      }
    } else if (myMemberId !== memberId && mainTimelineId) {
      // 멤버 ID가 다르고 mainTimelineId가 있는 경우 -> others 서브 타임라인
      return element;
    }
    // 조건에 해당하지 않으면 원래의 element 렌더링 -> others 메인 타임라인
    return element;
  }

  return (
    <div className="App">
      <CssBaseline></CssBaseline>
      {!shouldHideNavBar() && <NavigationBar />}
      <Routes>
        <Route path="/" element={<Main />} /> {/* 메인 */}
        <Route path="/login" element={<Login />} /> {/* 로그인 페이지 */}
        <Route path="/signup" element={<SignUp />} /> {/* 회원가입 페이지 */}
        <Route path="/signup/complete" element={<SignUpComplete />} /> {/* 회원가입 완료 페이지 */}
        <Route path="/find" element={<FindPassword />} /> {/* 비밀번호 찾기 페이지 */}
        <Route path="/find/certification" element={<FindPasswordCertification />} /> {/* 비밀번호 찾기 페이지 _ 인증번호 입력 */}
        <Route path="/find/change" element={<FindPasswordChange />} /> {/* 비밀번호 찾기 페이지 _ 비밀번호 입력 */}
        <Route path="/find/complete" element={<PasswordChangeComplete />} /> {/* 비밀번호 찾기 페이지 _ 비밀번호 변경 완료 */}
        <Route path="/signup/complete" element={<SignUpComplete />} /> {/* 회원가입 완료 페이지 */}
        <Route path="/profile" element={<ModifyProfile />} /> {/* 회원정보 수정 페이지 */}
        <Route path="/bookmark" element={<Bookmark />} /> {/* 북마크한 게시물 페이지 */}
        <Route path="/follow" element={<Follow />} /> {/* 팔로우/팔로잉 목록 페이지 */}
        <Route path="/follow/:memberId" element={<OtherFollow />} /> {/* 다른 사람의 팔로우/팔로잉 목록 */}
        <Route path="/search" element={<Search />} /> {/* 검색 페이지 */}
        <Route path="/search/result/*" element={<SearchResult />} /> {/* 검색 결과 페이지 */}
        <Route path="/mytimeline" element={<MainTimeline />} /> {/* 메인 타임라인 페이지 */}
        <Route path="/subtimeline/:mainTimelineId" element={<SubTimeline />} /> {/* 서브 타임라인 페이지 */}
        {/* ProtectedRoute 적용, 다른 사람 메인 타임라인 페이지 */}
        <Route path="/othersmain/:memberId" element={
          <ProtectedRoute
            element={<OthersMainTimeline />}
          />
        } />

        {/* ProtectedRoute 적용, 다른 사람 서브 타임라인 페이지 */}
        <Route path="/otherssub/:memberId/:mainTimelineId" element={
          <ProtectedRoute
            element={<OthersSubTimeline />}
          />
        } />
      </Routes>
    </div>
  );
}

export default App;
