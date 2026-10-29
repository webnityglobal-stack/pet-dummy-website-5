
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
const appointmentForm = document.getElementById("appointmentForm");
const appointmentDate = document.getElementById("appointmentDate");
const formMessage = document.getElementById("formMessage");

// Mobile navigation
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close mobile menu when a link is selected
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// Prevent appointment dates in the past
function getLocalDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

appointmentDate.min = getLocalDate();

// Demo appointment form
appointmentForm.addEventListener("submit", (event) => {
  event.preventDefault();

  formMessage.textContent = "";

  if (!appointmentForm.reportValidity()) {
    return;
  }

  const formData = new FormData(appointmentForm);
  const appointment = Object.fromEntries(formData.entries());

  if (appointment.date < getLocalDate()) {
    formMessage.textContent = "Please select today or a future date.";
    appointmentDate.focus();
    return;
  }

  // Frontend demonstration only.
  // Connect a backend or WhatsApp API for real bookings.
  console.log("Appointment request:", appointment);

  formMessage.textContent =
    `Demo request prepared for ${appointment.petName}. ` +
    "No appointment has been sent or confirmed yet.";

  appointmentForm.reset();
  appointmentDate.min = getLocalDate();
});

// Automatically update copyright year
document.getElementById("year").textContent =
  new Date().getFullYear();

// Reveal sections smoothly while scrolling
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(
  ".service-card, .doctor-card, .review-card, .gallery-grid img"
).forEach((element) => {
  element.classList.add("reveal");
  observer.observe(element);
});
