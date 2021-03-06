const express = require('express');
const path = require('path');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const i18nextMiddleware = require('i18next-express-middleware');
const Backend = require('i18next-node-fs-backend');
const { i18nInstance } = require('./tools/i18n');

const port = process.env.PORT || 8080;

// init i18next with serverside settings
// using i18next-express-middleware
i18nInstance
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    preload: ['zh-TW', 'zh-CN'], // preload all langages
    ns: ['layout'], // need to preload all the namespaces
    backend: {
      loadPath: path.join(__dirname, '/static/locales/{{lng}}/{{ns}}.json'),
    },
  }, () => {
    // loaded translations we can bootstrap our routes
    app.prepare()
      .then(() => {
        const server = express();

        // enable middleware for i18next
        server.use(i18nextMiddleware.handle(i18nInstance));

        // serve static/locales for client
        server.use('/static/locales', express.static(path.join(__dirname, '/static/locales')));

        // missing keys
        server.post('/static/locales/add/:lng/:ns', i18nextMiddleware.missingKeyHandler(i18nInstance));

        // use next.js
        server.get('*', (req, res) => handle(req, res));

        server.listen(port, (err) => {
          if (err) throw err;
          console.log(`> Ready on http://localhost:${port}`);
        });
      });
  });
