const db = require("../../data/dbConfig");
const bcrypt = require("bcryptjs");

function find() {
  return db("users").select("id", "username", "department");
}

async function add(user) {
  user.password = await bcrypt.hash(user.password, 10);
  const [id] = await db("users").insert(user);

  return findById(id);
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}

function findBy(filter) {
  return db("users")
    .where(filter)
    .select()
    .first();
}

module.exports = {
  find,
  add,
  findById,
  findBy
};
