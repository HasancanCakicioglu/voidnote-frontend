"use client";
import React, { useState, useEffect, useRef } from "react";
import TiptapEditor, { TiptapRef } from "@/components/tiptap";
import {
  createTreeNote,
  deleteTreeNote,
  getTreeNote,
  updateTreeNote,
} from "@/actions/tree";
import SmallHeader from "@/components/smallHeader";
import { toast } from "@/components/ui/use-toast";
import { UserTreeNotes } from "@/entities/user";
import { getUser } from "@/actions/user";
import TreeView from "@/components/renderTree";
import VariableSidebar from "@/components/variableSidebar";
import { parseVariables } from "@/utility/parseVariables";
import { useTranslations } from "next-intl";

const NoteDetailPage = ({ params }: { params: { id: string } }) => {
  const [savedContent, setSavedContent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [isEditorReady, setIsEditorReady] = useState<boolean>(false);
  const [notes, setTreeNotes] = useState<UserTreeNotes[]>([]);
  const [id, setid] = useState<string>(params.id);
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
    const text = tempDiv.innerText;
    return text.slice(0, length);
  };

  useEffect(() => {
    setIsEditorReady(false);

    const fetchNote = async () => {
      try {
        if (!id) return;

        const response = await getTreeNote({
          id: id,
        });

        if (!response) {
          setError("Error fetching note");
          return;
        }

        if ("data" in response) {
          setvariables(Object.keys(response.data.variables));
          setTitle(response.data.title);
          setSavedContent(response.data.content);
        }
        setIsEditorReady(true);
      } catch (error: any) {
        setError(error.message || "Error fetching note");
      }
    };

    fetchNote();
    setChanged(false)
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
      variables: parseVariables(variables, savedContent),
      brief: getPlainTextPreview(savedContent, 50),
    });

    if (!data) {
      setError("Error updating note");
      return;
    }
    setChanged(false)
  };

  const handleAddButton = async (id: string) => {
    let response = await createTreeNote({
      parent_id: id,
    });
    if (response.success) {
      setTreeNotes((notes) => [...notes, {
        _id: response.data._id,
        title: "",
        brief: "",
        children_id: [],
        parent_id: id,
        updatedAt: new Date(),
      }]);
      setid(response.data._id);
    } else {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: response.message,
      });
    }
  };

  const onNodeClick = async (id: string) => {
    setid(id);
  };

  const onNodeDelete = async (id: string) => {
    let response = await deleteTreeNote({
      id: id,
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
  };

  return (
    <div className="flex flex-grow">
    <div className="sm:gap-4 sm:py-4 md:px-10 max-w-full w-full">
      <SmallHeader />
      <div className="mt-4 p-4  overflow-x-auto">
        <h2 className="text-xl font-bold mb-4">{t("treenotes")}</h2>
        <div className="max-h-[20vh]">
          <TreeView
            rootNodeId={params.id}
            nodes={notes}
            onAddClick={handleAddButton}
            onNodeClick={onNodeClick}
            onNodeDelete={onNodeDelete}
          />
        </div>
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
        <div className="min-w-full rounded-md overflow-hidden max-w-[60vw] flex flex-grow">
          {isEditorReady ? (
            <TiptapEditor ref={tiptapRef} description={savedContent} onChange={handleSave} />
          ) : (
            <p>{t("loading")}</p>
          )}
        </div>
        <div className="">
          <button
            disabled={!changed}
            onClick={buttonClick}
            className={`mt-4 py-2 px-4 rounded-md w-full
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
