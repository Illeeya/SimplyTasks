import User from "./Model/User";
import { v4 } from "uuid";

type registerBody = {
    email: string;
    username: string;
    password: string;
};

type result = {
    success: boolean;
    message: string;
};

export default async function Register(body: registerBody): Promise<result> {
    console.log("In register");
    const uId: string = v4();
    const fullBody = { ...body, userId: uId };
    const result = await User.validate(fullBody)
        .then(() => {
            console.log("Proper validation");
            return { success: true, message: "Validation successful!" };
        })
        .catch((error) => {
            console.log("Improper validation");
            return { success: false, message: `${error}` };
        });
    return result;
}
