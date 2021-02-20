<template>
  <div>
    <ul>
      <template v-for="item in data">
        <li :key="item.id" class="treeLi">
          <div :key="item.id" class="tree-title" :style="stylePadding">
            <!-- 选中图标切换 -->
            <img
              v-if="!item.children && !item.childrenSelect"
              :src="item.select ? selected : select"
              width="17px"
              height="17px"
              class="checkImg"
              @click="togCheck(item.id)"
            />
            <!-- 子集选中图标 -->
            <img
              v-if="!item.children && item.childrenSelect"
              :src="childrenSelect"
              width="17px"
              height="17px"
              class="checkImg"
            />
            <div @click="togTree(item.id)" style="display:inline-block">
              <span class="title">{{ item.title }}</span>
              <img
                v-if="item.children"
                :src="item.expand ? open : close"
                width="10px"
                height="22px"
                class="togger"
              />
            </div>
          </div>
          <transition name="fade">
            <TreeList
              :increment="count"
              v-if="item.expand"
              :data="item.children"
            ></TreeList>
          </transition>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import bus from '@/tools/bus.js'
export default {
  name: 'TreeList',
  props: {
    data: {
      type: Array,
      default: function() {
        return []
      }
    },
    increment: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      selected: require('@/assets/tree/selected.png'), // 选中
      select: require('@/assets/tree/select.png'), // 未选择
      open: require('@/assets/tree/show.png'), // 展开图标
      childrenSelect: require('@/assets/tree/childrenSelect.png'), // 子集选中图标
      close: require('@/assets/tree/hidden.png') // 收缩图标
    }
  },
  methods: {
    togCheck(id) {
      // 切换check是否选中`
      bus.$emit('getTreeItemId', id) // 将递归组件的所有id用事件总线方式传出去
    },
    // 改变展开状态
    togTree(id) {
      bus.$emit('togger', id)
    }
  },
  computed: {
    count() {
      var c = this.increment
      return ++c
    },
    stylePadding() {
      return {
        'padding-left': this.count * 26 + 'px'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.tree-title {
  position: relative;
}
.treeLi {
  margin-top: 20px;
  &:last-child {
    margin-bottom: 20px;
  }
}
.togger {
  vertical-align: middle;
  position: absolute;
  right: 50px;
}
.checkImg {
  vertical-align: middle;
}
.title {
  font-size: 16px;
  font-weight: 400;
  color: #141414;
  opacity: 1;
  margin-left: 7px;
  vertical-align: middle;
}
//收缩展开动画
/* 简单的css transition实现动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
