"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");
const Hash = use("Hash");

class Teacher extends Model {
  static boot() {
    super.boot();

    this.addHook("beforeSave", async (teacherInstance) => {
      if (teacherInstance.dirty.password) {
        teacherInstance.password = await Hash.make(
          teacherInstance.dirty.password
        );
      }
    });
  }

  static get primaryKey() {
    return "teacher_id";
  }

  subjects() {
    return this.hasMany("App/Models/Subject");
  }
}

module.exports = Teacher;
