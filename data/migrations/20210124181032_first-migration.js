/** @param {import('knex').Knex} knex */
exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments('user_id');
      users.string('email', 60).notNullable().unique();
      users.string('password', 60).notNullable();
      users.string('name', 60).notNullable();
      users.boolean('instructor').notNullable().defaultTo(false);
      users.timestamps(false, true);
    })

    .createTable('classes', (classes) => {
      classes.increments('class_id');
      classes.string('class_name').notNullable();
      classes.dateTime('class_time').notNullable();
      classes.integer('duration').notNullable();
      classes.integer('instructor_id').notNullable();
      classes.text('activity_name').notNullable();
      classes.enu('intensity', ['unspecified', 'easy', 'light', 'moderate', 'intense', 'brutal'], { useNative: true, enumName: 'intensity_level' });
      classes.text('address').notNullable();
      classes.integer('max_size').notNullable();
      classes.integer('available_slots').notNullable();
      classes.timestamps(false, true);
    })

    .createTable('attendants', (attendants) => {
      attendants.increments('attendant_id');
      attendants.integer('user_id').references('user_id').inTable('users')
        .onDelete('CASCADE').onUpdate('CASCADE');
      attendants.integer('class_id').references('class_id').inTable('classes')
        .onDelete('CASCADE').onUpdate('CASCADE');
      attendants.unique(['class_id', 'user_id']);
    })
}

/** @param {import('knex').Knex} knex */
exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('attendants');
  await knex.schema.dropTableIfExists('classes');
  await knex.schema.dropTableIfExists('activities');
  await knex.schema.dropTableIfExists('instructors');
  await knex.schema.dropTableIfExists('users');
  await knex.schema.raw('drop type if exists intensity_level');
}
