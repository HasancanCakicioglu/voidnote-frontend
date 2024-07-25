"use client";
import React, { useState, useEffect, useRef } from "react";
import TiptapEditor, { TiptapRef } from "@/components/tiptap"; // Örneğin, TiptapEditor bileşeninin doğru yolu buraya ekleyin
import SmallHeader from "@/components/smallHeader";
import { getSubCalendar, updateSubCalendars } from "@/actions/calendar";
import VariableSidebar from "@/components/variableSidebar";
import { toast } from "@/components/ui/use-toast";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

const NoteDetailPage = ({
  params,
}: {
  params: { id: string; sub: string };
}) => {
  const searchParams = useSearchParams();
  const t = useTranslations("common");

  const [savedContent, setSavedContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [isEditorReady, setIsEditorReady] = useState<boolean>(false);
  const [changed, setChanged] = useState<boolean>(false);
  const tiptapRef = useRef<TiptapRef>(null);

  const [inputValue, setInputValue] = useState("");
  const [variables, setvariables] = useState<string[]>(
    searchParams.get("variables")?.split(",") || []
  );
  const [open, setOpen] = useState(false);
  const [indexToDelete, setIndexToDelete] = useState<number | null>(null);
  const [titleToDelete, setTitleToDelete] = useState<string | null>(null);

  const handleAddItem = () => {
    if (inputValue.trim() !== "" && !variables.includes(inputValue)) {
      setvariables([...variables, inputValue]);
      setInputValue("");
    } else if (variables.includes(inputValue)) {
      toast({
        variant: "destructive",
        title: "Duplicate",
        description: "You cannot add more than one of the same variable",
      });
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

  const handleVariableClick = (e: string) => {
    if (tiptapRef.current) {
      tiptapRef.current.handleAddVariable(e + "[]");
    }
  };

  const handleSave = (content: string) => {
    setChanged(true);
    setSavedContent(content);
  };

  useEffect(() => {
    const fetchNote = async () => {
      try {
        if (!params.id) return;

        const response = await getSubCalendar({
          id_first: params.id,
          id_second: params.sub,
        });

        if (!response || !response.success) {
          toast({
            variant: "destructive",
            title: "Get Sub Calendar",
            description: "Get Sub Calendar Error",
          });
          return;
        }else{
          setTitle(response.data.title);
          setSavedContent(response.data.content);
        }
        setIsEditorReady(true);
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Get Sub Calendar",
          description: error.message || "Get Sub Calendar Error",
        });
      }
    };

    fetchNote();
    setChanged(false);
  }, []);

  const buttonClick = async () => {
    const variablesMap = new Map<string, number[]>();
    const regex = /(\w+)\[(\d+)\]/g;
    let match;

    while ((match = regex.exec(savedContent)) !== null) {
      const variable = match[1];
      const value = parseInt(match[2], 10);

      if (variables.includes(variable)) { 
        if (!variablesMap.has(variable)) {
          variablesMap.set(variable, [value]);
        } else {
          variablesMap.get(variable)?.push(value);
        }
      }
    }

    variables.forEach((variable) => {
      if (!variablesMap.has(variable)) {
        variablesMap.set(variable, []);
      }
    });


    let response = await updateSubCalendars({
      id_first: params.id,
      id_second: params.sub,
      title: title,
      content: savedContent,
      variables: Object.fromEntries(variablesMap),
    });

    if (!response.success) {
      toast({
        variant: "destructive",
        title: "Update Sub Calander",
        description: "Update Sub Calander Error",
      });
    }
    setChanged(false);
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
            {isEditorReady && ( // Editör hazır olduğunda gösterilecek
              <TiptapEditor
                ref={tiptapRef}
                description={savedContent}
                onChange={handleSave}
              />
            )}
            {!isEditorReady && (
              <p>{t("loading")}</p> // Editör henüz hazır değilse yükleme durumu gösterilebilir
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
