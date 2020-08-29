module.exports = makePostEntry;

function makePostEntry(addEntry, errors) {
  return function postEntry(request) {
    const { name, link, description } = request.body;
    const newEntry = { name, link, description };

    // TODO: This is a hack to create consistency between runtime
    // behaviour and the unit test runs. This needs investigation.
    const { id, dataValues = {} } = request.user;
    const authorId = id || dataValues.id;

    if (!authorId) {
      return Promise.resolve({
        statusCode: 401,
        body: { errors: [{ title: errors.AUTHOR_ID_NOT_PROVIDED }] },
      });
    }

    return addEntry(newEntry, authorId)
      .then((entry) => {
        return {
          body: entry,
          statusCode: 200,
        };
      })
      .catch((err) => {
        if (err.message === errors.AUTHOR_ID_NOT_FOUND) {
          return {
            statusCode: 400,
            body: { errors: [{ title: errors.AUTHOR_ID_NOT_FOUND }] },
          };
        }
        throw err;
      });
  };
}
