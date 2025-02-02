import { useEditor, EditorContent } from '@tiptap/react'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import StarterKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import Heading, { Level } from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import { common, createLowlight } from 'lowlight'
import { FaAngleDown, FaBold, FaHeading, FaItalic, FaListOl, FaListUl, FaStrikethrough, FaTable } from 'react-icons/fa'
import { useEffect, useState, useRef } from 'react'
import { answerQuestion, answerQuestionWeb, answerQuestionWebLinks, correctGrammar, findContext, findRelatedPapers, findRelatedPosts, getPromptAnswer } from '@/utils/aiFunctions'
import { useAtom } from 'jotai'
import { loadingState } from '@/states/state'
import { markdownToTiptapJSON } from '@/utils/markdownToTipTapJSON'

const lowlight = createLowlight(common)

interface TipTapProps {
	initialText: string;
	setFileText: React.Dispatch<React.SetStateAction<string>>;
}

export const TipTap: React.FC<TipTapProps> = ({ initialText, setFileText }) => {
	const [prompt, setPrompt] = useState("");
	const [, setLoading] = useAtom(loadingState);
	const [template, setTemplate] = useState("");
	const [textContext, setTextContext] = useState("");
	const [addData, setAddData] = useState<string>("");
	const [inputPopup, setInputPopup] = useState(false);
	const [replaceData, setReplaceData] = useState<string>("");
	const [showSlashPopup, setShowSlashPopup] = useState(false);
	const [showTableDropdown, setShowTableDropdown] = useState(false);
	const [selectionTo, setSelectionTo] = useState<number | null>(null);
	const [showHeadingDropdown, setShowHeadingDropdown] = useState(false);
	const [selectionFrom, setSelectionFrom] = useState<number | null>(null);
	const [slashPopupPosition, setSlashPopupPosition] = useState({ top: 0, left: 0 });

	const slashPopupRef = useRef<HTMLDivElement>(null);

	const headingOptions = ['H1', 'H2', 'H3'];

	const tableOptions = [
		{ label: 'Insert table', action: () => editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run() },
		{ label: 'Add column before', action: () => editor?.chain().focus().addColumnBefore().run() },
		{ label: 'Add column after', action: () => editor?.chain().focus().addColumnAfter().run() },
		{ label: 'Delete column', action: () => editor?.chain().focus().deleteColumn().run() },
		{ label: 'Add row before', action: () => editor?.chain().focus().addRowBefore().run() },
		{ label: 'Add row after', action: () => editor?.chain().focus().addRowAfter().run() },
		{ label: 'Delete row', action: () => editor?.chain().focus().deleteRow().run() },
		{ label: 'Delete table', action: () => editor?.chain().focus().deleteTable().run() },
		{ label: 'Merge cells', action: () => editor?.chain().focus().mergeCells().run() },
	];

	const slashOptions = [
		{
			label: 'Ask AI for anything',
			action: async () => {
				setInputPopup(true);
			}
		}, { label: 'Suggest ideas', action: () => window.open('https://github.com/NIXBLACK11/animos/issues', '_blank') },
	];

	const selectedTextOptions = [
		{
			label: 'Ask AI for context',
			action: async () => {
				setLoading(true);
				setAddData(await findContext(textContext));
				setLoading(false);
			}
		}, {
			label: 'Ask AI for answer(web search)',
			action: async () => {
				setLoading(true);
				setAddData(await answerQuestionWeb(textContext));
				setLoading(false);
			}
		}, {
			label: 'Ask AI for answer(web search to get links)',
			action: async () => {
				setLoading(true);
				setAddData(await answerQuestionWebLinks(textContext));
				setLoading(false);
			}
		}, {
			label: 'Ask AI for answer',
			action: async () => {
				setLoading(true);
				setAddData(await answerQuestion(textContext));
				setLoading(false);
			}
		}, {
			label: 'Ask AI for realted papers',
			action: async () => {
				setLoading(true);
				setAddData(await findRelatedPapers(textContext));
				setLoading(false);
			}
		}, {
			label: 'Ask AI for realted X posts',
			action: async () => {
				setLoading(true);
				setAddData(await findRelatedPosts(textContext));
				setLoading(false);
			}
		}, {
			label: 'Ask AI to correct grammar',
			action: async () => {
				setLoading(true);
				setReplaceData(await correctGrammar(textContext));
				setLoading(false);
			}
		},
	];

	const handlePrompt = async () => {
		if (!prompt) return;
		setInputPopup(false);
		setLoading(true);
		setTemplate(await getPromptAnswer(prompt));
		setPrompt("");
		setLoading(false);
	}

	const editor = useEditor({
		extensions: [
			StarterKit,
			Document,
			Paragraph,
			Text,
			Heading.configure({ levels: [1, 2, 3] }),
			CodeBlockLowlight.configure({ lowlight }),
			Table.configure({ resizable: true }),
			TableRow,
			TableHeader,
			TableCell,
		],
		content: '',
		editorProps: {
			attributes: {
				class: `text-lg bg-[#0F0F10] text-[#ffffff] prose prose-sm m-5 focus:outline-none max-w-full h-full [&_ol]:list-decimal [&_ol]:text-white [&_ul]:list-disc [&_ul]:text-white [&_table]:border [&_table]:border-collapse [&_table]:w-full [&_th]:border [&_th]:border-gray-600 [&_th]:bg-[#333333] [&_th]:text-white [&_th]:px-4 [&_th]:py-2 [&_td]:border [&_td]:border-gray-600 [&_td]:bg-[#1a1a1a] [&_td]:text-white [&_td]:px-4 [&_td]:py-2 [&_tr:nth-child(even)]:bg-[#222222] [&_strong]:text-white [&_em]:text-white [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white [&_h4]:text-white [&_h5]:text-white [&_h6]:text-white [&_s]:text-white`,
			},
			handleDOMEvents: {
				keydown: (view, event) => {
					if (event.key === '/') {
						const { top, left } = view.coordsAtPos(view.state.selection.from);
						setSlashPopupPosition({ top, left });
						setShowSlashPopup(true);
						setTextContext("");
						return true;
					}
					return false;
				},
				contextmenu: (view, event) => {
					event.preventDefault();
					const selection = view.state.selection;
					if (selection.empty) {
						setShowSlashPopup(false);
						return false;
					}
					const selectedText = view.state.doc.textBetween(selection.from, selection.to);
					setTextContext(selectedText);
					const { top, left } = view.coordsAtPos(selection.from);
					setSlashPopupPosition({ top, left });
					setShowSlashPopup(true);
					return true;
				},
			},
		},
		onUpdate: ({ editor }) => {
			const currentText = editor.getHTML();
			setFileText(currentText);
		},
	});

	useEffect(() => {
		// For first time only
		if (editor) {
			editor.commands.setContent(initialText);
		}
	}, [initialText]);

	useEffect(() => {
		if (editor) {
			editor.on("selectionUpdate", () => {
				const { from, to } = editor.state.selection;
				setSelectionTo(to);
				setSelectionFrom(from);
			});
		}
	}, [editor]);

	useEffect(() => {
		const insertIntoEditor = async () => {

			if (addData && editor && selectionTo !== null) {
				const formattedHTML = await markdownToTiptapJSON(addData);
				editor.commands.insertContentAt(selectionTo, formattedHTML);

				setAddData("");
				setSelectionTo(null);
			}
		}
		insertIntoEditor();
	}, [addData, selectionTo]);

	useEffect(() => {
		const insertIntoEditor = async () => {

			if (replaceData && editor && selectionTo !== null && selectionFrom !== null) {
				const formattedHTML = await markdownToTiptapJSON(replaceData);
				editor.commands.deleteRange({ from: selectionFrom, to: selectionTo });

				editor.commands.insertContentAt(selectionFrom, formattedHTML);

				setReplaceData("");
				setSelectionFrom(null);
				setSelectionTo(null);
			}
		}
		insertIntoEditor();
	}, [replaceData, selectionFrom, selectionTo]);

	useEffect(() => {
		const setTemplateInEditor = async () => {
			if (template && editor && slashPopupPosition) {
				const { from } = editor.state.selection;

				editor.commands.deleteRange({ from: from - 1, to: from });

				const formattedHTML = await markdownToTiptapJSON(template);
				editor.commands.insertContentAt(from - 1, formattedHTML);

				setTemplate("");
			}
		};

		setTemplateInEditor();
	}, [template, slashPopupPosition]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (slashPopupRef.current && !slashPopupRef.current.contains(event.target as Node)) {
				setShowSlashPopup(false);
			}
		};

		if (showSlashPopup) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [showSlashPopup]);

	return (
		<div className="w-full h-full flex flex-col bg-[#0F0F10]">
			<div className="flex items-center p-2 space-x-1 text-[#ffffff] bg-[#141415] fixed top-0 w-full z-10">
				<button
					className={`p-2 hover:bg-gray-800 rounded-lg transition-colors ${editor?.isActive("bold") ? "is-active" : ""}`}
					onClick={() => editor?.chain().focus().toggleBold().run()}
				>
					<FaBold />
				</button>

				<button
					className={`p-2 hover:bg-gray-800 rounded-lg transition-colors ${editor?.isActive("italic") ? "is-active" : ""}`}
					onClick={() => editor?.chain().focus().toggleItalic().run()}
				>
					<FaItalic />
				</button>

				<button
					className={`p-2 hover:bg-gray-800 rounded-lg transition-colors ${editor?.isActive("strike") ? "is-active" : ""}`}
					onClick={() => editor?.chain().focus().toggleStrike().run()}
				>
					<FaStrikethrough />
				</button>

				<div className="relative">
					<button
						className="flex items-center p-2 hover:bg-gray-800 rounded-lg transition-colors"
						onClick={() => setShowHeadingDropdown(!showHeadingDropdown)}
					>
						<FaHeading />
						<FaAngleDown size={16} className="ml-1" />
					</button>

					{showHeadingDropdown && (
						<div className="absolute top-full left-0 mt-1 bg-black border border-gray-200 rounded-lg shadow-lg py-1 w-40 z-10">
							{headingOptions.map((option, index) => (
								<button
									key={option}
									className={`w-full px-4 py-2 text-left hover:bg-gray-800 transition-colors ${editor?.isActive('heading', { level: (index + 1) as Level }) ? 'is-active' : ''}`}
									onClick={() =>
										editor?.chain().focus().toggleHeading({ level: (index + 1) as Level }).run()
									}
								>
									{option}
								</button>
							))}
						</div>
					)}
				</div>

				<button
					onClick={() => editor?.chain().focus().toggleBulletList().run()}
					className={`p-2 hover:bg-gray-800 rounded-lg transition-colors ${editor?.isActive('bulletList') ? 'is-active' : ''}`}
				>
					<FaListUl />
				</button>

				<button
					onClick={() => editor?.chain().focus().toggleOrderedList().run()}
					className={`p-2 hover:bg-gray-800 rounded-lg transition-colors ${editor?.isActive('orderedList') ? 'is-active' : ''}`}
				>
					<FaListOl />
				</button>

				<div className="relative">
					<button
						className="flex items-center p-2 hover:bg-gray-800 rounded-lg transition-colors"
						onClick={() => setShowTableDropdown(!showTableDropdown)}
					>
						<FaTable />
						<FaAngleDown size={16} className="ml-1" />
					</button>

					{showTableDropdown && (
						<div className="absolute top-full left-0 mt-1 bg-black border border-gray-200 rounded-lg shadow-lg py-1 w-40 z-10">
							{tableOptions.map((option, index) => (
								<button
									key={index}
									className="w-full px-4 py-2 text-left hover:bg-gray-800 transition-colors"
									onClick={option.action}
								>
									{option.label}
								</button>
							))}
						</div>
					)}
				</div>
			</div>

			<EditorContent editor={editor} className='h-full w-full mt-10' />

			{showSlashPopup && (
				<div
					ref={slashPopupRef}
					className="absolute bg-neutral-900 border border-neutral-700 rounded-xl shadow-2xl z-10 backdrop-blur-sm bg-opacity-95 overflow-hidden"
					style={{ top: slashPopupPosition.top, left: slashPopupPosition.left }}
				>
					<div className="max-h-[300px] overflow-y-auto">
						{(textContext ? selectedTextOptions : slashOptions).map((option, index) => (
							<button
								key={index}
								className="w-full px-4 py-2.5 text-left hover:bg-neutral-800 transition-colors duration-150 flex items-center gap-3 text-neutral-200 text-sm font-medium focus:outline-none focus:bg-neutral-800"
								onClick={() => {
									option.action();
									setShowSlashPopup(false);
								}}
							>
								<span className="flex-shrink-0 w-5 h-5 flex items-center justify-center  bg-neutral-800 rounded-md text-neutral-400">
									/
								</span>
								{option.label}
							</button>
						))}
					</div>
				</div>
			)}

			{inputPopup && (
				<div className="min-h-screen min-w-screen bg-opacity-85 bg-[#0F0F10] flex justify-center items-center text-white fixed inset-0 z-20">
					<div className="bg-[#1A1A1E] rounded-lg p-8 w-full max-w-md">
						<h1 className="text-2xl font-bold mb-6 text-center">Enter your prompt</h1>

						<div className="space-y-4">
							<textarea
								value={prompt}
								onChange={(e) => setPrompt(e.target.value)}
								placeholder="Enter your prompt here..."
								className="w-full bg-[#2C2C2E] rounded-md p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
								rows={4}
							/>

							<div className="flex gap-4">
								<button
									type="submit"
									className="flex-1 bg-blue-600 hover:bg-blue-700 transition-colors py-3 rounded-md font-medium"
									onClick={() => {
										handlePrompt();
									}}
								>
									Submit
								</button>

								<button
									onClick={() => setInputPopup(false)}
									className="flex-1 bg-[#2C2C2E] hover:bg-[#3A3A3E] transition-colors py-3 rounded-md"
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}