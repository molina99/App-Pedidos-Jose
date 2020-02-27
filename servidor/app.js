const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(require("./routes/menu.route"));
app.use(require("./routes/persona.route"));
app.use(require("./routes/pedido.route"));
app.use(require("./routes/query.route"));

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
