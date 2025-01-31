export const findContext = async (context: string): Promise<string> => {
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

        return data.text;
    } catch (error) {
        console.error("Error fetching context:", error);
        return "";
    }
};
