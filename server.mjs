// kod ten będzie uruchamiał jeden serwer, który będzie zarówno wspierał endpointy do danych
// z public/db/app.json (w wersji produkcyjnej skopiowanej do build/db/app.json), 
// jak i udostępniał pod linkiem / zbudowaną aplikację z folderu build

import jsonServer from 'json-server';

const server = jsonServer.create();
const router = jsonServer.router('build/db/app.json');

const middlewares = jsonServer.defaults({
  static: 'build',
  noCors: true
});

const port = process.env.PORT || 3131;

server.use(middlewares);
server.use(jsonServer.rewriter({
  '/api/*': '/$1'
}));
server.use(router);

server.listen(port);