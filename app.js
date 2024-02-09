const express = require("express");

const app = express();
app.set("port", 4000);
app.use(express.json());

app.use('/api', require('./routes/ruc') );


app.listen(app.get("port"), () => 
  console.log("app running on port", app.get("port"))
);

