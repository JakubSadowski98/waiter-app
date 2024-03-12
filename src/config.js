// zawartość API_URL będzie zależna od trybu pracy Webpacka -
// - czyli od trybu w jakim jest uruchomiona aplikacja: deweloperskim lub produkcyjnym
export const API_URL =
  process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3131/api";