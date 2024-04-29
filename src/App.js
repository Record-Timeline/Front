import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import SignUpComplete from "./pages/SignUpComplete";
import NavigationBar from "./components/common/NavigationBar";
function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Main />} /> {/* 메인 */}
        <Route path="/login" element={<Login />} /> {/* 로그인 페이지 */}
        <Route path="/signup" element={<SignUp />} /> {/* 회원가입 페이지 */}
        <Route path="/signupcomplete" element={<SignUpComplete />} />
        {/* 회원가입 완료 페이지 */}
      </Routes>
    </div>
  );
}

export default App;
