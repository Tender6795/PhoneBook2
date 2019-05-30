import User from "../models/user"

export async function getUserByToken(token) {
    const {hash} = token;
    try {
        var user = await User.findOne({hash}, {password: 0});  //Нашли юзера по hash и убрали с него пароль
    } catch (e) {
        throw e;
    }
    return user;
}

