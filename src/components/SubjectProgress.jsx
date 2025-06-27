import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';

const SubjectProgress = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const tasks = JSON.parse(localStorage.getItem('studyTasks')) || [];

        const subjectMap = {};

        tasks.forEach((task) => {
            const { subject } = task;
            if(subject) {
                subjectMap[subject] = (subjectMap[subject] || 0) + 1;
            }
        });

        const chartData = Object.entries(subjectMap).map(([subject, count]) => ({
            subject,
            pomodoros: count,
        }));

        setData(chartData);
    }, []);

    return (
        <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-indigo-700 mb-4">📚 Subject-wise Progress</h2>

            {data.length === 0 ? (
                <p className="text-gray-500">No progress data available yet.</p>
            ) : (
                <ResponsiveContainer width='100%' height={300}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDashArray ='3 3' />
                        <XAxis dataKey = 'subject' />
                        <YAxis allowDecimals = {false}/>
                        <Tooltip />
                        <Bar dataKey = 'pomodoros' fill = '#6366F1' radius = {[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default SubjectProgress;