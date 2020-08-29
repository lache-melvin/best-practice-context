const makeGetEntries = require("./getEntries");
const makeGetEntryById = require("./getEntryById");
const makePostEntry = require("./postEntry");

const { getTokenDecoder } = require("authenticare/server");

const { listEntries, findEntry, addEntry } = require("../db/entries");

module.exports = {
  getEntries,
  getEntryById,
  postEntry,
};

const getEntries = makeGetEntries(listEntries);
const getEntryById = makeGetEntryById(findEntry);
const postEntry = makePostEntry(addEntry, getTokenDecoder);
