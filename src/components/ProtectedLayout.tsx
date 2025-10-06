"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import SideBar from "./layout/SideBar"
import NavBar from "./layout/NavBar"

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const { status } = useSession()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (status === "unauthenticated" && window.location.pathname !== "/auth") {
            router.push("/auth")
            setIsAuthenticated(false)
        }else if (status === "authenticated") {
            setIsAuthenticated(true)
        }
    }, [status])

    if (status === "loading") {
        return <p>Loading...</p> // Or skeleton loader
    }

    return (
        <>
        {
            isAuthenticated ? 
                <div className="flex h-[100dvh]">
                    {/* Sidebar */}
                    <SideBar />
                    {/* Main content */}
                    <div className="flex flex-col flex-1 overflow-x-hidden">
                        <NavBar />
                        <div className=" overflow-y-auto overflow-x-hidden flex-1 scrollbar-hide">
                            {children}
                        </div>
                    </div>
                </div> :
                <>{children}</>
        }
        </>
    )
}
