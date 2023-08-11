import { useState } from "react";
import { useCurrentUser } from "./Context";

export default function AccountDetail({ data, label, param }) {
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState(data);
  const [currentUser, setCurrentUser] = useCurrentUser();

  function handleSave() {
    let update = { [param]: input };

    fetch(`/users/${currentUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(update),
    })
      .then((r) => r.json())
      .then((user) => {
        setCurrentUser(user);
        setEdit(!edit);
      });
  }

  return (
    <div className="mb-2">
      <span className="font-bold text-sm text-gray-400">{label}</span>

      {edit ? (
        <form className="flex justify-between">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="uppercase font-light text-md md:text-lg bg-inherit text-white caret-inherit focus:outline-none"
          />
          <button
            type="submit"
            onClick={handleSave}
            className="border-2 rounded-full font-light px-2 py-1 text-xs md:text-sm w-16 "
          >
            Save
          </button>
        </form>
      ) : (
        <div className="flex justify-between">
          <span className="uppercase font-light text-md md:text-lg">
            {input}
          </span>
          <button
            onClick={() => setEdit(!edit)}
            className="border-2 rounded-full font-light px-2 py-1 text-xs md:text-sm w-16 "
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}
