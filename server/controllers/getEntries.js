module.exports = makeGetEntries;

function makeGetEntries(listEntries, log = console) {
  return function getEntries() {
    return listEntries()
      .then((entries) => {
        return {
          statusCode: 200,
          body: entries,
        };
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        log.error(err);
        return {
          statusCode: 500,
          body: {
            errors: [{ title: "An error occurred retrieving the entries" }],
          },
        };
      });
  };
}
