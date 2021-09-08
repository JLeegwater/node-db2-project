exports.up = async function (knex) {
  await knex.schema.createTable("cars", (table) => {
    table.increments(); // this create a primary key called id of auto inc integers
    table.text("vin", 128).unique().notNullable();
    table.string("make", 128).notNullable();
    table.string("model", 128).notNullable();
    table.integer("mileage").notNullable();
    table.string("title", 128);
    table.string("transmission");
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("cars");
};
