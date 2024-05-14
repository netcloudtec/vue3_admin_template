// 创建大仓库
import { createPinia } from 'pinia';
//createPinia方法可以用于创建大仓库
let pinia = createPinia();
//对外暴露：入口文件需要安装仓库
export default pinia;