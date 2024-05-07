
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./Main');
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());

app.use(router);
app.use(cors());

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
