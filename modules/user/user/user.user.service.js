const {Users} = require("../../../models");
const {db} = require("../../../helpers/dbHelper");
const {home} = require("nodemon/lib/utils");
const {authToken} = require("../../../middleware");
const {ObjectId} = require('mongodb');
const bcrypt = require('bcrypt');

//API chỉnh sửa thông tin User
exports.updateUserById = async (id, name, address, email, password, phone, status, gender, identification, avatarUrl, dateAtWork, dateAtBirth) => {
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
        {_id: id},
        {$set: setKey}
    )

    let user = await Users(db).findById(id);
    return user;
}

exports.createUser = async (name, address, email, password, phone, status, gender, identification, avatarUrl, dateAtWork, dateAtBirth) => {
    if (!name || !email || !password || !phone || !identification || !dateAtWork)
        return 0;
    let adminWithId = await Users(db).findOne(
        {identification: identification}
    )
    if (adminWithId) return 1;
    let createKey = {};
    if (name) {
        createKey = {...createKey, name: name}
    }
    if (role) {
        createKey = {...createKey, role: role}
    }
    if (address) {
        createKey = {...createKey, address: address}
    }
    if (email) {
        createKey = {...createKey, email: email}
    }
    if (password) {
        createKey = {...createKey, password: await bcrypt.hash(password, 10)}
    }
    if (phone) {
        createKey = {...createKey, phone: phone}
    }
    if (status) {
        createKey = {...createKey, status: status}
    }
    if (gender) {
        createKey = {...createKey, gender: gender}
    }
    if (identification) {
        createKey = {...createKey, identification: identification}
    }
    if (avatarUrl) {
        createKey = {...createKey, avatarUrl: avatarUrl}
    }
    if (dateAtWork) {
        createKey = {...createKey, dateAtWork: new Date(dateAtWork)}
    }
    if (dateAtBirth) {
        createKey = {...createKey, dateAtBirth: new Date(dateAtBirth)}
    }
    let user = await Users(db).create(createKey);
    return user;
}

// Lấy danh sách user
exports.getUsers = async () => {
    return await Users(db).find({role: "user", status: 1});
}

// Lấy user theo id
exports.getUserById = async (id) => {
    return await Users(db).findById(ObjectId(id));
}