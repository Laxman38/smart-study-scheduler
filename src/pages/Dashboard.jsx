import { useEffect, useState } from "react";
import Gamification from "../components/Gamification";
import SubjectPriority from "../components/SubjectPriority";
import GoalCards from "../components/GoalCards";
import ProgressTracker from "../components/ProgressTracker";
import DashboardHeader from "../components/DashboardHeader";   
import TodayTasks from "../components/TodayTasks";

function Dashboard() {
    const [xp, setXp] = useState(0);
    const [badges, setBadges] = useState([]);
    const [pomodoroCount, setPomodoroCount] = useState(0);
    const [goalCount, setGoalCount] = useState(0);
    const [studyTasks, setStudyTasks] = useState([]);

    const handleGoalComplete = () =>{
        setGoalCount(g => g + 1);
        earnXP(30);
    };

    useEffect(() => {
        const storedXP = localStorage.getItem('xp');
        const storedBadges = localStorage.getItem('badges');
        if(storedXP) setXp(parseInt(storedXP));
        if(storedBadges) setBadges(JSON.parse(storedBadges));
    }, []);

    useEffect(() => {
        localStorage.setItem('xp', xp.toString());
        localStorage.setItem('badges', JSON.stringify(badges));
    }, [xp, badges]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('studyTasks')) || [];
        setStudyTasks(saved);
    }, []);

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
        <div className="p-4 space-y-8 md:p-6 lg:p-10 bg-gray-50 min-h-screen">
            <DashboardHeader xp = {xp} />

            <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
                    <GoalCards onGoalComplete={handleGoalComplete} />
            </div> 

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
                    <TodayTasks />
                </div>

                <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
                    <ProgressTracker
                        pomodoroCount = {pomodoroCount}
                        goalCount = {goalCount}
                        onStreakXP = {(xp) => earnXP(xp)}
                    /> 
                </div>

                

            </section>

            <section className="grid grid-cols-1 md:grid-cols-1 gap-6">
                
                {/* <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
                    <SubjectPriority />
                </div>  */}

                <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
                    <Gamification xp={xp} badges={badges} />
                </div>
            </section>  

            <section className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                
            </section>

            
        </div>
    );
}

export default Dashboard;

