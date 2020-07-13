const sequelize = require('sequelize');
const db = require('../../models').bot_users;
exports.post = async (req) => {
    try {
        console.log('req',req);
        let res;
        const {userId,userName} = req;
        let exist = await db.findOne({
            attributes: ['userId'],
            where: {
                userId: userId.toString()
            }
        });
        if(!exist) {
            res = await db.create({
                userId,
                userName
            });
        }
        return res;
    } catch (e) {
        console.log(e.message);
    }
};

exports.put = async (req) => {
    const {course,time,userId}  = req
    return await db.update({course,time},{where:{userId}})
}

exports.set_name = async (req) => {
    const {userName,userId}  = req
    return await db.update({userName},{where:{userId}})
}

exports.get = async (id) => {
    if(id !== undefined) {
        return await db.findOne({
            attributes: ['course', 'userName'],
            where: {
                userId: id.toString()
            }
        });
    }
    return await db.findAll();
}