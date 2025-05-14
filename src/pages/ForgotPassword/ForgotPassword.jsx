import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


const ForgotPassword = () => {
    const navigate = useNavigate();
    const { passwordReset } = useContext(AuthContext)
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleReset = (e) => {
        e.preventDefault();
        setMessage('');
        setError('')
        passwordReset(email)
            .then(() => {
                setMessage("✅ Password reset email sent. Please check your inbox.");
            })
            .catch((err) => {
                setError(`❌ ${err.message}`);
            })
    };
    return (
        <div className="bg-[#0C0C0C] text-white h-screen flex items-center justify-center">
            <div className="w-full max-w-md bg-[#121212] border border-[#18191A] rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold mb-4">Reset your password</h2>
                {message && <p className="mb-2 text-sm text-green-400">{message}</p>}
                {error && <p className="mb-2 text-sm text-red-400">{error}</p>}
                <form onSubmit={handleReset} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium">
                            Enter your email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="bg-[#212121] text-white rounded-lg p-2.5 w-full focus:outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="example@example.com"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg text-sm px-5 py-2.5"
                    >
                        Send Reset Email
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 rounded"
                    >
                        Back to Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;