import { useQuery } from "@tanstack/react-query";

export const useAddresses = (userId: string) => {
    return useQuery({
        queryKey: ["addresses", userId],
        queryFn: async () => {
            const res = await fetch(`${process.env.EXPO_PUBLIC_API_DOMAIN}/api/addresses/${userId}`, {
                method: "GET",
            });

            if (!res.ok) {
                throw new Error('Failed to fetch addresses');
            }

            return await res.json() as {
                userId: string;
                id: string;
                email: string;
            }[];
        }
    });
};