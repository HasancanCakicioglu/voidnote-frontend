"use client"
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

const LocaleSwitcher = () => {
    const currentLocale = useLocale();
    const router = useRouter();

    const changeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const nextLocale = event.target.value;
        router.replace(`${nextLocale}`);
    }

    return <select className="inline-flex bg-transparent p-2" defaultValue={currentLocale} onChange={changeHandler}>
        <option value="en">en</option>
        <option value="tr">tr</option>
    </select>
}

export default LocaleSwitcher;