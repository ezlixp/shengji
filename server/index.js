import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import { userModel } from "./models/userModel.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
	.connect(
		`mongodb+srv://pix:${process.env.DB_PASSWORD}@shengji.5xvywxc.mongodb.net/shengji_db?retryWrites=true&w=majority`
	)
	.then((res) => {
		const PORT = 3000 || process.env.PORT;
		app.listen(PORT);
		console.log(`running on port ${PORT}`);
	})
	.catch((error) => {
		console.log(error);
	});

app.post("/createUser", (req, res) => {
	console.log(req.body);
	const newUser = new userModel(req.body);
	newUser
		.save()
		.then(res.send(true))
		.catch((error) => {
			console.log(error);
			res.send(false);
		});
});
