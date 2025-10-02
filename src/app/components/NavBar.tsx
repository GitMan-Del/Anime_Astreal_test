import { Calendar1, History, Home, ListChecks, User } from "lucide-react";
import Link from "next/link";

export default function NavBar() {
    return(
        <div className="w-[95%] mx-auto bg-black/70 h-[70px] backdrop-blur-xl p-3 fixed bottom-4 inset-x-0 z-[200] rounded-3xl">
            <ul className="w-full flex flex-row gap-7 justify-center text-[#E0E0E0] whitespace-nowrap">
                <Link href="/" className="text-[#05c149] flex flex-col gap-1 items-center text-xs">
                 <Home size={20}/>
                  Home
                </Link>
                <Link href="/" className="text-[#E0E0E0] flex flex-col gap-1 items-center  text-xs">
                 <Calendar1 size={20}/>
                  Calendar
                </Link>
                <Link href="/" className="flex text-[#E0E0E0] flex-col gap-1 items-center  text-xs">
                 <ListChecks size={20}/>
                  My List
                </Link>
                <Link href="/" className="flex flex-col gap-1 text-[#E0E0E0] items-center  text-xs">
                 <History size={20}/>
                  History
                </Link>
                <Link href="/" className="flex flex-col gap-1 items-center text-[#E0E0E0]  text-xs">
                 <User size={20}/>
                  Profile
                </Link>
            </ul>

        </div>
    );
}