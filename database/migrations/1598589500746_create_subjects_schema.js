"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CreateSubjectsSchema extends Schema {
  up() {
    this.create("subjects", (table) => {
      table.increments("subject_id");
      table.string("title", 120).unique();
      table.integer("teacher_id").unsigned();

      table
        .foreign("teacher_id")
        .references("teachers.teacher_id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
  }

  down() {
    this.drop("subjects");
  }
}

module.exports = CreateSubjectsSchema;
