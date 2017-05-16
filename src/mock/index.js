import axios from 'axios';
import MockAdapter from 'axios-mock-adapter'
import loginAPI from './login'
const mock = new MockAdapter(axios);

// 登录相关
mock.onPost('/login').reply(loginAPI.login);
mock.onAny().passThrough();

export default mock;
