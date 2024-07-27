const {UserModel, BookModel} = require("../modals/index");
// const getAllBooks = () => {};
const getAllBooks = async(req,res) => {
    const books = await BookModel.find();

    if(books.length === 0){
        return res.status(404).json({
            success: false,
            message: "no book found",
        });
    }
    res.status(200).json({
        success: true,
        data: books,
    })
};

// router.get("/:id", (req, res) => {
//     const { id } = req.params;
//     const book = books.find((each) => each.id === id);

//     if (!book) {
//         return res.status(404).json({
//             success: false,
//             message: " book not found",
//         });
//     }
//     return res.status(200).json({
//         success: true,
//         message: "found book by thier id ",
//         data: book
//     });
// });

const getSingleBookId = async(req,res) => {
    const {id} = req.params;
    const book = await BookModel.findById(id);

    if (!book) {
                 return res.status(404).json({
                     success: false,
                     message: " book not found",
                 });
             }
    return res.status(200).json({
    success: true,
    message: "found book by thier id ",
    data: book
    });
};

exports.getAllIssuedBooks = async(req,res) => {
    const users = await UserModel.find({
        issuedBook: {$exists: true}
    }).populate("issuedBook");

    // data transfer object (DTO)
    
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
}
module.exports = { getAllBooks, getSingleBookId};