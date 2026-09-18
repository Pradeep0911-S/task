import jwt from "jsonwebtoken";

export function signToken(payload){
    const tokenSigned  = jwt.sign(payload,process.env.JWTSECRET,{expiresIn : "1hr"});
    return tokenSigned;
}
export function verifyToken(token){
    try {
        const tokenVerified = jwt.verify(token,process.env.JWTSECRET);
        return tokenVerified;
    } catch {
        return null
    }
}
