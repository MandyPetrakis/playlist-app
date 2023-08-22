import { useCurrentUser } from "./Context";
import AccountDetail from "./AccountDetail";

export default function Account() {
  const [currentUser, setCurrentUser] = useCurrentUser();

  const headerDetails = (
    <div className="flex justify-center items-center max-w-sm md:max-w-lg m-10">
      <img
        className="rounded-full bg-gray-200 w-36 md:w-72 "
        src={currentUser.image}
        alt="Profile Picture"
      />
      <div className="ml-5 md:ml-10">
        <div className="uppercase text-xl md:text-3xl font-bold">
          {currentUser.username}
        </div>
        <div className="lowercase text-sm md:text-lg font-light mb-2 md:mb-5 text-gray-400">
          {currentUser.first_name}
        </div>
        <div className="font-bold text-sm text-gray-200">
          playlists
          <span className="block uppercase font-light text-md md:text-lg text-gray-400">
            {currentUser.playlists.length}
          </span>
        </div>
        <div className="font-bold text-sm text-gray-200">
          member since
          <span className="block uppercase font-light text-md md:text-lg text-gray-400 whitespace-nowrap">
            {currentUser.member_since}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-col  justify-center mx-3 md:m-10">
      {headerDetails}
      <div className="flex-col max-w-sm md:max-w-lg m-10">
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
