"use client"
import React, { useState, useEffect } from 'react';
import TiptapEditor from '@/components/tiptap';
import { createTreeNote, deleteTreeNote, getTreeNote, updateTreeNote } from "@/actions/tree";
import SmallHeader from '@/components/smallHeader';
import { toast } from "@/components/ui/use-toast";
import { UserTreeNotes } from "@/entities/user";
import { getUser } from '@/actions/user';
import TreeView from '@/components/renderTree';

const NoteDetailPage = ({ params }: { params: { id: string } }) => {
  const [savedContent, setSavedContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState<string>('');
  const [isEditorReady, setIsEditorReady] = useState<boolean>(false);
  const [notes, setTreeNotes] = useState<UserTreeNotes[]>([]);
  const [id,setid] = useState<string>(params.id);


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

  const handleAddButton = async (id:string) => {
    let response = await createTreeNote({
      parent_id: id
    });
    if (response.success) {
      console.log(notes);
      setTreeNotes((notes) => [...notes, response.data]);
      console.log(notes)
      setid(response.data._id);
      
    } else {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: response.message,
      });
    }
  };


  const onNodeClick = async (id:string)=>{
    setid(id);
  }

  const onNodeDelete = async (id:string)=>{
    let response = await deleteTreeNote({
      id: id
    });
    if (response.success) {
      setTreeNotes((notes) => notes.filter((note) => note._id !== id));
    } else {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: response.message,
      });
  }
 }

  return (
    <div className='sm:gap-4 sm:py-4  md:px-14 max-w-full min-w-full'>
      <SmallHeader />
              <div className="mt-4 p-4  overflow-x-auto">
          <h2 className="text-xl font-bold mb-4">Tree Notes</h2>
          <div className='max-h-[20vh]'><TreeView rootNodeId={params.id} nodes={notes} onAddClick={handleAddButton} onNodeClick={onNodeClick} onNodeDelete={onNodeDelete}/></div>
        </div>
      <div className="flex flex-col p-4 sm:p-8">
        <input
          type="text"
          value={title || 'Untitled Note'}
          onChange={(e) => setTitle(e.target.value)}
          className="text-2xl font-bold mb-4"
        />
        <div className="min-w-full rounded-md overflow-hidden max-w-[60vw] flex flex-grow">
          {isEditorReady ? (
            <TiptapEditor description={savedContent} onChange={handleSave} />
          ) : (
            <p>Loading editor...</p>
          )}
        </div>
        <div className="flex">
    
          <button onClick={buttonClick} className="bg-primary text-primary-foreground py-2 px-4 rounded-md">Save</button>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
