'use client'

import { useEditor, EditorContent } from '@tiptap/react'

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import StarterKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'

import {common, createLowlight} from 'lowlight'
import { FaAngleDown, FaBold, FaHeading, FaItalic, FaListOl, FaListUl, FaStrikethrough, FaTable } from 'react-icons/fa'
import { useEffect, useState } from 'react'

const lowlight = createLowlight(common)

interface TipTapProps {
	initialText: string;
	setFileText: React.Dispatch<React.SetStateAction<string>>;
}

export const TipTap: React.FC<TipTapProps> = ({ initialText, setFileText }) => {
	const [showTableDropdown, setShowTableDropdown] = useState(false);
	const [showHeadingDropdown, setShowHeadingDropdown] = useState(false);

	const headingOptions = [
		'H1',
		'H2',
		'H3',
	];

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

	const editor = useEditor({
		extensions: [
		StarterKit,
		Document,
		Paragraph,
		Text,
		Heading.configure({
			levels: [1, 2, 3],
		}),
		CodeBlockLowlight.configure({
			lowlight,
		}),
		Table.configure({
			resizable: true,
		}),
		TableRow,
		TableHeader,
		TableCell,
		],
		content: '',
		editorProps: {
			attributes: {
				class: `bg-[#0F0F10] text-[#ffffff] prose prose-sm m-5 focus:outline-none max-w-full h-full [&_ol]:list-decimal [&_ol]:text-white [&_ul]:list-disc [&_ul]:text-white [&_table]:border [&_table]:border-collapse [&_table]:w-full [&_th]:border [&_th]:border-gray-600 [&_th]:bg-[#333333] [&_th]:text-white [&_th]:px-4 [&_th]:py-2 [&_td]:border [&_td]:border-gray-600 [&_td]:bg-[#1a1a1a] [&_td]:text-white [&_td]:px-4 [&_td]:py-2 [&_tr:nth-child(even)]:bg-[#222222] [&_strong]:text-white [&_em]:text-white [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white [&_h4]:text-white [&_h5]:text-white [&_h6]:text-white [&_s]:text-white`,
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

	return (
		<div className="w-full h-full flex flex-col bg-[#0F0F10]">
			<div className="flex items-center p-2 space-x-1 text-[#ffffff]">
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
								className={`w-full px-4 py-2 text-left hover:bg-gray-800 transition-colors ${editor?.isActive('heading', { level: index + 1 }) ? 'is-active' : ''}`}
								onClick={() =>
									editor?.chain().focus().toggleHeading({ level: index + 1 }).run()
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

			<EditorContent editor={editor} className='h-full w-full'/>
		</div>
	)
}