import React from "react";
import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const Editor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Type something here...</p>",
  });

  if (!editor) return null;

  return (
    <div className="relative p-4 rounded-md">
      {/* Bubble Menu (appears when selecting text) */}
      <BubbleMenu
        editor={editor}
        className="flex gap-2 p-2 bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded"
      >
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="px-2 py-1 text-white hover:bg-gray-700 rounded"
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="px-2 py-1 text-white hover:bg-gray-700 rounded"
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className="px-2 py-1 text-white hover:bg-gray-700 rounded"
        >
          Strike
        </button>
      </BubbleMenu>

      {/* Floating Menu (appears when clicking inside the editor) */}
      <FloatingMenu
        editor={editor}
        className="flex gap-2 p-2 bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded"
      >
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className="px-2 py-1 text-white hover:bg-gray-700 rounded"
        >
          Paragraph
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className="px-2 py-1 text-white hover:bg-gray-700 rounded"
        >
          H1
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className="px-2 py-1 text-white hover:bg-gray-700 rounded"
        >
          H2
        </button>
      </FloatingMenu>

      {/* Editor Content */}
      <EditorContent
        editor={editor}
        className="p-2 min-h-[200px] bg-transparent text-white focus:outline-none"
      />
    </div>
  );
};

export default Editor;
