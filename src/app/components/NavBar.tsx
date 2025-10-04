import Link from "next/link";

export default function NavBar() {
    return(
        <div className="w-[95%] mx-auto bg-black/70 h-[70px] backdrop-blur-xl p-3 fixed bottom-4 inset-x-0 z-[200] rounded-3xl">
            <ul className="w-full flex flex-row gap-9 justify-center text-[#E0E0E0] whitespace-nowrap">
                <Link href="/" className="text-[#05c149] flex flex-col gap-1 items-center text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" 
                width="25" 
                height="25" 
                viewBox="0 0 24 24"><path fill="none" stroke="#05c149" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 21H7a4 4 0 0 1-4-4v-6.292a4 4 0 0 1 1.927-3.421l5-3.03a4 4 0 0 1 4.146 0l5 3.03A4 4 0 0 1 21 10.707V17a4 4 0 0 1-4 4Zm-8-4h6"/></svg>
                  Home
                </Link>
                <Link href="/" className="text-[#E0E0E0] flex flex-col gap-1 items-center  text-xs">
                 <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="none" stroke="#E0E0E0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.25 4.75H6.75a3.5 3.5 0 0 0-3.5 3.5v9.5a3.5 3.5 0 0 0 3.5 3.5h10.5a3.5 3.5 0 0 0 3.5-3.5v-9.5a3.5 3.5 0 0 0-3.5-3.5m-14 4.5h17.5M7.361 4.75v-2m9.25 2v-2"/></svg>
                  Calendar
                </Link>
                <Link href="/" className="flex text-[#E0E0E0] flex-col gap-1 items-center  text-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="none" stroke="#E0E0E0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 17h7m5-1h3m0 0h3m-3 0v3m0-3v-3M3 12h11M3 7h11"/></svg>             
                  My List
                </Link>
                <Link href="/" className="flex flex-col gap-1 text-[#E0E0E0] items-center  text-xs">
                 <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="#E0E0E0"><g fill="none" stroke="#E0E0E0" strokeLinecap="round" strokeWidth="1.5"><path d="M2 12c0 5.523 4.477 10 10 10c1.821 0 3.53-.487 5-1.338M12 2c5.523 0 10 4.477 10 10c0 1.821-.487 3.53-1.338 5"/><path strokeLinejoin="round" d="M12 9v4h4"/><path strokeDasharray=".5 3.5" d="M17 20.662A9.955 9.955 0 0 1 12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10c0 1.821-.487 3.53-1.338 5"/></g></svg>
                  History
                </Link>
                <Link href="/" className="flex flex-col gap-1 items-center text-[#E0E0E0]  text-xs">
                 <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><g fill="none"><path stroke="#E0E0E0" strokeWidth="1.5" d="M21 12a8.958 8.958 0 0 1-1.526 5.016A8.991 8.991 0 0 1 12 21a8.991 8.991 0 0 1-7.474-3.984A9 9 0 1 1 21 12Z"/><path fill="#E0E0E0" d="M13.25 9c0 .69-.56 1.25-1.25 1.25v1.5A2.75 2.75 0 0 0 14.75 9h-1.5ZM12 10.25c-.69 0-1.25-.56-1.25-1.25h-1.5A2.75 2.75 0 0 0 12 11.75v-1.5ZM10.75 9c0-.69.56-1.25 1.25-1.25v-1.5A2.75 2.75 0 0 0 9.25 9h1.5ZM12 7.75c.69 0 1.25.56 1.25 1.25h1.5A2.75 2.75 0 0 0 12 6.25v1.5ZM5.166 17.856l-.719-.214l-.117.392l.267.31l.569-.488Zm13.668 0l.57.489l.266-.31l-.117-.393l-.719.214ZM9 15.75h6v-1.5H9v1.5Zm0-1.5a4.752 4.752 0 0 0-4.553 3.392l1.438.428A3.252 3.252 0 0 1 9 15.75v-1.5Zm3 6a8.23 8.23 0 0 1-6.265-2.882l-1.138.977A9.73 9.73 0 0 0 12 21.75v-1.5Zm3-4.5c1.47 0 2.715.978 3.115 2.32l1.438-.428A4.752 4.752 0 0 0 15 14.25v1.5Zm3.265 1.618A8.23 8.23 0 0 1 12 20.25v1.5a9.73 9.73 0 0 0 7.403-3.405l-1.138-.977Z"/></g></svg>
                  Profile
                </Link>
            </ul>
        </div>
    );
}