const express = require("express")
const { books } = require("../data/books.json");
const { users } = require("../data/user.json");
const router = express.Router();

module.exports = router;

/*
>> Routes: /books
>> Method: GET
>> Description: getting all books
>> access: public
>> parametres: none
*/
router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "get all the books",
        data: books
    });
});

/*
>> Routes: /books/:id
>> Method: GET
>> Description: getting all books by thier id
>> access: public
>> parametres: id
*/
router.get("/:id", (req, res) => {
    const { id } = req.params;
    const book = books.find((each) => each.id === id);

    if (!book) {
        return res.status(404).json({
            success: false,
            message: " book not found",
        });
    }
});
return res.status(200).json({
    success: true,
    message: "found book by thier id ",
    data: book
});

/*
>> Routes: /books/issue
>> Method: GET
>> Description: getting all issued books
>> access: public
>> parametres: none
*/

router.get("/issued", (req, res) => {
    const userWithIssuedBook = users.filter((each => {
        if (each.issuedBook) return each;
    }));
    const issuedBook = [];
    userWithIssuedBook.forEach((each) => {
        const book = books.find((book) => (book.id = each.issuedBook));
        book.issuedBook = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;

        issuedBooks.push(book);
    });

    if (issuedBook.length === 0) {
        return res.status(404).json({
            success: false,
            message: "no bbok issurd here",
        })
    }
    return res.status(200).json({
        success: true,
        message: "userswill be the isseud books",
        data: issuedBooks
    })
});

/*
>> Routes: /
>> Method: POST
>> Description: adding new books
>> access: public
>> parametres: none
>>data: id,name,author,genre,price,publisher
*/
router.post("/", (req, res) => {
    const { data } = req.body;

    if (!data) {
        return res.status(400).json({
            success: false,
            message: "no data to add the book",
        });
    }

    const book = books.find((each) => each.id === data.id);
    if (book) {
        return res.status(404).json({
            success: false,
            message: "id already exits",
        });
    };

    const allBooks = { ...books, data };
    return res.status(200).json({
        success: true,
        message: "added book successfully",
        data: allBooks
    })

});

/*
>> Routes: /
>> Method: PUT
>> Description: updating bookd by thier id
>> access: public
>> parametres: id
*/
router.put("/updateBook:id", (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    const book = books.find((each) => each.id === id)
    if (!book) {
        return res.status(404).json({
            success: false,
            message: "book not found by particular id",
        })
    }

    const updateData = book.map((each) => {
        if (each.id === id) {
            return {
                ...each,
                ...data
            };
        }
    })
    return res.status(200).json({
        success: true,
        message: "updated bbok by thier id",
        data: updateData
    });
});

/*
>> Routes: /users/subscription-details/:id
>> Method: GET
>> Description: get all user subscription details
>> access: public
>> parametres: none
*/

router.get("/subscription-details/:id", (req, res) => {
    const { id } = req.params;
    const user = users.find((each) => each.id === id);

    if (!user) {
        return res.status(400).json({
            success: false,
            message: "user with this id did not exist",
        });
    }

    const getDateINDays = (data = "") => {
        let date;
        if (data === "") {
            date = new Date();
        } else {
            date = new Date(data)
        }
        let days = Math.floor(date / (1000 * 60 * 60 * 24))
        return days;
    };
    const subscriptionType = (data) => {
        if (user.subscriptionType === "Basic") {
            date = date + 90;
        } else if (user.subscriptionType === "Standard") {
            date = date + 180;
        } else if (user.subscriptionType === "Premium") {
            date = date + 365;
        }
        return date;
    };

    //jan 1 1970

    let returnDate = getDateINDays(user.returnDate);
    let currentDate = getDateINDays();
    let subscriptionDate = getDateINDays(user.subscriptionDate);
    let subscriptionExpiration = subscriptionType(subscriptionDate);

    console.log("returnDate", returnDate);
    console.log("currentDate", currentDate);
    console.log("subscriptionDate", subscriptionDate);
    console.log("subscriptionExpiration", subscriptionExpiration);

    const data = {
        ...user,
        isSubscriptionExpired: subscriptionExpiration <= currentDate,
        daysLeftForExpiration: subscriptionExpiration <= currentDate ? 0 : subscriptionExpiration - currentDate,
        fine: returnDate < currentDate ? subscriptionExpiration <= currentDate ? 100 : 50 : 0,
    };
    return res.status(200).json({
        success: true,
        message: "subscription detail for the user is ",
        data,
    })
});