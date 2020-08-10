const User = require('../models/user');
const ExpectedFriends = require('../models/expectedFriends');

module.exports = (io) => { 
    const users = [];
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
                console.log(possibleАriends)
                if (possibleАriends.length>0) {
                    socket.emit('friendInvitesList', {
                        message: `Вас хочит добавить в друзья`,
                        possibleАriends
                    });
                    await ExpectedFriends.deleteMany({ expectedFriendID: userId });
                }
            } catch (e) {
                
            }
        }
        users.push({ userId, socketId: socket.id })
        console.log(users)

        socket.on('disconnect', function (msg) {
            users.filter(user => user.userId == userId);
            console.log(users)
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
                console.log(friend)
                
                if (friend) {
                    let onlineUser = users.find(user => user.userId == friend._id);

                    if (onlineUser) {
                        console.log("emit")
                        socket.emit('friendInvitesList', {
                            message: `Вас хочит добавить в друзья ${user.name}`,
                        });
                    } else {
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