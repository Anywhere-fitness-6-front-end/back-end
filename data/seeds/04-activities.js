
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        { activity_name: "weight lifting" },
        { activity_name: "yoga" },
        { activity_name: "mountain climbing" },
        { activity_name: "cross fit" },
        { activity_name: "advanced thumb war" },
        { activity_name: "karate" },
        { activity_name: "flash mob" },
      ]);
    });
};
