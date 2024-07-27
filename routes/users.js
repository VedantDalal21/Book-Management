const express = require("express")
const { users } = require("../data/user.json");
const router = express.Router();

/*
>> Routes: /
>> Method: GET
>> Description: get all users
>> access: public
>> parametres: none
*/


router.get("/", (req, res) => {
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

router.get('/:id', (req, res) => {
    const { id } = req.params;
    console.log(req.params);
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

router.post("/", (req, res) => {
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

router.put("/:id", (req, res) => {
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
        };
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

router.delete("/:id", (req, res) => {
    const { id } = req.params;

    const user = users.find((each) => each.id === id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "user does not exist !!",
        });
    }
    const index = users.indexOf(user);
    users.splice(index, 1)

    return res.status(200).json({
        success: true,
        message: "deleted users...",
        data: users,
    });
})

module.exports = router;