import { useCurrentUser } from "../Context";
import AccountDetail from "../components/AccountDetail";

export default function Account() {
  const [currentUser] = useCurrentUser();

  const headerDetails = (
    <div className="flex justify-center items-center px-5 md:px-10 mb-10">
      <img
        className="rounded mr-5 md:mr-10 bg-gray-200 w-36 md:w-64 border-2 border-emerald-400"
        src={currentUser.image}
        alt="Profile Picture"
      />
      <div>
        <div className="uppercase text-xl mb-5 md:mb-10 md:text-3xl font-semibold text-zinc-100">
          {currentUser.username}
        </div>
        <div className="font-semibold text-sm md:text-lg text-zinc-400 mb-2">
          playlists
          <div className="uppercase font-extralight text-md md:text-lg text-zinc-100">
            {currentUser.playlists.length}
          </div>
        </div>
        <div className="font-semibold text-sm md:text-lg text-zinc-400 mb-2">
          member since
          <div className="uppercase font-extralight text-md md:text-lg text-zinc-100 whitespace-nowrap">
            {currentUser.member_since}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-col place-contents-center">
      {headerDetails}
      <div className="flex-col px-12 md:px-52">
        <AccountDetail
          data={currentUser.username}
          label={"username"}
          param={"username"}
        />
        <AccountDetail
          data={currentUser.first_name}
          label={"first name"}
          param={"first_name"}
        />
        <AccountDetail
          data={currentUser.email}
          label={"email"}
          param={"email"}
        />
      </div>
    </div>
  );
}
