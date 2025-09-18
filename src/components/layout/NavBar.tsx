"use client";
import IconButton from "../ui/IconButton"

export default function NavBar() {
  return (
    <header className="flex items-center h-[84px] w-full justify-between px-8 py-4  border-b  border-[var(--border-gray)]">
      <div className="flex flex-col w-full h-[52px] gap-[4px] ">
        <h1 className="text-xl font-semibold leading-[28px] text-[var(--foreground)]">Dashboard</h1>
        <p className="text-sm  leading-[20px] text-[var(--brand-gray)]">Your leads. Your tasks. Your momentum — in one view.</p>
      </div>

      <div className="flex items-center h-[40px] gap-4">
        <div className="flex items-center gap-3">
          <IconButton icon={
            <img src="\icons\NotificationIcon.svg"
              alt="Notification"
              className="h-6 w-6" />}
          />
          <IconButton icon={
            <img src="\icons\MessageIcon.svg"
              alt="Message"
              className="h-6 w-6" />}
          />
        </div>

        <div className="h-[40px] w-px bg-[var(--border-gray)]"></div>

        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full  flex items-center justify-center">
            <img src="\icons\ProfileIcon.svg" alt="Profile" />
          </div>

          <div className="w-5">

            <IconButton className="h-5 w-5 p-0 "
              icon={
                <img src="\icons\Down-Arrow.svg"
                  alt="Message"
                  className="h-5 w-5" />}
            />
          </div>
        </div>
      </div>


    </header>
  )
}
