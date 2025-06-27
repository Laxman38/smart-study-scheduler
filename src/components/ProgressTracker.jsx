import { useEffect, useState } from "react";
import dayjs from "dayjs";

const getToday= () => dayjs().format('YYYY-MM-DD');

function ProgressTracker({pomodoroCount, goalCount, onStreakXP}) {
    const[progress, setProgress] = useState({});
    const[streak, setStreak] = useState(0);
    const today = getToday();

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('progress')) || {};
        setProgress(saved);

        let count = 0;
        let date = dayjs();
        while(saved[date.format('YYYY-MM-DD')]){
            count++;
            date = date.subtract(1, 'day');
        }
        setStreak(count);

        if(count === 3 || count === 7 || count === 14){
            onStreakXP(50);
        }
    }, []);

    useEffect(() =>{
        const updated = {
            ...progress,
            [today] : {
                pomodoro : pomodoroCount,
                goals : goalCount,
            },
        };
        setProgress(updated);
        localStorage.setItem('progress', JSON.stringify(updated));
    }, [pomodoroCount, goalCount]);

    const todayStats = progress[today] || { pomodoro: 0, goals: 0 };

    return(
        <div className="bg-white p-4 rounded-lg shadow mt-6">
            <h2 className="text-xl font-semibold mb-3">📅 Daily Progress</h2>
            <p>Pomodoro Sessions: <strong>{todayStats.pomodoro}</strong></p>
            <p>Goals Completed: <strong>{todayStats.goals}</strong></p>
            <p>Streak🔥: <strong>{streak} {streak === 1 ? 'day' : 'days'}</strong></p>
        </div>
    );
}

export default ProgressTracker;