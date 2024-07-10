"use client";
import {
  Search,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { getUser } from "@/actions/user";
import {  deleteNote } from "@/actions/note";
import { useEffect, useState } from "react";
import SmallHeader from "@/components/smallHeader";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import NoteListMain from "@/components/noteListMain";
import { UserTodoList } from "@/entities/user";
import { createTodoList, deleteTodoList } from "@/actions/todo";

const Page = () => {
  const [notes, setTodoNotes] = useState<UserTodoList[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"date" | "alphabet">("date");

  const router = useRouter();
  const { toast } = useToast();

  const notesPerPage = 12;

  useEffect(() => {
    const fetchTodoNotes = async () => {
      try {
        const response = await getUser({ type: "todos" });
        console.log(response);

        if (response.success === false) {
          toast({
            variant: "destructive",
            title: "Something went wrong.",
            description: response.message,
          });
        }

        setTodoNotes(response.data.todos);
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Something went wrong.",
          description: error.message || "Error fetching notes",
        });
      }
    };

    fetchTodoNotes();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAddButton = async () => {
    let response = await createTodoList();
    if (response.success) {
      router.push(`/dashboard/todo-list/${response.data._id}`);
    } else {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: response.message,
      });
    }
  };

  const handleDelete = async (id: string) => {
    const response = await deleteTodoList({ id });
    console.log(response);
    if (response.success) {
      setTodoNotes((notes) => notes.filter((note) => note._id !== id));
    } else {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: response.message,
      });
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
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
            type="todo-list"
          />
          
        </main>
      </div>
    </div>
  );
};

export default Page;
