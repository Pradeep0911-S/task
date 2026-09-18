import "./utils/env.js";
import express from "express";
import authRoutes from "./routes/auth-routes.js"
import dashRoutes from "./routes/dashroutes.js"

const port = process.env.PORT || 3001;

const app = express();

app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/user',dashRoutes);


app.get("/", (req, res) => {
    res.json({ message: "Default Route" });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});