import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Line, LineChart } from "recharts";
import dayjs from "dayjs";

const getLast7Days = () => {
    return Array.from({ length: 7}, (_, i) => 
        dayjs().subtract(6 - i, 'day').format('YYYY-MM-DD')
    );
};

function WeeklyCharts() {
    const [chartdata, setChartData] = useState([]);

    useEffect(() =>{
        const storedProgress = JSON.parse(localStorage.getItem('progress')) || {};
        const data = getLast7Days().map(date => {
            const day = dayjs(date).format('ddd');
            const entry = storedProgress[date] || {};
            return {
                name: day,
                Pomodoro: entry.pomodoro || 0,
                Goals: entry.goals || 0,
            };
        });
        setChartData(data);
    }, []);

    return (
        <div className="bg-white p-4 rounded-lg shadow ">
            <h2 className="text-xl font-semibold mb-6">📊 Weekly Progress</h2>

            <div className="h-64 mb-8">
                <h3 className="text-lg font-medium mb-2">⏱ Pomodoro Sessions</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartdata}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Bar dataKey="Pomodoro" fill="#60a5fa" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="h-64">
                <h3 className="text-lg font-medium mb-2">🎯 Goals Completed</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartdata}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Line type="monotone" dataKey="Goals" stroke="#34d399" strokeWidth={3} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default WeeklyCharts;