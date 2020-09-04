"use strict";

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

Factory.blueprint("App/Models/Teacher", (faker) => {
  return {
    first_name: faker.first(),
    last_name: faker.last(),
    email: faker.email(),
    password: faker.word({ length: 8 }),
  };
});

Factory.blueprint("App/Models/Group", (faker) => {
  return {
    name: faker.word({ syllables: 3 }),
  };
});

Factory.blueprint("App/Models/Subject", (faker) => {
  return {
    title: faker.sentence({ words: 2 }),
  };
});

// Factory.blueprint('App/Models/User', (faker) => {
//   return {
//     username: faker.username()
//   }
// })
