import { useEffect, useRef, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PomodoroTimer({ onComplete }) {
    const focusTime = 25 * 60;
    const breakTime = 5 * 60;

    const [secondsLeft, setSecondsLeft] = useState(focusTime);
    const [isRunning, setIsRunning] = useState(false);
    const [isFocusSession, setIsFocusSession] = useState(true);
    const intervalRef = useRef(null);
    const [xp, setXp] = useState(0);
    const [badges, setBadges] = useState([]);
    const [pomodoroCount, setPomodoroCount] = useState(0);

    useEffect(() => {
        if(isRunning) {
            intervalRef.current = setInterval(() =>{
                setSecondsLeft((prev) =>{
                    if(prev === 1){
                        clearInterval(intervalRef.current);
                        setIsRunning(false);
                        setIsFocusSession(!isFocusSession);
                        handleTimerEnd();
                        handlePomodoroComplete();
                        return isFocusSession ? breakTime : focusTime;
                    }
                    return prev -1;
                });
            }, 1000);
        }

        return () => clearInterval(intervalRef.current);
    }, [isRunning, setIsFocusSession]);

    const formatTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const seconds = secs % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')
        }`;
    };

    const handleStartPause = () => {
        setIsRunning((prev) => !prev);
    };

    const handleReset = () => {
        clearInterval(intervalRef.current);
        setIsRunning(false);
        setSecondsLeft(isFocusSession ? focusTime : breakTime);
    };

    const handleTimerEnd = () => {
        toast.success('⏱️ Pomodoro session complete!');
        if(onComplete) onComplete();
    };

    const handlePomodoroComplete = () =>{
        setPomodoroCount(p => p + 1);
        earnXP(50);

        const today = new Date().toISOString().split('T')[0];
        const stored = JSON.parse(localStorage.getItem('progress')) || {};

        if(!stored[today]){
            stored[today] = { pomodoro: 1, goals: 0};
        }
        else{
            stored[today].pomodoro = (stored[today].pomodoro || 0) + 1;
        }
        

        localStorage.setItem('progress', JSON.stringify(stored));
    };

    const earnXP = (amount) => {
        const newXP = xp + amount;
        setXp(newXP);

        const newBadges = [...badges];

        if(newXP >= 500 && !newBadges.includes('💪 Dedicated Learner')){
            newBadges.push('💪 Dedicated Learner');
        }

        if(newXP >= 1000 && !newBadges.includes('🏆 Study Master')){
            newBadges.push('🏆 Study Master');
        }

        setBadges(newBadges);
    }; 

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow text-center space-y-4">

            <h2 className="text-2xl ">
                 ⏱️ Pomodoro Timer
            </h2>

            <div className="text-5xl font-mono text-gray-800">
                {formatTime(secondsLeft)}
            </div>

            <div className="space-x-4">
                <button
                 onClick={handleStartPause}
                 className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    { isRunning ? "Pause" : "Start" }
                </button>

                <button
                 onClick={handleReset}
                 className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                    Reset
                </button>
            </div>

            <h5 className="text-2xl ">
                { isFocusSession ? "Focus Time" : "Break Time" }
            </h5>

        </div>
    );
}

export default PomodoroTimer;