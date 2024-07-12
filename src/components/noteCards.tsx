import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { deleteNote } from "@/actions/note";
import { CircleX } from "lucide-react";
import { UserCalendar, UserNotes, UserTodoList, UserTreeNotes } from "@/entities/user";

// Tarihi daha okunabilir bir formata dönüştürmek için bir yardımcı fonksiyon
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
  searchTerm: string; // Arama terimini prop olarak ekleyin
  sortOrder: "date" | "alphabet"; // Sıralama kriterini belirten yeni prop
  currentPage: number;
  notesPerPage: number;
  handleDelete: (id: string) => void;
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
  // Sıralama kriterine göre notları sıralayın
  const sortedNotes = notes.sort((a, b) => {
    if (sortOrder === "date") {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    } else {
      return a.title.localeCompare(b.title);
    }
  });

  const startIndex = (currentPage - 1) * notesPerPage;
  const endIndex = startIndex + notesPerPage;

  // Arama terimine göre notları filtrele
  const filteredNotes = sortedNotes
    .filter((note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(startIndex, endIndex);

  return (
    <div
      className={
        layout === "grid"
          ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-auto-rows-auto"
          : "grid gap-4 flex-col"
      }
    >
      {filteredNotes.length > 0 ? (
        filteredNotes.map((note) => (
          <Link key={note._id} href={`/dashboard/${type}/${note._id}`} passHref>
            <Card
              className={`-mb-2 cursor-pointer hover:shadow-lg transition-shadow duration-200 ${
                layout === "row"
                  ? "flex flex-row items-center justify-center text-center"
                  : ""
              } h-full`}
            >
              <CardHeader className="flex flex-col">
                <CardTitle className="flex relative">
                  {note.title
                    ? note.title.length > 10
                      ? note.title.substring(0, 10) + "..."
                      : note.title
                    : "Untitled Note"}
                  <button
                    className="absolute top-0 right-0 p-1 rounded-full  hover:bg-gray-300 focus:outline-none"
                    onClick={(event) => {
                      event.preventDefault(); // Prevent default link behavior
                      handleDelete(note._id); // Call your delete function
                    }}
                  >
                    <CircleX />
                  </button>
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  {formatDate(note.updatedAt)}
                </CardDescription>
                {layout === "grid" && <Separator />}
              </CardHeader>
              {type !== "todo-list" && (
                <CardContent className="justify-between w-full">
                  <p className="overflow-hidden">
                    {(note as UserNotes | UserTreeNotes).brief! + "..."}{" "}
                    {/* Non-null assertion operator */}
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
                <div className="text-xs text-muted-foreground">
                  Note ID: <strong>{note._id}</strong>
                </div>
                {type === "todo-list" && (
                  <div className="text-xs text-muted-foreground">
                    {" "}
                    {(note as UserTodoList).completedJobs +
                      "/" +
                      (note as UserTodoList).totalJobs}
                  </div>
                )}
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
