"use client";
import React, { useState } from "react";

interface TextInputProps {
  onEnter: (text: string) => void;
  onChange: (text: string) => void;
  placeHolder: string;
}

export default function TextInput(props: TextInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;
    setInputValue(nextValue);
    props.onChange(nextValue);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (!inputValue.trim()) return;
      props.onEnter(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <input
      type="text"
      placeholder={props.placeHolder}
      className="p-2 border-2 border-blue-300 w-full text-black rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
      value={inputValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
}
