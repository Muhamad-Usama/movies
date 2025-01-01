"use client"
import React, {useEffect, useState} from "react";
import { redirect } from "next/navigation";

export default function withAuth(Component) {
    return function IsAuth(props) {
        const [isClient, setIsClient] = useState(false);

        useEffect(() => {
            setIsClient(true)
            const auth = localStorage.getItem("auth_token");
            if (!auth) {
                redirect("/signin");
            }
        }, []);

        if(!isClient) {
            return null
        }

        return <Component {...props} />;
    };
}

