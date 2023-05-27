/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { NotFoundPage } from './components/NotFoundPage/Loadable';
import HomePage from './pages/HomePage';
import PokemonMenu from './pages/PokemonMenu/pokemon-menu';
import AnimalsMenu from './pages/AnimalsMenu/animals-menu';
import ColoursMenu from './pages/ColoursMenu/colours-menu';
import PokemonSilhouette from './pages/PokemonSilhouette/pokemon-silhouette';
import PokemonSound from './pages/PokemonSound/pokemon-sound';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pokemon-menu" element={<PokemonMenu />} />
        <Route path="/animals-menu" element={<AnimalsMenu />} />
        <Route path="/colours-menu" element={<ColoursMenu />} />

        <Route
          path="/pokemon-silhouette-game"
          element={<PokemonSilhouette />}
        />
        <Route path="/pokemon-sound-game" element={<PokemonSound />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  );
}
