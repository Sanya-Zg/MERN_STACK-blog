import { Outlet } from 'react-router-dom';
import Header from './Header';
import FooterComponent from './Footer';


const MainLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <FooterComponent />
    </div>
  );
};
export default MainLayout;
