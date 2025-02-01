export const findContext = async (context: string): Promise<string> => {
    try {
        context = `Can you help me analyze the context and meaning of the following sentence: ${context}?`
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
        context = `Can you help me answer this sentence: ${context}?`
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
        context = `Can you help me answer this sentence, and search the web for the answer using "search_web" function only and dont ask what function to use, if you are not sure about the specific thing to return atleast return the relevent links you got ${context}?Also always return the links you get back always`
        console.log(context)
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
        context = `Can you get the related papers to this, and search using the "get_related_papers_data" function only and dont ask what function to use, if you are not sure about the specific thing to return atleast return the relevent links you got ${context}? and also return the link along with a little info from each`
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
        context = `Can you get the related twitter(X) posts to this and search using the "get_related_posts_data" function only and dont ask what function to use, if you are not sure about the specific thing to return atleast return the relevent links you got ${context}? and also return the link with the title`
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

export const correctGrammar = async (context: string): Promise<string> => {
    try {
        context = `Correct grammar of this: "${context}", don't give quotes in the reply`
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