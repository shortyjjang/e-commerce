"use client";
import React, { useEffect, useState } from "react";

export default function Search({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [keyword, setKeyword] = useState<string>("");
  useEffect(() => {
    setKeyword(value);
  }, [value]);
  return (
    <div className="pb-4">
      <input
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onChange(keyword);
          }
        }}
        type="text"
        placeholder="검색어를 입력하세요"
        className="bg-gray-100 rounded-md p-2 text-sm w-full"
      />
    </div>
  );
}
