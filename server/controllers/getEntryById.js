module.exports = makeGetEntryById;

function makeGetEntryById(findEntryById, errors, log = console) {
  return function getEntryById(request) {
    const id = Number(request.params.id);
    if (isNaN(id)) {
      return Promise.resolve({
        statusCode: 400,
        body: { errors: [{ title: errors.ENTRY_ID_NOT_FOUND }] },
      });
    }

    return findEntryById(id)
      .then((entry) => {
        return {
          statusCode: 200,
          body: entry,
        };
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        log.error(err);
        if (err.message === errors.ENTRY_ID_NOT_FOUND) {
          return {
            statusCode: 404,
            body: { errors: [{ title: err.message }] },
          };
        }
        return {
          statusCode: 500,
          body: {
            errors: [{ title: "An error occurred retrieving the entry" }],
          },
        };
      });
  };
}
