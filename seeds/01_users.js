exports.seed = async knex => {
  await knex("users").insert([
    { username: "Janet", password: "nothing", department: "Customer Service" },
    { username: "Dan", password: "something", department: "Sales" },
    { username: "Nick", password: "anything", department: "Human Resources" }
  ]);
};
