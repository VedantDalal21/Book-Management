const express = require("express");

const dotenv = require("dotenv");

const DbConnection = require("./databaseConnection.js");

const userRouter = require("./routes/users.js");
const booksRouter = require("./routes/books.js");
dotenv.config();


const app = express();

DbConnection();

const PORT = 8081;
app.use(express.json());

// localhost:8081/users/
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is up and running :-)",
    data: "hey",
    // send("server is up")
  });
});

app.use("/users", userRouter);
app.use("/books", booksRouter);

// http://localhost:8081/users/4
router.get("*", (req, res) => {
  res.status(404).json({
    message: "This route does not exist",
  });
});

router.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
