import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateAddress = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: {
            email: string;
            userId: string;
        }) => {
			const response = await fetch(`${process.env.EXPO_PUBLIC_API_DOMAIN}/api/addresses/create`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.error || 'Failed to create address');
			}

			return response.json();
		},
		onSuccess: (_, variables) => {
			// Invalidate and refetch the addresses query
			queryClient.invalidateQueries({
				queryKey: ["addresses", variables.userId],
			});
		},
	});
};