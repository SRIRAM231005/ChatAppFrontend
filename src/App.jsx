import React from "react";
import './App.css';
import Message from "./components/message";
import Displaybox from "./components/displayboox";


function App() {

  return(
    <div className="App">
      <div className="heading">Our Family Chat Room</div>
      <Displaybox/>
      <Message/>
    </div>
  );
}

export default App;
