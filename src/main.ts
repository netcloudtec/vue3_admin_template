import { createApp } from 'vue'
import App from './App.vue'
//引入element-plus插件和样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 配置element-plus国际化
// @ts-ignore 解决打包异常问题
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// svg插件需要配置的代码
import 'virtual:svg-icons-register'
import gloablComponent from '@/components/index';
// 引入模板全局样式
import '@/styles/index.scss';
// 路由
import router from '@/router';
// 引入仓库
import pinia from '@/store';

//获取应用实例对象
const app = createApp(App)
// 安装element-plus插件
// app.use(ElementPlus)
app.use(ElementPlus, {
  locale: zhCn,
})
// 安装自定义插件
app.use(gloablComponent);
// 安装pinia仓库
app.use(pinia);
// 注册路由
app.use(router);

//引入路由鉴权文件
import './permisstion';
// 将应用挂载到挂载点上
app.mount('#app')



