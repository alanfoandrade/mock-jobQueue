import axios from 'axios';

const portalApi = axios.create({
  baseURL: process.env.ATZ_PORTAL_URL,
});

export default portalApi;
