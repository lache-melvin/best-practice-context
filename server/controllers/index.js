const makeGetEntries = require("./getEntries");
const makeGetEntryById = require("./getEntryById");
const makePostEntry = require("./postEntry");

const { listEntries, findEntryById, addEntry } = require("../db/entries");
const {
  ENTRY_ID_NOT_FOUND,
  AUTHOR_ID_NOT_FOUND,
  AUTHOR_ID_NOT_PROVIDED,
} = require("../errors");

const getEntries = makeGetEntries(listEntries);
const getEntryById = makeGetEntryById(findEntryById, { ENTRY_ID_NOT_FOUND });
const postEntry = makePostEntry(addEntry, {
  AUTHOR_ID_NOT_FOUND,
  AUTHOR_ID_NOT_PROVIDED,
});

module.exports = {
  getEntries,
  getEntryById,
  postEntry,
};
