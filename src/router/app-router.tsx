import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Main } from '../pages/main';

export const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />}></Route>
    </Routes>
  );
};
