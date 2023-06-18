import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailure } from "./redux/authActions";
import { useAuthContext } from "../routes/authContext";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Login() {
  const dispatch = useDispatch();
  const { login } = useAuthContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  let navigate = useNavigate();

  const [errors, setErrors] = useState({});

  function validateForm() {
    let error_msgs = {};

    if (username === "" || username === null) {
      error_msgs.username = "Introduzca un usuario";
    }

    if (password === "" || password === null) {
      error_msgs.password = "Introduzca una contraseña";
    }

    setErrors(error_msgs);

    return Object.keys(error_msgs).length === 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const response = await fetch("http://localhost:8000/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    switch (response.status) {
      case 200:
        const token = await response.json();
        dispatch(loginSuccess(token));
        login(token);
        swal({
          title: "Login successful",
          icon: "success",
          text: "Welcome to the admin page!",
          button: "Ok",
          timer: "5000",
        });
        navigate("/");
        break;
      case 400:
        dispatch(loginFailure());
        setErrors({ password: "Contraseña incorrecta" });
        break;
      case 404:
        dispatch(loginFailure());
        setErrors({ username: "Nombre de usuario incorrecto" });
        break;
      case 500:
        setErrors({
          login:
            "Error de conexión con la base de datos, llame a un técnico para solucionar el problema",
        });
        break;
    }
  };

  function handleRegister(e) {
    e.preventDefault();
    navigate("/register");
  }

  return (
    <section className="h-screen">
      <div className="h-full">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample image"
            />
          </div>

          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
              <div className="flex flex-row items-center justify-center lg:justify-start">
                <p className="mb-0 mr-4 text-lg">Sign in with</p>
                <a
                  href="https://www.facebook.com/login"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook size={24} className="mr-2 cursor-pointer" />
                </a>
                <a
                  href="https://www.twitter.com/login"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter size={24} className="mr-2 cursor-pointer" />
                </a>
                <a
                  href="https://www.linkedin.com/login"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin size={24} className="cursor-pointer" />
                </a>
                {/*{!isAuthenticated && <Google />}*/}
              </div>

              <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                <p className="mx-4 mb-0 text-center font-semibold dark:text-white">
                  Or
                </p>
              </div>

              {errors.login && (
                <div className="text-red-500 mb-4">{errors.login}</div>
              )}

              <div className="relative mb-6" data-te-input-wrapper-init>
                <input
                  type="text"
                  className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  id="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {!username && (
                  <label
                    htmlFor="username"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                  >
                    Username
                  </label>
                )}
                {errors.username && (
                  <div className="text-red-500 mb-4">{errors.username}</div>
                )}
              </div>

              <div className="relative mb-6" data-te-input-wrapper-init>
                <input
                  type="password"
                  className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {!password && (
                  <label
                    htmlFor="password"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                  >
                    Password
                  </label>
                )}
                {errors.password && (
                  <div className="text-red-500 mb-4">{errors.password}</div>
                )}
              </div>

              <div className="mb-6 flex items-center justify-between">
                <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                  <input
                    className="form-checkbox h-[1.125rem] w-[1.125rem] rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    type="checkbox"
                    value=""
                    id="exampleCheck2"
                    checked={checked} // Agrega esta línea para controlar el estado del checkbox
                    onChange={() => setChecked(!checked)} // Agrega esta línea para cambiar el estado del checkbox
                  />
                  <label
                    className="inline-block pl-[0.15rem] hover:cursor-pointer"
                    htmlFor="exampleCheck2"
                  >
                    Remember me
                  </label>
                </div>
              </div>

              <div className="text-center lg:text-left">
                <button
                  type="submit"
                  className="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  data-te-ripple-init
                  data-te-ripple-color="dark"
                >
                  Login
                </button>

                <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                  Don't have an account? <br></br>
                  <a
                    onClick={(e) => handleRegister(e)}
                    className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                  >
                    Register
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
