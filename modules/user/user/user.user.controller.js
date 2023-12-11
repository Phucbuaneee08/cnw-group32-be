const UserService = require('./user.user.service');
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
    try {
        const data = req.body;
        const user = await UserService.createUser(data);

        if (user.success) {
            return res.status(200).json({
                success: true,
                content: user.content
            });
        } else {
            return res.status(400).json({
                success: false,
                content: null,
                message: user.message
            });
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: Array.isArray(error) ? error : "User id is not correct!",
            content: error
        });
    }
};


//API update thông tin của User
exports.updateUserById = async (req, res) => {
    try {
        //Lấy các thông tin để update cho Admin.
        const data = req.body;
        const id = data.id;
        const name = data.name;
        const address = data.address;
        const email = data.email;
        const password = data.password;
        const phone = data.phone;
        const status = data.status;
        const gender = data.gender;
        const identification = data.identification;
        const avatarUrl = data.avatarUrl;
        const dateAtWork = data.dateAtWork;
        const dateAtBirth = data.dateAtBirth;

        let user = await UserService.updateUserById(id, name, address, email, password, phone, status, gender, identification, avatarUrl, dateAtWork, dateAtBirth);
        return res.status(200).json({
            success: true,
            content: user
        });
    } catch (error) {
        // Nếu ko thành công -> 400
        return res.status(400).json({
            success: false,
            message: Array.isArray(error) ? error : "Cannot update user!",
            content: error
        });
    }
}

exports.getUser = async (req, res) => {
    return res.status(200).json({
        success: true,
        user: req.user
    })
}


exports.deleteUser = async (req, res ) => {
    const role = req.currentRole;
    // Kiểm tra là superadmin
    if ( role !== "super_admin") {
        return res.status(400).json({
            success: false,
            message: "Chưa đăng nhập với tư cách là Super Admin"
        })
    } else {
        try {
            // Lấy id ở params
            const id = req.params.id;
            await UserService.deleteUser(id);

            return res.status(200).json({
                success: true,
                message: "Đã xóa user"
            })

        } catch (error) {
            return res.status(400).json({
                success: false,
                message: Array.isArray(error) ? error : "Admin's id is not correct!",
                content: error
            });
        }
    }
}

exports.getUsers = async (req, res) => {
    const role = req.currentRole;
    // Kiểm tra là superadmin
    if ( role !== "super_admin") {
        return res.status(400).json({
            success: false,
            message: "Chưa đăng nhập với tư cách là Super Admin"
        })
    } else {
        try {
            let users = await UserService.getUsers();
            return res.status(200).json({
                success: true,
                message: "Get all admin successfully",
                content: users
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Failed to get all users",
                content: error
            });
        }
    }
}

exports.getUserById = async (req, res) => {
    const role = req.currentRole;
    // Kiểm tra là superadmin
    if ( role !== "super_admin") {
        return res.status(400).json({
            success: false,
            message: "Chưa đăng nhập với tư cách là Super Admin"
        })
    } else {
        try {
            const id = req.params;
            console.log(id);
            let user = await UserService.getUserById(id);
            return res.status(200).json({
                success: true,
                message: "Get user successfully",
                content: user
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Failed to get user",
                content: error
            });
        }
    }
}