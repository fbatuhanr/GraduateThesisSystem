import React from 'react';

const Home = () => {
    return (
        <div className="p-3">
                <div className="bg-gray-100 dark:bg-gray-900 dark:border-gray-700 p-10 mt-12 mb-12 rounded">
                    <h1 className="text-3xl text-gray-900 dark:text-white text-center m-0 p-0 pb-1">
                        Welcome to the Graduate Thesis System
                    </h1>
                    <div className="text-md text-gray-900 dark:text-white">
                    <p className="m-0 py-5 mb-4 pb-1">
                    We are thrilled to introduce our Graduate Thesis System, a comprehensive and user-friendly platform designed to streamline the process of managing and accessing academic theses. Whether you're an administrator, author, or a curious individual seeking insightful research, our system is tailored to meet your needs.
                    </p>
                    <p className="m-0 py-5 mb-4 pb-1">
                    For Administrators:
                    Effortlessly manage your academic content with the ability to add, delete, and edit sections such as universities, institutes, thesis topics, and authors. Our intuitive interface empowers you to maintain an organized and up-to-date repository of academic knowledge.
                    </p>
                    <p className="m-0 py-5 mb-4 pb-1">
                    For Authors:
                    Take control of your research journey by entering and managing your theses seamlessly. Our platform provides you with the tools to edit and update your work, ensuring that your academic contributions remain accurate and relevant.
                    </p>
                        <p className="m-0 py-5 mb-4 pb-1">
                    For Everyone:
                    Embark on a journey of exploration by utilizing our powerful search functionality. Anyone can delve into the wealth of knowledge stored within our system, searching for theses in detail and gaining valuable insights into diverse academic topics.
                        </p>
                    <p className="m-0 py-5 mb-4 pb-1">
                    At GTS, we believe in the power of accessible knowledge. Our Graduate Thesis System is designed to facilitate collaboration, innovation, and a deeper understanding of academic research. Join us in this journey of intellectual discovery.
                    </p>
                    </div>
                </div>
        </div>
    );
};

export default Home;