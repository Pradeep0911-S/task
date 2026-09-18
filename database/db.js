import path from "path";
import {__filename , __dirname } from "./dir-file-path.js"
import Database from "better-sqlite3";

const DB_PATH = path.join(__dirname,"myDatabase.db");


export const db = new Database(DB_PATH);

export function getUserByEmail(email){
    const getData = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
    return getData;
}

export function getUserByUsername(username){
    const getData = db.prepare("SELECT * FROM users WHERE username = ?").get(username);
    return getData;
}
export function createUser(username,email,hash_password){
    const insertData = db.prepare("INSERT INTO users (username,email,hash_password,role) VALUES(?,?,?,'user')").run(username,email,hash_password);
    return insertData;
}


