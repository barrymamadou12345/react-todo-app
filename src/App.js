import React from "react";
import "./App.css";
import { Accueil } from "./components/Accueil";
import { TaskProvider } from "./context/TaskContext";

function App() {
  return (
    <TaskProvider>
      <div className="">
        <Accueil />
      </div>
    </TaskProvider>
  );
}

export default App;
