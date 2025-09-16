"use client";

import React from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchIcon } from "lucide-react";

export default function SearchInvoice() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const [searchValue, setSearchValue] = React.useState(
    () => searchParams.get("query")?.toString() ?? "",
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const params = new URLSearchParams(searchParams);
      params.set("page", "1");
      if (searchValue) {
        params.set("query", searchValue);
      } else {
        params.delete("query");
      }
      replace(`${pathName}?${params}`);
    }
  }

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={"Search invoice..."}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        value={searchValue}
      />
      <SearchIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
