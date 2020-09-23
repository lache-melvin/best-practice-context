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
