import { addEntry } from "../api";

export function submitEntry(authorId, formData, history, receiveEntry) {
  return addEntry({ ...formData, authorId }).then((saved) => {
    receiveEntry(saved);
    history.push(`/entry/${saved.id}`);
    return null;
  });
}
