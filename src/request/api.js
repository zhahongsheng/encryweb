import base from './constant'
let baseUrl = base;

// 服务器api接口
const api = {
    encry: {
        url: `${baseUrl}encrypt`,
        method:`get`
    },
    decrypt: {
        url: `${baseUrl}decrypt`,
        method:`get`
    },
    getUUID: {
        url: `${baseUrl}getUUID`,
        method:`get`
    }
};

export default api;