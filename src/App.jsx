import { useState } from "react";
import "./App.css";
import Home from "./pages/Home/Home";

function App() {
  const [userData, setUserData] = useState({});

  return (
    <div className="Container">
      <Home setUserData={setUserData} />
    </div>
  );
}

export default App;
