const mongoose = require("mongoose");


// New Atlas connection
mongoose.connect('mongodb+srv://atharvj938:k38BFXQuNzbQgeER@testing.qobmaei.mongodb.net/?retryWrites=true&w=majority&appName=testing', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
