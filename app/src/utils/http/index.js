/* eslint-disable */
import axios from 'axios';
import httpInterceptor from './httpInterceptor';
import BASE_URL from '../../config';

const httpClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000
});

const interceptor = httpClient.interceptors;

const setupInterceptors = () => {
  httpInterceptor(interceptor);
};

setupInterceptors();

export default httpClient;
/* eslint-enable */
