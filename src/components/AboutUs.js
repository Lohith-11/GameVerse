import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 text-white flex justify-center items-center flex-col p-6">
      <h1 className="text-4xl font-extrabold mb-6 text-center">About Us</h1>
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-xl mb-6">
          Welcome to <strong>GameVerse</strong>, your one-stop destination for all the exciting games. Whether you're a casual gamer or a hardcore player, we have something for everyone.
        </p>

        <p className="text-lg mb-6">
          At GameVerse, our mission is to provide a platform where you can play and enjoy a variety of games, challenge yourself, and even track your progress. From classic games like Tic-Tac-Toe to innovative new games, we aim to make gaming fun and accessible.
        </p>

        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Our Team</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            <div className="bg-white text-gray-800 rounded-lg shadow-lg p-4">
              <img
                src="https://img.freepik.com/free-photo/business-man-front-office-building_23-2148018578.jpg?t=st=1732128182~exp=1732131782~hmac=a5b651dc4c8048e9b463d333f656c40935adfe95fcdc18cc6fcecaa529aad1dd&w=1060"
                alt="Team Member 1"
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              <h3 className="font-bold text-lg">John Doe</h3>
              <p>Lead Developer</p>
            </div>
            <div className="bg-white text-gray-800 rounded-lg shadow-lg p-4">
              <img
                src="https://img.freepik.com/free-photo/portrait-young-indian-top-manager-t-shirt-tie-crossed-arms-smiling-white-isolated-wall_496169-1513.jpg?t=st=1732128053~exp=1732131653~hmac=9d2402ce974df8760f7df5bec715c41d37d7e4010fa9dc2aad700acf90ccc83d&w=1060"
                alt="Team Member 2"
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              <h3 className="font-bold text-lg">Jane Smith</h3>
              <p>UI/UX Designer</p>
            </div>
            <div className="bg-white text-gray-800 rounded-lg shadow-lg p-4">
              <img
                src="https://img.freepik.com/free-photo/shot-beautiful-young-businesswoman-wearing-blue-chiffon-shirt-while-standing-building-street-with-folded-arms_158595-6636.jpg?t=st=1732128124~exp=1732131724~hmac=b2018bd6b5f9c4a9ea46908344c559b53c0ed404dca97ff6b1773027410688ac&w=1060"
                alt="Team Member 3"
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              <h3 className="font-bold text-lg">Emily Johnson</h3>
              <p>Project Manager</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg">
            Our goal is to bring joy and entertainment to people through engaging and fun games. We are committed to improving our platform, adding new features, and listening to our community's feedback.
          </p>
        </div>

        <div className="mt-6">
          <button className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300">
            Join Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
