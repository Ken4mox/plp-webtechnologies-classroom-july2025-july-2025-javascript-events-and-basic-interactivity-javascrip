// script.js

// ===========================
// 1. Select main elements
// ===========================
const body = document.body;
const themeToggleBtn = document.getElementById("theme-toggle");

const counterBtn = document.getElementById("counter-btn");
const counterValue = document.getElementById("counter-value");

const faqQuestions = document.querySelectorAll(".faq-question");

const form = document.getElementById("signup-form");
const formMessage = document.getElementById("form-message");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const messageInput = document.getElementById("message");

// ===========================
// 2. Feature: Theme toggle
//    Click button to switch
//    between light and dark.
// ===========================
themeToggleBtn.addEventListener("click", function () {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    themeToggleBtn.textContent = "Switch to Light Mode";
  } else {
    themeToggleBtn.textContent = "Switch to Dark Mode";
  }
});

// ===========================
// 3. Feature: Click counter
//    Increases number on each
//    button click.
// ===========================
let count = 0;

counterBtn.addEventListener("click", function () {
  count = count + 1;
  counterValue.textContent = count;
});

// ===========================
// 4. Feature: FAQ toggle
//    Click a question to show
//    or hide the answer.
// ===========================
faqQuestions.forEach(function (button) {
  button.addEventListener("click", function () {
    const answer = this.nextElementSibling;
    answer.classList.toggle("show");
  });
});

// ===========================
// 5. Form validation helpers
// ===========================
function showFieldError(inputElement, message) {
  const formControl = inputElement.parentElement;
  const errorText = formControl.querySelector(".error-text");

  inputElement.classList.add("error");
  errorText.textContent = message;
}

function clearFieldError(inputElement) {
  const formControl = inputElement.parentElement;
  const errorText = formControl.querySelector(".error-text");

  inputElement.classList.remove("error");
  errorText.textContent = "";
}

// Very simple email check: some text, @, some text, dot, some text.
function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

// ===========================
// 6. Form submit validation
// ===========================
form.addEventListener("submit", function (event) {
  // Stop the form from sending data
  event.preventDefault();

  // Clear old messages
  formMessage.textContent = "";
  formMessage.className = "";
  clearFieldError(nameInput);
  clearFieldError(emailInput);
  clearFieldError(passwordInput);
  clearFieldError(confirmPasswordInput);
  clearFieldError(messageInput);

  // Assume form is valid until we find a problem
  let isValid = true;

  // Name
  if (nameInput.value.trim() === "") {
    showFieldError(nameInput, "Name is required.");
    isValid = false;
  }

  // Email
  if (emailInput.value.trim() === "") {
    showFieldError(emailInput, "Email is required.");
    isValid = false;
  } else if (!isValidEmail(emailInput.value.trim())) {
    showFieldError(emailInput, "Please enter a valid email.");
    isValid = false;
  }

  // Password
  if (passwordInput.value.trim() === "") {
    showFieldError(passwordInput, "Password is required.");
    isValid = false;
  } else if (passwordInput.value.length < 6) {
    showFieldError(passwordInput, "Password must be at least 6 characters.");
    isValid = false;
  }

  // Confirm password
  if (confirmPasswordInput.value.trim() === "") {
    showFieldError(confirmPasswordInput, "Please confirm your password.");
    isValid = false;
  } else if (confirmPasswordInput.value !== passwordInput.value) {
    showFieldError(confirmPasswordInput, "Passwords do not match.");
    isValid = false;
  }

  // Message
  if (messageInput.value.trim().length < 10) {
    showFieldError(
      messageInput,
      "Message should be at least 10 characters."
    );
    isValid = false;
  }

  // Final result
  if (!isValid) {
    formMessage.textContent = "Please fix the errors and try again.";
    formMessage.classList.add("error");
  } else {
    formMessage.textContent = "Form submitted successfully!";
    formMessage.classList.add("success");

    // Optional: clear fields
    form.reset();
  }
});

// ===========================
// 7. Extra: live validation
//    Check fields while user
//    types (optional).
// ===========================
nameInput.addEventListener("input", function () {
  if (this.value.trim() !== "") {
    clearFieldError(this);
  }
});

emailInput.addEventListener("input", function () {
  if (isValidEmail(this.value.trim())) {
    clearFieldError(this);
  }
});

passwordInput.addEventListener("input", function () {
  if (this.value.length >= 6) {
    clearFieldError(this);
  }
});

confirmPasswordInput.addEventListener("input", function () {
  if (this.value === passwordInput.value && this.value !== "") {
    clearFieldError(this);
  }
});

messageInput.addEventListener("input", function () {
  if (this.value.trim().length >= 10) {
    clearFieldError(this);
  }
});
