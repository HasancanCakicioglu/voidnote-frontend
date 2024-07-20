import React, { useState } from "react";
import { Trash } from "lucide-react"; // Trash ikonunu kullanmak için
import ConfirmDeleteDialog from "./confirmDelete";
import { toast } from "@/components/ui/use-toast";

const VariableSidebar: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [indexToDelete, setIndexToDelete] = useState<number | null>(null);
  const [titleToDelete, setTitleToDelete] = useState<string| null>(null);

  const handleAddItem = () => {
    if (inputValue.trim() !== "" && !items.includes(inputValue)) {
      setItems([...items, inputValue]);
      setInputValue("");
    } else if (items.includes(inputValue)) {
      toast({
        variant: "destructive",
        title: "Duplicate",
        description: "You cannot add more than one of the same variable",
      });
    }
  };

  const handleDeleteItem = () => {

    if(indexToDelete){
      const newItems = [...items];
      const deletedItem = newItems.splice(indexToDelete, 1)[0];
      setItems(newItems);
      setOpen(false)
    }

  };

  const handleVariableClick = (e:string) =>{
    console.log("aaaa",e.toString())
  }

  return (
    <div className="hidden lg:flex justify-end ">
      {/* Sidebar */}
      <div
        className={
          "fixed top-0 border-l right-0 h-full shadow-lg transform transition-transform duration-300 ease-in-out translate-x-0 md:translate-x-0 md:static md:w-52"
        }
      >
        <div className="flex justify-end p-4 md:hidden"></div>
        <div className="flex flex-col p-4 overflow-hidden">
          <h2 className="text-2xl font-bold text-center">Variables</h2>
          <hr className="my-3" />
          <div className="flex mb-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 border border-gray-300 rounded-l-md px-2 py-1 w-1/12"
              placeholder="Add variable"
            />
            <button
              onClick={handleAddItem}
              className="flex-none bg-blue-500 text-white px-2 py-1 rounded-r-md"
            >
              Add
            </button>
          </div>
          
          <ul>
          {items.map((item, index) => (
            <li key={index} onClick={() => { handleVariableClick(item) }} className="flex justify-between items-center p-2 rounded-md mb-2 border">
            <div className="flex flex-grow">
              <span className="flex-grow">{item}</span>
            </div>
            <button
              onClick={() => {
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
      <ConfirmDeleteDialog
        open={open}
        setOpen={setOpen}
        handleConfirmDelete={handleDeleteItem}
        noteToDelete={titleToDelete}
        type="variable"
      />
    </div>
  );
};

export default VariableSidebar;
