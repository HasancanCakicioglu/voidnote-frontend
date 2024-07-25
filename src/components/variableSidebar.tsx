import React from "react";
import { Trash } from "lucide-react";
import ConfirmDeleteDialog from "./confirmDelete";
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "@components/ui/sheet";
import { useTranslations } from "next-intl";

interface VariableSidebarProps {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  variables: string[];
  setVariables: React.Dispatch<React.SetStateAction<string[]>>;
  indexToDelete: number | null;
  setIndexToDelete: React.Dispatch<React.SetStateAction<number | null>>;
  titleToDelete: string | null;
  setTitleToDelete: React.Dispatch<React.SetStateAction<string | null>>;
  handleAddItem: () => void;
  handleDeleteItem: () => void;
  handleVariableClick: (e: string) => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const VariableSidebar: React.FC<VariableSidebarProps> = ({
  inputValue,
  setInputValue,
  variables,
  setVariables,
  indexToDelete,
  setIndexToDelete,
  titleToDelete,
  setTitleToDelete,
  handleAddItem,
  handleDeleteItem,
  handleVariableClick,
  open,
  setOpen,
}) => {

  const [openVariableSidebar, setOpenVariableSidebar] = React.useState(false);
  const t = useTranslations("common");

  return (
    <>
      {/* Sheet for small screens */}
      <div className="lg:hidden">
        <Sheet open={openVariableSidebar} onOpenChange={setOpenVariableSidebar}>
          <SheetTrigger>
            <button className="fixed bottom-4 right-4 bg-purple-400 text-white p-3 rounded-full shadow-lg">
              {t("openvariables")}
            </button>
          </SheetTrigger>
          <SheetContent>
            <div className="p-4">
              <h2 className="text-2xl font-bold text-center">{t("variables")}</h2>
              <hr className="my-3" />
              <div className="flex mb-4">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-l-md px-2 py-1 w-1/12"
                  placeholder={t("addVariable")}
                />
                <button
                  onClick={handleAddItem}
                  className="flex-none bg-blue-500 text-white px-2 py-1 rounded-r-md"
                >
                  {t("add")}
                </button>
              </div>

              <ul>
                {variables.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => handleVariableClick(item)}
                    className="flex justify-between variables-center p-2 rounded-md mb-2 border"
                  >
                    <div className="flex flex-grow">
                      <span className="flex-grow">{item}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIndexToDelete(index);
                        setTitleToDelete(item);
                        setOpen(true);
                      }}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <SheetClose />
          </SheetContent>
        </Sheet>
      </div>

      {/* Sidebar for larger screens */}
      <div className="hidden lg:flex justify-end">
        <div
          className={
            "fixed top-0 border-l right-0 h-full shadow-lg transform transition-transform duration-300 ease-in-out translate-x-0 md:translate-x-0 md:static md:w-52"
          }
        >
          <div className="flex flex-col p-4 overflow-hidden">
            <h2 className="text-2xl font-bold text-center">{t("variables")}</h2>
            <hr className="my-3" />
            <div className="flex mb-4">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 border border-gray-300 rounded-l-md px-2 py-1 w-1/12"
                placeholder={t("addVariable")}
              />
              <button
                onClick={handleAddItem}
                className="flex-none bg-blue-500 text-white px-2 py-1 rounded-r-md"
              >
                {t("add")}
              </button>
            </div>

            <ul>
              {variables.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleVariableClick(item)}
                  className="flex justify-between variables-center p-2 rounded-md mb-2 border"
                >
                  <div className="flex flex-grow">
                    <span className="flex-grow">{item}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIndexToDelete(index);
                      setTitleToDelete(item);
                      setOpen(true);
                    }}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <ConfirmDeleteDialog
        open={open}
        setOpen={setOpen}
        handleConfirmDelete={handleDeleteItem}
        noteToDelete={titleToDelete}
        type="variable"
      />
    </>
  );
};

export default VariableSidebar;
