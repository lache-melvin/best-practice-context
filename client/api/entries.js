// TODO: Make error logging more robust
// Perhaps by passing a logger into each of these functions

export function makeGetEntries(consume) {
  return async function () {
    try {
      const entries = await consume("/entries");
      return entries;
    } catch (err) {
      console.error(err);
    }
  };
}

export function makeGetEntryById(consume) {
  return async function (id) {
    try {
      const entry = await consume(`/entries/${id}`);
      return entry;
    } catch (err) {
      console.error(err);
    }
  };
}

export function makeAddEntry(consume, getAuthHeader) {
  return async function (entry) {
    const authHeader = getAuthHeader();
    const bearerToken = authHeader && authHeader.Authorization;
    const config = {
      data: entry,
      method: "post",
      token: bearerToken || "",
    };

    try {
      const newEntry = await consume("/entries", config);
      return newEntry;
    } catch (err) {
      console.error(err);
    }
  };
}
