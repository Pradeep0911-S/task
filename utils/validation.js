import bcrypt from "bcrypt";

export function emailValid(email){
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const match = email.match(mailformat);

    return match;
}
export function passFormat(password){
    const passformat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,20}$/;
    const match = password.match(passformat)

    return match;
}
export function passMatch(password, databasePass){
    const passMatch = bcrypt.compareSync(password , databasePass);

    return passMatch;
}