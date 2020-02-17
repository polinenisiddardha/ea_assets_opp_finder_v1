const express = require("express");
const application = express();
 const path = require("path");
const mongoose = require("mongoose");
const router=express.Router();
const UserModel = mongoose.model('User');
const ProcessModel = mongoose.model('Process');


// var dir = path.join(__dirname, './views/images');

// application.use(express.static(dir));
router.get("/", (req, res)=>{
    //res.render("views/adminHome")
});
router.get("/adminHome", (req, res)=>{
res.render("adminHome")
});
router.get("/captureProcess", (req, res)=>{
    res.render("captureProcess")
});
router.get("/captureProcess2", (req, res)=>{
    res.render("captureProcess2")
});
router.get("/processDiscovery", (req, res)=>{
    res.render("processDiscovery")
});
router.get("/processViewById", (req, res)=>{
    res.render("processViewById")
});
router.get("/adminViewById", (req, res)=>{
     res.render("adminViewById")
 });
 router.get("/approveProcess", (req, res)=>{
    res.render("approveProcess")
});
router.get("/processPrioritization", (req, res)=>{
    res.render("processPrioritization")
});
 router.get("/userDetails", (req, res)=>{
    res.render("userDetails")
});
router.post("/adduser", (req, res)=>{
    var usermodel = new UserModel();
    usermodel.userName = req.body.userName;
    usermodel. employeeId = req.body.employeeId;
    usermodel.password = req.body.password;
    usermodel.save((err, doc) => {
        if (!err){
        res.redirect("/user/list");
        //console.log("success");
    }
        else{
        console.log('Error during record insertion : ' + err);
        res.send("Error Occured");
    }
});
    
});
router.post("/addProcess", (req, res)=>{
    var processmodel = new ProcessModel();
    processmodel.clientName = req.body.clientName;
    processmodel.Buss_Unit = req.body.Buss_Unit;
    processmodel.Sub_Buss_Unit = req.body.Sub_Buss_Unit;
    processmodel.Proc_Name = req.body.Proc_Name;
    processmodel. Proc_Id = req.body.Proc_Id;
    processmodel.Proc_Desc = req.body.Proc_Desc;
    processmodel.Mon_Vol = req.body.Mon_Vol;
    processmodel.AHT = req.body.AHT;
    processmodel.FTE = req.body.FTE;
    processmodel.SLA = req.body.SLA;
    processmodel.TAT = req.body.TAT;
    processmodel.App_Used = req.body.App_Used;
    processmodel.Doc_Present = req.body.Doc_Present;
    processmodel.Rule_Based = req.body.Rule_Based;
    processmodel.Stuc_Data = req.body.Stuc_Data;
    processmodel.Inp_Data_Type = req.body.Inp_Data_Type;
    processmodel.Amenable_RPA = req.body.Amenable_RPA;
    processmodel.Amenable_Cognitive = req.body.Amenable_Cognitive;
    processmodel. Automation_Ready = req.body.Automation_Ready;
    processmodel.AP_Perc = req.body.AP_Perc;
    processmodel.FTE_Benefit = req.body.FTE_Benefit;
    processmodel.Status="REQUESTED";
    processmodel.save((err, doc) => {
        if (!err){
        // res.redirect("/user/processlist");
        // console.log("success");
         res.send("Captured process succesfully.");
    }
        else{
        console.log('Error during record insertion : ' + err);
        res.send("Error Occured");
    }
});
    
});
router.get('/list', (req,res) => {
    ProcessModel.find((err, docs) => {
    if(!err){
    res.render("processPrioritization", {list: docs});
  
    console.log(docs);
    }
    else {
    console.log('Failed to retrieve the Course List: '+ err);
    }
    });
    });

    router.get('/viewbubblechart', (req,res) => {
        Course.find((err, docs) => {
        if(!err){
        res.render("bubblechart", {
        list: docs
        });
        }
        else {
        console.log('Failed to retrieve the Course List: '+ err);
        }
        });
        });
         

    router.get('/viewById', (req, res) => {
        console.log("Inside router")
        
        ProcessModel.find({Proc_Id:req.query.Proc_Id},(err, doc) => {
            console.log(doc[0].Status)
        if (doc[0].Status=="APPROVED") {
        res.render("processList", {viewtitle:"process",process:doc[0]
        });
        console.log(doc);
        }
        else
        res.send("Process is not Approved wait for the admin approval");
        });
        });

router.get("/approveProcessById", (req, res)=>{
  ProcessModel.findOneAndUpdate({ Proc_id: req.query.Proc_id },{ Status: "APPROVED" }, (err, doc) => {
      if (!err) { res.send("APPROVED Successfully"); }         
    else
       res.send('Error during updating the record: ' + err);
          });              
        });

    //Router Controller for DELETE request
router.get('/delete/:id', (req, res) => {
    //var valid = mongoose.Types.ObjectId.isValid(req.params.id);
    if(req.params.id.match(/^[0-9a-fA-F]{24}$/)){
    UserModel.findByIdAndRemove(req.params.Proc_Id, (err, doc) => {
    if (!err) {
    res.redirect('/user/list');
    }
    else { console.log('Failed to Delete Course Details: ' + err); }
    });
}
else
res.send('error: please provide correct id');
    });
module.exports = router;