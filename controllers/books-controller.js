const {UserModel, BookModel} = require("../modals/index");
const issuedBook = require("../dtos/book-dto");

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

const getAllIssuedBooks = async(req,res) => {
    const users = await UserModel.find({
        issuedBook: {$exists: true}
    }).populate("issuedBook");

    // data transfer object (DTO)

    const issuedBook = users.map((each) => new issuedBook(each));
    
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


// router.post("/", (req,res)=>{
//     const{data} = req.body;


//     if (!data) {
//         return res.status(400).json({
//             success: false,
//             message: "no data to add the book",
//         });
//     }
//     const book = books.find((each) => each.id === data.id);
//     if (book) {
    //     return res.status.json(400)({
    //         success: false,
    //         message: "id alredy exists",

    //     });
    // const allBooks = { ...books, data };
    // return res.status(200).json({
    //     success: true,
    //     message: "added book successfully",
    //     data: allBooks
    // });


addNewBook = async (req,res) =>{
    const { data } = req.body;
        if (!data) {
        return res.status(400).json({
            success: false,
            message: "no data to add the book",
        });
    }
    await BookModel.create(data);
    const allBooks = await BookModel.find();
//     if (book) {
//         return res.status.json(400)({
//             success: false,
//             message: "id alredy exists",

//         });
// };
return res.status(200).json({
        success: true,
        message: "added book successfully",
        data: allBooks
    });
}


// router.put("/updateBook:id", (req, res) => {
//     const { id } = req.params;
//     const { data } = req.body;

//     const book = books.find((each) => each.id === id)
//     if (!book) {
//         return res.status(404).json({
//             success: false,
//             message: "book not found by particular id",
//         })
//     }
//     const updateData = book.map((each) => {
//         if (each.id === id) {
//             return {
//                 ...each,
//                 ...data
//             };
//         }
//     })
//     return res.status(200).json({
//         success: true,
//         message: "updated bbok by thier id",
//         data: updateData
//     });
// });

updateBookById = async(req,res)=>{
    const { id } = req.params;
    const { data } = req.body;

    const updatedBook = await BookModel.findOneAndUpdate({
        _id: id,
    },data, {
        new: true,
    });
        return res.status(200).json({
        success: true,
        message: "updated bbok by thier id",
        data: updatedBook,
    });
}

module.exports = { getAllBooks, getSingleBookId,getAllIssuedBooks,addNewBook,updateBookById};