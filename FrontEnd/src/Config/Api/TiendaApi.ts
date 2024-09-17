import {API_URL, API_URL_ANDROID, API_URL_IOS, STAGE} from '@env';
import axios from 'axios';
import {Platform} from 'react-native';
import { AdaptadorStorage } from '../Adaptador/Adaptador-Storage';

export const Api =
  STAGE === 'Prod'
    ? API_URL
    : Platform.OS === 'android'
    ? API_URL_ANDROID
    : API_URL_IOS;
const TiendaApi = axios.create({
  baseURL: Api,
  headers: {
    'Content-Type': 'application/json',
  },
});

TiendaApi.interceptors.request.use(async config => {
  const token = await AdaptadorStorage.BuscarItem("token");
  if(token)
  {
    config.headers['Authorization'] = `Bearer ${token}`

  }
  return config;
});

export {TiendaApi};
