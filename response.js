const setResponseHeaders = (res, headers) => {
     Object.keys(headers).forEach(header => {
          res.setHeader(header, headers[header]);
     });
};

const setResponseCookies = (res, cookies) => {
     Object.keys(cookies).forEach(cookie => {
          res.cookie(cookie, cookies[cookie]);
     });
};

module.exports = {
     setResponseCookies,
     setResponseHeaders
}