import { useState } from "react";

function CreatePost() {
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="bg-sage-100 rounded-md p-4">
      <textarea
        rows={4}
        placeholder="Write something ..."
        value={inputValue}
        className="w-full border-2 px-4 py-2 border-sage-200 rounded-md transition-all duration-200 focus:border-light focus:outline-none placeholder:italic"
        onChange={(e) => setInputValue(e.target.value)}
      />

      <div className="flex justify-between items-center my-3">
        <h2
          className={`ml-2 ${inputValue?.length > 390 ? "text-red-600" : ""}`}
        >
          {inputValue.length} / 400
        </h2>
        <button className="bg-sage-200 px-4 py-1 tracking-wide rounded-md border border-sage-300 transition-all duration-200 hover:bg-sage-300">
          Create a post
        </button>
      </div>
    </div>
  );
}

export default CreatePost;
