// import { useEffect, useState } from "react";

// function Gamification() {
//     const [xp, setXp] = useState(0);
//     const [level, setLevel] = useState(1);
//     const [badges, setBadges] = useState([]);

//     useEffect(() => {
//         const storedXp = localStorage.getItem('xp');
//         const storedBadges = localStorage.getItem('badges');
//         if(storedXp) setXp(parseInt(storedXp));
//         if(storedBadges) setBadges(JSON.parse(storedBadges));
//     });

//     useEffect(() => {
//         localStorage.setItem('xp', xp.toString());
//         localStorage.setItem('badges', JSON.stringify(badges));
//         setLevel(Math.floor(xp / 100) + 1);
//     }, [xp, badges]);
 
//     const earnXp = (amount) => {
//         setXp((prev) => prev + amount);

//         const newXp = xp + amount;

//         if(newXp >= 500 && !badges.includes('💪 Dedicated Learner')){
//             setBadges([...badges, '💪 Dedicated Learner']);
//         }

//         if(newXp >= 1000 && !badges.includes('🏆 Study Master')){
//             setBadges([...badges, '🏆 Study Master']);
//         }
//     };

//     const progressPercent = ((xp % 100) / 100) * 100;

//     return (
//         <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-lg shadow">
//             <h2 className="text-xl font-bold mb-4">🎮 Gamification</h2>

//             <div className="text-lg mb-2">Level: {level}</div>
//             <div className="w-full bg-gray-300 rounded-full h-4 mb-4">
//                 <div
//                  className="bg-blue-600 h-4 rounded-full transition-all duration-100"
//                  style={{ width: `${progressPercent}%`}}
//                 ></div>
//             </div>

//             <div className="text-sm text-gray-600 mb-2">XP: {xp} / {level * 100}</div>

//             <button
//              onClick={() => earnXp(50)}
//              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 mb-4"
//             >
//                 🎉 Simulate XP +50
//             </button>

//             <h3 className="text-md font-semihold mt-4 mb-2">🏆 Badges</h3>

//             <ul className="flex flex-wrap gap-2">
//                 {badges.length === 0 ? (
//                     <li>No badges yet.</li>
//                 ) : (
//                     badges.map((badges, index) => (
//                         <li
//                          key={index}
//                          className="px-3 py-1 bg-yellow-200 rounded-full text-sm" 
//                         >
//                             {badges}
//                         </li>
//                     ))
//                 )}
//             </ul>
//         </div>
//     );
// }


function Gamification({ xp, badges }) {
  const level = Math.floor(xp / 100) + 1;
  const progressPercent = ((xp % 100) / 100) * 100;

  return (
    <div className="mt-6 bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-semibold mb-4">🎮 Gamification</h2>
      <div>Level: {level}</div>
      <div className="w-full bg-gray-300 h-4 rounded-full mb-2">
        <div
          className="bg-blue-500 h-4 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      <div className="text-sm text-gray-600 mb-2">XP: {xp}</div>
      <div className="text-md font-medium mt-2">🏅 Badges:</div>
      <ul className="flex gap-2 flex-wrap mt-1">
        {badges.length === 0 ? (
          <li>No badges yet.</li>
        ) : (
          badges.map((badge, index) => (
            <li key={index} className="bg-yellow-200 px-3 py-1 rounded-full text-sm">
              {badge}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Gamification;
