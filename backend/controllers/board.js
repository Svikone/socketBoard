const Board = require('../models/board');

exports.createBoard = async (req, res) => {
    try {
        const { userId } = req.user;
        const { name } = req.body;
        const board = new Board({
            name, users: [{ _id: userId }]
        });
    await board.save();
    return res.status(200).json({message: 'create board is successful'})

    } catch (e) {
        res.send(e);
    }
};

exports.getBoardByUser = async (req, res) => {
    try {
        const { userId } = req.user;
        const board = await Board.find({
            'users': { $elemMatch: { '_id': userId } }
        })
        if (!board) {
            return res.status(500).json({message: 'your application is empty'})
        }
        
        return res.status(200).json({board})

    } catch (e) {
        res.send(e);
    }
};
