"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CreateTeacherSchema extends Schema {
  up() {
    this.create("teachers", (table) => {
      table.increments("teacher_id");
      table.string("first_name", 120).notNullable();
      table.string("last_name", 120).notNullable();
      table.string("password").notNullable();
      table.string("email").notNullable().unique();
      table.timestamps();
    });
  }

  down() {
    this.drop("teachers");
  }
}

module.exports = CreateTeacherSchema;
