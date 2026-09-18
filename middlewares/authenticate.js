import { verifyToken } from "../utils/jwt.js";


export function authentiCation(req,res,next){
    const header  = req.headers.Authorization || req.headers.authorization;
    if(!header || !header.startsWith("Bearer ")){
        return res.status(401).json({message : "No token provided"})
    }
    const token = header.split(" ")[1];
    const Verify = verifyToken(token);
    if(!Verify){
        return res.status(401).json({ message: "Invalid or expired token" });
    }
    req.user = Verify;
    next();
}