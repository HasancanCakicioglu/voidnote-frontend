"use client";
import React, { useState, useEffect, useRef } from "react";
import TiptapEditor, { TiptapRef } from "@/components/tiptap";
import { getNote, updateNote } from "@/actions/note"; 
import SmallHeader from "@/components/smallHeader";
import { toast } from "@/components/ui/use-toast";
import { getNoteSuccessResponse } from "@/entities/note";
import VariableSidebar from "@/components/variableSidebar";
import { parseVariables } from "@/utility/parseVariables";
import { useTranslations } from "next-intl";

const NoteDetailPage = ({ params }: { params: { id: string } }) => {
  const [savedContent, setSavedContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [isEditorReady, setIsEditorReady] = useState<boolean>(false);
  const [changed, setChanged] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState("");
  const tiptapRef = useRef<TiptapRef>(null);

  const [variables, setvariables] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [indexToDelete, setIndexToDelete] = useState<number | null>(null);
  const [titleToDelete, setTitleToDelete] = useState<string | null>(null);

  const t = useTranslations("common");

  const handleVariableClick = (e: string) => {
    if (tiptapRef.current) {
      tiptapRef.current.handleAddVariable(e + "[]");
    }
  };

  const handleAddItem = () => {
    const trimmedInputValue = inputValue.trim();
  
    if (trimmedInputValue === "" || /\s/.test(trimmedInputValue)) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Variables cannot contain spaces or be empty",
      });
    } else if (variables.includes(trimmedInputValue)) {
      toast({
        variant: "destructive",
        title: "Duplicate",
        description: "You cannot add more than one of the same variable",
      });
    } else {
      setvariables([...variables, trimmedInputValue]);
      setInputValue("");
    }
  };

  const handleDeleteItem = () => {
    if (indexToDelete !== null) {
      const newvariables = [...variables];
      newvariables.splice(indexToDelete, 1)[0];
      setvariables(newvariables);
      setOpen(false);
      setChanged(true);
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
          setvariables(Object.keys(response.data.variables));
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

    fetchNote(); 
  }, [params.id]); 

  const buttonClick = async () => {
    let response = await updateNote({
      id: params.id,
      title: title,
      content: savedContent,
      variables: parseVariables(variables, savedContent),
      brief: getPlainTextPreview(savedContent, 50),
    });

    if (!response.success) {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: response.message,
      });
    } else {
      setChanged(false);
    }
  };

  return (
    <div className="flex flex-grow">
      <div className="sm:gap-4 sm:py-4 md:px-10 max-w-full w-full">
        <SmallHeader />

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
          <div className="min-w-full rounded-md overflow-hidden max-w-[60vw] flex flex-grow">
            {isEditorReady && ( 
              <TiptapEditor
                ref={tiptapRef}
                description={savedContent}
                onChange={handleSave}
              />
            )}
            {!isEditorReady && (
              <p>{t("loading")}</p> 
            )}
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
            {t("save")}
          </button>
        </div>
      </div>
      <VariableSidebar
        inputValue={inputValue}
        setInputValue={setInputValue}
        variables={variables}
        setVariables={setvariables}
        indexToDelete={indexToDelete}
        setIndexToDelete={setIndexToDelete}
        titleToDelete={titleToDelete}
        setTitleToDelete={setTitleToDelete}
        handleAddItem={handleAddItem}
        handleDeleteItem={handleDeleteItem}
        handleVariableClick={handleVariableClick}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};

export default NoteDetailPage;
