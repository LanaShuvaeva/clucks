
exports.up = knex => {
  return knex.schema.createTable("clucks", table => {
      table.increments("id");
      table.string("username");
      table.text("content");
      table.string("image_url");
      table.timestamp("createdAt").defaultTo(knex.fn.now());
    })
};

exports.down = knex => {
  return knex.schema.dropTable("clucks");
};
