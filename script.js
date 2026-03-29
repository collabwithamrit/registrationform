const form          = document.getElementById("registrationForm");
const departmentSel = document.getElementById("department");
const resetBtn      = document.getElementById("resetBtn");
const successBox    = document.getElementById("successBox");
const successMsg    = document.getElementById("successMsg");

const fields = [
  "firstName", "lastName", "dob", "gender", "phone", "email",
  "department", "prevSchool", "gpa", "country",
  "district", "address", "guardianName", "relation", "guardianPhone"
];

fields.forEach(function (id) {
  const el = document.getElementById(id);
  if (!el) return;
  const evt = el.tagName === "SELECT" ? "change" : "input";
  el.addEventListener(evt, function () { clearError(id); });
});

function showError(id, msg) {
  const el = document.getElementById(id);
  const err = document.getElementById(id + "Err");
  if (el) el.classList.add("error");
  if (err) err.textContent = msg;
}

function clearError(id) {
  const el = document.getElementById(id);
  const err = document.getElementById(id + "Err");
  if (el) el.classList.remove("error");
  if (err) err.textContent = "";
}

function isEmpty(val) {
  return !val || val.trim() === "";
}

function isValidPhone(phone) {
  return /^[6-9]\d{9}$/.test(phone.trim());
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function isValidDOB(val) {
  return /^\d{4}-\d{2}-\d{2}$/.test(val.trim());
}

function isValidGPA(val) {
  const num = parseFloat(val);
  return !isNaN(num) && num >= 0 && num <= 100;
}

function validateForm() {
  let valid = true;

  if (isEmpty(document.getElementById("firstName").value)) {
    showError("firstName", "First name is required.");
    valid = false;
  }

  if (isEmpty(document.getElementById("lastName").value)) {
    showError("lastName", "Last name is required.");
    valid = false;
  }

  const dob = document.getElementById("dob").value;
  if (isEmpty(dob)) {
    showError("dob", "Date of birth is required.");
    valid = false;
  } else if (!isValidDOB(dob)) {
    showError("dob", "Enter date in YYYY-MM-DD format (e.g. 2065-04-15).");
    valid = false;
  }

  if (isEmpty(document.getElementById("gender").value)) {
    showError("gender", "Please select your gender.");
    valid = false;
  }

  const phone = document.getElementById("phone").value;
  if (isEmpty(phone)) {
    showError("phone", "Phone number is required.");
    valid = false;
  } else if (!isValidPhone(phone)) {
    showError("phone", "Enter a valid 10-digit phone number.");
    valid = false;
  }

  const email = document.getElementById("email").value;
  if (!isEmpty(email) && !isValidEmail(email)) {
    showError("email", "Enter a valid email address.");
    valid = false;
  }

  if (isEmpty(document.getElementById("department").value)) {
    showError("department", "Please select a department.");
    valid = false;
  }

  if (isEmpty(document.getElementById("prevSchool").value)) {
    showError("prevSchool", "Previous school name is required.");
    valid = false;
  }

  const gpa = document.getElementById("gpa").value;
  if (isEmpty(gpa)) {
    showError("gpa", "SEE GPA or percentage is required.");
    valid = false;
  } else if (!isValidGPA(gpa)) {
    showError("gpa", "Enter a valid GPA (0–4.0) or percentage (0–100).");
    valid = false;
  }

  if (isEmpty(document.getElementById("country").value)) {
    showError("country", "Please select a country.");
    valid = false;
  }

  if (isEmpty(document.getElementById("district").value)) {
    showError("district", "District / city is required.");
    valid = false;
  }

  if (isEmpty(document.getElementById("address").value)) {
    showError("address", "Full address is required.");
    valid = false;
  }

  if (isEmpty(document.getElementById("guardianName").value)) {
    showError("guardianName", "Guardian name is required.");
    valid = false;
  }

  if (isEmpty(document.getElementById("relation").value)) {
    showError("relation", "Please select relation.");
    valid = false;
  }

  const gPhone = document.getElementById("guardianPhone").value;
  if (isEmpty(gPhone)) {
    showError("guardianPhone", "Guardian phone number is required.");
    valid = false;
  } else if (!isValidPhone(gPhone)) {
    showError("guardianPhone", "Enter a valid 10-digit phone number.");
    valid = false;
  }

  const declaration = document.getElementById("declaration");
  const decErr = document.getElementById("declarationErr");
  if (!declaration.checked) {
    decErr.textContent = "You must agree to the declaration before submitting.";
    valid = false;
  } else {
    decErr.textContent = "";
  }

  return valid;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!validateForm()) {
    const firstErr = document.querySelector(".error");
    if (firstErr) firstErr.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  const firstName = document.getElementById("firstName").value.trim();
  const lastName  = document.getElementById("lastName").value.trim();
  const dept      = departmentSel.options[departmentSel.selectedIndex].text;

  form.style.display = "none";
  successBox.classList.add("show");
  successMsg.innerHTML =
    `<strong>${firstName} ${lastName}</strong> has been successfully registered for ` +
    `<strong>${dept}</strong> at Tilottama Secondary School.<br><br>` +
    `Please keep this confirmation for future reference. ` +
    `Our team will contact you within 3 working days.`;
});

resetBtn.addEventListener("click", function () {
  form.reset();
  document.querySelectorAll(".error-msg").forEach(function (el) { el.textContent = ""; });
  document.querySelectorAll(".error").forEach(function (el) { el.classList.remove("error"); });
});
