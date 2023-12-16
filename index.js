const express = require("express");
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors())

app.use('/',require('./routes/index'))  
app.use('/api/user',require('./routes/sendEmail'))
app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});
