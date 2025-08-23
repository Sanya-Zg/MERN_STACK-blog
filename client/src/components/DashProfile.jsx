import { Button, TextInput } from 'flowbite-react';
import { useSelector } from 'react-redux';

const DashProfile = () => {
  const {currentUser} = useSelector((state) => state.user)
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center text-3xl font-semibold">Profile</h1>
      <form className="flex flex-col gap-4">
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          <img
            src={currentUser.profilePicture}
            alt="user"
            className="rounded-full w-full h-full object-cover border-8 border-[lightgray]"
          />
        </div>

        <TextInput
          type="text"
          id="username"
          placeholder="Username..."
          defaultValue={currentUser.username}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="Email..."
          defaultValue={currentUser.email}
        />
        <TextInput type="password" id="password" placeholder="password" />

        <Button
          type="submit"
          className="bg-gradient-to-l from-teal-600 to-lime-100 text-gray-900 shadow-md hover:bg-gradient-to-l hover:from-teal-800 hover:to-lime-100 active:translate-y-0.5 transition duration-200"
        >
          Update
        </Button>
      </form>
      <div className='text-red-700 flex justify-between mt-5'>
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
      </div>
    </div>
  );
}
export default DashProfile