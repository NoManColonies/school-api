"use strict";

const Database = use("Database");
const Validator = use("Validator");

function numberTypeParamValidator(number) {
  if (Number.isNaN(parseInt(number))) {
    return {
      error: `param: '${number}' is not supported, please use param as a number.`,
    };
  }

  return {};
}

class EnrollmentController {
  async index() {
    const data = await Database.table("enrollments");

    return data;
  }

  async show({ request }) {
    const { id } = request.params;

    const validatedValue = numberTypeParamValidator(id);

    if (validatedValue.error)
      return { status: 500, error: validatedValue.error, data: undefined };

    const enrollment = await Database.select("*")
      .from("enrollments")
      .where({
        enrollment_id: id,
      })
      .first();

    return { status: 200, error: undefined, data: enrollment || {} };
  }

  async store({ request }) {
    const { mark } = request.body;
    // const { mark, student_id, subject_id } = request.body;

    const rules = {
      mark: "required",
    };

    const validation = await Validator.validateAll(request.body, rules);

    if (validation.fails())
      return { status: 422, error: validation.messages(), data: undefined };

    //     const missingKeys = [];

    //     if (!mark) missingKeys.push("mark");
    // if (!student_id) missingKeys.push("student_id");
    // if (!subject_id) missingKeys.push("subject_id");

    //     if (missingKeys.length)
    //       return {
    //         status: 422,
    //         error: `${missingKeys} is missing.`,
    //         data: undefined,
    //       };

    await Database.table("enrollments").insert({
      mark,
      created_at: new Date(),
      updated_at: new Date(),
      // student_id,
      // subject_id,
    });

    return {
      status: 200,
      error: undefined,
      // data: { mark, student_id, subject_id },
      data: { mark },
    };
  }

  async update({ request }) {
    const { body, params } = request;

    const { id } = params;

    const { mark } = body;

    const enrollmentID = await Database.table("enrollments")
      .where({ enrollment_id: id })
      .update({
        mark,
        updated_at: new Date(),
      });

    const enrollment = await Database.table("enrollments")
      .where({ enrollment_id: enrollmentID })
      .first();

    return {
      status: 200,
      error: undefined,
      data: enrollment,
    };
  }

  async destroy({ request }) {
    const { id } = request.params;

    await Database.table("enrollments").where({ enrollment_id: id }).delete();

    return { status: 200, error: undefined, data: { message: "success" } };
  }
}

module.exports = EnrollmentController;
