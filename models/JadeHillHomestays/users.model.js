const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/* Vì dữ liệu cho cơ sở dữ liệu chưa có đủ nên đang chuyển tất cả require từ true sang false để dễ dàng cho việc
seed dữ liệu thử nghiệm cho bảng User để test tính năng đăng nhập, xác thực,...*/

// tạo ra quan hệ Users
const UsersSchema = new Schema({
    name: {
        type: String,
        require:false
    },
    address: {
        type: String,
        require:false
    },
    role: {
        type: String,
        require:true,
        enum: ['admin', 'super_admin', 'user']
    },
    email: {
        type: String,
        require:false
    },
    password: {
        type: String,
        require:false
    },
    phone: {
        type: String,
        require:false
    },
    status: {
        type: Number, // 1: active; 2: inactive
        require:false
    },
    gender: {
        type: String,
        enum: [
            'Male',
            'Female',
            'Other'
        ],
    },
    identification: {
        type: String,
        require:false
    },
    avatarUrl: {
        type: String,
        require:false
    },
    dateAtWork: {
        type: Date,
        require:false
    },
    dateAtBirth: {
        type: Date,
        require:false
    },
    resetPasswordToken: {
        type: String,
        require: false
    },
    token: [{
        type: String,
        required: false
    }],
    age: {
        type: Number,
        required: false
    },
    homestays: [{ // Id định danh homestay, tham chiếu bảng homestays
        type: Schema.Types.ObjectId,
        ref: 'Homestays',
    }],
    superAdmin: { // admin tham chiếu tới super_admin
        type: Schema.Types.ObjectId,
        ref: 'Users',
    },
    admins: [{ // super_admin tham chiếu tới admins
        type: Schema.Types.ObjectId,
        ref: 'Users',
    }],
    rates: [{
        type: Schema.Types.ObjectId,
        ref: 'Homestays',
    }]
});

module.exports = (db) => {
    if (!db.models.Users) {
        return db.model('Users', UsersSchema);
    }
    return db.models.Users;
}

