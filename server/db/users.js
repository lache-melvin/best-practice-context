const { User } = require("./models");
const { generateHash } = require("authenticare/server");

module.exports = {
  createUser,
  userExists,
  getUserByName,
};

function createUser(user) {
  return userExists(user.username)
    .then((exists) => {
      if (exists) {
        return Promise.reject(new Error("User exists"));
      }
    })
    .then(() => generateHash(user.password))
    .then((passwordHash) => {
      return User.create({ username: user.username, hash: passwordHash });
    });
}

function userExists(username) {
  return User.count({ where: { username } }).then((count) => count > 0);
}

function getUserByName(username) {
  return User.findOne({ where: { username } });
}
