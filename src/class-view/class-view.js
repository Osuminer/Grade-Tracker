import { classObject, gradeObject } from "../components/objects.js";
import * as ApiWrapper from "../components/api-wrapper.js";

// Logo Click --------------------------------------------------------------------------------------------------------------
// const logoButton = document.getElementById("logoButton");
// logoButton.addEventListener("click", () => {
//   window.location.href = "../home/home.html";
// });

// Add a class with multiple arguments -------------------------------------------------------------------------------------
function addAssignementToTable(gradeData) {
  // Create a template anchor element
  const newAssign = document.createElement("tr");

  const dateOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "UTC",
  };

  let percent = `${((gradeData.score / gradeData.total) * 100).toFixed(2)}%`;

  const dateAdded = gradeData.dateAdded
    ? new Date(gradeData.dateAdded).toLocaleDateString("en-us", dateOptions)
    : "";
  const dateDue = gradeData.dateDue
    ? new Date(gradeData.dateDue).toLocaleDateString("en-us", dateOptions)
    : "";

  newAssign.innerHTML = `
  <td class="is-narrow">
    <button class="button is-small js-modal-trigger edit-button" data-target="editAssignmentModal" data-grade='${JSON.stringify(
      gradeData
    )}'>
      <span class="icon is-small is-left">
        <i class="fa-solid fa-pen-to-square"></i>
      </span>
    </button>
  </td>
	<td>${gradeData.title}</td>
	<td>${gradeData.score}</td>
	<td>${gradeData.total}</td>
  <td>${percent}</td>
	<td>${dateAdded}</td>
	<td>${dateDue}</td>
	`;

  // Get the div of columns
  const gradeTable = document.getElementById("gradeTable");
  gradeTable.appendChild(newAssign);
}

// Extract uuid from URL parameter -----------------------------------------------------------------------------------------

const urlParams = new URLSearchParams(window.location.search);
const classId = urlParams.get("id");

document.addEventListener("DOMContentLoaded", async () => {
  refreshGrades();
});

// Modal Code --------------------------------------------------------------------------------------------------------
// Functions to open and close a modal
function openModal(element) {
  element.classList.add("is-active");
}

function closeModal(element) {
  element.classList.remove("is-active");
}

function closeAllModals() {
  document.querySelectorAll(".modal").forEach((modal) => {
    closeModal(modal);
  });
}

let editAssignmentButtonData;

// Fill the edit modal with the grade information
function fillEditModal(gradeData) {
  // Fill in assignment name
  const assignmentNameInput = document.getElementById("nameInput");
  assignmentNameInput.value = gradeData.title;

  // Fill in due date
  const dateDueInput = document.getElementById("dateDueInput");
  if (gradeData.dateDue != null) {
    const dateDue = new Date(gradeData.dateDue);
    dateDueInput.valueAsDate = dateDue;
  } else {
    dateDueInput.value = "";
  }

  // Fill in score
  const scoreInput = document.getElementById("scoreInput");
  scoreInput.value = gradeData.score;

  // Fill in total
  const totalScoreInput = document.getElementById("totalScoreInput");
  totalScoreInput.value = gradeData.total;
}

