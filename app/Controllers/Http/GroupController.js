"use strict";

const Database = use("Database");
const Validator = use("Validator");
const Group = use("App/Models/Group");

function numberTypeParamValidator(number) {
  if (Number.isNaN(parseInt(number))) {
    return {
      error: `param: '${number}' is not supported, please use param as a number.`,
    };
  }

  return {};
}

class GroupController {
  async index({ request }) {
    const { references } = request.qs;
    const groups = Group.query();

    if (references) {
      const extractedReferences = references.split(",");
      groups.with(extractedReferences);
    }

    return { status: 200, error: undefined, data: await groups.fetch() };
  }

  async show({ request }) {
    const { id } = request.params;

    const validatedValue = numberTypeParamValidator(id);

    if (validatedValue.error)
      return { status: 500, error: validatedValue.error, data: undefined };

    const group = await Group.find(id);

    return { status: 200, error: undefined, data: group || {} };
  }

  async store({ request }) {
    const { name } = request.body;

    const rules = {
      name: "required",
    };

    const validation = await Validator.validateAll(request.body, rules);

    if (validation.fails())
      return { status: 422, error: validation.messages(), data: undefined };

    //     if (!name)
    //       return { status: 422, error: "name is missing.", data: undefined };

    await Database.table("groups").insert({
      name,
    });

    return { status: 200, error: undefined, data: { name } };
  }

  async update({ request }) {
    const { body, params } = request;

    const { id } = params;

    const { name } = body;

    const groupID = await Database.table("groups")
      .where({ group_id: id })
      .update({
        name,
      });

    const group = await Database.table("groups")
      .where({ group_id: groupID })
      .first();

    return {
      status: 200,
      error: undefined,
      data: group,
    };
  }

  async destroy({ request }) {
    const { id } = request.params;

    await Database.table("groups").where({ group_id: id }).delete();

    return { status: 200, error: undefined, data: { message: "success" } };
  }
}

module.exports = GroupController;
