// 先引入mockjs模块
import Mock from 'mockjs';
// 把JSON数据格式引入(JSON文件默认就是对外暴露)
// webpack默认对外暴露地：图片、JSON数据格式
import banner from './banner.json';
import floor from './floor.json';

// mock数据：第一个参数请求地址，第二个参数请求数据
Mock.mock("/mock/banner",{code:200,data:banner});//模拟首页大地轮播图的数据
Mock.mock("/mock/floor",{code:200,data:floor});
