import { db } from "./db.js";

let email;
db.prepare("DELETE FROM users WHERE email = ?").run(email);