export class classObject {
  constructor(
    uuid,
    title,
    year,
    semester,
    classLocation,
    professor,
    gpa,
    credits
  ) {
    this.uuid = uuid;
    this.title = title;
    this.year = year;
    this.semester = semester;
    this.classLocation = classLocation;
    this.professor = professor;
    this.gpa = gpa;
    this.credits = credits;
  }
}

export class gradeObject {
  constructor(uuid, title, score, total, parentUUID, dateAdded, dateDue) {
    this.uuid = uuid;
    this.title = title;
    this.score = score;
    this.total = total;
    this.parentUUID = parentUUID;
    this.dateAdded = dateAdded;
    this.dateDue = dateDue;
  }
}
