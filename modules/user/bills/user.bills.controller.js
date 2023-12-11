const { Homestays,Bills,Services, Users } = require('../../../models');
const {db} = require("../../../helpers/dbHelper");
const BillsService = require('./user.bills.service');

// Tạo bill cho người dùng không có tài khoản
exports.createBills = async (req,res)=>{
    try{
        //Lấy dữ liệu từ body
        const data = req.body;

        console.log(data._id);
        // Lấy thông tin homestays bằng _id
        const homestay = await Homestays(db).findById({ _id:data._id })
        .then( homestay => {
            return homestay;
        })
        
        //Nếu không nhập đúng _id của homestays thì trả về lỗi
        if( homestay === null || typeof( homestay ) === undefined ){
            res.status(400).json({
                success:false,
                message:"_id của homestay không đúng",
                content: ""
            })
        }
        
        
        if (data.servicesPerBill){
            
            for( let i = 0; i < data.servicesPerBill.length; i++ ){

                // Lấy về thông tin của services;
                const services = await Services(db).findById({ _id : data.servicesPerBill[i].services  })
                .then( services => {
                    return services;
                })

                if( services === null || typeof( services ) === undefined ){
                    res.status(400).json({
                        success:false,
                        message:"_id của services không đúng",
                        content: ""
                    })
                }

            }
        }

        //Tạo bills với các trường đơn, bắt buộc phải điền hết các trường đơn
        await BillsService.createBill( data );

        res.status(200).json({
            success:true,
            message:"Create Success",
            content: ""
        })
    }

    catch(Error){
        console.error(Error);
        res.status(400).json({
            success:false,
            message:"Exception",
            content: Error
        })
    }
}

// Tạo bill cho người dùng có tài khoản
exports.createBillsAuthenticated = async (req,res)=>{

    // Kiểm tra xác minh user đã được thực hiện ở middleware
    if (req.user.role !== "user") {
        return res.status(400).json({
            success: false,
            content: null,
            message: "Chưa đăng nhập với tư cách là User"
        })
    } else {
        try{

            //Lấy dữ liệu từ body
            const data = req.body;   
    
            console.log(data._id);
            // Lấy thông tin homestays bằng _id
            const homestay = await Homestays(db).findById({ _id:data._id })
            .then( homestay => {
                return homestay;
            })
            
            //Nếu không nhập đúng _id của homestays thì trả về lỗi
            if( homestay === null || typeof( homestay ) === undefined ){
                res.status(400).json({
                    success:false,
                    message:"_id của homestay không đúng",
                    content: ""
                })
            }

            //Kiểm tra xem _id services nhập có đúng không
            if (data.servicesPerBill){
                for( let i = 0; i < data.servicesPerBill.length; i++ ){
    
                    // Lấy về thông tin của services;
                    const services = await Services(db).findById({ _id : data.servicesPerBill[i].services  })
                    .then( services => {
                        return services;
                    })
        
                    if( services === null || typeof( services ) === undefined ){
                        res.status(400).json({
                            success:false,
                            message:"_id của services không đúng",
                            content: ""
                        })
                    }
        
                }
            }
            

            // Lấy dữ liệu người dùng từ tài khoản
            data.customer = req.user;
            data.user = req.user._id;

            //Tạo bills với các trường đơn, bắt buộc phải điền hết các trường đơn
            await BillsService.createBill( data );
    
            res.status(200).json({
                success:true,
                message:"Create Success",
                content: ""
            })
        }
    
        catch(Error){
            console.error(Error);
            res.status(400).json({
                success:false,
                message:"Exception",
                content: Error
            })
        }
    }

    
}

// Lấy tất cả bill dựa trên usedId
exports.getBillsByUserId = async (req, res) => {
    try {

        const bills = await BillsService.getAllBillsByUserId(req.user._id);

        return res.status(200).json({
            success: true,
            message: "Get all bills for user successfully",
            content: bills
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            content: error
        });
    }
};

exports.getBillByBillId = async (req, res) => {
    try {

        const bill = await BillsService.getBillByBillId(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Get bill for user successfully",
            content: bill
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            content: error
        });
    }
};