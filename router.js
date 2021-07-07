const express = require('express');
const { BASE_PARAMS, BASE_STATIC } = require("./constants");
const { getMiddleWare } = require("./middleware");
const { getApiHandler } = require("./handler");

class Router {
     constructor(app, params) {
          this.init(app, params)
     }
     
     init(app, params) {
          this.app = app;
          params = { ...BASE_PARAMS, ...params };
          this.params = params;
          this.routes = params.routes;
          this.config = params.config;
          this.push();
          if (params.static) {
               this.declareStatic({ ...BASE_STATIC, ...params.static })
          }
     }

     push(routes = this.routes) {
          routes.forEach(routeObj => {
               let { path, method = "use", beforeEnter, handler, children = [] } = routeObj;
               const currentRoute = typeof path === 'string' ? (this.config.base_url + "/" + path) : path;
               // If children key is present generate Router Object and use it with express app;
               this.app[method](currentRoute, getMiddleWare(beforeEnter), children.length ? this.getChildRouter(children) : getApiHandler(handler));
          });
     }

     getChildRouter(children) {
          const Router = express.Router();
          children.forEach(child => {
               let { path = "", method = "use", beforeEnter, handler, children = [] } = child;
               path = "/" + path; // prepend slash to match parent path
               Router[method](path, getMiddleWare(beforeEnter), children.length ? this.getChildRouter(children) : getApiHandler(handler));
          });
          return Router;
     }
     
     declareStatic({ path, entry_point }) {
          const expressStaticGzip = require("express-static-gzip");
          this.app.use("/", expressStaticGzip(path));

          // Load index.html for all routes except '/api' routes
          this.app.get(/.*/, (req, res) => {
               res.sendFile(path + `/${entry_point}`);
          });
     }
};

module.exports = Router;