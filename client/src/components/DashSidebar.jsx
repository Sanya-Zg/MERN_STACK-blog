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
    <Sidebar className='w-full'>
      <SidebarItems>
        <SidebarItemGroup>
          <Link to='/dashboard?tab=profile'>
            <SidebarItem active={tab==='profile'} icon={HiUser} label={'User'} labelColor="dark">
              Profile
            </SidebarItem>
          </Link>
          <SidebarItem icon={TbLogout2}>
            Sign out
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
export default DashSidebar