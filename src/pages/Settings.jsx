import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        return storedUser?.name || '';
     });
    const [avatar, setAvatar] = useState(localStorage.getItem('avatar') || '');

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setAvatar(reader.result);
            localStorage.setItem('avatar', reader.result);
        };

        if(file) {
            reader.readAsDataURL(file);
        }
    };

    const handleLogOut = () => {
        localStorage.clear();
        navigate('/login');
    };

    const handleNameChange = () => {
        const user = JSON.parse(localStorage.getItem('user')) || {};
        user.name = username;
        localStorage.setItem('user', JSON.stringify(user));
        alert('Username updated');
    };

    const handleReset = () => {
        if(window.confirm('Reset all data? This cannot be undone.')) {
            localStorage.clear();
            window.location.reload();
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow space-y-6 mt-6">
            <h2 className="text-2xl font-bold text-indigo-700">⚙️ Settings</h2>

            <div className="space-y-2">
                <label className="block font-medium text-gray-700">Profile Avatar</label>

                <div className="relative w-20 h-20">
                    {avatar ? (
                        <>
                            <img
                                src={avatar}
                                alt="avatar" 
                                className="w-20 h-20 rounded-full object-cover shadow border border-gray-300"
                            />
                            <button
                                onClick={() => {
                                    setAvatar('');
                                    localStorage.removeItem('avatar');
                                }}
                                title="Remove avatar"
                                className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center text-white text-xl hover:bg-black/60 transition"
                            >
                                ×
                            </button>
                        </>    
                    ) :     (
                        <>
                            <label
                                htmlFor="avatar-upload"
                                className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 text-2xl border border-dashed border-gray-400 cursor-pointer hover:bg-gray-200"
                                title="Upload Avatar"
                            >
                                +
                            </label>

                            <input
                                type="file"
                                id="avatar-upload"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className="hidden"
                            />
                        </>
                    )}
                </div>

                <label className="block font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} 
                    className="w-full border p-2 rounded-md"
                />

                <button
                    onClick={handleNameChange}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                    Save Name
                </button>
            </div>

            <div className="pt-4 border-t">
                <button
                    onClick={handleLogOut}
                    className="font-semibold text-red-500 hover:underline"
                >
                    🚪 Logout
                </button>
            </div>

            <div>
                <button
                    onClick={handleReset}
                    className="text-sm text-gray-500 hover:underline"
                >
                    ♻️ Reset All data
                </button>
            </div>
        </div>
    );
};

export default Settings;