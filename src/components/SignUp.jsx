import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaPhoneAlt } from "react-icons/fa";
import PasswordStrengthBar from "react-password-strength-bar";

const SignUp = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        gender: "",
        role: "",
        phoneNumber: "",
        age: "",
        file: null,
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({ ...formData, [name]: type === "file" ? files[0] : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password.length < 6) {
            alert("Password minimal 6 karakter");
            return;
        }

        if (formData.role === "doctor" && !formData.file) {
            alert("PDF file is required for doctor");
            return;
        }

        try {
            const dataToSend = new FormData();
            dataToSend.append("name", formData.fullName);
            dataToSend.append("email", formData.email);
            dataToSend.append("password", formData.password);
            dataToSend.append("gender", formData.gender);
            dataToSend.append("mobile", formData.phoneNumber);
            dataToSend.append("age", formData.age);
            dataToSend.append("role", formData.role);
            if (formData.file) dataToSend.append("file", formData.file);

            const response = await axios.post(
                "http://54.83.112.249:6005/api/patients/register",
                dataToSend
                // jangan set headers Content-Type manual
            );
            console.log("Patient registered:", response.data);
            alert("Registration successful!");
            navigate("/login");
        } catch (error) {
            console.error("Registration error:", error.response?.data || error.message);
            alert("Registration failed. Please check your inputs.");
        }
    };

    return (
        <div className="bg-light min-h-screen flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
            >
                <h2 className="text-3xl font-bold text-primary mb-6 text-center">
                    Sign Up for Health Nest
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <div className="relative">
                            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                                placeholder="John Doe"
                                required
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <div className="relative">
                            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                                placeholder="johndoe@example.com"
                                required
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <PasswordStrengthBar password={formData.password} />
                    </div>

                    {/* Gender */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="pl-3 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                            required
                        >
                            <option value="" disabled>Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    {/* Role */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="pl-3 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                            required
                        >
                            <option value="" disabled>Select Role</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <div className="relative">
                            <FaPhoneAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                                placeholder="(123) 456-7890"
                                required
                            />
                        </div>
                    </div>

                    {/* Age */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            className="pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                            placeholder="Enter your age"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-accent text-primary font-bold py-2 px-4 rounded-md hover:bg-primary hover:text-accent transition duration-300"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-accent hover:underline">
                        Log in
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default SignUp;
