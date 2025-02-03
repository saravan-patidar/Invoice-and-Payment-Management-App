const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log('Database connected success '))
.catch((err)=>console.log('Error  Connection ',err));

