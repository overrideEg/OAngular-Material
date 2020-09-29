/* This file should contain All EndPoint Routes Across all the application*/
/* Follow the Naming Convention*/
// const uri = 'http://localhost:3001/v1';

const uri = 'uri here ';
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


};
