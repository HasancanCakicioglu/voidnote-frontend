"use client";
import {
  Search,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { getUser } from "@/actions/user";
import { useEffect, useState } from "react";
import SmallHeader from "@/components/smallHeader";
import NoteListMain from "@/components/noteListMain";
import { UserTreeNotes } from "@/entities/user";
import { createTreeNote, deleteTreeNote } from "@/actions/tree";
import ConfirmDeleteDialog from "@/components/confirmDelete";
import { useRouter } from "@/navigations";
import { toast } from "@/components/ui/use-toast";

const Page = () => {
  const [notes, setTreeNotes] = useState<UserTreeNotes[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"date" | "alphabet">("date");
  const [open, setOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<{id:string,title:string} | null>(null);

  const router = useRouter();


  const notesPerPage = 12;

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAddButton = async () => {
    let response = await createTreeNote({});
    if (response.success) {
      router.push(`/tree-note/${response.data._id}`);
    } else {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: response.message,
      });
    }
  };

  const handleDeleteClick = (id: string,title:string) => {
    setNoteToDelete({id:id,title:title});
    setOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (noteToDelete) {
      const response = await deleteTreeNote({ id: noteToDelete.id });

      if (response.success) {
        setTreeNotes((notes) => notes.filter((note) => note._id !== noteToDelete.id));
      } else {
        toast({
          variant: "destructive",
          title: "Something went wrong.",
          description: response.message,
        });
      }
    }
    setOpen(false);
  };


  return (
    <div className="flex flex-col bg-muted/40 max-w-full min-w-full">
      <div className="flex flex-col sm:gap-4 sm:py-4 lg:px-10 ">
        <SmallHeader>
          <div className="relative w-full md:w-[200px] lg:w-[336px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full rounded-lg bg-background pl-8"
            />
          </div>
        </SmallHeader>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <NoteListMain
            notes={notes.filter((note) => !note.parent_id)}
            searchTerm={searchTerm}
            sortOrder={sortOrder}
            currentPage={currentPage}
            notesPerPage={notesPerPage}
            handleDelete={handleDeleteClick}
            handleAddButton={handleAddButton}
            setCurrentPage={setCurrentPage}
            setSortOrder={setSortOrder}
            type="tree-note"
          />
          
        </main>
      </div>
      <ConfirmDeleteDialog
        open={open}
        setOpen={setOpen}
        handleConfirmDelete={handleConfirmDelete}
        noteToDelete={noteToDelete?.title}
        type="tree note"
      />
    </div>
  );
};

export default Page;
