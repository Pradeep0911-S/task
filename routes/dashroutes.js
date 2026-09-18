import express from "express";
import { db, getUserByUsername } from "../database/db.js";
import authorization from "../middlewares/authorize.js";
import { authentiCation } from "../middlewares/authenticate.js";

const router = express.Router();

router.use(authentiCation);


router.get("/admin",authorization,(req,res)=>{
    const users = db.prepare("SELECT username,email,role FROM users ").all();
    return res.status(200).json({users})
})

router.get("/:username",authorization, (req,res)=>{
    const username = req.params.username;
    const user = getUserByUsername(username);
    if(!user){
        return res.status(404).json({message : "user not found"})
    }
    return res.status(200).json({user : user.username,email : user.email,role : user.role})
})

export default router;