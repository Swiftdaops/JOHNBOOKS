import React, { useState, Children, cloneElement, isValidElement, useRef, useEffect } from "react";

function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

export function DropdownMenu({ children }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, () => setOpen(false));

  return (
    <div ref={ref} className="relative inline-block" data-open={open}>
      {Children.map(children, (child) => {
        if (!isValidElement(child)) return child;
        return cloneElement(child, { open, setOpen });
      })}
    </div>
  );
}

export function DropdownMenuTrigger({ children, open, setOpen, asChild }) {
  const child = Children.only(children);
  const onClick = (e) => {
    setOpen(!open);
    if (child.props && typeof child.props.onClick === "function") child.props.onClick(e);
  };

  if (asChild && isValidElement(child)) {
    return cloneElement(child, { onClick });
  }

  return (
    <button type="button" onClick={onClick} className="px-2 py-1">
      {children}
    </button>
  );
}

export function DropdownMenuContent({ children, align = "start", open }) {
  if (!open) return null;
  return (
    <div
      className={`absolute mt-2 z-50 w-40 rounded bg-white text-black dark:bg-gray-800 dark:text-white p-1 shadow-lg ${align === "end" ? "right-0" : "left-0"}`}
    >
      {children}
    </div>
  );
}

export function DropdownMenuItem({ children, onClick, className = "", setOpen }) {
  const handle = (e) => {
    if (typeof onClick === "function") onClick(e);
    if (typeof setOpen === "function") setOpen(false);
  };

  return (
    <button onClick={handle} className={`w-full text-left px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${className}`}>
      {children}
    </button>
  );
}

export default DropdownMenu;
