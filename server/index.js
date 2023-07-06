import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import { userModel } from "./models/userModel.js";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.send(process.env.ORIGIN);
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

const io = new Server(server, {
	// host server completely seperately (heroku???, idk)
	cors: {
		origin: process.env.ORIGIN, // process.env.ORIGIN
		methods: ["GET", "POST"],
	},
});

io.on("connection", (socket) => {
	console.log(`User Connected with id ${socket.id}`);

	socket.on("send_message", (data) => {
		console.log(data);
		io.in(data.lobby).emit("receive_message", data);
	});

	socket.on("join_game", async (data) => {
		socket.join(data.lobby);
		const sockets = await io.in(data.lobby).fetchSockets();
		const socketIds = sockets.map((socket) => socket.id);
		console.log(
			`user ${socket.id} connected to lobby ${data.lobby} now with users ${socketIds}`
		);
		io.in(data.lobby).emit("receive_players", { players: socketIds });
	});
});

const PORT = process.env.PORT || 3000;
server.listen(PORT);
console.log(`running on port ${PORT}`);

mongoose
	.connect(process.env.DB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("db connected successfully"))
	.catch((error) => {
		console.log(error);
	});
