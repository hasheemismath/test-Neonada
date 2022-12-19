import axios from 'axios';
import { AXIOS_TIMEOUT } from '../utils/constants';

const tvMazeApi = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: AXIOS_TIMEOUT,
});

export default tvMazeApi;
