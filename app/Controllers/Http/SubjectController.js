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
  async index() {
    const data = await Database.table("subjects");

    return data;
  }

  async show({ request }) {
    const { id } = request.params;

    const validatedValue = numberTypeParamValidator(id);

    if (validatedValue.error)
      return { status: 500, error: validatedValue.error, data: undefined };

    const subject = await Database.select("*")
      .from("subjects")
      .where({ subject_id: id })
      .first();

    return { status: 200, error: undefined, data: subject || {} };
  }

  async store({ request }) {
    const { title } = request.body;
    // const { title, teacher_id } = request.body;

    const rules = {
      title: "required",
    };

    const validation = await Validator.validateAll(request.body, rules);

    if (validation.fails())
      return { status: 422, error: validation.messages(), data: undefined };

    //     const missingKeys = [];

    //     if (!title) missingKeys.push("title");
    //     // if (!teacher_id) missingKeys.push("teacher_id");

    //     if (missingKeys.length)
    //       return {
    //         status: 422,
    //         error: `${missingKeys} is missing.`,
    //         data: undefined,
    //       };

    await Database.table("subjects").insert({ title });
    // await Database.table("subjects").insert({ title, teacher_id });

    return { status: 200, error: undefined, data: { title } };
    // return { status: 200, error: undefined, data: { title, teacher_id } };
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
