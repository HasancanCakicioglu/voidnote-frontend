"use client"
import React, { useCallback,useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, List, ListOrdered } from 'lucide-react';
import { Underline } from '@tiptap/extension-underline';
import { Toggle } from '@components/ui/toggle'; // ShadCN Toggle bileşenini kullanıyoruz

const Tiptap = ({ description, onChange }: {description: string; onChange: (description: string) => void}) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: description,
    editorProps: {
      attributes: {
        class: 'rounded-md border border-input bg-back p-4',
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

  const handleBulletList = useCallback(() => {
    if (editor) {
      editor.chain().focus().toggleBulletList().run();
    }
  }, [editor]);

  const handleOrderedList = useCallback(() => {
    if (editor) {
      editor.chain().focus().toggleOrderedList().run();
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
          <span>Bold</span>
        </Toggle>

        <Toggle
          defaultPressed={false}
          onPressedChange={handleItalic}
          className="px-2 py-1 rounded flex items-center space-x-2"
          aria-label="Italic"
        >
          <Italic className="h-4 w-4" />
          <span>Italic</span>
        </Toggle>

        <Toggle
          defaultPressed={false}
          onPressedChange={handleUnderline}
          className="px-2 py-1 rounded flex items-center space-x-2"
          aria-label="Underline"
        >
          <span>Underline</span>
        </Toggle>

        <Toggle
          defaultPressed={false}
          onPressedChange={handleBulletList}
          className="px-2 py-1 rounded flex items-center space-x-2"
          aria-label="Bullet List"
        >
          <List className="h-4 w-4" />
          <span>Bullet List</span>
        </Toggle>

        <Toggle
          defaultPressed={false}
          onPressedChange={handleOrderedList}
          className="px-2 py-1 rounded flex items-center space-x-2"
          aria-label="Ordered List"
        >
          <ListOrdered className="h-4 w-4" />
          <span>Ordered List</span>
        </Toggle>
      </div>

      {/* Tiptap Editor */}
      <div className=" bg-white border border-gray-300 rounded-md shadow-sm">
        <div className="overflow-y-auto overflow-x-auto p-4">
          <EditorContent editor={editor}/>
        </div>
      </div>
    </div>
  );
};

export default Tiptap;
