const User = require('../models/user');

module.exports = (io) => { 
    const users = [];
    io.on('connection', (socket) => {
        const { userId } = socket.decoded;
        users.push({ userId, socketId: socket.id })
        console.log(users)
        socket.on('friendRequest', async (data) => { 
            const { id } = socket.decoded.userId;
            const { nameFriend } = data
            try { 
                socket.emit('friendRequest', {
                            message: `Вас хочит добавить в друзья `,
                        });
                const user = await User.findOne({_id: id});
                const friend = await User.findOne({ name: nameFriend });
                console.log(friend)
                
                if (friend) {
                    let onlineUser = users.find(user => user.userId == friend._id);

                    if (onlineUser) {
                        console.log("emit")
                        socket.emit('friendInvitesList', {
                            message: `Вас хочит добавить в друзья ${user.name}`,
                        });
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