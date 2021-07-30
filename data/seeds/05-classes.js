
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('classes').del()
    .then(function () {
      // Inserts seed entries
      return knex('classes').insert([
        {
          class_name: 'Yoga with Lily',
          class_time: '2021-07-31T01:00:00.000Z',
          duration: 90,
          instructor_id: 2,
          activity_name: "yoga",
          intensity: 'moderate',
          address: '123 Yoga Lane, Sun Town, CA',
          max_size: 12,
          available_slots: 12
        }
      ]);
    });
};
