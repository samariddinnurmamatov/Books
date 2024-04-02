// import { Suspense } from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { CircularProgress } from '@material-ui/core';
// import routes from './configs/routes.config';
// import AuthGuard from './components/route/AuthGuard';

// function App() {
//   return (
//     <BrowserRouter>
//       <Suspense fallback={<CircularProgress size={24} />}>
//        <AuthGuard>
//           <Routes>
//             {routes.map((route, index) => (
//               <Route
//                 key={index}
//                 path={route.path}
//                 element={<route.element />}
//               >
//                 {route.children && route.children.map((childRoute, childIndex) => (
//                   <Route
//                     key={childIndex}
//                     path={`${route.path}${childRoute.path}`}
//                     element={<childRoute.element />}
//                   />
//                 ))}
//               </Route>
//             ))}
//           </Routes>
//         </AuthGuard>
//       </Suspense>
//     </BrowserRouter>
//   );
// }

// export default App;



import { Suspense } from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import routes from './configs/routes.config';
import AuthGuard from './components/route/AuthGuard';
import renderRoutes from './components/route/RenderRoutes/RenderRoutes';

const App = () => (
  <BrowserRouter>
    <Suspense fallback={<CircularProgress size={24} />}>
      <AuthGuard>
        <Routes>
          {renderRoutes(routes)}
        </Routes>
      </AuthGuard>
    </Suspense>
  </BrowserRouter>
);

export default App;
