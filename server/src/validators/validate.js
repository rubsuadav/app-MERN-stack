import user from "../models/user.js";
export async function validateUniqueUser(data) {
  const { username, email } = data;
  const oldUser = await user.findOne({
    $or: [{ email }, { username }],
  });
  const errors = oldUser
    ? Object.entries(data).reduce((acc, [key, value]) => {
        if (oldUser[key] === value) {
          acc.push(
            `${key.charAt(0).toUpperCase() + key.slice(1)} already exists`
          );
        }
        return acc;
      }, [])
    : [];
  return errors;
}

export function validateData(data) {
  const { username, password, email, firstName, lastName } = data;
  const errors = [];

  validateField(firstName, "Nombre", 3, errors);
  validateField(lastName, "Apellidos", 3, errors);
  validateField(username, "Nombre de usuario", 3, errors);
  validateField(password, "Contraseña", 6, errors);
  validateEmail(email, errors);

  return errors;
}

function validateEmail(email, errors) {
  if (!email || !isValidEmail(email)) {
    errors.push("Email es obligatorio y debe de ser valido");
  }
}

function validateField(value, fieldName, minLength, errors) {
  if (!value || typeof value !== "string" || value.length < minLength) {
    errors.push(
      value
        ? `${fieldName} debe de tener al menos ${minLength} characteres de largo`
        : `${fieldName} es obligatorio`
    );
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
