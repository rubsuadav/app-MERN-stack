import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import { Modal, Button, Form } from "react-bootstrap";
import ButtonR from "react-bootstrap/Button";

export default function PersonalProfile() {
  const token = localStorage.getItem("access_token");
  const { username } = useParams();
  const [profileData, setProfileData] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate();

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

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  async function handleUploadImage(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profilePicture", selectedFile);
    const response = await fetch(
      `http://localhost:8000/api/users/${username}/uploadImage`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );
    switch (response.status) {
      case 200:
        setSelectedFile(true);
        navigate(`/profile/${username}`);
        swal(
          "Imagen subida",
          "La imagen se ha actaulizado correctamente",
          "success"
        );
        const responseData = await response.json();
        const imageData = responseData.image.data;
        profileData.profilePicture = imageData;
        console.log(profileData);
        break;
      case 400:
        const data = await response.json();
        const { message } = data;
        swal(message, "Selecciona una imagen para subir", "error");
        break;
      case 401:
        swal("Error", "No estás autorizado para realizar esta acción", "error");
        break;
      case 500:
        swal(
          "Error",
          "Comunique con el administrador del sistema para reportar este error",
          "error"
        );
    }
  }

  useEffect(() => {
    getPersonalProfile();
  }, [username, token]);

  return (
    <div className="container mx-auto p-4 h-screen w-screen">
      <form onSubmit={handleUploadImage}>
        <input type="file" accept="image/*" onChange={handleFileSelect} />
        <button type="submit">Upload</button>
      </form>

      {/* Mostrar la imagen actualizada */}
      {profileData.profilePicture && (
        <img
          src={`data:image/jpeg;base64,${profileData.profilePicture}`}
          alt="Profile"
        />
      )}
    </div>
  );
}
