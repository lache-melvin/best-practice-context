const { generateHash } = require("authenticare/server");

const now = new Date();
const dates = { createdAt: now, updatedAt: now };

exports.up = (queryInterface) => {
  return Promise.all([
    generateHash("jess"),
    generateHash("jules"),
  ]).then(([jessHash, julesHash]) =>
    queryInterface.bulkInsert("users", [
      Object.assign({ id: 1, username: "jess", hash: jessHash }, dates),
      Object.assign({ id: 2, username: "jules", hash: julesHash }, dates),
    ])
  );
};

exports.down = (queryInterface) => queryInterface.bulkDelete("users");
