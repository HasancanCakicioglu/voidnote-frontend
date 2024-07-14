"use client"
import React, { useState, useEffect , useRef } from 'react';
import TiptapEditor from '@/components/tiptap'; // Örneğin, TiptapEditor bileşeninin doğru yolu buraya ekleyin
import { createTreeNote, getTreeNote, updateTreeNote } from "@/actions/tree"; // getNote fonksiyonunun doğru yolu buraya ekleyin
import SmallHeader from '@/components/smallHeader';
import router from 'next/router';
import { toast} from "@/components/ui/use-toast";


const NoteDetailPage = ({ params }: { params: { id: string } }) => {

  const [savedContent, setSavedContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null); // Hata durumu için state kullanımı
  const [title, setTitle] = useState<string>(""); // Not başlığı için state kullanımı
  const [isEditorReady,setIsEditorReady] = useState<boolean>(false); // Editörün hazır olup olmadığını kontrol etmek için state kullanımı


  const handleSave = (content: string) => {
    setSavedContent(content);
  };

  const getPlainTextPreview = (html: string, length: number) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const text = tempDiv.innerText; // Sadece metni al
    return text.slice(0, length);
  };

  useEffect(() => {
    const fetchNote = async () => {
      try {
        if (!params.id) return; 

        const response = await getTreeNote({
          id: params.id  
        });

        if (!response) {
          setError('Error fetching note');
          return;
        }
        
        if ("data" in response) {
          setTitle(response.data.title)
          setSavedContent(response.data.content)
        }
        setIsEditorReady(true); // Editörün hazır olduğunu belirtmek için state'i güncelliyoruz



      } catch (error: any) {
        setError(error.message || 'Error fetching note');
      }
    };

    fetchNote(); // fetchNote fonksiyonunu useEffect içinde çağırın

  }, []); // useEffect'in id parametresine bağımlı olmasını sağlıyoruz


  const buttonClick = async () => {
    let data = await updateTreeNote({
      "id": params.id,
      "title": title,
      "content": savedContent,
      "brief": getPlainTextPreview(savedContent, 50)
    })

    if (!data){
      setError('Error updating note');
      return;
    }

    console.log("Note updated successfully:", data);
  }

  const handleAddButton = async () => {
    let response = await createTreeNote({
      parent_id: params.id
    });
    if (response.success) {
      router.push(`/dashboard/tree-note/${response.data._id}`);
    } else {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: response.message,
      });
    }
  };

  return (
    <div className='sm:gap-4 sm:py-4 sm:pl-14'>
      <SmallHeader/>
      <div className="flex flex-col min-h-screen max-w-[90vw] p-8 mx-auto">
      <input
        type="text"
        value={title || 'Untitled Note'}
        onChange={(e) => setTitle(e.target.value)}
        className="text-2xl font-bold mb-4"
      />
      <div className="max-w-full rounded-md overflow-x-auto min-h-full">
      {isEditorReady && ( // Editör hazır olduğunda gösterilecek
          <TiptapEditor description={savedContent} onChange={handleSave} />
        )}
        {!isEditorReady && (
          <p>Loading editor...</p> // Editör henüz hazır değilse yükleme durumu gösterilebilir
        )}
      </div>
      <button onClick={handleAddButton}>create new</button>
      <button onClick={buttonClick} className="mt-4 bg-primary text-primary-foreground py-2 px-4 rounded-md">Save</button>
    </div>
    </div>
  );
};

export default NoteDetailPage;
