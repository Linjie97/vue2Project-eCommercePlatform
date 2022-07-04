<template>
  <div class="type-nav">
    <div class="container">
      <!-- 事件委托|事件委派 ：这里是将鼠标移出的效果委托给父元素-->
      <!-- 将鼠标移除的效果加在全部商品分类这个div中，确保鼠标停留在全部商品分类时还有背景颜色的样式 -->
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过渡动画:组件|元素务必要有v-if|v-show指令 -->
        <transition name="sort">
          <!-- 三级联动 -->
          <div class="sort" v-show="show">
            <!-- 事件委派 将click事件绑定到父元素 @click="goSearch" -->
            <div class="all-sort-list2" @click="goSearch">
              <!-- 一级导航 -->
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <!-- 个人觉得：a标签上绑定的事件应该绑定在h3上 -->
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                  <!-- <router-link to="/search">{{ c1.categoryName }}</router-link> -->
                </h3>
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <!-- 二级导航 -->
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                        <!-- <router-link to="/search">{{ c2.categoryName }}</router-link> -->
                      </dt>
                      <dd>
                        <!-- 三级导航 -->
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 这种引入方式：将lodash全部功能引入
// import _ from "lodash";
// 按需加载(throttle.js文件是默认暴露)
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  data() {
    //   用于存储用户鼠标移上的哪一个一级分类
    return {
      currentIndex: -1,
      show: true,
    };
  },
  methods: {
    //   鼠标进入修改响应式数据currentIndex属性
    // es6写法
    // changeIndex(index) {
    //   this.currentIndex = index;
    // },

    // 节流
    // throttle回调函数别用箭头函数
    // es5写法
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),

    // 一级分类鼠标移除的事件的回调
    leaveIndex() {
      // 加了节流后，快速移入移出会导致某个一级分类一直是蓝色，原因是移出的代码执行后又执行了一次移入的代码。
      // 解决:给移出的代码加个延时器，时间大于或等于移入的时间
      // 经检验，该方法并不能很好解决问题，目前没找到合适的解决方法，我觉得可以不加节流
      // setTimeout(()=>{this.currentIndex = -1;console.log('%%%');},100);
      this.currentIndex = -1;

      // 判断是Search路由组件的时候才会执行
      if (this.$route.path !== "/home") {
        // 一级分类鼠标移除变成隐藏
        this.show = false;
      }
    },
    // 进行路由跳转的最好方法：编程式导航+事件委派
    // 利用事件委派存在的问题：1.点击一定是a标签才能跳转 2.如何获取参数【商品的名字，id】

    // 1.把子节点当中的a标签加上:data-categoryName，其余子节点没有，即可区分开a标签
    // 2.把a标签加上:data-category1Id，不同级别的不一样，即可区分开不同级别的商品分类。
    goSearch(event) {
      let element = event.target;
      // 节点有一个dataset属性，可以获取节点的自定义属性与属性值
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      // 如果标签身上有categoryname一定是a标签（浏览器会将驼峰写法改成小写）
      if (categoryname) {
        // 整理路由跳转的参数
        let location = { name: "search" }; //跳转路由name
        let query = { categoryName: categoryname }; //路由参数
        // 区分几级标签
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }
        // 判断：如果路由跳转时，带有params参数，捎带传递过去
        if (this.$route.params) {
          location.params = this.$route.params;
          // 整理完参数
          location.query = query;
          // 路由跳转
          this.$router.push(location);
        }
      }
    },
    // 当鼠标移入的时候，让商品分类列表进行展示
    enterShow() {
      if (this.$route.path !== "/home") {
        this.show = true;
      }
    },
  },
  // 组件挂载完毕：可以向服务器发请求
  mounted() {
    // 当组件挂载完毕，让show属性变为false
    // 如果不是Home路由组件，将TypeNav进行隐藏（其实就是判断在哪个路由组件）
    if (this.$route.path !== "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          //   &:hover {
          //     .item-list {
          //       display: block;
          //     }
          //   }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
    // 过渡动画
    // 过渡动画开始状态（进入）
    .sort-enter,
    .sort-leave-to {
      height: 0px;
    }
    // -enter-to过渡动画结束状态（进入）  -leave 过渡动画开始状态（离开）
    .sort-enter-to,
    .sort-leave {
      height: 461px;
    }
    // 定义动画时间、速率
    .sort-enter-active,
    .sort-leave-active {
      transition: all 0.5s linear;
    }
  }
}
</style>