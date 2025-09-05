import React from 'react';
import { FaHeartbeat, FaCogs, FaUsers } from 'react-icons/fa';
import { motion } from 'framer-motion'; // Import motion for animation
import profilePic from '../assets/profile-pic.jpeg'; // Import the profile picture

const AboutUs = () => {
  const features = [
    {
      icon: FaHeartbeat,
      title: 'Our Mission',
      description: 'To deliver healthcare solutions that ensure better patient care through efficiency and technological advancement.',
    },
    {
      icon: FaCogs,
      title: 'Our Vision',
      description: 'We aim to revolutionize healthcare management by developing tools that healthcare professionals can rely on.',
    },
    {
      icon: FaUsers,
      title: 'Our Values',
      description: 'We are dedicated to providing innovative, reliable, and user-friendly solutions for healthcare providers worldwide.',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="bg-light p-8 rounded-lg mb-12 text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">About Us</h1>
        <p className="text-lg text-secondary mb-4">
          Health Nest- Hospital Management System is a cutting-edge solution designed to streamline healthcare operations and improve patient care.
        </p>
        <p className="text-lg text-secondary">
          Our mission is to revolutionize healthcare management through innovative technology solutions that enhance efficiency, reduce errors, and improve patient outcomes.
        </p>
      </div>

      {/* Mission, Vision, Values Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-white p-8 rounded-3xl shadow-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
          >
            <feature.icon className="text-5xl sm:text-6xl text-accent mb-6 mx-auto" />
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-primary">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-base sm:text-lg">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
