/* URLS */
export const HOME_PAGE_URL = '/';
export const TEST_PAGE_URL = '/test';
export const SIGNIN_PAGE_URL = '/signin';
export const DEFAULT_LANGUAGE = 'en';

export const cognitoConfig = {
  userPoolId: 'us-west-2_nlDsdSFbC',
  region: 'us-west-2',
  userPoolWebClientId: '4iqvv8c790s9i026pj6rs7bm6q',
  // identityPoolId: 'us-west-2:dc3b0c22-b71b-4196-a0e5-91896228a809',
};

export const amplifyAuthSignOption = {
  signUpConfig: {
    hiddenDefaults: ['phone_number', 'email', 'username', 'password'],
  },
};

// API url config
const BASE_URL = 'http://localhost:8081/api/v1/';
export const FETCH_ALL_ACCOUNT_API = `${BASE_URL}Accounts`;
export const ADD_ACCOUNT_API = `${BASE_URL}Account`;
