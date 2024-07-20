"use client"
import React, { useState, useEffect , useRef } from 'react';
import TiptapEditor, { TiptapRef } from '@/components/tiptap'; // Örneğin, TiptapEditor bileşeninin doğru yolu buraya ekleyin
import SmallHeader from '@/components/smallHeader';
import { getSubCalendar, updateSubCalendars } from '@/actions/calendar';
import VariableSidebar from '@/components/variableSidebar';



const NoteDetailPage = ({ params }: { params: { id: string ,sub:string} }) => {

  const [savedContent, setSavedContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null); // Hata durumu için state kullanımı
  const [title, setTitle] = useState<string>(""); // Not başlığı için state kullanımı
  const [isEditorReady,setIsEditorReady] = useState<boolean>(false); // Editörün hazır olup olmadığını kontrol etmek için state kullanımı
  const [changed, setChanged] = useState<boolean>(false);
  const tiptapRef = useRef<TiptapRef>(null);
  
  const addTextFromParent = () => {
    console.log("addTextFromParent")
    if (tiptapRef.current) {
      tiptapRef.current.handleAddText();
    }
  };

  const handleSave = (content: string) => {
    setChanged(true)
    setSavedContent(content);
  };

  useEffect(() => {
    const fetchNote = async () => {
      try {
        if (!params.id) return; 

        const response = await getSubCalendar({
          id_first: params.id,
          id_second: params.sub
        });

        if (!response) {
          setError('Error fetching note');
          return;
        }
        console.log(response)
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
    setChanged(false)

  }, []); // useEffect'in id parametresine bağımlı olmasını sağlıyoruz


  const buttonClick = async () => {
    let data = await updateSubCalendars({
      id_first: params.id,
      id_second: params.sub,
      title: title,
      content: savedContent,
    })

    if (!data){
      setError('Error updating note');
      return;
    }
    setChanged(false)

  }

  return (
    <div className="flex flex-grow">
      <div className='sm:gap-4 sm:py-4 md:px-10 max-w-full w-full'>
      <SmallHeader/>

      <div className="flex flex-col p-4 sm:p-8">
      <input
        type="text"
        value={title || 'Untitled Note'}
        onChange={(e) => {
          setChanged(true)
          setTitle(e.target.value)}}
        className="text-2xl font-bold mb-4"
      />
      <div className="min-w-full rounded-md overflow-hidden max-w-[60vw] flex flex-grow">
      {isEditorReady && ( // Editör hazır olduğunda gösterilecek
          <TiptapEditor ref={tiptapRef} description={savedContent} onChange={handleSave} inputValue={"a"} />
        )}
        {!isEditorReady && (
          <p>Loading editor...</p> // Editör henüz hazır değilse yükleme durumu gösterilebilir
        )}
      </div>
      <button
          disabled={!changed}
          onClick={buttonClick}
          className={`mt-4 py-2 px-4 rounded-md 
    ${
      changed
        ? "bg-primary text-primary-foreground"
        : "bg-gray-400 text-gray-700 cursor-not-allowed"
    }`}
        >
          Save
        </button>
    </div>

    </div>
    <VariableSidebar/>
    </div>
  );
};

export default NoteDetailPage;
