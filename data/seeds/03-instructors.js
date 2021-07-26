
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('instructors').del()
    .then(function () {
      // Inserts seed entries
      return knex('instructors').insert([
        { instructor_name: 'Max "The Ripper" Beefstack', user_id: 2 },
        { instructor_name: 'Lily Lightwater', user_id: 3 }
      ]);
    });
};
