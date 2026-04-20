const adminService = require("../services/adminService");


exports.adminLogin= async(req,res) =>{
    const token  = await adminService.adminLogin(req.body);
    res.json({token})

}

exports.getAllUsers = async (req, res) => {
    const users = await adminService.getAllUsers();
    res.json(users);
};




exports.deleteUser = async (req, res) => {
    const result = await adminService.deleteUser(req.params.id);
    res.json(result);
};


exports.deleteProduct = async(req,res)=>{
     try {
        const result = await adminService.deleteProduct(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


