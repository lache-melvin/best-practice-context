module.exports = function makeExpressRoute(controller) {
  return (req, res) => {
    const httpRequest = {
      user: req.user,
      body: req.body,
      query: req.query,
      params: req.params,
    };
    controller(httpRequest)
      .then((httpResponse) => {
        res.status(httpResponse.statusCode).send(httpResponse.body);
        return null;
      })
      .catch(() =>
        res.status(500).send({ error: "An unknown error occurred." })
      );
  };
};
