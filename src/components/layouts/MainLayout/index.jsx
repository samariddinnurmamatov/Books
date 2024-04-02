// import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import Mainheader from './components/mainheader';
// import Mainfooter from './components/mainfooter';
import Container from '../../shared/Container';


const MainLayout = () => {
  const HeaderComponent = <Mainheader />;
  // const FooterComponent = <Mainfooter />;
  // Bunaqa yozish sababi keyinchalik MainHeader Mobile bo'lsa ternary operator bilan tekshirib yozib ketsa bo'ladi

  return (
    <div className='orqa h-screen'>
      <Container>
        {HeaderComponent}
        <main>
          <Outlet />
        </main>
      </Container>
      {/* {FooterComponent} */}
    </div>
  );
};

export default MainLayout;