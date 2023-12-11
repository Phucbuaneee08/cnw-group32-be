const {Users} = require("../../../models");
const {db} = require("../../../helpers/dbHelper");
const {home} = require("nodemon/lib/utils");
const {authToken} = require("../../../middleware");
const {ObjectId} = require('mongodb');
const bcrypt = require('bcrypt');

//API chỉnh sửa thông tin User
exports.updateUserById = async (name, address, email, password, phone, status, gender, age, identification, avatarUrl, dateAtWork, dateAtBirth) => {
    let setKey = {};
    if (name) {
        setKey = {...setKey, "name": name}
    }
    if (address) {
        setKey = {...setKey, "address": address}
    }
    if (email) {
        setKey = {...setKey, "email": email}
    }
    if (password) {
        setKey = {...setKey, "password": await bcrypt.hash(password, 10)}
    }
    if (phone) {
        setKey = {...setKey, "phone": phone}
    }
    if (status) {
        setKey = {...setKey, "status": status}
    }
    if (gender) {
        setKey = {...setKey, "gender": gender}
    }
    if (age) {
        setKey = {...setKey, "age": age}
    }
    if (identification) {
        setKey = {...setKey, "identification": identification}
    }
    if (avatarUrl) {
        setKey = {...setKey, "avatarUrl": avatarUrl}
    }
    if (dateAtWork) {
        setKey = {...setKey, "dateAtWork": new Date(dateAtWork)}
    }
    if (dateAtBirth) {
        setKey = {...setKey, "dateAtBirth": new Date(dateAtBirth)}
    }

    await Users(db).update(
        {_id: req.user._id},
        {$set: setKey}
    )

    let user = await Users(db).findById(id);
    return user;
}

exports.createUser = async (data) => {
    const { email, password, name, address, phone, gender, identification, avatarUrl, dateAtWork, dateAtBirth } = data;

    if (!email || !password) {
        return {
            success: false,
            message: "Email và password là bắt buộc để tạo user!",
            content: null
        };
    }

    try {
        let createKey = {
            email, password: await bcrypt.hash(password, 10)
        };
        createKey.role = "user";
        createKey.status = 1;

        if (name) createKey.name = name;
        if (address) createKey.address = address;
        if (phone) createKey.phone = phone;
        if (gender) createKey.gender = gender;
        if (identification) createKey.identification = identification;
        if (avatarUrl) createKey.avatarUrl = avatarUrl;
        if (dateAtWork) createKey.dateAtWork = new Date(dateAtWork);
        if (dateAtBirth) createKey.dateAtBirth = new Date(dateAtBirth);

        let user = await Users(db).create(createKey);

        return {
            success: true,
            content: user
        };
    } catch (error) {
        throw error;
    }
};



// Lấy danh sách user
exports.getUsers = async () => {
    return await Users(db).find({role: "user", status: 1});
}

// Lấy user theo id
exports.getUserById = async (id) => {
    return await Users(db).findById(ObjectId(id));
}