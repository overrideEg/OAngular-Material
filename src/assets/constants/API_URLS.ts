  
/* This file should contain All EndPoint Routes Across all the application*/
/* Follow the Naming Convention*/
// const uri = 'http://localhost:3001/v1';
// const uri = 'http://server.overrideeg.net:3101/api';
// const uri = 'http://server.overrideeg.net:3101/api';
const uri = 'https://server.tripgo360.com/v1';
export const API_URLS = {
  auth: {
    auth: uri + '/auth/login',
    changePassword: uri + '/Auth/changePassword',
    resetPassword: uri + '/Auth/resetPassword',
    register: uri + '/register',
  },
  File: {
    post: uri + '/File/Upload',
    UploadMultiple: uri + '/File/UploadMultiple',
    delete: uri + '/File',
  },
  appsettings: {
    post: uri + '/appsettings',
    get: uri + '/appsettings',
    put: uri + '/appsettings/{entityId}',
    delete: uri + '/appsettings/{entityId}',
  },
  Company: {
    post: uri + '/Company',
    get: uri + '/Company/all',
    getOne: uri + '/Company/{entityId}',
    put: uri + '/Company/{entityId}',
    delete: uri + '/Company/{entityId}',
  },
  Country: {
    post: uri + '/Country',
    get: uri + '/Country/all',
    getOne: uri + '/Country/{entityId}',
    put: uri + '/Country/{entityId}',
    delete: uri + '/Country/{entityId}',
  },
  City: {
    post: uri + '/City',
    get: uri + '/City/all',
    getOne: uri + '/City/{entityId}',
    put: uri + '/City/{entityId}',
    delete: uri + '/City/{entityId}',
  },
  User: {
    post: uri + '/User',
    get: uri + '/User/all',
    getOne: uri + '/User/{entityId}',
    put: uri + '/User/{entityId}',
    delete: uri + '/User/{entityId}',
    upload: uri + '/User/upload',
  },
  Category: {
    post: uri + '/Category',
    get: uri + '/Category/all',
    getOne: uri + '/Category/{entityId}',
    put: uri + '/Category/{entityId}',
    delete: uri + '/Category/{entityId}',
  },
  Hotel: {
    post: uri + '/Hotel',
    get: uri + '/Hotel/all',
    getOne: uri + '/Hotel/{entityId}',
    put: uri + '/Hotel/{entityId}',
    delete: uri + '/Hotel/{entityId}',
  },
  Meal: {
    post: uri + '/Meal',
    get: uri + '/Meal/all',
    getOne: uri + '/Meal/{entityId}',
    put: uri + '/Meal/{entityId}',
    delete: uri + '/Meal/{entityId}',
  },
  Trip: {
    post: uri + '/Trip',
    get: uri + '/Trip/all',
    getOne: uri + '/Trip/{entityId}',
    put: uri + '/Trip/{entityId}',
    delete: uri + '/Trip/{entityId}',
  },
  ContactUs: {
    post: uri + '/ContactUs',
    get: uri + '/ContactUs/all',
    getOne: uri + '/ContactUs/{entityId}',
    put: uri + '/ContactUs/{entityId}',
    delete: uri + '/ContactUs/{entityId}',
  },
  ReservationTrip: {
    post: uri + '/ReservationTrip',
    get: uri + '/ReservationTrip/all',
    getOne: uri + '/ReservationTrip/{entityId}',
    put: uri + '/ReservationTrip/{entityId}',
    delete: uri + '/ReservationTrip/{entityId}',
  },
  RoomType: {
    post: uri + '/RoomType',
    get: uri + '/RoomType/all',
    getOne: uri + '/RoomType/{entityId}',
    put: uri + '/RoomType/{entityId}',
    delete: uri + '/RoomType/{entityId}',
  },

};