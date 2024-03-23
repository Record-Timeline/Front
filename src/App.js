import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} /> {/* 메인 */}
        <Route path="/login" element={<Login />} /> {/* 로그인 페이지 */}
      </Routes>
    </div>
  );
}

export default App;
