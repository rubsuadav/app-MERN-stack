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

  validateField(firstName, "First name", 3, errors);
  validateField(lastName, "Last name", 3, errors);
  validateField(username, "Username", 3, errors);
  validateField(password, "Password", 6, errors);
  validateEmail(email, errors);

  return errors;
}

function validateEmail(email, errors) {
  if (!email || !isValidEmail(email)) {
    errors.push("Email is required and must be valid");
  }
}

function validateField(value, fieldName, minLength, errors) {
  if (!value || typeof value !== "string" || value.length < minLength) {
    errors.push(
      value
        ? `${fieldName} must be at least ${minLength} characters long`
        : `${fieldName} is required`
    );
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
