"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Subject extends Model {
  static get primaryKey() {
    return "subject_id";
  }

  static get createdAtColumn() {
    return null;
  }

  static get updatedAtColumn() {
    return null;
  }

  teacher() {
    return this.belongsTo("App/Models/Teacher");
  }
}

module.exports = Subject;
