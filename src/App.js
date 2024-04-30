import { Route, Routes, useLocation } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import SignUpComplete from "./pages/SignUpComplete";
import NavigationBar from "./components/common/NavigationBar";
import MainTimeline from "./pages/MainTimeline";

function App() {
  const location = useLocation();
  const hideNavBarRoutes = ["/login", "/signup", "/signupcomplete"];
  const shouldHideNavBar = () => {
    return hideNavBarRoutes.includes(location.pathname);
  };

  return (
    <div className="App">
      {!shouldHideNavBar() && <NavigationBar />}
      <Routes>
        <Route path="/" element={<Main />} /> {/* 메인 */}
        <Route path="/login" element={<Login />} /> {/* 로그인 페이지 */}
        <Route path="/signup" element={<SignUp />} /> {/* 회원가입 페이지 */}
        <Route path="/signupcomplete" element={<SignUpComplete />} />
        {/* 회원가입 완료 페이지 */}
        <Route path="/maintimeline" element={<MainTimeline />} /> {/* 메인 타임라인 페이지 */}
      </Routes>
    </div>
  );
}

export default App;
