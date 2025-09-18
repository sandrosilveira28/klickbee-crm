"use client";
import React, { Children, cloneElement, isValidElement, useState } from "react";
import { ChevronDown } from "lucide-react";

interface SidebarItemProps {
  icon?: React.ReactNode;
  label: string;
  active?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  variant?: "parent" | "child";
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  active = false,
  children,
  onClick,
  variant = "parent",
}) => {
  const hasChildren = Boolean(children);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (hasChildren) {
      setIsOpen((prev) => !prev);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={`flex cursor-pointer items-center justify-between ${
          variant === "child" ? "w-[191px] h-[28px] pl-2" : "w-full h-[32px] p-2"
        } gap-2 rounded-md ${
          variant === "child" ? "leading-[16px] text-xs" : "leading-[20px] text-sm"
        } font-normal transition-colors ${
          active
            ? "bg-[var(--foreground)] text-white"
            : "text-[var(--foreground)] hover:bg-gray-100"
        }`}
        aria-expanded={hasChildren ? isOpen : undefined}
      >
        <span className="flex items-center gap-2 w-full">
          {icon}
          <span>{label}</span>
        </span>
        {hasChildren && (
          <ChevronDown
            size={16}
            className={`transition-transform ${isOpen ? "rotate-0" : "-rotate-90"}`}
          />
        )}
      </button>

      {hasChildren && isOpen && (
        <div className="ml-4 mt-1  h-[64px] overflow-hidden flex flex-col gap-1 border-l border-[var(--border-gray)] pl-3">
          {Children.map(children, (child) => {
            if (isValidElement(child)) {
              return cloneElement(child as React.ReactElement<SidebarItemProps>, {
                variant: "child",
              });
            }
            return child;
          })}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;
