import { Calendar1, Download, Home, ListChecks, User } from "lucide-react";
import Link from "next/link";

export default function NavBar() {
    return(
        <div className="w-full bg-black/70 h-[100px] backdrop-blur-xl p-5 fixed bottom-0 right-0 z-[200]">
            <ul className="w-full flex flex-row gap-9 justify-center text-[#E0E0E0] whitespace-nowrap">
                <Link href="/" className="text-[#05c149] flex flex-col gap-2 items-center text-xs">
                 <Home size={20}/>
                  Home
                </Link>
                <Link href="/" className="text-[#E0E0E0] flex flex-col gap-2 items-center  text-xs">
                 <Calendar1 size={20}/>
                  Calendar
                </Link>
                <Link href="/" className="flex text-[#E0E0E0] flex-col gap-2 items-center  text-xs">
                 <ListChecks size={20}/>
                  My List
                </Link>
                <Link href="/" className="flex flex-col gap-2 text-[#E0E0E0] items-center  text-xs">
                 <Download size={20}/>
                  Downlodes
                </Link>
                <Link href="/" className="flex flex-col gap-2 items-center text-[#E0E0E0]  text-xs">
                 <User size={20}/>
                  Profile
                </Link>
            </ul>

        </div>
    );
}