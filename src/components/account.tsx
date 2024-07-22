"use client";
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from './ui/dropdown-menu';
import Image from 'next/image';
import { Button } from './ui/button';
import { RootState } from '@/store/store';
import { logout } from '@/store/slice';
import { deleteAccessToken } from '@/actions/auth';
import { useRouter } from 'next/navigation';

const Account = () => {
  const account = useSelector((state: RootState) => state.account);
  const dispatch = useDispatch();
  const router = useRouter();

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
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/support">Support</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex space-x-1 md:space-x-8 items-center">
          <Link href="/login">
            <div className="hover:text-gray-300">Login</div>
          </Link>
          <Link href="/register">
            <button className="text-sm md:text-base text-white px-4 py-2 rounded bg-gradient-to-r from-purple-300 to-purple-800 hover:from-purple-100 hover:to-purple-700">
              Create an Account
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Account;
