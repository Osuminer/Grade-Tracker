import { classObject, gradeObject } from "./objects.js";

const baseURL = "http://localhost:5000";

// Get all classes ----------------------------------------------------------------------------------------------------------
export async function getAllClasses() {
  try {
    const response = await fetch(`${baseURL}/classes`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Handle the data received from the API
    const classList = data.map(
      (classData) =>
        new classObject(
          classData.uuid,
          classData.class_title,
          classData.class_year,
          classData.semester,
          classData.location,
          classData.professor,
          classData.gpa,
          classData.credits
        )
    );

    return classList;
  } catch (error) {
    console.error("Error fetching classes:", error);
    throw error;
  }
}

// Add class ---------------------------------------------------------------------------------------------------------------
export async function addClass(classData) {
  try {
    const response = await fetch(`${baseURL}/classes/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        class_title: classData.title,
        year: classData.year,
        semester: classData.semester,
        prof: classData.professor,
        location: classData.classLocation,
        credits: classData.credits,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error adding class:", error);
    throw error;
  }
}

// Get grades from class id ------------------------------------------------------------------------------------------------
export async function getClassGrades(uuid) {
  try {
    const response = await fetch(`${baseURL}/class/${uuid}/grades`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    const gradeList = data.map(
      (gradeData) =>
        new gradeObject(
          (uuid = gradeData.uuid),
          (title = gradeData.title),
          (score = gradeData.score),
          (totalScore = gradeData.total),
          (parentUUID = gradeData.parent_uuid)
        )
    );

    // Handle the data received from the API
    data.forEach((gradeData) => {
      console.log(gradeData);
    });

    gradeList.forEach((gradeData) => {
      console.log(gradeData);
    });

    return data;
  } catch (error) {
    console.error("Error fetching class grades:", error);
    throw error;
  }
}

// Get class by id ---------------------------------------------------------------------------------------------------------
export async function getClassById(uuid) {
  try {
    const response = await fetch(`${baseURL}/class/${uuid}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    const classData = new classObject(
      data.class.uuid,
      data.class.className,
      data.class.year,
      data.class.semester,
      data.class.location,
      data.class.professor,
      data.class.gpa,
      data.class.credits
    );

    const gradeData = data.grades.map((grade) => ({
      uuid: grade.uuid,
      title: grade.title,
      score: grade.score,
      total: grade.total,
      dateAdded: grade.date_added,
      dateDue: grade.date_due,
      parentUUID: grade.parent_uuid,
    }));

    return { classData, gradeData };
  } catch (error) {
    console.error("Error fetching class by id:", error);
    throw error;
  }
}

// Add assignment ---------------------------------------------------------------------------------------------------------
export async function addAssignment(gradeData) {
  try {
    const response = await fetch(
      `${baseURL}/class/${gradeData.parentUUID}/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          assignment_name: gradeData.title,
          score: gradeData.score,
          total_score: gradeData.total,
          date_due: gradeData.dateDue,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error adding class:", error);
    throw error;
  }
}

// Add assignment ---------------------------------------------------------------------------------------------------------
export async function editAssignment(gradeData) {
  try {
    const response = await fetch(
      `${baseURL}/updateAssignment/${gradeData.uuid}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          assignment_name: gradeData.title,
          score: gradeData.score,
          total_score: gradeData.total,
          date_due: gradeData.dateDue,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error adding class:", error);
    throw error;
  }
}

// Add assignment ---------------------------------------------------------------------------------------------------------
export async function removeAssignment(gradeUUID) {
  try {
    const response = await fetch(`${baseURL}/removeAssignment/${gradeUUID}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error removing class:", error);
    throw error;
  }
}
