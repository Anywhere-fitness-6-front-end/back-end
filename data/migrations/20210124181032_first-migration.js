/** @param {import('knex').Knex} knex */
exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments('user_id');
      users.string('username', 40).notNullable().unique();
      users.string('password', 60).notNullable();
      users.timestamps(false, true);
    })

    .createTable('instructors', (instructors) => {
      instructors.increments('instructor_id');
      instructors.string('instructor_name');
      instructors.integer('user_id').references('user_id').inTable('users');
    })

    .createTable('activities', (activities) => {
      activities.increments('activity_id');
      activities.text('activity_name');
    })

    .createTable('classes', (classes) => {
      classes.increments('class_id');
      classes.string('class_name').notNullable();
      classes.dateTime('class_time').notNullable();
      classes.integer('instructor_id').notNullable();
      classes.integer('activity_id').references('activity_id').inTable('activities')
      classes.enu('intensity', ['unspecified', 'light', 'moderate', 'intense', 'brutal'], { useNative: true, enumName: 'intensity_level' });
      classes.text('address').notNullable();
      classes.integer('max_size');
      classes.timestamps(false, true);
    })

    .createTable('attendants', (attendants) => {
      attendants.increments('attendant_id');
      attendants.integer('user_id').references('user_id').inTable('users');
      attendants.integer('class_id').references('class_id').inTable('classes')
  })
}

/** @param {import('knex').Knex} knex */
exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('attendants')
  await knex.schema.dropTableIfExists('classes')
  await knex.schema.dropTableIfExists('activities')
  await knex.schema.dropTableIfExists('instructors')
  await knex.schema.dropTableIfExists('users')
  await knex.schema.raw('drop type if exists intensity_level');
}