document.addEventListener("DOMContentLoaded", () => {
  // Add a click event on various child elements to close the parent modal
  const modalChildren = document.querySelectorAll(
    ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot #cancelButton"
  );

  const addButton = document.getElementById("addAssignmentButton");

  document.body.addEventListener("click", (e) => {
    let target;

    // Only check the type of button if there is one nearby
    if (e.target.closest("button") != null) {
      target = e.target.closest("button");

      // Check if click was on the add button
      if (target === addButton) {
        const targetModal = document.getElementById(addButton.dataset.target);
        openModal(targetModal);
      }

      // Check if click was on an edit button
      const isEditButton = target.closest(".edit-button");
      if (isEditButton) {
        const targetModal = document.getElementById(
          isEditButton.dataset.target
        );
        const gradeData = JSON.parse(isEditButton.dataset.grade);
        editAssignmentButtonData = gradeData;

        fillEditModal(gradeData);
        openModal(targetModal);
      }
    }
  });

  // Add click event to close modal when close buttons are clicked
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

// Remove all grades --------------------------------------------------------------------------------------------
function removeAllGrades() {
  const gradeTable = document.getElementById("gradeTable");
  gradeTable.innerHTML = "";
}

// Refresh grades -----------------------------------------------------------------------------------------------
async function refreshGrades() {
  removeAllGrades();

  try {
    // Get class data
    const data = await ApiWrapper.getClassById(classId);

    // Fill in class Title
    const className = document.getElementById("classTitle");
    className.textContent = data.classData.title;

    // Fill in class Year
    const classYear = document.getElementById("yearText");
    classYear.innerHTML = `<strong>Year:</strong> ${data.classData.year}`;

    // Fill in class Semester
    const classSemester = document.getElementById("semesterText");
    classSemester.innerHTML = `<strong>Semester:</strong> ${data.classData.semester}`;

    // Fill in class Location
    const classLocation = document.getElementById("locationText");
    if (data.classData.classLocation != null) {
      classLocation.innerHTML = `<strong>Location:</strong> ${data.classData.classLocation}`;
    }

    // Fill in class Professor
    const classProfessor = document.getElementById("professorText");
    if (data.classData.professor != null) {
      classProfessor.innerHTML = `<strong>Professor:</strong> ${data.classData.professor}`;
    }

    // Fill in class Credits
    const classCredits = document.getElementById("creditsText");
    if (data.classData.credits != null) {
      classCredits.innerHTML = `<strong>Credits:</strong> ${data.classData.credits}`;
    }

    // Fill in class GPA
    const classGPA = document.getElementById("gpaText");
    if (data.classData.gpa != null) {
      classGPA.innerHTML = `<strong>GPA:</strong> ${data.classData.gpa}`;
    }

    // Fill in table with assignments
    data.gradeData.forEach((assignment) => {
      addAssignementToTable(assignment);
    });
  } catch (error) {
    console.error(error);
  }
}

// Add assignment save button ----------------------------------------------------------------------
const submitAddAssignmentButton = document.getElementById(
  "submitAddAssignmentButton"
);
const addModal = submitAddAssignmentButton.closest(".modal");

submitAddAssignmentButton.addEventListener("click", () => {
  // Grab title and clear it
  const nameInput = document.getElementById("nameAddInput");
  let title = nameInput.value;
  nameInput.value = "";

  // Grab date and clear it
  const dateDueInput = document.getElementById("dateDueAddInput");
  let dateDue = dateDueInput.value;
  dateDueInput.value = "";

  // Grab score and clear it
  const scoreInput = document.getElementById("scoreAddInput");
  let score = scoreInput.value;
  scoreInput.value = "";

  // Grab title and clear it
  const totalScoreInput = document.getElementById("totalScoreAddInput");
  let totalScore = totalScoreInput.value;
  totalScoreInput.value = "";

  // Make grade object out of data, use classId
  ApiWrapper.addAssignment(
    new gradeObject("", title, score, totalScore, classId, "", dateDue)
  );

  closeModal(addModal);
  refreshGrades();
});

// Add assignment save button ----------------------------------------------------------------------
const submitEditAssignmentButton = document.getElementById("saveButton");
const editModal = submitEditAssignmentButton.closest(".modal");

submitEditAssignmentButton.addEventListener("click", () => {
  // Grab title and clear it
  const nameInput = document.getElementById("nameInput");
  let title = nameInput.value;
  nameInput.value = "";

  // Grab date and clear it
  const dateDueInput = document.getElementById("dateDueInput");
  let dateDue = dateDueInput.value;
  dateDueInput.value = "";

  // Grab score and clear it
  const scoreInput = document.getElementById("scoreInput");
  let score = scoreInput.value;
  scoreInput.value = "";

  // Grab title and clear it
  const totalScoreInput = document.getElementById("totalScoreInput");
  let totalScore = totalScoreInput.value;
  totalScoreInput.value = "";

  // Make grade object out of data, use classId
  ApiWrapper.editAssignment(
    new gradeObject(
      editAssignmentButtonData.uuid,
      title,
      score,
      totalScore,
      classId,
      "",
      dateDue
    )
  );

  closeModal(editModal);
  refreshGrades();
});

// Refresh Button Click ----------------------------------------------------------------------------------------------------
const refreshButton = document.getElementById("refreshButton");
refreshButton.addEventListener("click", async () => {
  await refreshGrades();
});

// Assignment Delete Button Click ------------------------------------------------------------------------------------------
const assignDeleteButton = document.getElementById("assignDeleteButton");
assignDeleteButton.addEventListener("click", async () => {
  const gradeUUID = editAssignmentButtonData.uuid;
  ApiWrapper.removeAssignment(gradeUUID);

  closeModal(editModal);
  refreshGrades();
});
