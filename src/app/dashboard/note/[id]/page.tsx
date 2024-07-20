"use client";
import React, { useState, useEffect, useRef } from "react";
import TiptapEditor, { TiptapRef } from "@/components/tiptap"; // Örneğin, TiptapEditor bileşeninin doğru yolu buraya ekleyin
import { getNote, updateNote } from "@/actions/note"; // getNote fonksiyonunun doğru yolu buraya ekleyin
import SmallHeader from "@/components/smallHeader";
import { toast } from "@/components/ui/use-toast";
import { getNoteSuccessResponse } from "@/entities/note";

const NoteDetailPage = ({ params }: { params: { id: string } }) => {
  const [savedContent, setSavedContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [isEditorReady, setIsEditorReady] = useState<boolean>(false);
  const [changed, setChanged] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState("");
  const tiptapRef = useRef<TiptapRef>(null);
  
  const addTextFromParent = () => {
    console.log("addTextFromParent")
    if (tiptapRef.current) {
      tiptapRef.current.handleAddText();
    }
  };

  const handleSave = (content: string) => {
    setChanged(true);
    setSavedContent(content);
  };

  const getPlainTextPreview = (html: string, length: number) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const text = tempDiv.innerText; // Sadece metni al
    return text.slice(0, length);
  };

  useEffect(() => {
    const fetchNote = async () => {
      try {
        if (!params.id) return;

        let response = await getNote({
          id: params.id,
        });

        if (!response || !response.success) {
          toast({
            variant: "destructive",
            title: "Something went wrong.",
            description: "Error fetching note",
          });
          return;
        } else {
          response = response as getNoteSuccessResponse;
          setTitle(response.data.title);
          setSavedContent(response.data.content);
        }
        setIsEditorReady(true);
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Something went wrong.",
          description: error.message || "Error fetching note",
        });
      }
    };

    fetchNote(); // fetchNote fonksiyonunu useEffect içinde çağırın
  }, []); // useEffect'in id parametresine bağımlı olmasını sağlıyoruz

  const buttonClick = async () => {
    let response = await updateNote({
      id: params.id,
      title: title,
      content: savedContent,
      brief: getPlainTextPreview(savedContent, 50),
    });

    if (!response.success) {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: response.message,
      });
    }else{
      setChanged(false)
    }
  };

  return (
    <div className="sm:gap-4 sm:py-4  md:px-14 max-w-full min-w-full">
      <SmallHeader />
       <div className="flex mb-2 space-x-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border rounded-md p-2 w-full"
          placeholder="Enter text to add"
        />
         <button onClick={addTextFromParent} className="bg-blue-500 text-white rounded-md px-4 py-2 mb-4"></button>
      </div> 
      <div className="flex flex-col p-4 sm:p-8">
        <input
          type="text"
          value={title || "Untitled Note"}
          onChange={(e) => {
            setChanged(true);
            setTitle(e.target.value);
          }}
          className="text-2xl font-bold mb-4"
        />
        <div className=" min-w-full rounded-md overflow-hidden max-w-[60vw] flex flex-grow">
          {isEditorReady && (
            <TiptapEditor ref={tiptapRef} description={savedContent} onChange={handleSave} inputValue={inputValue} />
          )}
          {!isEditorReady && <p>Loading editor...</p>}
        </div>
        <button
          disabled={!changed}
          onClick={buttonClick}
          className={`mt-4 py-2 px-4 rounded-md 
    ${
      changed
        ? "bg-primary text-primary-foreground"
        : "bg-gray-400 text-gray-700 cursor-not-allowed"
    }`}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default NoteDetailPage;
