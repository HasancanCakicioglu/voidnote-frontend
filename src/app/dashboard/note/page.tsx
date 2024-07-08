"use client";

import { File, ListFilter, PlusCircle,LayoutGrid,Rows3, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GenerateBreadcrumbs from "@/components/generateBreadcrumbs";
import { Separator } from "@/components/ui/separator";
import { getUser } from "@/actions/user";
import { createNote, deleteNote } from "@/actions/note";
import { useEffect, useState } from "react";
import { UserNotes } from "@/entities/note";
import NotesCards from "@/components/noteCards";
import SmallHeader from "@/components/smallHeader";
import { useRouter } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast"


const Page = () => {
  const [notes, setNotes] = useState<UserNotes[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"date" | "alphabet">("date"); 

  const router = useRouter();
  const { toast } = useToast()
  
  const notesPerPage = 12;
  const startIndex = (currentPage - 1) * notesPerPage;
  const endIndex = startIndex + notesPerPage;

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await getUser({ type: "notes" });

        if (response.success === false) {
          toast({
            variant:"destructive",
            title: "Something went wrong.",
            description: response.message,
          })
        }

        setNotes(response.data.notes);
      } catch (error: any) {
        toast({
          variant:"destructive",
          title: "Something went wrong.",
          description: error.message || "Error fetching notes",
        })
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
    }else{
      toast({
        variant:"destructive",
        title: "Something went wrong.",
        description: response.message,
      })
    }
  };

  const handleDelete = async (id: string) => {
    const response = await deleteNote({ id });

    if (response.success) {
      setNotes(notes => notes.filter(note => note._id !== id));
    } else {
      toast({
        variant:"destructive",
        title: "Something went wrong.",
        description: response.message,
      })
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
          <Tabs defaultValue="grid">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="grid"><LayoutGrid size={18}/></TabsTrigger>
                <TabsTrigger value="row"><Rows3 size={18}/></TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Sort
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked={sortOrder === "date"}
                          onSelect={() => setSortOrder("date")}>
                      Date
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked={sortOrder === "alphabet"}
                    onSelect={() => setSortOrder("alphabet")}>Alphabet</DropdownMenuCheckboxItem>
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
                  <CardTitle>Notes</CardTitle>
                  <CardDescription>
                    Explore the world of digital note-taking, uncovering a wide range of tools and techniques to capture and organize thoughts more efficiently on the web.
                  </CardDescription>
                  <Separator />
                </CardHeader>
                <CardContent>
                  <NotesCards notes={notes} layout={"grid"} searchTerm={searchTerm} sortOrder={sortOrder} currentPage={currentPage} notesPerPage={notesPerPage} handleDelete={handleDelete}/>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>{startIndex + 1}</strong> to <strong>{Math.min(endIndex, notes.length)}</strong> of <strong>{notes.length}</strong> notes
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm"
                      variant="outline"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    <Button 
                      size="sm"
                      variant="outline"
                      onClick={() => setCurrentPage(prev => (endIndex < notes.length ? prev + 1 : prev))}
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
                    Explore the world of digital note-taking, uncovering a wide range of tools and techniques to capture and organize thoughts more efficiently on the web.
                  </CardDescription>
                  <Separator />
                </CardHeader>
                <CardContent>
                  <NotesCards notes={notes} layout={"row"} searchTerm={searchTerm} sortOrder={sortOrder} currentPage={currentPage} notesPerPage={notesPerPage} handleDelete={handleDelete}/>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>{startIndex + 1}</strong> to <strong>{Math.min(endIndex, notes.length)}</strong> of <strong>{notes.length}</strong> notes
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm"
                      variant="outline"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    <Button 
                      size="sm"
                      variant="outline"
                      onClick={() => setCurrentPage(prev => (endIndex < notes.length ? prev + 1 : prev))}
                      disabled={endIndex >= notes.length}
                    >
                      Next
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Page;
