"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CreateEnrollmentSchema extends Schema {
  up() {
    this.create("enrollments", (table) => {
      table.increments("enrollment_id");
      table.float("mark").default(0);
      table.timestamp("mark_date").default(this.fn.now());
      table.timestamps();
      table.integer("student_id").unsigned().notNullable();
      table.integer("subject_id").unsigned().notNullable();

      table
        .foreign("student_id")
        .references("students.student_id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");

      table
        .foreign("subject_id")
        .references("subjects.subject_id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
  }

  down() {
    this.drop("enrollments");
  }
}

module.exports = CreateEnrollmentSchema;
