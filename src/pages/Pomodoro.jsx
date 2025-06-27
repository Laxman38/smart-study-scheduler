// import { useState } from "react";
import PomodoroTimer from "../components/PomodoroTimer";

function Pomodoro() {
   return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
        <PomodoroTimer />
    </div>
   );
}

export default Pomodoro;