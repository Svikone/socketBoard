const User = require('../models/user');

module.exports = (io) => { 
    io.on('connection', (socket) => {
        console.log(socket.id)
    
        socket.on('addToFriends', async (req, res) => {
            const id = socket.decoded.userId;
            console.log(id)

            try {
                const friend = await User.findOne({name: req.nameFriend});
                const user = await User.findOne({_id: id});
                if (!user || !friend) {
                    socket.emit('addToFriends', {
                        message: 'Чтото пошло не так',
                    });
                }

                friends = user.friends.some((f) => f.name === "ao")
                if (!friends) {
                    user.friends.push({_id: friends._id, name: friends.name})
                    await user.save();
                    socket.broadcast.emit('addToFriends', {
                        message: 'dfc [jnzn lj,fdbnm d lhepmz',
                    });
                }
                socket.emit('addToFriends', {
                    message: 'У вас уже есть такой друг',
                });
                
            } catch (e) {
                console.log(e);
            }           
        })
        
    })

}