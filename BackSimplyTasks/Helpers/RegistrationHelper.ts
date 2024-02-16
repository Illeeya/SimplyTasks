import User from "../Model/User";
import { v4, v1 } from "uuid";
import { hashPassword } from "./Crypto";
import CreateUser from "../Api/User/CreateUser";
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
    const salt: string = v1();

    const pw: string = hashPassword(body.password, salt);

    const fullBody = { ...body, userId: uId, password: pw, salt: salt };
    let result = await User.validate(fullBody)
        .then(() => {
            console.log("Proper validation");
            return { success: true, message: "Validation successful!" };
        })
        .catch((error) => {
            console.log("Improper validation");
            return { success: false, message: `${error}` };
        });
    if (result.success) {
        try {
            const insertedId = await CreateUser(fullBody);
            result = { success: true, message: `New user id: ${insertedId}` };
        } catch (error) {
            result = { success: false, message: `${error}` };
        }
    }
    return result;
}
