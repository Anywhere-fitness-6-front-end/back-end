
/** @param {import('knex').Knex} knex */
exports.up = async (knex) => {
	await knex.schema
		.alterTable('attendants', attendants => {
			attendants.integer('user_id').references('user_id').inTable('users')
				.onDelete('CASCADE').onUpdate('CASCADE').alter();
			attendants.integer('class_id').references('class_id').inTable('classes')
				.onDelete('CASCADE').onUpdate('CASCADE').alter();
		});
};

exports.down = async (knex) => {
	await knex.schema
		.alterTable('attendants', attendants => {
			attendants.integer('user_id').references('user_id').inTable('users');
			attendants.integer('class_id').references('class_id').inTable('classes');
		});
};
