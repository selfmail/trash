import { useQuery } from "@tanstack/react-query";

export const useEmails = (addressId: string, userId: string) => {
    return useQuery({
        queryKey: ["emails", addressId, userId],
        queryFn: async () => {
            const res = await fetch(`${process.env.EXPO_PUBLIC_API_DOMAIN}/api/emails/${userId}/${addressId}`, {
                method: "GET",
            });

            if (!res.ok) {
                throw new Error('Failed to fetch emails');
            }

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