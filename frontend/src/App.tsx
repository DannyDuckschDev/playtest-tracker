import React from "react";
import '../src/styles/variables.css'; //Import the CSS variables
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/Login"; //Import the Login component

const App: React.FC = () => {
  return (
    <div className="app">
      <Login />
    </div>
  );
};

export default App;