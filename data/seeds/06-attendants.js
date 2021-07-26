
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('attendants').del()
    .then(function () {
      // Inserts seed entries
      return knex('attendants').insert([
        {
          user_id: 4,
          class_id: 1,
        }
      ]);
    });
};
