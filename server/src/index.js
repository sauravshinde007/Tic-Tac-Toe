import express from "express";
import cors from "cors";
import {StreamChat} from "stream-chat";
import {v4 as uuidV4} from "uuid"
import bcrypt from "bcrypt";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT_NUMBER = 3001;

const api_key = "fkf3ftmwcn8c";
const api_secret = "wp46bajtd566za7wa5xvccs8b6r7bfpkydecpyyra83j8yge5zbaa7jxpqehaf8r";

const serverClient = StreamChat.getInstance(api_key, api_secret);

app.post("/signup", async (req,res)=>{
    try{
        const {firstName, lastName, username, password} = req.body;

        // Manual validation
        if (!firstName || !lastName || !username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userID = uuidV4();
        const hashedPassword = await bcrypt.hash(password,10);
        const token = serverClient.createToken(userID);

        res.json({token, userID, firstName, lastName, username, hashedPassword});
    }catch(error){
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.post("/login", async (req, res) =>{
    try{
        const {username, password} = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        const {users} = await serverClient.queryUsers({name : username});
        if(users.length === 0) return res.json({message : "User not found"});

        const token = serverClient.createToken(users[0].id);
        const passwordMatch = await bcrypt.compare(password, users[0].hashedPassword);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        res.json({
            token,
            firstName : users[0].firstName,
            lastName : users[0].lastName,
            username,
            userID : users[0].id,
        });   
        
    }catch(error){
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.listen(PORT_NUMBER, () => {
    console.log("Server is running on PORT: ",PORT_NUMBER);
});

