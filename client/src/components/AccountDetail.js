import { useState } from "react";
import { useCurrentUser } from "../Context";

export default function AccountDetail({ data, label, param }) {
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState(data);
  const [currentUser, setCurrentUser] = useCurrentUser();
  const [errors, setErrors] = useState();

  function handleSave(e) {
    e.preventDefault();
    let update = { [param]: input };

    fetch(`/users/${currentUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(update),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setCurrentUser(user);
          setEdit(!edit);
        });
      } else {
        r.json().then((e) => {
          setErrors(e);
        });
      }
    });
  }

  const editForm = (
    <>
      <form className="flex justify-between">
        <input
          autoFocus
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="uppercase mr-2 w-full font-light text-md md:text-lg bg-inherit text-white caret-inherit focus:outline-none border-b-2  border-zinc-700"
        />
        <button
          type="submit"
          onClick={handleSave}
          className="bg-emerald-500 rounded font-semibold text-zinc-100 px-2 py-1 text-sm w-20 opacity-90 hover:opacity-100"
        >
          Save
        </button>
      </form>
      <div>
        {errors
          ? errors.errors.map((e) => (
              <li className="text-red-500 list-none mt-1">{e}</li>
            ))
          : null}
      </div>
    </>
  );

  const detailRender = (
    <div className="flex justify-between">
      <div className="uppercase font-light text-zinc-100 text-md md:text-lg overflow-scroll">
        {input}
      </div>
      <button
        onClick={() => setEdit(!edit)}
        className="bg-zinc-400 rounded shrink-0 px-2 py-1 text-sm text-zinc-900 font-semibold md:text-sm w-16 opacity-80 hover:opacity-100"
      >
        Edit
      </button>
    </div>
  );

  return (
    <div className="mb-5">
      <span className="font-semibold text-sm md:text-lg text-zinc-400 overflow-scroll">
        {label}
      </span>
      {edit ? editForm : detailRender}
    </div>
  );
}
