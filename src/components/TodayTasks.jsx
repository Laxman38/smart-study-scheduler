import { useEffect, useState } from "react";

const TodayTasks = () => {
    const [todayTasks, setTodayTasks] = useState([]);

    useEffect(() => {
        const tasks = JSON.parse(localStorage.getItem('studyTasks')) || [];

        const today = new Date().toISOString().split('T')[0];

        const filtered = tasks.filter((task) => {
            return task.datetime?.startsWith(today);
        });

        setTodayTasks(filtered);
    }, []);

    return (
        <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition max-h-72 overflow-y-auto">
            <h2 className="text-lg font-semibold text-indigo-700 mb-3">🗓️ Today's Tasks</h2>

            {todayTasks.length === 0 ? (
                <p className="text-gray-500">No tasks scheduled for today 🎉</p>
            ) : (
                <ul className="space-y-3">
                    {todayTasks.map((task, index) => (
                        <li key={index} className="flex justify-between items-start bg-gray-100 p-3 rounded-lg">
                            <div>
                                <h4 className="font-semibold text-gray-800">{task.subject}</h4>
                                <p className="text-sm text-gray-600">
                                    ⏰ {new Date(task.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})}
                                </p>
                            </div>

                            <span
                                className={`text-xs font-medium px-2 py-1 rounded-full
                                ${
                                    task.priority === 'High'
                                    ? 'bg-red-200 text-red-700'
                                    : task.priority === 'Medium'
                                    ? 'bg-yellow-200 text-yellow-800'
                                    : 'bg-green-200 text-green-700' 
                                }`}
                            >
                                {task.priority}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TodayTasks;