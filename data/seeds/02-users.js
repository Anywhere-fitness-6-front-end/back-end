const { hash } = require("../../api/secure");


exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { name: 'Test User', instructor: false, email: 'test@user.com', password: hash('testpass') },
        { name: 'Max Beefstack', instructor: true, email: 'maxbeef@email.com', password: hash('ilovedandelions') },
        { name: 'Lily Water Lily', instructor: true, email: 'lilylilw@email.com', password: hash('show me the beef') },
        { name: 'Jon Doe', instructor: false, email: 'fitnessfan@email.com', password: hash('password') }
      ]);
    });
};
