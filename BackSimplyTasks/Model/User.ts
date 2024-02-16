import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate: [isValidEmail, "Invalid email address."],
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validation: [isValidUsername, "Invalid username."],
    },
    password: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true,
        unique: true,
    },
});

const User = mongoose.model("User", userSchema);

function isValidEmail(email: string) {
    return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(
        email
    );
}

function isValidUsername(username: string) {
    // Regular expression to validate username (up to 25 characters and contains only letters and numbers)
    return /^[a-zA-Z0-9]{1,25}$/.test(username);
}

export default User;
