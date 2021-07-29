
/** @param {import('knex').Knex} knex */
exports.up = async (knex) => {
    await knex.schema
        .alterTable('classes', classes => {
            classes.dateTime('class_time', { useTz: false }).notNullable().alter();
        });
};

exports.down = async (knex) => {
    await knex.schema
        .alterTable('classes', classes => {
            classes.dateTime('class_time', { useTz: true }).notNullable().alter();
        });
};