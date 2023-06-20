import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function PersonalProfile() {
  const token = localStorage.getItem("access_token");
  const { username } = useParams();
  const [profileData, setProfileData] = useState(null);

  async function getPersonalProfile() {
    const response = await fetch(
      `http://localhost:8000/api/users/profile/${username}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    setProfileData(data);
  }

  useEffect(() => {
    getPersonalProfile();
  }, [username, token]);

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="max-w-2xl mx-auto py-8">
        {profileData && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center mb-6">
              <img
                src={profileData.profilePicture}
                alt="Profile Picture"
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h1 className="text-2xl font-bold">{profileData.name}</h1>
                <p className="text-gray-600">@{profileData.username}</p>
              </div>
            </div>
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-2">Email</h2>
              <p className="text-gray-600">{profileData.email}</p>
            </div>
            {/* Agrega más información del perfil aquí */}
          </div>
        )}
      </div>
    </div>
  );
}
