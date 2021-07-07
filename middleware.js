const { BASE_BEFORE_ENTER, BASE_ERROR } = require("./constants");

const getMiddleWare = (beforeEnter = BASE_BEFORE_ENTER) => {
     return (req, res, next) => {
          let returnedFunction = beforeEnter(req);
          // Check if the function returned by beforeEnter is Promise and call next based on that
          let isPromise = returnedFunction instanceof Promise;
          if (isPromise) {
               returnedFunction
                    .then(next)
                    .catch(({ status = 500, error = BASE_ERROR }) => {
                         res.status(status).send({
                              error
                         });
                    });
          } else {
               next();
          }
     };
};

module.exports = {
     getMiddleWare
}