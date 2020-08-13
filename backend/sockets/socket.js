const User = require('../models/user');
const ExpectedFriends = require('../models/expectedFriends');

module.exports = (io) => { 

    // friendEmit = (possibleАriends) => {
    //     socket.emit('friendInvitesList', {
    //         message: "Вас хочит добавить в друзья",
    //         possibleАriends
    //     });
    // }

    let users = [];
    io.on('connection', async (socket) => {
        const { userId } = socket.decoded;
        const myId = users.find(user => user.userId == userId);
        if (myId) {
            socket.emit('friendInvitesList', {
                message: `error`,
            });
            return 
        } else {
            try {
                const possibleАriends = await ExpectedFriends.find({expectedFriendID: userId});
                console.log("possible:",possibleАriends)
                if (possibleАriends.length > 0) {
                    console.log("socketId",socket.id)
                    io.to(socket.id).emit('friendInvitesList', {
                        message: `Вас хочит добавить в друзья `,
                        possibleАriends
                    })
                    
                    // await ExpectedFriends.deleteMany({ expectedFriendID: userId });
                }
            } catch (e) {
                
            }
        }
        users.push({ userId, socketId: socket.id })
        console.log(users)

        socket.on('disconnect', function () {
            users = users.filter(user => user.userId != userId);
            console.log("disconnect",users)
        })

        socket.on('friendRequest', async (data) => { 
            const { nameFriend } = data
            try { 
                const user = await User.findOne({ _id: userId });
                if (user.name == nameFriend) {
                    socket.emit('friendInvitesList', {
                        message: `Вы не можете добавить себя в друзья`,
                    });
                    return
                }
                const friend = await User.findOne({ name: nameFriend });
                const activeApplication = await ExpectedFriends.findOne({ name: user.name, expectedFriendID: friend._id });
                
                if (friend) {
                    let onlineUser = users.find(user => user.userId == friend._id);

                    if (activeApplication) {//проверка на то что заявка уже отправлена и не пришла к пользователю
                        io.to(socket.id).emit('friendInvitesList', {
                            message: `Вы уже отправили заявку`,
                        })
                    } else if (onlineUser) {
                        const expectedFriend = new ExpectedFriends({
                            name: user.name, expectedFriendID: friend._id
                        })
                        await expectedFriend.save();
                        const possibleАriends = await ExpectedFriends.find({expectedFriendID: friend._id});

                        io.to(onlineUser.socketId).emit('friendInvitesList', {
                            message: `Вас хочит добавить в друзья`,
                            possibleАriends
                        })
                    }else {
                        console.log("db",user.name,friend._id)
                        
                        const expectedFriend = new ExpectedFriends({
                            name: user.name, expectedFriendID: friend._id
                        })
                        await expectedFriend.save();
                    }
                }
            } catch (e) {
                
            }
        })




        // socket.on('friendRequest', async (req, res) => {
        //     try {
        //         const friend = await User.findOne({name: req.nameFriend});
        //         const user = await User.findOne({_id: id});
        //         if (!user || !friend) {
        //             socket.emit('addToFriends', {
        //                 message: 'Чтото пошло не так',
        //             });
        //         }

        //         friends = user.friends.some((f) => f.name === "ao")
        //         if (!friends) {
        //             user.friends.push({_id: friends._id, name: friends.name})
        //             await user.save();
        //             socket.broadcast.emit('addToFriends', {
        //                 message: 'dfc [jnzn lj,fdbnm d lhepmz',
        //             });
        //         }
        //         socket.emit('addToFriends', {
        //             message: 'У вас уже есть такой друг',
        //         });
                
        //     } catch (e) {
        //         console.log(e);
        //     }           
        // })
        
    })

}