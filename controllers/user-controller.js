const {UserModel, BookModel} = require("../modals/index");
const { create } = require("../modals/user-model");

getAllUsers = async (req,res) =>{
    const users = await UserModel.find();

    if(users.length === 0){
        return res.status(404).json({
            success: false,
            message: "no users found in the db",
        });
    }
    res.status(200).json({
        success: true,
        message: "these sre the users info: ",
        data: users,
    })
};

// router.get('/:id', (req, res) => {
//     const { id } = req.params;
//     console.log(req.params);
//     const user = users.find((each) => each.id === id);
//     if (!user) {
//         return res.status(404).json({
//             success: false,
//             message: "user does not exist !!",
//         });
//     }
//     return res.status(200).json({
//         success: true,
//         message: "user found",
//         data: user,
//     })
// });

getSingleUserById = async (req,res) =>{
    const { id } = req.params;
    const user = await UserModel.findById(id);
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
    });
};

// router.delete("/:id", (req, res) => {
//     const { id } = req.params;

//     const user = users.find((each) => each.id === id);
//     if (!user) {
//         return res.status(404).json({
//             success: false,
//             message: "user does not exist !!",
//         });
//     }
//     const index = users.indexOf(user);
//     users.splice(index, 1)

//     return res.status(200).json({
//         success: true,
//         message: "deleted users...",
//         data: users,
//     });
// })

deleteUser = async (req,res)=>{
    const {id} = req.params;
    const user = await UserModel.deleteOne({_id:id});
    if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "user does not exist !!",
                });
            };
            return res.status(200).json({
                        success: true,
                        message: "deleted users...",
                        data: users,
                    });
};

// router.put("/:id", (req, res) => {
//     const { id } = req.params;
//     const { data } = req.body;
//     const user = users.find((each) => each.id === id);
//     if (!user) {
//         return res.status(404).json({
//             success: false,
//             message: "user does not exist !!",
//         });
//     }
//     const updateUserData = users.map((each) => {
//         if (each.id == id) {
//             return {
//                 ...each,
//                 ...data,
//             };
//         };
//     });
//     return res.status(200).json({
//         success: true,
//         message: "user updated !!",
//         data: updateUserData,
//     })
// });

updateUserData = async (req,res)=>{
    const {id} = req.params;
    const {data} = req.body;
    const updatedUserData = await UserModel.findOneAndUpdate({_id:id},
    {$set: {
        ...data
    }},
    {new: true});
    
    return res.status(200).json({
                success: true,
                message: "user updated !!",
                data: updatedUserData,
            })
};

// router.post("/", (req, res) => {
//     const { id, name, surname, email, subscriptionType, subscriptionDate } = req.body

//     const user = users.find((each) => each.id === id);

//     if (user) {
//         return res.status(404).json({
//             success: false,
//             message: "user with the id exists",
//         });
//     }

//     users.push({
//         id,
//         name,
//         surname,
//         email,
//         subscriptionType,
//         subscriptionDate,
//     });
// return res.status(201).json({
    //         success: true,
    //         message: "user added successfully",
    //         data: users,
    //     });
    // });

createNewUser = async (req,res) =>{
    const { id, name, surname, email, subscriptionType, subscriptionDate } = req.body;
    const newUser = await UserModel.create({_id:id});

    // if (user) {
    //             return res.status(404).json({
    //                 success: false,
    //                 message: "user with the id exists",
    //             });
    //         }
        
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
}
module.exports = {getAllUsers,getSingleUserById,deleteUser,updateUserData,createNewUser};