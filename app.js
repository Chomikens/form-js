// Group all DOM elements at the top for better organization
const userPhone = document.getElementById("tel");
const userPortfolioWeb = document.getElementById("website");
const userDatePick = document.getElementById("start-date");
const userCoverLetter = document.getElementById("cover");
const userJobForm = document.querySelector("#jobForm");
const modalDialog = document.getElementById("modalDialog");
const submitButton = document.querySelector('[type="submit"]');

// Add visual feedback during form submission
const toggleSubmitButtonState = (isLoading) => {
  submitButton.disabled = isLoading;
  submitButton.textContent = isLoading ? "Submitting..." : "Submit";
};

// Validation functions with better error handling
const validateUserPhone = () => {
  const userPhonePattern = /[0-9]{3}-[0-9]{3}-[0-9]{3}/;
  const errorMessage = document.getElementById("tel-error");

  // Early return for empty optional field
  if (!userPhone.value) {
    errorMessage.hidden = true;
    userPhone.style.border = "";
    return true; // Valid if empty since it's optional
  }

  const isValid = userPhonePattern.test(userPhone.value);
  userPhone.style.border = isValid ? "1px solid #16a34a" : "1px solid #dc2626";
  errorMessage.hidden = isValid;
  return isValid;
};

const validateUserWeb = () => {
  const errorMessage = document.getElementById("website-error");

  // Early return for empty optional field
  if (!userPortfolioWeb.value) {
    errorMessage.hidden = true;
    userPortfolioWeb.style.border = "";
    return true; // Valid if empty since it's optional
  }

  const isValid =
    userPortfolioWeb.value.startsWith("https://") ||
    userPortfolioWeb.value.startsWith("http://");
  userPortfolioWeb.style.border = isValid
    ? "1px solid #16a34a"
    : "1px solid #dc2626";
  errorMessage.hidden = isValid;
  return isValid;
};

const validateUserStartingDate = () => {
  const actualDate = new Date();
  const userDate = new Date(userDatePick.value);
  const errorMessage = document.getElementById("start-date-error");

  if (!userDatePick.value) {
    errorMessage.hidden = true;
    userDatePick.style.border = "";
    return false; // Invalid if empty since it's required
  }

  const isValid = userDate > actualDate;
  userDatePick.style.border = isValid
    ? "1px solid #16a34a"
    : "1px solid #dc2626";
  errorMessage.hidden = isValid;
  return isValid;
};

const validateTextLength = () => {
  const length = document.getElementById("cover-counter");
  const errorMessage = document.getElementById("cover-error");
  const currentLength = userCoverLetter.value.length;

  length.textContent = `${currentLength} / 500 characters`;
  const isValid = currentLength >= 100;
  errorMessage.hidden = isValid;
  return isValid;
};

// Clean up event listeners
function removeAllListeners() {
  userPhone.removeEventListener("blur", validateUserPhone);
  userPortfolioWeb.removeEventListener("blur", validateUserWeb);
  userDatePick.removeEventListener("blur", validateUserStartingDate);
  userCoverLetter.removeEventListener("input", validateTextLength);
}

// Modal handling
function showModal(userName) {
  const userGreeting = modalDialog.querySelector("h2");
  userGreeting.textContent = `Thank you for your application, ${userName}!`;
  modalDialog.querySelector("p").textContent = "We will contact you soon.";
  modalDialog.showModal();
}


async function sendData(e) {
  e.preventDefault();

  // Add loading state
  toggleSubmitButtonState(true);

  try {
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // Simulate API call (remove this in production)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    showModal(data.userName);
    e.target.reset();
    removeAllListeners();
  } catch (error) {
    console.error("Form submission error:", error);
    alert("Something went wrong. Please try again.");
  } finally {
    toggleSubmitButtonState(false);
  }
}

// Event listeners
userPhone.addEventListener("blur", validateUserPhone);
userPortfolioWeb.addEventListener("blur", validateUserWeb);
userDatePick.addEventListener("blur", validateUserStartingDate);
userCoverLetter.addEventListener("input", validateTextLength);
userJobForm.addEventListener("submit", sendData);
document
  .getElementById("closeBtn")
  .addEventListener("click", () => modalDialog.close());
