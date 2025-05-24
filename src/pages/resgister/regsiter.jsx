import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link, useNavigate } from "react-router-dom";



const Register = () => {
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate();
    const { createUser, updateUserProfile } = useContext(AuthContext)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createUser(formData.email, formData.password)
            .then(() => {

                return updateUserProfile(formData.name);
            })
            .then(() => {
                const userInfo = {
                    name: formData.name,
                    email: formData.email.toLowerCase(),
                }
                axiosPublic.post("/api/auth/register", userInfo)
                    .then(res => {
                        alert('User created successfully')
                        console.log("User register successfully", res.data)
                        // Clear form data after successful registration
                        setFormData({
                            name: "",
                            email: "",
                            password: "",
                        });
                        navigate('/');
                    })
                    .catch((error) => {
                        console.error("Error registering user:", error.response?.data || error.message);
                    });
            })
            .catch(error => console.log(error))

    };

    return (
        <div>
            <div className="bg-[#0C0C0C] text-white h-screen">
                <section>
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <div className="w-full bg-[#121212] border-[#18191A] rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold text-white leading-tight tracking-tight md:text-2xl">
                                    Sign up for an account
                                </h1>
                                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="bg-[#212121] rounded-lg focus:ring-primary-600 focus:outline-none text-white block w-full p-2.5"
                                            placeholder="Enter your name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">
                                            Your email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="bg-[#212121] rounded-lg focus:ring-primary-600 focus:outline-none text-white block w-full p-2.5"
                                            placeholder="Enter your email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder="••••••••"
                                            className="bg-[#212121] rounded-lg focus:ring-primary-600 focus:outline-none text-white block w-full p-2.5"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    >
                                        Sign up
                                    </button>
                                    <p className="text-sm font-light text-gray-500">
                                        Already have an account?{" "}
                                        <Link to={'/login'} className="font-medium text-primary-600 hover:underline">
                                            Sign in
                                        </Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Register;
