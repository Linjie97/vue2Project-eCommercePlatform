1.完成一级分类动态添加背景颜色
第一种方式：样式，对应区域的样式加个.item:hover{ background-color: skyblue;}
第二种方式：通过JS完成


2.通过JS控制二三级商品分类的显示与隐藏
一开始是通过css样式display：block|none 显示与隐藏二三级商品分类的
使用JS：给二级导航条加一个动态样式:style="{display:currentIndex == index?'block':'none'}"


3.演示卡顿现象
正常：事件触发非常频繁，而且每一次的触发，回调函数都要去执行（如果时间很短，而回调函数内部有计算，那么很可能出现浏览器卡顿）

节流：在规定的间隔时间范围内不会重复触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发

防抖：前面所有的触发都被取消，最后一次执行在规定的时间之后才会触发，也就是说如果连续快速的触发，只会执行一次。

// 防抖：用户操作很频繁，但是只执行一次【防抖只判断最后一次操作】
// 节流：用户操作很频繁，但是把频繁的操作变为少量操作【给浏览器充裕的时间去解析】


4.完成三级联动节流的操作


5.三级联动组件的路由跳转与传递参数
三级联动用户可以点击的：一级分类、二级分类、三级分类，当你点击时
Home模块跳转到Search模块，一级会把用户选中的产品（产品名字、ID）在路由跳转时进行传递。

三级联动：如果使用声明式导航router-link，可以实现路由的跳转与传递参数
但需要注意，会出现卡顿现象
router-link：可以是一个组件，当服务器的数据返回之后，循环出很多的router-link组件
创建组件实例时，一瞬间创建1000+很占内存，因此出现卡顿现象

最好的方法还是：编程式导航+事件委派
利用事件委派存在的问题：1.点击一定是a标签才能跳转 2.如何获取参数【商品的名字，id】

6.上述问题的解决