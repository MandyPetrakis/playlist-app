import { useState } from "react";
import { useCurrentUser } from "./Context";

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
          console.log(user);
        });
      } else {
        r.json().then((e) => {
          setErrors(e);
          console.log(e);
        });
      }
    });
  }

  const editForm = (
    <>
      <form className="flex justify-between">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="uppercase mr-2 w-full font-light text-md md:text-lg bg-inherit text-white caret-inherit focus:outline-none"
        />
        <button
          type="submit"
          onClick={handleSave}
          className="bg-emerald-500 rounded-full font-semibold text-black px-2 py-1 text-xs md:text-sm w-16 opacity-100"
        >
          Save
        </button>
      </form>
      <div>
        {errors
          ? errors.errors.map((e) => <li className="text-red-500 mb-3">{e}</li>)
          : null}
      </div>
    </>
  );

  const detailRender = (
    <div className="flex justify-between">
      <span className="uppercase font-light text-md md:text-lg">{input}</span>
      <button
        onClick={() => setEdit(!edit)}
        className="bg-emerald-500 rounded-full px-2 py-1 text-xs text-black font-semibold md:text-sm w-16 opacity-50 hover:opacity-100"
      >
        Edit
      </button>
    </div>
  );

  return (
    <div className="mb-5">
      <span className="font-bold text-md text-gray-400">{label}</span>
      {edit ? editForm : detailRender}
    </div>
  );
}
