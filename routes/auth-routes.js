import express from "express";
import { emailValid , passFormat, passMatch } from "../utils/validation.js";
import { getUserByEmail, getUserByUsername,createUser} from "../database/db.js";
import { deleteREF, getOTP ,genOTP} from "../utils/otp.js";
import bcrypt from "bcrypt";
import { signToken } from "../utils/jwt.js";

const router = express.Router();

router.post('/register',async (req,res)=>{
    const {username,email , password } = req.body;
    if(!username){
        return res.status(400).json({message : "Enter the username"});
    }
    if(!email){
        return res.status(400).json({message : "Enter the email"});
    }
    if(!password){
        return res.status(400).json({message : "Enter the Password"});
    }
    const userByUsername = await getUserByUsername(username);
    if(userByUsername){
        return res.status(409).json({message : "Username already exists"})
    }
    if(!emailValid(email)){
        return res.status(400).json({message : "Invalid Email Format"});
    }
    if(!passFormat(password)){
        return res.status(400).json({message : "Invalid Password Format"});
    }
    const userbyemail = await getUserByEmail(email);
    if(userbyemail){
        return res.status(409).json({message : "Email already exists"})
    }
    const hashPass = bcrypt.hashSync(password,10)
    const referenceId = await genOTP( email, "register", { username: username, hashPassword: hashPass } );
    // if(verify){
    //     const hashPass = bcrypt.hashSync(user.password,10)
    //     const user = await createUser(username,email,hashPass);
    //     if(!user){
    //         return res.status(500).json({message : "Error creating user"});
    //     }
    // }
    return res.status(200).json({message : "OTP sent to user email", email : email, referenceId: referenceId});
});

router.post('/login',async (req,res)=>{
    const {email , password } = req.body;
    if(!email){
        return res.status(400).json({message : "Enter the email"});
    }
    if(!password){
        return res.status(400).json({message : "Enter the Password"});
    }
    if(!emailValid(email)){
        return res.status(400).json({message : "Invalid Email Format"});
    }
    if(!passFormat(password)){
        return res.status(400).json({message : "Invalid Password Format"});
    }
    const user = await getUserByEmail(email);
    if(!user){
        return res.status(404).json({message : "Email not found"})
    }
    const checkPass = passMatch(password , user.hash_password);
    if(!checkPass){
        return res.status(400).json({message : "Invalid Password"});
    }
    const referenceId = await genOTP(email,"login",{username : user.username, role : user.role});
    return res.status(200).json({message : "OTP sent to user email", email : user.email, referenceId: referenceId});
});

router.post('/otp/verify',async (req,res)=>{
    const {referenceId , otp } = req.body;
    if (!referenceId) {
        return res.status(400).json({message: "Reference ID is required"});
    }
    if(!otp){
        return res.status(400).json({message : "Enter OTP"});
    }
    const otpinfo = await getOTP(referenceId);
    if (!otpinfo) {
    return res.status(400).json({message: "Invalid reference ID"});
    }
    if(otp !== otpinfo.otp){
        return res.status(401).json({message : "Invalid OTP"});
    }
    if (Date.now() > otpinfo.expiresAt) {
        deleteREF(referenceId)
        return res.status(400).json({message: "otp expired"});
    }
    if(otpinfo.type === "register") {
        const user = await createUser(otpinfo.username,otpinfo.email,otpinfo.hashPassword);
        if (!user) {
            return res.status(500).json({message: "Error creating user"});
        }
        res.status(201).json({message: "User registered successfully"});
        return deleteREF(referenceId);
    }
    if (otpinfo.type === "login") {
        const payload = {
            username : otpinfo.username,
            role : otpinfo.role
        }
        const token = signToken(payload);
        res.status(200).json({message: "Login successful",token : token });
        return deleteREF(referenceId);
    }
    if (otpinfo.type === "forgot-password") {
        res.status(200).json({message: "OTP verified successfully"});
        return deleteREF(referenceId);
    }
    return res.status(400).json({message: "Invalid OTP purpose"});
})

router.post('/forgot-password',async (req,res)=>{
    const {email} = req.body;
    if(!email){
        return res.status(400).json({message : "Enter the email"});
    }
    if(!emailValid(email)){
        return res.status(400).json({message : "Invalid Email Format"});
    }
    const user = await getUserByEmail(email);
    if(!user){
        return res.status(404).json({message : "Email not found"})
    }
    const referenceId = await genOTP(email,"forgot-password");
    return res.status(200).json({message : "OTP sent to user email", email : user.email, referenceId: referenceId});
});

export default router;