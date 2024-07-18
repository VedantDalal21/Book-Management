const express = require("express")
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");
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
    sccess: true,
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
    const userWithIssuedBook = users.filter((each=>{
        if(each.issuedBook) return each;
    }));
    const issuedBook = [];
    userWithIssuedBook.forEach((each)=>{
        const book = books.find ((book) => (book.id = each.issuedBook));
        book.issuedBook = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;

        issuedBooks.push(book);
    });

    if(issuedBook.length===0){
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