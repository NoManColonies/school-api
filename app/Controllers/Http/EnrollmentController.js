"use strict";

const Database = use("Database");
const Validator = use("Validator");
const Enrollment = use("App/Models/Enrollment");

function numberTypeParamValidator(number) {
  if (Number.isNaN(parseInt(number))) {
    return {
      error: `param: '${number}' is not supported, please use param as a number.`,
    };
  }

  return {};
}

class EnrollmentController {
  async index({ request }) {
    const { references } = request.qs;

    const enrollments = Enrollment.query();

    if (references) {
      const extractedReferences = references.split(",");

      extractedReferences.forEach((value) => {
        enrollments.with(value);
      });
    }

    return { status: 200, error: undefined, data: await enrollments.fetch() };
  }

  async show({ request }) {
    const { id } = request.params;

    const validatedValue = numberTypeParamValidator(id);

    if (validatedValue.error)
      return { status: 500, error: validatedValue.error, data: undefined };

    const enrollment = await Enrollment.find(id);

    return { status: 200, error: undefined, data: enrollment || {} };
  }

  async store({ request }) {
    const { mark, student_id, subject_id } = request.body;

    const rules = {
      mark: "required",
      student_id: "required",
      subject_id: "required",
    };

    const validation = await Validator.validateAll(request.body, rules);

    if (validation.fails())
      return { status: 422, error: validation.messages(), data: undefined };

    const enrollment = new Enrollment();
    enrollment.mark = mark;
    enrollment.student_id = student_id;
    enrollment.subject_id = subject_id;

    await enrollment.save();

    return {
      status: 200,
      error: undefined,
      data: enrollment,
    };
  }

  async update({ request }) {
    const { body, params } = request;

    const { id } = params;

    const { mark } = body;

    const enrollment = await Enrollment.find(id);

    enrollment.merge({ mark });

    await enrollment.save();

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
