"use strict";

const Database = use("Database");
const Validator = use("Validator");
const Subject = use("App/Models/Subject");

function numberTypeParamValidator(number) {
  if (Number.isNaN(parseInt(number))) {
    return {
      error: `param: '${number}' is not supported, please use param as a number.`,
    };
  }

  return {};
}

class SubjectController {
  async index({ request }) {
    const { references = undefined } = request.qs;

    const subjects = Subject.query();

    if (references) {
      const extractedReferences = references.split(",");
      subjects.with(extractedReferences);
    }

    return { status: 200, error: undefined, data: await subjects.fetch() };
  }

  async show({ request }) {
    const { id } = request.params;

    const validatedValue = numberTypeParamValidator(id);

    if (validatedValue.error)
      return { status: 500, error: validatedValue.error, data: undefined };

    const subject = await Subject.find(id);

    return { status: 200, error: undefined, data: subject || {} };
  }

  async store({ request }) {
    const { title, teacher_id } = request.body;

    const rules = {
      title: "required",
      teacher_id: "required",
    };

    const validation = await Validator.validateAll(request.body, rules);

    if (validation.fails())
      return { status: 422, error: validation.messages(), data: undefined };

    const subject = new Subject();
    subject.title = title;
    subject.teacher_id = teacher_id;

    await subject.save();

    return { status: 200, error: undefined, data: subject };
  }

  async update({ request }) {
    const { body, params } = request;

    const { id } = params;

    const { title } = body;

    const subjectID = await Database.table("subjects")
      .where({ subject_id: id })
      .update({
        title,
      });

    const subject = await Database.table("subjects")
      .where({ subject_id: subjectID })
      .first();

    return {
      status: 200,
      error: undefined,
      data: subject,
    };
  }

  async destroy({ request }) {
    const { id } = request.params;

    await Database.table("subjects").where({ subject_id: id }).delete();

    return { status: 200, error: undefined, data: { message: "success" } };
  }
}

module.exports = SubjectController;
