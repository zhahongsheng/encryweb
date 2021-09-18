
let baseUrl = '';
switch (process.env.NODE_ENV) {
    case 'production'://生产环境
        if (window.baseip) {//如果baseip.js 中配置了 baseip 则使用配置的后端接口否则使用默认的 生产环境后端地址
            baseUrl = window.baseip;
        } else {
            baseUrl = 'http://121.4.111.56:8080/microFilm/';
        }
        break;
    default://开发环境
        // baseUrl = 'http://192.168.48.40:8080/C1-DQM/';
        baseUrl = 'http://localhost:8091/encry/';
        break;
}
export default baseUrl;