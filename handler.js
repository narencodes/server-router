const { setResponseCookies, setResponseHeaders } = require('./response');
const { BASE_ERROR } = require("./constants");

/**
 * 
 * @param {Function} handler - Handler function to handle api request
 * @description - Format the given Handler function to send success/error responses uniformly throughout product
 */
const getApiHandler = handler => {
    return (req, res) => {
        handler(req)
            .then(({ status = 200, data, error, headers, isBuffer, cookies }) => {
                headers && setResponseHeaders(res, headers);
                cookies && setResponseCookies(res, cookies);
                res.status(status).send(isBuffer ? data : {
                    [ data ? 'data' : 'error' ]: data || error,
                    url: req.baseUrl || req.originalUrl
                });
            })
            .catch((err) => {
                console.log(err);
                let { status = 500, error = BASE_ERROR } = err;
                res.status(status).send({
                    error
                });
            });
    };
};

module.exports = {
    getApiHandler
};