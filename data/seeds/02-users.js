const { hash } = require("../../api/secure");


exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'test user', password: hash('testpass') }
      ]);
    });
};
