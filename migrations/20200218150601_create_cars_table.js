exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
    tbl.increments()

    tbl
      .string('VIN', 17)
      .unique()
      .notNullable()
      .index()

    tbl.string('Make', 128).notNullable()

    tbl.string('Model', 128).notNullable()

    tbl.string('Mileage', 15).notNullable()

    tbl.string('Trans', 30)

    tbl.string('Title', 15)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars')
}
