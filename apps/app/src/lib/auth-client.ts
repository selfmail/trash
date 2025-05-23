import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
    baseURL: "http://localhost:4000",
    plugins: [
        expoClient({
            scheme: "trash-company",
            storagePrefix: "trash-company",
            storage: SecureStore,
        })
    ]
});