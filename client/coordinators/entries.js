export function makeRetrieveEntries(getEntries) {
  return function (applyEntries) {
    return getEntries()
      .then((entries) => {
        return applyEntries(entries);
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export function makeRetrieveEntryById(getEntryById) {
  return function (id, applyEntry) {
    return getEntryById(id)
      .then((entry) => {
        return applyEntry(entry);
      })
      .catch((err) => {
        console.error(err);
      });
  };
}
export function makeSubmitEntry(addEntry) {
  return function (authorId, formData, history, applyEntry) {
    return addEntry({ ...formData, authorId })
      .then((saved) => {
        applyEntry(saved);
        history.push(`/entry/${saved.id}`);
        return;
      })
      .catch((err) => {
        console.error(err);
      });
  };
}
