"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CreateGroupSchema extends Schema {
  up() {
    this.create("groups", (table) => {
      table.increments("group_id");
      table.string("name", 100).unique().notNullable();
    });
  }

  down() {
    this.drop("groups");
  }
}

module.exports = CreateGroupSchema;
