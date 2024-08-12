import { Route, Routes, useLocation } from "react-router-dom";
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
import { CssBaseline } from "@mui/material";
import FindPassword from "./pages/FindPassword";
import FindPasswordCertification from "./pages/FindPasswordCertification";
import FindPasswordChange from "./pages/FindPasswordChange"
import PasswordChangeComplete from "./pages/PasswordChangeComplete";
function App() {
  const location = useLocation();
  const hideNavBarRoutes = ["/login", "/signup", "/signup/complete"];
  const shouldHideNavBar = () => {
    return hideNavBarRoutes.includes(location.pathname);
  };

  return (
    <div className="App">
      <CssBaseline></CssBaseline>
      {!shouldHideNavBar() && <NavigationBar />}
      <Routes>
        <Route path="/" element={<Main />} /> {/* 메인 */}
        <Route path="/login" element={<Login />} /> {/* 로그인 페이지 */}
        <Route path="/signup" element={<SignUp />} /> {/* 회원가입 페이지 */}
        <Route path="/signup/complete" element={<SignUpComplete />} /> {/* 회원가입 완료 페이지 */}
        <Route path="/find" element={<FindPassword />} /> {/* 비밀번호 찾기 페이지 */}\
        <Route path="/find/certification" element={<FindPasswordCertification />} /> {/* 비밀번호 찾기 페이지 _ 인증번호 입력 */}
        <Route path="/find/change" element={<FindPasswordChange />} /> {/* 비밀번호 찾기 페이지 _ 비밀번호 입력 */}
        <Route path="/find/complete" element={<PasswordChangeComplete />} /> {/* 비밀번호 찾기 페이지 _ 비밀번호 변경 완료 */}
        <Route path="/signup/complete" element={<SignUpComplete />} /> {/* 회원가입 완료 페이지 */}
        <Route path="/profile" element={<ModifyProfile />} /> {/* 회원정보 수정 페이지 */}
        <Route path="/bookmark" element={<Bookmark />} /> {/* 북마크한 게시물 페이지 */}
        <Route path="/search" element={<Search />} /> {/* 검색 페이지 */}
        <Route path="/search/result/*" element={<SearchResult />} /> {/* 검색 결과 페이지 */}
        <Route path="/mytimeline" element={<MainTimeline />} /> {/* 메인 타임라인 페이지 */}
        <Route path="/subtimeline/:mainTimelineId" element={<SubTimeline />} /> {/* 서브 타임라인 페이지 */}
        <Route path="/othersmain/:memberId" element={<OthersMainTimeline />} /> {/* 다른 사람 메인 타임라인 페이지 */}
        <Route path="/otherssub/:memberId/:mainTimelineId" element={<OthersSubTimeline />} /> {/* 다른 사람 서브 타임라인 페이지 */}
      </Routes>
    </div>
  );
}

export default App;
