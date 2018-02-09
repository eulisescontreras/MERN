// Website you wish to allow to connect
WEBSITE_ALLOW_CONNECT_NAME = "Access-Control-Allow-Origin";
WEBSITE_ALLOW_CONNECT_VALUE = "http://localhost:3000";

// Request methods you wish to allow
REQUEST_ALLOW_METHODS_NAME = "Access-Control-Allow-Methods";
REQUEST_ALLOW_METHODS_VALUE = "GET, POST, OPTIONS, PUT, PATCH, DELETE";

// Request headers you wish to allow
REQUEST_ALLOW_HEADERS_NAME = "Access-Control-Allow-Headers";
REQUEST_ALLOW_HEADERS_VALUE = "X-Requested-With,content-type";

//Include cookies in the requests
REQUEST_ALLOW_COOKIES_NAME = "Access-Control-Allow-Credentials";

//String Conection
CONNECT_MONGODB_URL = "mongodb://localhost:27017/"; 

//Databases
DBNAME_ADMIN = "admin";

//Collections
COLLECTION_USERS =  "users"


//Routes
//Login
LOGIN_URL = "/";
CLIENT_URL = "/clients"
//Client
CLIENT_RETRIEVE_URL = '/clients/list';
CLIENT_CREATE_URL = '/clients/add';
CLIENT_UPDATE_URL = '/clients/update/:id';
CLIENT_DELETE_URL = '/clients/delete/:id';

//Login with Facebook
LOGIN_FACEBOOK = "/login/facebook";
LOGIN_FACEBOOK_CALLBACK = "/login/facebook/callback";

//Credential for login with Facebook
FACEBOOK_API_KEY = 2004831973066636;
FACEBOOK_API_SECRET = "7a4331204510663fec0f314fd00b0758";
FACEBOOK_CALBACK_URL = "http://localhost:3000/login/facebook/callback";
