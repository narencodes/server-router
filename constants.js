const BASE_PARAMS = {
     config: {
          base_url: '/api'
     },
     routes: []
};

const BASE_ERROR = {
     code: "400",
     message: "something went wrong"
};

const BASE_BEFORE_ENTER = () => Promise.resolve();

const BASE_STATIC = {
     path : "/",
     entry_point : "index.html"     
}

module.exports = {
     BASE_PARAMS,
     BASE_ERROR,
     BASE_BEFORE_ENTER,
     BASE_STATIC
}