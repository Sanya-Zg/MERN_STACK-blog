import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from 'flowbite-react';
import { useEffect, useState } from 'react';
import { HiDocumentText, HiUser } from 'react-icons/hi';
import { TbLogout2 } from 'react-icons/tb';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOutSuccess } from '../redux/userSlice';
import { useSelector } from 'react-redux';

const DashSidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');

    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignOut = async () => {
    try {
      const res = await fetch('/api/user/signout', { method: 'POST' });
      const data = res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Sidebar className="w-full">
      <SidebarItems>
        <SidebarItemGroup className='flex flex-col gap-1'>
          <SidebarItem
            as={Link}
            to="/dashboard?tab=profile"
            active={tab === 'profile'}
            icon={HiUser}
            label={currentUser ? 'Admin' : 'User'}
            labelColor="dark"
          >
            Profile
          </SidebarItem>
          {currentUser.isAdmin && (
            <SidebarItem
              as={Link}
              to="/dashboard?tab=posts"
              active={tab === 'posts'}
              icon={HiDocumentText}
            >
              My Posts
            </SidebarItem>
          )}

          <SidebarItem
            onClick={handleSignOut}
            icon={TbLogout2}
            className="cursor-pointer"
          >
            Sign out
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
};
export default DashSidebar;
