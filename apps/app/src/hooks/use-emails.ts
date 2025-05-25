import { useQuery } from "@tanstack/react-query";

export const useEmails = (addressId: string, userId: string) => {
    return useQuery({
        queryKey: ["emails", addressId, userId],
        queryFn: async () => {
            const res = await fetch("http://localhost:4000/api/emails", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId,
                    addressId
                })
            });

            return await res.json() as {
                userId: string;
                id: string;
                addressId: string;
                from: string;
                to: string;
                subject: string;
                body: string;
                createdAt: Date;
                readAt: Date | null;
            }[];
        }
    });
}