export const findContext = async (context: string): Promise<string> => {
    try {
        context += `Can you help me analyze the context and meaning of the following sentence: ${context}?`
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

export const answerQuestion = async (context: string): Promise<string> => {
    try {
        context += `Can you help me answer this sentence: ${context}?`
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

export const answerQuestionWeb = async (context: string): Promise<string> => {
    try {
        context += `Can you help me answer this sentence, and seacrh the web for the answer ${context}?`
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

export const findRelatedPapers = async (context: string): Promise<string> => {
    try {
        context += `Can you get the related papers to this: ${context}? and also return the links to each`
        const response = await fetch("/api/chat2", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: context }),
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        console.log(data.text);
        return data.text;
    } catch (error) {
        console.error("Error fetching context:", error);
        return "";
    }
};

export const findRelatedPosts = async (context: string): Promise<string> => {
    try {
        context += `Can you get the related twitter(X) posts to this: ${context}?`
        const response = await fetch("/api/chat2", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: context }),
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        console.log(data.text);
        return data.text;
    } catch (error) {
        console.error("Error fetching context:", error);
        return "";
    }
};