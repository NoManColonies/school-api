"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Teacher extends Model {
  static get primaryKey() {
    return "teacher_id";
  }

  subjects() {
    return this.hasMany("App/Models/Subject");
  }
}

module.exports = Teacher;
