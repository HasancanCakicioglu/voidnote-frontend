import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { LayoutGrid, Rows3, ListFilter, File, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import NotesCards from "@/components/noteCards"; // Varsayalım ki bu bileşen halihazırda tanımlı
import { UserNotes, UserTodoList, UserTreeNotes } from "@/entities/user";

type NoteListMainProps = {
  notes: UserNotes[] | UserTreeNotes[] | UserTodoList[];
  searchTerm: string;
  sortOrder: "date" | "alphabet";
  currentPage: number;
  notesPerPage: number;
  handleAddButton: () => void;
  handleDelete: (id: string) => void;
  setSortOrder: (order: "date" | "alphabet") => void;
  setCurrentPage: (page: number) => void;
  type:"note"|"tree-note" | "todo-list" | "calendar";
};

const NoteListMain: React.FC<NoteListMainProps> = ({
  notes,
  searchTerm,
  sortOrder,
  currentPage,
  notesPerPage,
  handleAddButton,
  handleDelete,
  setSortOrder,
  setCurrentPage,
  type,
}) => {
  const startIndex = (currentPage - 1) * notesPerPage;
  const endIndex = startIndex + notesPerPage;

  return (
    <Tabs defaultValue="grid">
      <div className="flex items-center mb-2">
        <TabsList className="flex space-x-2 border-b border-gray-200">
          <TabsTrigger
            className="flex items-center px-4 py-2 font-medium text-gray-700 transition-colors duration-200 ease-in-out hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
            value="grid"
          >
            <LayoutGrid size={18} />
            <span className="ml-2 hidden sm:inline">Grid View</span>
          </TabsTrigger>
          <TabsTrigger
            className="flex items-center px-4 py-2 font-medium text-gray-700 transition-colors duration-200 ease-in-out hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
            value="row"
          >
            <Rows3 size={18} />
            <span className="ml-2 hidden sm:inline">Row View</span>
          </TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1 flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
              >
                <ListFilter className="h-4 w-4 text-gray-600" />
                <span className="sr-only sm:not-sr-only sm:ml-2">Sort</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="z-10 mt-1.5 w-48 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden"
              align="end"
            >
              <DropdownMenuLabel className="px-4 py-2 text-sm font-semibold text-gray-800">
                Sort by
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="border-t border-gray-200" />
              <DropdownMenuCheckboxItem
                className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                checked={sortOrder === "date"}
                onSelect={() => setSortOrder("date")}
              >
                Date
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                checked={sortOrder === "alphabet"}
                onSelect={() => setSortOrder("alphabet")}
              >
                Alphabet
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <Button size="sm" className="h-8 gap-1" onClick={handleAddButton}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Note
            </span>
          </Button>
        </div>
      </div>
      <TabsContent value="grid">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>{type}</CardTitle>
            <CardDescription>
              Explore the world of digital note-taking, uncovering a wide range
              of tools and techniques to capture and organize thoughts more
              efficiently on the web.
            </CardDescription>
            <Separator />
          </CardHeader>
          <CardContent>
            <NotesCards
              notes={notes}
              layout={"grid"}
              searchTerm={searchTerm}
              sortOrder={sortOrder}
              currentPage={currentPage}
              notesPerPage={notesPerPage}
              handleDelete={handleDelete}
              type={type}
            />
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <div className="text-xs text-muted-foreground">
              Showing <strong>{startIndex + 1}</strong> to{" "}
              <strong>{Math.min(endIndex, notes.length)}</strong> of{" "}
              <strong>{notes.length}</strong> notes
            </div>
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  setCurrentPage(
                    endIndex < notes.length ? currentPage + 1 : currentPage
                  )
                }
                disabled={endIndex >= notes.length}
              >
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="row">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Notes</CardTitle>
            <CardDescription>
              Explore the world of digital note-taking, uncovering a wide range
              of tools and techniques to capture and organize thoughts more
              efficiently on the web.
            </CardDescription>
            <Separator />
          </CardHeader>
          <CardContent>
            <NotesCards
              notes={notes}
              layout={"row"}
              searchTerm={searchTerm}
              sortOrder={sortOrder}
              currentPage={currentPage}
              notesPerPage={notesPerPage}
              handleDelete={handleDelete}
              type={type}
            />
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <div className="text-xs text-muted-foreground">
              Showing <strong>{startIndex + 1}</strong> to{" "}
              <strong>{Math.min(endIndex, notes.length)}</strong> of{" "}
              <strong>{notes.length}</strong> notes
            </div>
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  setCurrentPage(
                    endIndex < notes.length ? currentPage + 1 : currentPage
                  )
                }
                disabled={endIndex >= notes.length}
              >
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default NoteListMain;
