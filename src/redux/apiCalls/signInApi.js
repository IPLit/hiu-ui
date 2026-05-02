import apiWrapper from '../apiWrapper';
import { defaultHeaders } from '../../constants';

const signInApi = ({ userName, password, locationUuid }) => apiWrapper(
  'post',
  '/sessions',
  {
    username: userName,
    password,
    loginLocationUuid: locationUuid
  },
  {
    ...defaultHeaders,
  },
);

export default signInApi;
