import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import { Modal, Button } from "react-bootstrap";

export default function PersonalProfile() {
  const token = localStorage.getItem("access_token");
  const { username } = useParams();
  const [profileData, setProfileData] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState("");
  const [showModal, setShowModal] = useState(false);
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

    if (!selectedFile) {
      setErrors("Debes seleccionar una imagen para subir");
      return;
    }

    if (!selectedFile.type.startsWith("image/")) {
      setErrors("El archivo seleccionado no es una imagen válida");
      return;
    }
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

        // Convertir la matriz de bytes a cadena base64
        const base64Image = btoa(
          new Uint8Array(imageData).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        setProfileData({ ...profileData, profilePicture: base64Image });
        setShowModal(false);
        break;
      case 400:
        const data = await response.json();
        const { message } = data;
        setErrors(message, "Selecciona una imagen para subir", "error");
        break;
      case 401:
        setErrors(
          "Error",
          "No estás autorizado para realizar esta acción",
          "error"
        );
        break;
      case 500:
        setErrors(
          "Error",
          "Comunique con el administrador del sistema para reportar este error",
          "error"
        );
    }
  }

  useEffect(() => {
    getPersonalProfile();
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="container mx-auto p-4 h-screen w-screen">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={toggleModal}
      >
        Open Modal
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
          <div className="bg-white w-1/3 rounded-lg shadow-lg p-4">
            <h2 className="text-lg font-bold mb-4">Upload Image</h2>

            <form onSubmit={handleUploadImage}>
              <input type="file" accept="image/*" onChange={handleFileSelect} />

              <div className="flex justify-end mt-4">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mr-2 rounded"
                  onClick={toggleModal}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  Upload
                </button>
              </div>
            </form>

            {errors && (
              <div className="mt-4 p-2 bg-red-200 text-red-800 rounded">
                <p className="font-bold text-black">{errors}</p>
              </div>
            )}
          </div>
        </div>
      )}

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
