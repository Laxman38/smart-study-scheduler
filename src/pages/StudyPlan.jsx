import { useEffect, useState } from "react";
import StudyPlanEditor from "../components/StudyPlanEditor";

function StudyPlan() {
    const [studyTasks, setStudyTasks] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('studyTasks')) || [];
        setStudyTasks(saved);
    }, []);

    const handleTaskSave = (task) => {
        const updatedTasks = [...studyTasks, task];
        setStudyTasks(updatedTasks);
        localStorage.setItem('studyTasks',JSON.stringify(updatedTasks));
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
            <StudyPlanEditor onSave={handleTaskSave} />
        </div>
        
    );
    
}

export default StudyPlan;