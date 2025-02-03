const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
    serverSelectionTimeoutMS: 30000, //  Increase timeout to 30s
})
.then(()=>console.log('Database connected success '))
.catch((err)=>console.log('Error  Connection ',err));

