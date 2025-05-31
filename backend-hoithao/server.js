
const PORT = process.env.PORT || 2000;
const app = require("./app");
require("dotenv").config();


app.listen(PORT, () => console.log(`API running on port ${PORT}`));