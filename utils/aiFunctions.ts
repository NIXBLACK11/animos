export const findContext = async (context: string) => {
    try {
        const response = await fetch("/api/chat2", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: context }),
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);

        return data;
    } catch (error) {
        console.error("Error fetching context:", error);
        return { error: "Failed to fetch context" };
    }
};
