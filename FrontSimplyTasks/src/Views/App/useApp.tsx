import { useState } from "react";

export default function useApp() {
    const [loggedUserId, setLoggedUserId] = useState<string>("");
    function changeLoggedUser(userId: string) {
        setLoggedUserId(userId);
    }

    return { loggedUserId, changeLoggedUser };
}
