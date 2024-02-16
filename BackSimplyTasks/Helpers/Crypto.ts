import * as crypto from "crypto";

const pepper = "pelikanyWojny82";
export function hashPassword(password: string, salt: string) {
    const hash = crypto.createHash("sha256");
    hash.update(password + salt + pepper);
    return hash.digest("hex");
}
