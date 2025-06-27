import { useEffect, useState } from "react";

function GoalCards({ onGoalComplete }) {
    const [goals, setGoals] = useState([]);
    const [goalText, setGoalText] = useState('');

    useEffect(() => {
        const storedGoals = localStorage.getItem('goals');
        if(storedGoals) setGoals(JSON.parse(storedGoals));
    }, []);

    useEffect(() => {
        localStorage.setItem('goals', JSON.stringify(goals));
    }, [goals]);

    const addGoal = () => {
        if(!goalText.trim()) return;
        const newGoal = {
            id: Date.now(),
            text: goalText,
            completed: false,
        };
        setGoals([...goals, newGoal]);
        setGoalText('');
    };

    const completeGoal = (id) => {
        const updatedGoals = goals.map(goal =>
            goal.id === id ? { ...goal, completed: true} : goal
        );
        setGoals(updatedGoals);
        if(onGoalComplete) onGoalComplete();
    };

    const removeGoal = (id) => {
        const updatedGoals = goals.filter(goal => goal.id !== id);
        setGoals(updatedGoals);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow  mx-auto">
            <h2 className="text-xl font-semibold mb-4">🎯 Study Goals</h2>

            <div className="flex mb-4 gap-2">
                <input
                 type="text" 
                 value={goalText}
                 onChange={(e) => setGoalText(e.target.value)}
                 className="flex-grow p-2 border rounded"
                 placeholder="Add a new goal..."
                />

                <button
                 onClick={addGoal}
                 className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Add
                </button>
            </div>

            <ul className="space-y-3">
                {goals.length === 0 ? (
                    <p>No goals yet. Start by adding one!</p>
                ) : (
                    goals.map((goal) => (
                        <li
                         key={goal.id}
                         className={`flex justify-between items-center p-2 border rounded ${
                         goal.completed ? 'bg-green-100 line-through text-gray-500' : ''
                         }`}
                        >
                            <span>{goal.text}</span>
                            <div className="flex gap-2">
                                {!goal.completed && (
                                    <button
                                     onClick={() => completeGoal(goal.id)}
                                     className="text-green-600 hover:underline"
                                    >
                                        Mark Done
                                    </button>
                                )}
                                <button
                                 onClick={() => removeGoal(goal.id)}
                                 className="text-red-500 hover:underline"
                                >
                                    ✖
                                </button>
                            </div>
                        </li>
                    )
                )
                )}
            </ul>
        </div>
    );
}

export default GoalCards;