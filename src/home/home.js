import { classObject } from "../components/objects.js";
import * as ApiWrapper from "../components/api-wrapper.js";

// addClass -----------------------------------------------------------------------------------------------------------
// Add a class with multiple arguments
function addClass(classData) {
  // Create a template anchor element
  const newClass = document.createElement("a");
  newClass.className = "column box m-5 is-3 class_button";
  newClass.innerHTML = `
	<ul>
		<li>
			<p class="title is-4 mb-2">${classData.title}</p>
		</li>
		<li>Year: ${classData.year}</li>
		<li>Semester: ${classData.semester}</li>
		<li>Professor: ${classData.professor}</li>
	</ul>
	`;

  // Add click event listener to the new anchor element
  newClass.addEventListener("click", () => {
    ApiWrapper.getClassGrades(classData.uuid);
    window.location.href = `../class-view/class-view.html?id=${classData.uuid}`;
  });

  // Get the div of columns
  const classesColumns = document.getElementById("classesColumns");
  classesColumns.appendChild(newClass);
}

// removeAllClasses --------------------------------------------------------------------------------------------------
function removeAllClasses() {
  const classesColumns = document.getElementById("classesColumns");
  classesColumns.innerHTML = "";
}

// Modal Code --------------------------------------------------------------------------------------------------------
// Functions to open and close a modal
function openModal(element) {
  element.classList.add("is-active");
}

function closeModal(element) {
  element.classList.remove("is-active");
}

function closeAllModals() {
  (document.querySelectorAll(".modal") || []).forEach((modal) => {
    closeModal(modal);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Add a click event on buttons to open a specific modal
  document.querySelectorAll("#js-modal-trigger").forEach((trigger) => {
    const modal = trigger.dataset.target;
    const target = document.getElementById(modal);

    trigger.addEventListener("click", () => {
      openModal(target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  const modalChildren = document.querySelectorAll(
    ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot #cancelButton"
  );

  modalChildren.forEach((close) => {
    const target = close.closest(".modal");

    close.addEventListener("click", () => {
      closeModal(target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener("keydown", (event) => {
    if (event.code === "Escape") {
      closeAllModals();
    }
  });
});

// Add Class Modal Save Button ---------------------------------------------------------------------------------------------
const saveButton = document.getElementById("saveButton");
const target = saveButton.closest(".modal");

let title, year, sem, prof, loc, credits; // Declare variables

saveButton.addEventListener("click", () => {
  // Grab title and clear it
  const classInput = document.getElementById("classInput");
  title = classInput.value;
  classInput.value = "";

  // Grab selected year
  const yearSelect = document.getElementById("yearSelect");
  year = yearSelect.options[yearSelect.selectedIndex].value;

  // Grab selected semester
  const semSelect = document.getElementById("semesterSelect");
  sem = semSelect.options[semSelect.selectedIndex].value;

  // Grab professor and clear it
  const creditsInput = document.getElementById("creditsInput");
  credits = creditsInput.value;
  creditsInput.value = "";

  // Grab professor and clear it
  const profInput = document.getElementById("profNameInput");
  prof = profInput.value;
  profInput.value = "";

  // Grab lcoation and clear it
  const locationInput = document.getElementById("locationInput");
  loc = locationInput.value;
  locationInput.value = "";

  ApiWrapper.addClass(
    new classObject(
      0, // UUID
      title, // className
      year, // year
      sem, // semester
      loc, // location
      prof, // professor
      "", // gpa
      credits // credits
    )
  );

  closeModal(target);
  refreshClasses();
});

// Load Classes ------------------------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", async () => {
  refreshClasses()

  classList.forEach((item) => {
    addClass(item);
  });
});

// Refresh Classes ---------------------------------------------------------------------------------------------------------
async function refreshClasses() {
  removeAllClasses();

  const classList = await ApiWrapper.getAllClasses();

  classList.forEach((item) => {
    addClass(item);
  });
}

// Refresh Button Click ----------------------------------------------------------------------------------------------------
const refreshButton = document.getElementById("refreshButton");
refreshButton.addEventListener("click", async () => {
  await refreshClasses();
});

// Logo Click --------------------------------------------------------------------------------------------------------------
const logoButton = document.getElementById("logoButton")
logoButton.addEventListener('click', () => {
  window.location.href("../home/home.js")
})