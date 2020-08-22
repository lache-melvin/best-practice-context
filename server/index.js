const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const server = require("./server");

const port = process.env.PORT || 3000;

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening at http://localhost:${port}`);
});
