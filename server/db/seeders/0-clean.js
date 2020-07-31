exports.up = (queryInterface) => {
  const empty = (table) => () => queryInterface.bulkDelete(table);

  return empty("posts")().then(empty("users"));
};
