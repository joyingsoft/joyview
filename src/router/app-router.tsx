import { Routes, Route } from 'react-router-dom';
import { Main } from '../pages/main';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />}></Route>
      <Route path="/:version" element={<Main />}></Route>
    </Routes>
  );
};
