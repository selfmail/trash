import { useMutation } from "@tanstack/react-query";

export const useCreateAddress = () => {
	return useMutation({
		mutationFn: async (data: {
            email: string;
            userId: string;
        }) => {
			const response = await fetch("http://localhost:4000/api/addresses/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			return response.json();
		},
	});
};