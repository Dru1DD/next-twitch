"use client";
import { useSession } from "next-auth/react";

const Page = () => {
    const { data: session } = useSession();

    console.log("data", session)
    return (
        <div>
            YOU ARE LOGGED IN
        </div>
    )
}

export default Page;
