const User = require('../models/user');
const ExpectedFriends = require('../models/expectedFriends');

module.exports = (io) => { 

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
                            name: user.name, expectedFriendID: friend._id, friendWhoAppliedId: user._id
                        })
                        await expectedFriend.save();
                        const possibleАriends = await ExpectedFriends.find({expectedFriendID: friend._id});

                        io.to(onlineUser.socketId).emit('friendInvitesList', {
                            message: `Вас хочит добавить в друзья`,
                            possibleАriends
                        })
                    }else {
                        const expectedFriend = new ExpectedFriends({
                            name: user.name, expectedFriendID: friend._id, friendWhoAppliedId: user._id
                        })
                        await expectedFriend.save();
                    }
                }
            } catch (e) {
                
            }
        })

        socket.on('addingToFriends',  async (data) => {
            const activeApplication = await ExpectedFriends.findOne({ friendWhoAppliedId: data.idFriend, expectedFriendID: userId });
            await ExpectedFriends.deleteOne({ friendWhoAppliedId: data.idFriend, expectedFriendID: userId });
            if (data.status) {
                const user = await User.findOne({ _id: userId });
                const friend = await User.findOne({ _id: data.idFriend });

                user.friends.push({ _id: friend._id, name: friend.name })
                friend.friends.push({ _id: user._id, name: user.name })
                await user.save();
                await friend.save();
            }
            
        })
        
    })

}