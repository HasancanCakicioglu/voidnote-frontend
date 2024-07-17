"use client";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { getUser } from "@/actions/user";
import { createNote, deleteNote } from "@/actions/note";
import { useEffect, useState } from "react";
import SmallHeader from "@/components/smallHeader";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import NoteListMain from "@/components/noteListMain";
import { UserNotes } from "@/entities/user";

const Page = () => {
  const [notes, setNotes] = useState<UserNotes[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"date" | "alphabet">("date");

  const router = useRouter();

  const notesPerPage = 12;

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await getUser({ type: "notes" });

        if (response.success === false) {
          toast({
            variant: "destructive",
            title: "Something went wrong.",
            description: response.message,
          });
        } else {
          setNotes(response.data.notes);
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
    let response = await createNote();
    if (response.success) {
      router.push(`/dashboard/note/${response.data._id}`);
    } else {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: response.message,
      });
    }
  };

  const handleDelete = async (id: string) => {
    const response = await deleteNote({ id });

    if (response.success) {
      setNotes((notes) => notes.filter((note) => note._id !== id));
    } else {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: response.message,
      });
    }
  };

  return (
    <div className="flex w-full flex-col bg-muted/40">
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
            handleDelete={handleDelete}
            handleAddButton={handleAddButton}
            setCurrentPage={setCurrentPage}
            setSortOrder={setSortOrder}
            type="note"
          />
        </main>
      </div>
    </div>
  );
};

export default Page;
