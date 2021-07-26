exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments('user_id')
      users.string('username', 40).notNullable().unique();
      users.string('password', 60).notNullable();
      users.timestamps(false, true);
    })
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('users')
}
