const express = require("express");
const { users } = require("./data/user.json");

const app = express();

const PORT = 8081;
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is up and running :-)",
    data: "hey",
    // send("server is up")
  });
});

/*
>> Routes: /users
>> Method: GET
>> Description: get all users
>> access: public
>> parametres: none
*/

app.get("/users", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});

// http://localhost:8081/users/4
/*
>> Routes: /users/:id
>> Method: GET
>> Description: get single user by thier id
>> access: public
>> parametres: id
*/

app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user does not exist !!",
    });
  }
  return res.status(200).json({
    success: true,
    message: "user found",
    data: user,
  })
});

/*
>> Routes: /users
>> Method: POST
>> Description: creating a new user
>> access: public
>> parametres: none
*/

app.post("/users", (req, res) => {
  const { id, name, surname, email, subscriptionType, subscriptionDate } = req.body

  const user = users.find((each) => each.id === id);

  if (user) {
    return res.status(404).json({
      success: false,
      message: "user with the id exists",
    });
  }

  users.push({
    id,
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
  });

  return res.status(201).json({
    success: true,
    message: "user added successfully",
    data: users,
  });
});

/*
>> Routes: /users
>> Method: PUT
>> Description: updating the server by thier id
>> access: public
>> parametres: none
*/

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user does not exist !!",
    });
  }
  const updateUserData = users.map((each) => {
    if (each.id == id) {
      return {
        ...each,
        ...data,
      };
    }
    return each;
  });
  return res.status(200).json({
    success: true,
    message: "user updated !!",
    data: updateUserData,
  })
});

/*
>> Routes: /users/:id
>> Method: DELETE
>> Description: deleting the server by thier id
>> access: public
>> parametres: none
*/

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user does not exist !!",
    });
  }
  // need to build logic for delete section
})

app.get("*", (req, res) => {
  res.status(404).json({
    message: "This route does not exist",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
