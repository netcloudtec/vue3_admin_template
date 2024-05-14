//引入项目中全部的全局组件
import SvgIcon from './SvgIcon/index.vue';
import Category from './Category/index.vue';

//引入element-plus提供全部图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 全局对象
const allGloableComponent = { SvgIcon ,Category}
// 对外暴露插件对象
export default {
    //务必叫作install方法
    install(app) {
        Object.keys(allGloableComponent).forEach((key: string) => {
            // 注册全局组件
            app.component(key, allGloableComponent[key]);
        });
        
        //将element-plus提供图标注册为全局组件
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        }
    }
}
