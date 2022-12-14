import React from "react";
import clsx from "clsx";
import { MoonIcon, SunIcon, ShareIcon } from "@heroicons/react/24/solid";
import { useAppContext } from "../../hooks/useAppContext";
import { useRouter } from "next/router";

const Header = () => {
  const { listId } = useAppContext();
  const { query } = useRouter();

  const toggleDarkMode = () => {
    const bodyEl = document.querySelector("body");
    bodyEl?.classList.toggle("dark");
  };

  const handleShare = async () => {
    const url = query.list_id
      ? window.location.href
      : `${window.location.href}?list_id=${listId}`;

    const shareData = {
      title: "Todo list",
      text: "Watch my todo list and help me get it done!",
      url,
    };

    try {
      await navigator.clipboard.writeText(shareData?.url || "");
      alert("Copiado al portapapeles");
      if (navigator.canShare()) {
        await navigator.share(shareData);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="flex justify-between items-center mb-8  ">
      <h1 className="text-5xl text-white">TODO</h1>
      <div className="items-center grid grid-flow-col gap-4">
        <button
          onClick={handleShare}
          className={clsx("hover:text-opacity-100 text-opacity-80 text-white")}
        >
          <ShareIcon className="h-8 w-8" />
        </button>
        <button
          onClick={toggleDarkMode}
          className={
            "hover:text-opacity-100 text-opacity-80 text-white dark:hidden"
          }
        >
          <MoonIcon className="h-8 w-8" />
        </button>
        <button
          onClick={toggleDarkMode}
          className={
            "hover:text-opacity-100 text-opacity-80 text-white hidden dark:block"
          }
        >
          <SunIcon className="h-8 w-8" />
        </button>
      </div>
    </div>
  );
};

export default Header;
