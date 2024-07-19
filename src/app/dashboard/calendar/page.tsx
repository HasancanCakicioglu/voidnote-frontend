"use client";
import {
  Search,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { getUser } from "@/actions/user";
import { useEffect, useState } from "react";
import SmallHeader from "@/components/smallHeader";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import NoteListMain from "@/components/noteListMain";
import { UserCalendar, UserNotes } from "@/entities/user";
import { createCalendar, deleteCalendar } from "@/actions/calendar";
import ConfirmDeleteDialog from "@/components/confirmDelete";

const Page = () => {
  const [notes, setNotes] = useState<UserCalendar[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"date" | "alphabet">("date");
  const [open, setOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<{id:string,title:string} | null>(null);

  const router = useRouter();
  const { toast } = useToast();

  const notesPerPage = 12;

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await getUser({ type: "calendars" });
        console.log(response)
        if (response.success === false) {
          toast({
            variant: "destructive",
            title: "Something went wrong.",
            description: response.message,
          });
        }else{
          setNotes(response.data.calendars);
        }


      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Something went wrong.",
          description: error.message || "Error fetching notes",
        });
      }
    };

    fetchNotes();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAddButton = async () => {
    let response = await createCalendar();
    if (response.success) {
      router.push(`/dashboard/calendar/${response.data._id}`);
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
      const response = await deleteCalendar({ id: noteToDelete.id });

      if (response.success) {
        setNotes((notes) => notes.filter((note) => note._id !== noteToDelete.id));
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
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
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
            notes={notes}
            searchTerm={searchTerm}
            sortOrder={sortOrder}
            currentPage={currentPage}
            notesPerPage={notesPerPage}
            handleDelete={handleDeleteClick}
            handleAddButton={handleAddButton}
            setCurrentPage={setCurrentPage}
            setSortOrder={setSortOrder}
            type="calendar"
          />
          
        </main>
      </div>
      <ConfirmDeleteDialog
        open={open}
        setOpen={setOpen}
        handleConfirmDelete={handleConfirmDelete}
        noteToDelete={noteToDelete}
        type="calendar note"
      />
    </div>
  );
};

export default Page;
