"use strict";

const Database = use("Database");
const Hash = use("Hash");
const Validator = use("Validator");

function numberTypeParamValidator(number) {
  if (Number.isNaN(parseInt(number))) {
    return {
      error: `param: '${number}' is not supported, please use param as a number.`,
    };
  }

  return {};
}

class StudentController {
  async index() {
    const students = await Database.table("students");

    return students;
  }

  async show({ request }) {
    const { id } = request.params;

    const validatedValue = numberTypeParamValidator(id);

    if (validatedValue.error)
      return { status: 500, error: validatedValue.error, data: undefined };

    const student = await Database.select("*")
      .from("students")
      .where({
        student_id: id,
      })
      .first();

    return { status: 200, error: undefined, data: student || {} };
  }

  async store({ request }) {
    const { first_name, last_name, email, password } = request.body;

    const rules = {
      first_name: "required",
      last_name: "required",
      email: "required|email|unique:students,email",
      password: "required|min:8",
    };

    const validation = await Validator.validate(request.body, rules);

    if (validation.fails())
      return { status: 422, error: validation.messages(), data: undefined };

    //     const missingKeys = [];

    //     if (!first_name) missingKeys.push("first_name");
    //     if (!last_name) missingKeys.push("last_name");
    //     if (!email) missingKeys.push("email");
    //     if (!password) missingKeys.push("password");

    //     if (missingKeys.length) {
    //       return {
    //         status: 422,
    //         error: `${missingKeys} is missing.`,
    //         data: undefined,
    //       };
    //     }

    const hashedPassword = await Hash.make(password);

    await Database.table("students").insert({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return {
      status: 200,
      error: undefined,
      data: { first_name, last_name, email },
    };
  }

  async update({ request }) {
    const { body, params } = request;

    const { id } = params;

    const { first_name, last_name, email } = body;

    const studentID = await Database.table("students")
      .where({ student_id: id })
      .update({
        first_name,
        last_name,
        email,
      });

    const student = await Database.table("students")
      .where({ student_id: studentID })
      .first();

    return {
      status: 200,
      error: undefined,
      data: student,
    };
  }

  async destroy({ request }) {
    const { id } = request.params;

    await Database.table("students").where({ student_id: id }).delete();

    return { status: 200, error: undefined, data: { message: "success" } };
  }
}

module.exports = StudentController;
