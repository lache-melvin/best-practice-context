// disable false positive warning in eslint-plugin-security
/* eslint-disable security/detect-non-literal-fs-filename */

import { makeAddEntry, makeGetEntries, makeGetEntryById } from "./entries";

import mockEntries from "../testing/mockEntries";

test("getEntries returns the correct body", async () => {
  const consume = jest.fn(() => Promise.resolve(mockEntries));
  const getEntries = makeGetEntries(consume);

  const entries = await getEntries();

  expect(entries).toHaveLength(3);
});

test("getEntryById returns the correct body", async () => {
  const consume = jest.fn(() => Promise.resolve(mockEntries[1]));
  const getEntryById = makeGetEntryById(consume);

  const entry = await getEntryById(2);

  expect(entry.id).toBe(2);
  expect(entry.name).toBe("mocked entry 2");
  expect(entry.link).toBe("https://mocked.link.com/2");
  expect(entry.description).toBe("mocked description 2");
});

test("addEntry returns the entry with its new id", async () => {
  function mockConsume(url, options) {
    expect(url).toBe("/entries");
    expect(options.method).toBe("post");
    return Promise.resolve({ id: 4, ...options.data });
  }

  const consume = jest.fn(mockConsume);
  const getAuthHeader = jest.fn(() => ({ Authorization: "test_auth_token" }));
  const addEntry = makeAddEntry(consume, getAuthHeader);
  const now = new Date();
  const entry = {
    name: "mocked entry 4",
    link: "https://mocked.link.com/4",
    description: "mocked description 4",
    created: now.setDate(now.getDate() - 2),
    updated: now.setDate(now.getDate() - 2),
  };

  const addedEntry = await addEntry(entry);

  expect(addedEntry.id).toBe(4);
  expect(addedEntry.name).toBe("mocked entry 4");
  expect(addedEntry.link).toBe("https://mocked.link.com/4");
  expect(getAuthHeader.mock.calls).toHaveLength(1);
});
