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
import { CssBaseline } from "@mui/material";

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
        <Route path="/bookmark" element={<Bookmark />} /> {/* 북마크한 게시물 페이지 */}
        <Route path="/search" element={<Search />} /> {/* 검색 페이지 */}
        <Route path="/search/result/*" element={<SearchResult />} />
        <Route path="/maintimeline" element={<MainTimeline />} />
        <Route path="/maintimeline" element={<MainTimeline />} /> {/* 메인 타임라인 페이지 */}
        <Route path="/subtimeline" element={<SubTimeline />} /> {/* 서브 타임라인 페이지 */}
        <Route path="/othersmain" element={<OthersMainTimeline />} /> {/* 서브 타임라인 페이지 */}
      </Routes>
    </div>
  );
}

export default App;
