"use client"
import React, { useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, List, ListOrdered, UnderlineIcon,StrikethroughIcon,HighlighterIcon} from 'lucide-react';
import { Underline } from '@tiptap/extension-underline';
import { Toggle } from '@components/ui/toggle'; // ShadCN Toggle bileşenini kullanıyoruz
import { Highlight } from '@tiptap/extension-highlight'; // Highlight eklentisini kullanıyoruz

const Tiptap = ({ description, onChange }: {description: string; onChange: (description: string) => void}) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline, Highlight],
    content: description,
    editorProps: {
      attributes: {
        class: 'rounded-md border border-input bg-back p-3',
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  // Toolbar button callbacks
  const handleBold = useCallback(() => {
    if (editor) {
      editor.chain().focus().toggleBold().run();
    }
  }, [editor]);

  const handleItalic = useCallback(() => {
    if (editor) {
      editor.chain().focus().toggleItalic().run();
    }
  }, [editor]);

  const handleUnderline = useCallback(() => {
    if (editor) {
      editor.chain().focus().toggleUnderline().run();
    }
  }, [editor]);
  const handleStrike = useCallback(() => {
    if (editor) {
      editor.chain().focus().toggleStrike().run();
    }
  }, [editor]);
  const handleHighlight = useCallback(() => {
    if (editor) {
      editor.chain().focus().toggleHighlight().run();
    }
  }, [editor]);
  
  

  return (
    <div className="flex flex-col w-full">
      {/* Toolbar with ShadCN Toggle components */}
      <div className="flex mb-2 space-x-2">
        <Toggle
          defaultPressed={false}
          onPressedChange={handleBold}
          className="px-2 py-1 rounded flex items-center space-x-2"
          aria-label="Bold"
        >
          <Bold className="h-4 w-4" />
          <span className="hidden sm:inline">Bold</span>
        </Toggle>

        <Toggle
          defaultPressed={false}
          onPressedChange={handleItalic}
          className="px-2 py-1 rounded flex items-center space-x-2"
          aria-label="Italic"
        >
          <Italic className="h-4 w-4" />
          <span className="hidden sm:inline">Italic</span>
        </Toggle>

        <Toggle
          defaultPressed={false}
          onPressedChange={handleUnderline}
          className="px-2 py-1 rounded flex items-center space-x-2"
          aria-label="Underline"
        >
          <UnderlineIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Underline</span>
        </Toggle>
        <Toggle
          defaultPressed={false}
          onPressedChange={handleStrike}
          className="px-2 py-1 rounded flex items-center space-x-2"
          aria-label="Strike"

        >
          <StrikethroughIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Strike</span>
        </Toggle>
        <Toggle
          defaultPressed={false}
          onPressedChange={handleHighlight}
          className="px-2 py-1 rounded flex items-center space-x-2"
          aria-label="Highlight"
        >
          <HighlighterIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Highlight</span>
        </Toggle>

          
      </div>

      {/* Tiptap Editor */}
      <div className=" border border-gray-300 rounded-md shadow-sm">
        <div className="p-2">
          <EditorContent editor={editor}/>
        </div>
      </div>
    </div>
  );
};

export default Tiptap;
