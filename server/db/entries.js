const { Entry } = require("./models");
const { ENTRY_ID_NOT_FOUND, AUTHOR_ID_NOT_PROVIDED } = require("../errors");

module.exports = {
  findEntryById,
  listEntries,
  addEntry,
};

function listEntries() {
  return Entry.findAll();
}

function findEntryById(id) {
  return Entry.findByPk(id).then((entry) => {
    if (entry) return entry;
    const error = new Error(ENTRY_ID_NOT_FOUND);
    error.code = 404;
    throw error;
  });
}

function addEntry(entry, authorId) {
  const { name, link, description } = entry;
  return Entry.create({ name, link, description, authorId })
    .then((entry) => entry)
    .catch((err) => {
      if (err.name === "SequelizeForeignKeyConstraintError") {
        throw new Error(AUTHOR_ID_NOT_PROVIDED);
      }
    });
}
