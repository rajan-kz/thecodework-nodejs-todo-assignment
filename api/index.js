const express = require('express');
const app = express();
app.use(express.json());
var cors = require('cors')
app.use(cors())
const port = process.env.PORT || 3001;

//check authRoute
const middleware = require('./middleware')
app.use(middleware.decodeToken);

//route middleware
const routes = require('./routes');
app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('Hello World!'); 
})

app.listen(port, () => console.log(`Listening on port ${port}`));
