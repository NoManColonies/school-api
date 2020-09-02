"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Student extends Model {
  static get primaryKey() {
    return "student_id";
  }

  group() {
    return this.belongsTo("App/Models/Group");
  }

  enrollments() {
    return this.hasMany("App/Models/Enrollment");
  }
}

module.exports = Student;
