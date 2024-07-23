"use client";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useRouter } from "@/navigations";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from './ui/dropdown-menu';
import Image from 'next/image';
import { Button } from './ui/button';
import { RootState } from '@/store/store';
import { logout } from '@/store/slice';
import { deleteAccessToken } from '@/actions/auth';

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CircleUser } from 'lucide-react';
import { useTranslations } from 'next-intl';

const Account = () => {
  const account = useSelector((state: RootState) => state.account);
  const dispatch = useDispatch();
  const router = useRouter();

  const t = useTranslations("Navbar");

  const handleLogout = async () => {
    const response = await deleteAccessToken();
    console.log(response);
    if (response) {
      dispatch(logout());
      router.push('/');
    }
  };

  return (
    <div className="flex items-center space-x-8">
      {account.email ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
              {account.profilePhotoUrl ? (
                <Image
                  src={account.profilePhotoUrl}
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                  style={{ width: "auto", height: "auto" }}
                />
              ) : (
                <div className="flex items-center justify-center h-9 w-9 rounded-full bg-gray-200 text-gray-500">
                  {account.email[0].toUpperCase()}
                </div>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{account.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile">{t("profile")}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/support">{t("support")}</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>{t("logout")}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex space-x-1 md:space-x-8 items-center">
          <div className='hidden md:flex items-center space-x-4'><Link href="/login">
            <div className="hover:text-gray-300">{t("login")}</div>
          </Link>
          <Link href="/register">
            <button className="text-sm md:text-base text-white px-4 py-2 rounded bg-gradient-to-r from-purple-300 to-purple-800 hover:from-purple-100 hover:to-purple-700">
            {t("createanaccount")}
            </button>
          </Link></div>
          <div className='flex md:hidden'>
          <Popover>
        <PopoverTrigger asChild>
          <Button size="icon" variant="outline" className="md:hidden ml-2">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-45 p-4 shadow-lg rounded-md">
          <nav className="grid gap-6 text-lg font-medium">
            <div className="flex flex-col space-y-4">
              <Link href="/register">
                <button className="text-sm md:text-base px-4 py-2 rounded hover:bg-gray-200 w-full">
                {t("createanaccount")}
                </button>
              </Link>
              <Link href="/login">
                <button className="text-sm md:text-base px-4 py-2 rounded hover:bg-gray-200 w-full">
                {t("login")}
                </button>
              </Link>
              
            </div>
          </nav>
        </PopoverContent>
      </Popover>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
