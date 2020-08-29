exports.up = (queryInterface) => {
  const empty = (table) => () => queryInterface.bulkDelete(table);

  return empty("entries")().then(empty("users"));
};
