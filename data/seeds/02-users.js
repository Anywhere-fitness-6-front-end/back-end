const { hash } = require("../../api/secure");


exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'test user', password: hash('testpass') },
        { username: 'maxbeef', password: hash('ilovedandelions') },
        { username: 'lilylilw', password: hash('show me the beef') },
        { username: 'fitness fan', password: hash('password') }
      ]);
    });
};
