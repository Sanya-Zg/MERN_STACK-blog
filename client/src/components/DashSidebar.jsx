import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { HiUser} from 'react-icons/hi';
import { TbLogout2 } from 'react-icons/tb';
import { Link, useLocation } from 'react-router-dom';
const DashSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');

    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <Sidebar className="w-full">
      <SidebarItems>
        <SidebarItemGroup>
          <SidebarItem
            as={Link}
            to="/dashboard?tab=profile"
            active={tab === 'profile'}
            icon={HiUser}
            label="User"
            labelColor="dark"
          >
            Profile
          </SidebarItem>
          <SidebarItem icon={TbLogout2} className="cursor-pointer">
            Sign out
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
export default DashSidebar