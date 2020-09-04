"use strict";

const { test } = use("Test/Suite")("Teacher Validator");
const teacherValidator = require("../../service/teacherValidator");

test("should receive object as first parameter.", async ({ assert }) => {
  const validatedData = await teacherValidator({
    first_name: "John",
    last_name: "Doe",
    email: "domain@example.com",
    password: "12345678",
  });

  assert.isOk(validatedData);

  const validatedData2 = await teacherValidator(
    "John",
    "Doe",
    "email",
    "password"
  );

  assert.isNotOk(validatedData2);
});

test("should return error when pass incorrect data.", async ({ assert }) => {
  const validatedData = await teacherValidator({
    first_name: "first_name",
    last_name: "last_name",
    email: "email@domain.com",
    password: "averygoodpassword",
  });

  assert.isArray(validatedData.error);
});

test("should return one and only one error if incorrect data is passed.", async ({
  assert,
}) => {
  const validatedData = await teacherValidator({
    first_name: "first_name",
    last_name: "last_name",
    email: "email",
    password: "12345678",
  });

  assert.equal(validatedData.error.length, 1);
});

test("should return more than one error if multiple incorrect data is passed.", async ({
  assert,
}) => {
  const validatedData = await teacherValidator({
    first_name: "John",
    last_name: "Doe",
    email: "email",
    password: "12345678",
  });

  assert.isAbove(validatedData.error.length, 1);
});

test("should return undefined when pass correct data.", async ({ assert }) => {
  const validatedData = await teacherValidator({
    first_name: "John",
    last_name: "Doe",
    email: "john@example.com",
    password: "12345678",
  });

  assert.equal(validatedData.error, undefined);
});
