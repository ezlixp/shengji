import mongoose from "mongoose";

const schema = mongoose.Schema;
const userSchema = new schema({
	uid: { type: String, required: true },
	elo: { type: Number, require: true, default: 1200 },
});

export const userModel = mongoose.model("User", userSchema);
