export function makeSubmitEntry(addEntry) {
  return function (authorId, formData, history, receiveEntry) {
    return addEntry({ ...formData, authorId })
      .then((saved) => {
        receiveEntry(saved);
        history.push(`/entry/${saved.id}`);
        return;
      })
      .catch((err) => {
        console.error(err);
      });
  };
}
