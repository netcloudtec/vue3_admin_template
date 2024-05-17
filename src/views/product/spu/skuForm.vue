<template>
  <div>
    <el-form label-width="100px">
      <el-form-item label="sku名称">
        <el-input placeholder="SKU名称"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input placeholder="价格(元)" type="number"></el-input>
      </el-form-item>
      <el-form-item label="重量(克)">
        <el-input placeholder="重量(克)"></el-input>
      </el-form-item>
      <el-form-item label="sku描述">
        <el-input placeholder="sku描述" type="textarea"></el-input>
      </el-form-item>
      
      <el-form-item label="平台属性">
        <el-form :inline="true">
          <el-form-item v-for="(item, index) in attrArr" :key="item.id" :label="item.attrName">
            <el-select v-model="item.attrIdAndValueId" style="width: 150px">
              <el-option v-for="(attrValue, index) in item.attrValueList" :key="attrValue.id" :label="attrValue.valueName"
              :value="`${item.id}:${attrValue.id}`">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>


      <el-form-item label="销售属性">
        <el-form :inline="true">
          <el-form-item v-for="(item, index) in saleArr" :key="item.id" :label="item.saleAttrName">
            <el-select v-model="item.saleIdAndValueId" style="width: 150px">
              <el-option v-for="(saleAttrValue, index) in item.spuSaleAttrValueList" :key="saleAttrValue.id" 
              :label="saleAttrValue.saleAttrValueName" :value="`${item.id}:${saleAttrValue.id}`"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>



      <el-form-item label="图片名称">
        <el-table border>
          <el-table-column type="selection" width="80px" align="center"> </el-table-column>
          <el-table-column  label="图片" > </el-table-column>
          <el-table-column  label="名称" > </el-table-column>
          <el-table-column  label="操作" > </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
            <el-button type="primary" size="default">保存</el-button>
            <el-button type="primary" size="default" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { SkuData } from '@/api/product/spu/type'
//引入请求API
import { reqAttr } from '@/api/product/attr';
import { reqSpuImageList, reqSpuHasSaleAttr, reqAddSku } from '@/api/product/spu';
import { ElMessage } from 'element-plus';

//平台属性
let attrArr = ref<any>([]);
//销售属性
let saleArr = ref<any>([]);
//照片的数据
let imgArr = ref<any>([]);
//获取table组件实例
let table = ref<any>();

//自定义事件的方法
let $emit = defineEmits(['changeScene']);

//收集SKU的参数
let skuParams = reactive<SkuData>({
    //父组件传递过来的数据
    "category3Id": "",//三级分类的ID
    "spuId": "",//已有的SPU的ID
    "tmId": "",//SPU品牌的ID
    //v-model收集
    "skuName": "",//sku名字
    "price": "",//sku价格
    "weight": "",//sku重量
    "skuDesc": "",//sku的描述

    "skuAttrValueList": [//平台属性的收集
    ],
    "skuSaleAttrValueList": [//销售属性
    ],
    "skuDefaultImg": "",//sku图片地址
})

//当前子组件的方法对外暴露
const initSkuData = async (c1Id: number | string, c2Id: number | string, spu: any) => {
    //收集数据
    skuParams.category3Id = spu.category3Id;
    skuParams.spuId = spu.id;
    skuParams.tmId = spu.tmId;
    //获取平台属性
    let result: any = await reqAttr(c1Id, c2Id, spu.category3Id);
    //获取对应的销售属性
    let result1: any = await reqSpuHasSaleAttr(spu.id);
    //获取照片墙的数据
    let result2: any = await reqSpuImageList(spu.id);
    //平台属性
    attrArr.value = result.data;
    //销售属性
    saleArr.value = result1.data;
    //图片
    imgArr.value = result2.data;
}

//取消按钮的回调
const cancel = () => {
    $emit('changeScene', { flag: 0, params: '' });
}

//对外暴露方法
defineExpose({initSkuData});
</script>

<style scoped></style>