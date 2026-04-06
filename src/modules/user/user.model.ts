import bcrypt from "bcrypt";
import mongoose, { Document, SaveOptions, Schema } from "mongoose";

export interface IUser extends Document {
	name: string;
	email: string;
	password: string;
	role: "admin" | "user";
	createdAt: Date;
	updatedAt: Date;
}

const userSchema = new Schema<IUser>(
	{
		name: {
			type: String,
			required: [true, "Name is required"],
		},

		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			lowercase: true,
			trim: true, // strips leading/trailing whitespace
		},

		password: {
			type: String,
			required: [true, "Password is required"],
			minlength: [6, "Password must be at least 6 characters"],
			select: false, // never returned in queries by default
		},

		role: {
			type: String,
			enum: ["admin", "user"],
			default: "user",
		},
	},
	{
		timestamps: true, // auto-adds createdAt and updatedAt
	},
);

// Pre-save Hook
userSchema.pre("save", async function (_opts: SaveOptions) {
	// Skip hashing if the password field wasn't changed
	if (!this.isModified("password")) return;

	// Hash the password with a salt of 12 rounds
	this.password = await bcrypt.hash(this.password, 12);
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
