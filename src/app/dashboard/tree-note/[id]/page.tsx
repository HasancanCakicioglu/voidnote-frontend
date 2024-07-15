"use client"
import React, { useState, useEffect } from 'react';
import TiptapEditor from '@/components/tiptap';
import { createTreeNote, getTreeNote, updateTreeNote } from "@/actions/tree";
import SmallHeader from '@/components/smallHeader';
import  { useRouter } from 'next/navigation';
import { toast } from "@/components/ui/use-toast";
import { UserTreeNotes } from "@/entities/user";
import { getUser } from '@/actions/user';
import { ChevronRight, ChevronDown } from 'lucide-react';

const NoteDetailPage = ({ params }: { params: { id: string } }) => {
  const [savedContent, setSavedContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState<string>('');
  const [isEditorReady, setIsEditorReady] = useState<boolean>(false);
  const [notes, setTreeNotes] = useState<UserTreeNotes[]>([]);
  const [expandedNotes, setExpandedNotes] = useState<{ [key: string]: boolean }>({});
  const [id,setid] = useState<string>(params.id);

  const router = useRouter();

  const handleSave = (content: string) => {
    setSavedContent(content);
  };

  const getPlainTextPreview = (html: string, length: number) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const text = tempDiv.innerText;
    return text.slice(0, length);
  };

  useEffect(() => {
    setIsEditorReady(false)

    const fetchNote = async () => {
      try {
        if (!id) return;

        const response = await getTreeNote({
          id: id
        });

        if (!response) {
          setError('Error fetching note');
          return;
        }

        if ("data" in response) {
          setTitle(response.data.title);
          setSavedContent(response.data.content);
        }
        setIsEditorReady(true);
      } catch (error: any) {
        setError(error.message || 'Error fetching note');
      }
    };

    fetchNote();
    

  }, [id]);

  useEffect(() => {
    const fetchTreeNotes = async () => {
      try {
        const response = await getUser({ type: "trees" });
        if (response.success === false) {
          toast({
            variant: "destructive",
            title: "Something went wrong.",
            description: response.message,
          });
        }
        setTreeNotes(response.data.trees);
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Something went wrong.",
          description: error.message || "Error fetching notes",
        });
      }
    };


    fetchTreeNotes();
  }, []);



  const buttonClick = async () => {
    let data = await updateTreeNote({
      id: id,
      title: title,
      content: savedContent,
      brief: getPlainTextPreview(savedContent, 50)
    });

    if (!data) {
      setError('Error updating note');
      return;
    }
    console.log("Note updated successfully:", data);
  };

  const handleAddButton = async () => {
    let response = await createTreeNote({
      parent_id: params.id
    });
    if (response.success) {
      router.push(`/dashboard/tree-note/${response.data._id}`);
    } else {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: response.message,
      });
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedNotes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderTreeNotes = (notes: UserTreeNotes[], parentId: string | undefined) => {
    return notes
      .filter(note => note.parent_id === params.id)
      .map(note => (
        <div key={note._id} className="ml-4">
          <div className="flex items-center">
            {note.children_id.length > 0 && (
              <button onClick={() => toggleExpand(note._id)}>
                {expandedNotes[note._id] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
            )}
            <div
              className="ml-2 cursor-pointer"
              onClick={() => {
                setid(note._id)
                //router.push(`/dashboard/tree-note/${note._id}`)
              
              }}
            >
              <strong>{note.title}</strong> - {getPlainTextPreview(note.brief, 50)}
            </div>
          </div>
          {expandedNotes[note._id] && note.children_id.length > 0 && (
            <div className="ml-4">
              {note.children_id.map(childId => {
                const childNote = notes.find(n => n._id === childId);
                return childNote ? (
                  <div
                    key={childNote._id}
                    className="flex items-center ml-2 cursor-pointer"
                    onClick={()=>{
                      //router.push(`/dashboard/tree-note/${childNote._id}`)
                      setid(childNote._id)
                    }}
                  >
                    <div className="ml-2">
                      <strong>{childNote.title}</strong> - {getPlainTextPreview(childNote.brief, 50)}
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          )}
        </div>
      ));
  };

  return (
    <div className='sm:gap-4 sm:py-4 sm:pl-14'>
      <SmallHeader />
      <div className="flex flex-col min-h-screen max-w-[90vw] p-8 mx-auto w-full">
        <input
          type="text"
          value={title || 'Untitled Note'}
          onChange={(e) => setTitle(e.target.value)}
          className="text-2xl font-bold mb-4"
        />
        <div className="max-w-full rounded-md overflow-x-auto mb-4">
          {isEditorReady ? (
            <TiptapEditor description={savedContent} onChange={handleSave} />
          ) : (
            <p>Loading editor...</p>
          )}
        </div>
        <div className="flex">
          <button onClick={handleAddButton} className="bg-primary text-primary-foreground py-2 px-4 rounded-md mr-2">Create New</button>
          <button onClick={buttonClick} className="bg-primary text-primary-foreground py-2 px-4 rounded-md">Save</button>
        </div>
        <div className="mt-4 p-4 bg-gray-100 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Tree Notes</h2>
          {renderTreeNotes(notes, undefined)}
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
