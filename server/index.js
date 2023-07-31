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
    // console.log(req.body);
    const newUser = new userModel(req.body);
    newUser
        .save()
        .then(res.send(true))
        .catch((error) => {
            console.log(error);
            res.send(false);
        });
});

app.post("/getUser", (req, res) => {
    userModel
        .find(req.body)
        .exec()
        .then((r) => {
            if (r.length > 0) res.send(r);
            else res.send(false);
        });
});

const io = new Server(server, {
    cors: {
        origin: process.env.ORIGIN, // process.env.ORIGIN
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected with id ${socket.id}`);

    socket.on("set_profile", (profile) => {
        // console.log("profiling", profile);
        socket.data.profile = profile;
        socket.data.landlord = false;
    });

    socket.on("send_message", (data) => {
        console.log(data);
        io.in(data.lobby).emit("receive_message", {
            message: data.message,
            from: socket.data.profile.username,
            decoration: {},
        });
    });

    socket.on("join_game", async (data) => {
        socket.join(data.lobby);
        socket.data.score = "2";
        socket.data.trumpRank = "2";
        const sockets = await io.in(data.lobby).fetchSockets();
        const socketProfiles = sockets
            .map((s) => {
                if (socket.data.profile.email === s.data.profile.email && s.id != socket.id) {
                    s.disconnect();
                } else {
                    // console.log(s.data.profile, s.id, socket.id);
                    return s.data.profile;
                }
            })
            .filter((s) => {
                if (s) return true;
                else return false;
            });
        let landlordOffset = 0;
        sockets.map((s, i) => {
            if (s.data.landlord) {
                landlordOffset = i;
                socket.data.trumpRank = s.data.score;
            }
        });
        sockets.map((s, i) => {
            let turnNum = i - landlordOffset;
            if (turnNum < 0) {
                turnNum += 4;
            }
            io.to(s.id).emit("set_turn_num", { turnNum: i });
        });
        console.log(`user ${socket.id} connected to lobby ${data.lobby} `);
        // console.log(socketProfiles);
        io.in(data.lobby).emit("receive_players", { players: socketProfiles, joined: socket.data.profile.username });
        io.in(data.lobby).emit("receive_message", {
            message: `${socket.data.profile.username} has joined!`,
            from: "GAME",
            decoration: { color: "blue", bold: true },
        });
    });

    socket.on("start_game", async (data) => {
        console.log("started game!!!!");
        io.in(data.lobby).emit("game_started", { trumpRank: socket.data.trumpRank });
        const suits = ["Diamonds", "Clubs", "Hearts", "Spades"];
        const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "LJ", "HJ"];
        const sockets = await io.in(data.lobby).fetchSockets();
        let deck = [];
        for (let i = 0; i < suits.length * 2; i++) {
            for (let x = 0; x < ranks.length; x++) {
                let card = {
                    rank: ranks[x],
                    suit: suits[i % suits.length],
                    trump: ranks[x] == socket.data.trumpRank || ranks[x] == "LJ" || ranks[x] == "HJ",
                };
                if (ranks[x] === "LJ" || ranks[x] === "HJ") {
                    if (suits[i % suits.length] === "Diamonds") {
                        card.suit = "";
                        deck.push(card);
                    }
                } else {
                    deck.push(card);
                }
            }
        }
        for (let i = deck.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * i);
            let temp = deck[i];
            deck[i] = deck[j];
            deck[j] = temp;
        }
        sockets.map((s) => {
            s.data.deck = deck;
            s.data.cards = [];
        });
        io.in(data.lobby).emit("get_deck", { deck: deck });
    });

    socket.on("did_turn", async (data) => {
        // data.gameState
        const sockets = await io.in(data.lobby).fetchSockets();
        switch (data.gameState) {
            case "drawing":
                const card = socket.data.deck.pop();
                // console.log(card);
                // console.log("=========================");
                if (socket.data.deck.length === 8) {
                    io.in(data.lobby).emit("update_game_state", { nextGameState: "bidding" });
                }
                io.to(socket.id).emit("update_cards", { nextCard: card });
                break;
            case "bidding":
                console.log("biddering");
                break;
            case "playing":
                console.log("SIT DOWN ( IHAVE TRACTRO)");
                break;
        }
        io.in(data.lobby).emit("next_turn", { nextTurn: data.nextTurn });
    });

    // super secret commands here :scream:
    socket.on("/test_win", (args) => {
        let response = "";
        // console.log(args);
        if (args.length != 5) {
            response = `expected 5 arguments, got ${args.length}`;
        } else {
            args = args.map(Number);
            if (args.includes(NaN)) {
                response = "expected integers";
            } else {
                let team1 = (args[0] + args[1]) / 2;
                let team2 = (args[2] + args[3]) / 2;
                console.log(args);
                let e1 = 1 / (1 + Math.pow(10, (team2 - args[0]) / 400));
                let e2 = 1 / (1 + Math.pow(10, (team2 - args[1]) / 400));
                let e3 = 1 / (1 + Math.pow(10, (team1 - args[2]) / 400));
                let e4 = 1 / (1 + Math.pow(10, (team1 - args[3]) / 400));
                let newelo1 = Math.round(args[0] + args[4] * (1 - e1));
                let newelo2 = Math.round(args[1] + args[4] * (1 - e2));
                let newelo3 = Math.round(args[2] + args[4] * -e3);
                let newelo4 = Math.round(args[3] + args[4] * -e4);
                response = `after team one won, player 1's new elo is ${newelo1}, player 2's is ${newelo2}, player 3's is ${newelo3}, player 4's is ${newelo4}`;
            }
        }
        io.to(socket.id).emit("receive_message", {
            message: response,
            from: "Command",
        });
    });
});

mongoose
    .connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("db connected successfully"))
    .catch((error) => {
        console.log(error);
    });

const PORT = process.env.PORT || 3000;
server.listen(PORT);
console.log(`running on port ${PORT}`);
