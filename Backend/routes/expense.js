const express= require('express');
const router= express.Router();
const Expense= require('../models/Expense');

// ADD EXPENSE
router.post("/", async(req,res) => {
    console.log(req.body)
    try{
        const newExpense= new Expense(req.body);
        const expense= await newExpense.save();
        res.status(201).json(expense);

    } catch(err){
     res.status(500).json(err);


    }


})
// GET ALL EXPENSES
router.get("/", async (req,res) => {
    try{
        const expenses= await Expense.find().sort({createdAt:-1});
        res.status(200).json({expenses});
    } catch (err){
        res.status(500).json(err);
    }

})

//update expense
router.put("/:id", async (req,res) => {
    try{
        const expense = await Expense.findByIdAndUpdate(
            req.params.id,

            {
                $set: req.body
            },
            {new:true}
        );
        res.status(201).json(expense);
    }catch (err){
        res.status(500).json(err);
    }

})

// DELETE EXPENSE
router.delete("/:id", async (req,res) => {
    try{
         const deletedExpense=await Expense.findByIdAndDelete(req.params.id);
         if(!deletedExpense){
            return
            res.status(404).json({messege:"Expense not found"});

         }
        res.status(200).json({ message: "Expense has been deleted" });
    }catch (err){ 
        res.status(500).json({error: err.message});
    }

});





module.exports=router;