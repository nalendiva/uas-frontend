import { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaSignInAlt, FaComments, FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import Logo from '../assets/logo.svg';
import LoginContext from '../context/LoginContext'; // context untuk login status

const Header = () => {
    const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext); // ambil status login
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeItem, setActiveItem] = useState('/');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setActiveItem(location.pathname);
    }, [location]);

    const navItems = [
        { title: 'Home', path: '/' },
        { title: 'Appointments', path: '/appointments' },
        { title: 'Doctors', path: '/doctors' },
        { title: 'About', path: '/about-us' },
        { title: 'Contact', path: '/contact-us' },
        { title: 'ChatBot', path: '/chat' },
    ];

    const handleLogout = () => {
        setIsLoggedIn(false);
        navigate("/login"); // redirect ke halaman login
    };

    return (
        <header className="bg-gradient-to-r from-primary to-secondary py-3 px-4">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    <Link to="/" className="flex items-center space-x-2">
                        <img src={Logo} alt="Health Nest Logo" className="h-10 w-auto" />
                        <span className="text-2xl font-bold text-accent">Health Nest</span>
                    </Link>

                    <nav className="hidden md:flex space-x-1 items-center">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`relative px-3 py-2 text-base font-medium text-light hover:text-accent transition-colors duration-300 ${
                                    activeItem === item.path ? 'text-accent' : ''
                                }`}
                            >
                                {item.title}
                                {activeItem === item.path && (
                                    <motion.div
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                                        layoutId="underline"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden md:flex items-center space-x-3">
                        {!isLoggedIn && (
                            <>
                                <Link to="/signup" className="bg-accent text-primary px-4 py-1.5 rounded-full hover:bg-light transition duration-300 text-sm font-medium">
                                    <FaUser className="inline-block mr-1" />Sign Up
                                </Link>
                                <Link to="/login" className="bg-light text-primary px-4 py-1.5 rounded-full hover:bg-accent transition duration-300 text-sm font-medium">
                                    <FaSignInAlt className="inline-block mr-1" />Log In
                                </Link>
                            </>
                        )}

                        {/* Tombol Log Out jika user login */}
                        {isLoggedIn && (
                            <button
                                onClick={handleLogout}
                                className="bg-light text-primary px-4 py-1.5 rounded-full hover:bg-accent transition duration-300 text-sm font-medium flex items-center"
                            >
                                <FaSignOutAlt className="mr-1" />Log Out
                            </button>
                        )}
                    </div>

                    <button 
                        className="md:hidden text-light focus:outline-none"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden mt-3"
                        >
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`block py-2 px-3 text-base font-medium text-light hover:text-accent transition duration-300 ${
                                        activeItem === item.path ? 'text-accent' : ''
                                    }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.title}
                                </Link>
                            ))}

                            {!isLoggedIn && (
                                <>
                                    <Link
                                        to="/signup"
                                        className="block py-2 px-3 text-base font-medium text-light hover:text-accent transition duration-300"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <FaUser className="inline-block mr-1" />Sign Up
                                    </Link>
                                    <Link
                                        to="/login"
                                        className="block py-2 px-3 text-base font-medium text-light hover:text-accent transition duration-300"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <FaSignInAlt className="inline-block mr-1" />Log In
                                    </Link>
                                </>
                            )}

                            {isLoggedIn && (
                                <>
                                    <Link
                                        to="/chat"
                                        className="block py-2 px-3 text-base font-medium text-light hover:text-accent transition duration-300"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <FaComments className="inline-block mr-1" />ChatBot
                                    </Link>
                                    <button
                                        onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                                        className="block py-2 px-3 text-base font-medium text-light hover:text-accent transition duration-300 w-full text-left"
                                    >
                                        <FaSignOutAlt className="inline-block mr-1" />Log Out
                                    </button>
                                </>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
};

export default Header;
