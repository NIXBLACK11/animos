import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import StarterKit from "@tiptap/starter-kit";
import { generateJSON } from "@tiptap/react";

export const markdownToTiptapJSON = async (markdown: string) => {
	const html = await unified()
		.use(remarkParse) // Parse Markdown
		.use(remarkGfm) // Support GitHub-flavored Markdown
		.use(remarkRehype) // Convert to HTML
		.use(rehypeRaw) // Process raw HTML
		.use(rehypeStringify) // Convert to string
		.process(markdown);

	// Convert the HTML output to TipTap JSON format
	return generateJSON(String(html), [StarterKit]);
};
