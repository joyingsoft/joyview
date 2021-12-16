import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/home/home';

export const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
    </Routes>
  );
};
