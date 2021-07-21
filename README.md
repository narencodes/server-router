# Server Router

Package to describe api routes on express-nodejs in a easy way

## Installation

```npm i @naren_codes/server-router```

### Getting Started

```javascript
const Router = require("@naren_codes/server-router");

const API_ROUTE = {
     // API url
     path : "user",
     // API method
     method : "get",
     /* Before Enter middleware - called before calling api handler 
        If returned Promise will call next() on resolve and ends api request without calling handler on reject
        If returns nothing calls next() after beforeEnter
        @params - request object
     */
    // Optional
     beforeEnter : (req) => {
          return Promise.resolve();
     },
     /* Api Handler - should return promise 
        @params - request object
     */
     handler : (req => {
          return Promise.resolve({
               data : "Hello World", // Response data for the api request
               status : 200, // Send any HTTP statuses
               headers : {
                    // Declare any response header to be binded in the request here
                    "Content-Type" : 'application/json', // Optional by default express will evaluate Content-Type
                    "Cache-Control" : `max-age=1000`
               },
               // Declare any cookies to be set in the client's browser
               cookies : {
                    auth_token : token
               }
          });
     }),
     // Child routes based on current route
     children : [
          {
               // userId will be a Dynamic value
               path : ":userId",
               method : "get"
               // Declare handler, beforeEnter, children
          }
     ]
}

/* @params { app, options }
 * app - app object obtained by called express() middleware
 * options - params to be passed for the router
*/

new Router(app, {
     routes : [
          API_ROUTE
          // other api routes
     ],
     /* For static based compressions and serving index.html on all routes 
      * path - folder containing static files (js/css/html)
      * entry_point - for single page applications html mentioned here will sent to browser for all routes that does not match declared routes
     */
     static : {
          path : path.resolve("./server/public"),
          entry_point : "index.html"
     }
});
