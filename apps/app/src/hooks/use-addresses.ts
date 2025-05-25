import { useQuery } from "@tanstack/react-query";

export const useAddresses = (userId: string) => {
    return  useQuery({
        queryKey: ["addresses", userId],
        queryFn: async () => {
            const res = await fetch("http://localhost:4000/api/addresses", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId
                })
            });

            return await res.json() as {
                userId: string;
                id: string;
                email: string;
            }[];
        }
    });
}