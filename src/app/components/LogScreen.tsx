import Image from "next/image";

export default function LogScreen () {
    return(
         <div className="w-full h-[100dvh] flex bg-[#181A20] flex-col justify-center items-center">
            <Image src="/logo.svg" alt="lll" width={150} height={150} className="object-contain rounded-2xl mb-10 animate-spin" />
         <p>Loading...</p>
        </div>
    );
}