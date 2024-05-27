// 进行axios的二次封装，使用请求和响应拦截器
import axios from "axios";
import { ElMessage } from "element-plus";


// 引入用户相关的的仓库
import useUserStore from "@/store/modules/user";

//第一步：利用axios对象的create方法，去创建axios实例（其他的配置：基础路径、超时的时间）
let request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,//根据环境变量获取基础路径 /api
    timeout: 5000//超时时间设置
})
//第二步：request实例添加请求和响应拦截器
request.interceptors.request.use(config => {
    // 获取用户相关的小仓库：获取仓库内部的token，登录成功以后携带给服务器
    // let userStore = useUserStore(); 
    // if(userStore.token){
    //     config.headers.token=userStore.token;
    // }
    // config配置对象，headers属性请求头，经常给服务器端携带公共的参数: config.headers.token='123'
    // 返回配置对象
    return config;
});
//第三步：响应拦截器
request.interceptors.response.use((response) => {
    // 成功回调
    return response.data;
}, (error) => {
    // 失败回调，处理http网络错误
    // 定义一个变量，存储网络错误信息
    let msg = '';
    // http错误状态码
    let status = error.response.status;
    switch (status) {
        case 401:
            msg = "token过期";
            break;
        case 403:
            msg = '无权访问';
            break;
        case 404:
            msg = "请求地址错误";
            break;
        case 500:
            msg = "服务器出现问题";
            break;
        default:
            msg = "无网络";

    }
    ElMessage({
        type: 'error',
        message: msg
    })
    return Promise.reject(error);
});

// 对外暴露
export default request;