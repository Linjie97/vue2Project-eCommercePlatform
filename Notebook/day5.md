1.search模块开发
1）静态页面+静态组件拆分出来
2）发请求（API）
3）vuex（store三连环）
4)组件获取仓库数据，动态展示数据

目前有个问题：向服务器发送请求，但是回来的数据不对，而且修改pageSize没有效果
没事了没事了，忘记把参数列表带给dispatch执行了

动态开发面包屑中的分类名--编程式导航路由跳转【自己跳自己】
动态开发面包屑中的关键字--当面包屑中的关键字清除以后，需要让兄弟组件Header组件中的关键字清除--使用全局事件总线
以及面包屑中的品牌名，售卖平台信息（操作类似上面）