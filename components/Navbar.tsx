// "use client";

import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";
import {signOut, signIn} from "@/auth"
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar = async function () {

    const session = await auth();

    return (
        <header className="px-5 py-3 bg-white shadow-sm font-work-sans">

            <nav className="flex justify-between items-center">
                <Link href="/">
                    <Image  src="/logo1.png" alt="logo"  width={100} height={44}/>
                </Link>

                <div className="flex items-center gap-5 text-black  ">
                    {session  && session?.user ? (
                        <>
                            <Link href="/startup/create">
                                <span >Créer</span>
                                {/* <BadgePlus className="size-6 sm:hidden" /> */}
                            </Link>

                            <form  action={async function (){
                                "use server"
                                await signOut({redirectTo: "/"})
                            }}>
                                <button type="submit">
                                    <span>Déconnecter</span>
                                </button>
                            </form>

                            <Link href={`/user/${session?.id}`}>
                                <Avatar className="size-10">
                                    <AvatarImage src={session?.user?.image || ""}  alt={session?.user?.name || ""}/>
                                    <AvatarFallback>AV</AvatarFallback>
                                </Avatar>
                            </Link>
                        </>
                    ): (
                        <form action={async function () {
                            "use server"
                            await signIn("github")
                        }}>
                            <button type="submit">
                                Se Connecter
                            </button>

                        </form>
                    )}
            </div>

            </nav>



        </header>
    )
}

export default Navbar