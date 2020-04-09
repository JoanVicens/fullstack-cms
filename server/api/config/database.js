const mongoose = require('mongoose');

const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}2@cluster-test-1-r79p8.azure.mongodb.net/bandaUJI?retryWrites=true&w=majority`;

const mongoose_opt = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

exports.connectar = () => {
  mongoose
  .connect(url, mongoose_opt)
  .then(() => {
    console.log("mongoose connectat");
  })
  .catch(err => {
    console.log({ database_error: err });
  });
}
