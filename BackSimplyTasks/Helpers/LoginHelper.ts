import GetUser from "../Api/User/GetUser";
import { hashPassword } from "./Crypto";

type UserLogin = {
    username: string;
    password: string;
};

type User = {
    userId: string;
    username: string;
    password: string;
    salt: string;
};
export default async function Login(credentials: UserLogin) {
    console.log(credentials);
    const user = await GetUser(credentials.username);
    console.log(user);
    if (user) {
        const pw = hashPassword(credentials.password, user.salt);
        console.log(pw);
        if (user.password === pw) {
            return user.userId;
        }
    }
    return "unknown";
}
