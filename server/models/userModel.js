import mongoose from "mongoose";

const schema = mongoose.Schema;
const userSchema = new schema({
	username: { type: String, required: true },
	email: { type: String, required: true },
	elo: { type: Number, require: true, default: 1500 },
});

export const userModel = mongoose.model("User", userSchema);
