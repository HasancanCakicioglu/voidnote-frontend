import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CircleX } from "lucide-react";
import { UserCalendar, UserNotes, UserTodoList, UserTreeNotes } from "@/entities/user";
import { Link } from "@/navigations";


const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(date).toLocaleDateString(undefined, options);
};

type NotesProps = {
  notes: UserNotes[] | UserTreeNotes[] | UserTodoList[] | UserCalendar[];
  layout: "grid" | "row";
  searchTerm: string;
  sortOrder: "date" | "alphabet";
  currentPage: number;
  notesPerPage: number;
  handleDelete: (id: string,title:string) => void;
  type: "note" | "tree-note" | "todo-list" | "calendar";
};

const NotesCards: React.FC<NotesProps> = ({
  notes,
  layout,
  searchTerm,
  sortOrder,
  currentPage,
  notesPerPage,
  handleDelete,
  type,
}) => {
  const sortedNotes = notes.sort((a, b) => {
    if (sortOrder === "date") {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    } else {
      return a.title.localeCompare(b.title);
    }
  });

  const startIndex = (currentPage - 1) * notesPerPage;
  const endIndex = startIndex + notesPerPage;

  const filteredNotes = sortedNotes
    .filter((note) => note.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(startIndex, endIndex);

  return (
    <div
      className={
        layout === "grid"
          ? "grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
          : "flex flex-col gap-4"
      }
    >
      {filteredNotes.length > 0 ? (
        filteredNotes.map((note) => (
          <Link key={note._id} href={`/dashboard/${type}/${note._id}`} passHref>
            <Card
              className={`-mb-2 cursor-pointer hover:shadow-lg transition-shadow duration-200 h-full ${layout ==="row"?"flex items-center justify-between":""}`}
            >
              <CardHeader className="flex flex-col">
                <CardTitle className="flex relative text-xs sm:text-base md:text-xl lg:text-2xl justify-between">
                  {note.title
                    ? note.title.length > 10
                      ? note.title.substring(0, 10) + "..."
                      : note.title
                    : "Untitled Note"}
                  {layout === "grid" && (
                    <button
                    className="top-0 right-0 p-1 rounded-full  hover:bg-gray-300 focus:outline-none "
                    onClick={(event) => {
                      event.preventDefault();
                      handleDelete(note._id,note.title);
                    }}
                  >
                    <CircleX />
                  </button>
                  )}
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  {formatDate(note.updatedAt)}
                </CardDescription>
                {layout === "grid" && <Separator />}
              </CardHeader>
              {type !== "todo-list" && (
                <CardContent className="justify-between">
                  <p className="overflow-hidden text-xs sm:text-base md:text-xl">
                    {(note as UserNotes | UserTreeNotes).brief! + "..."}
                  </p>
                </CardContent>
              )}
              <CardFooter
                className={
                  layout === "grid"
                    ? "mt-auto flex justify-between items-center"
                    : "flex justify-between items-center"
                }
              >
                <div className={`text-xs text-muted-foreground hidden md:flex`}>
                  Note ID: <strong>{note._id}</strong>
                </div>
                {type === "todo-list" && (
                  <div className="text-xs text-muted-foreground">
                    {(note as UserTodoList).completedJobs + "/" + (note as UserTodoList).totalJobs}
                  </div>
                )}
              {layout === "row" && (                <button
                    className="top-0 right-0 p-1 rounded-full  hover:bg-gray-300 focus:outline-none"
                    onClick={(event) => {
                      event.preventDefault(); // Prevent default link behavior
                      handleDelete(note._id,note.title); // Call your delete function
                    }}
                  >
                    <CircleX />
                  </button>)}
              </CardFooter>
            </Card>
          </Link>
        ))
      ) : (
        <p>No notes available</p>
      )}
    </div>
  );
};

export default NotesCards;
