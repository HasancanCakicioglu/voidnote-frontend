"use client";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"; // Ensure you have this or a similar UI component

const LocaleSwitcher = () => {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const changeHandler = (value: string) => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${value}`);
    router.replace(newPath);
  };

  return (
    <Select value={currentLocale} onValueChange={changeHandler}>
      <SelectTrigger className="inline-flex items-center bg-gray-200 dark:bg-gray-700 p-2 rounded-md border dark:border-gray-600">
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="tr">Türkçe</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default LocaleSwitcher;
