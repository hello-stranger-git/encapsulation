<template>
  <div>
    <TreeList :data="data"></TreeList>
  </div>
</template>

<script>
import TreeList from '@/components/tree/treeList'
import bus from '@/tools/bus.js'
export default {
  props: {
    data: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    // 查找到相应选中的节点，并且改变选中状态
    changeData(data, treeId) {
      for (let i = 0; i < data.length; i++) {
        // 选中节点
        if (data[i].id === treeId) {
          data[i].select = !data[i].select
          if (data[i].select) {
            // 遍历改变其余兄弟元素的状态
            for (let j = 0; j < data.length; j++) {
              if (data[j].id !== treeId) {
                data[j].childrenSelect = true
              }
            }
            // 将选择的title传出去
            this.$emit('getTreeTitle', data[i].title)
          } else {
            // 遍历改变其余兄弟元素的状态
            for (let j = 0; j < data.length; j++) {
              if (data[j].id !== treeId) {
                data[j].childrenSelect = false
              }
            }
            // 将选择的title传出去
            this.$emit('getTreeTitle', '')
          }
          return
        } else {
          if (data[i].children) {
            this.changeData(data[i].children, treeId)
          }
        }
      }
    },
    // 查找到相应选中的节点，并且改变展开状态
    togger(data, treeId) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === treeId) {
          console.log(data[i].id, treeId, data[i].expand)
          data[i].expand = !data[i].expand
          return
        } else {
          if (data[i].children) {
            this.togger(data[i].children, treeId)
          }
        }
      }
    }
  },
  mounted() {
    // 获取点击每个树结点的id
    bus.$on('getTreeItemId', treeId => {
      this.changeData(this.data, treeId)
      // 查找子集的父级id
    })
    // 获取点击每个树结点的id
    bus.$on('togger', treeId => {
      this.togger(this.data, treeId)
    })
  },
  components: {
    TreeList
  }
}
</script>

<style lang="less" scoped>
ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

.tree-menu {
  width: 360px;
  height: 100%;
  padding: 0px 12px;
  border-right: 1px solid #e6e9f0;
}

.tree-menu-comm span {
  display: block;
  font-size: 12px;
  position: relative;
}

.tree-contro .ico {
  background-position: 3px -92px;
}

.tree-title .ico {
  position: absolute;
  left: -13px;
  top: 0;
  width: 15px;
  height: 26px;
  // background: url(./folder-tree.png) no-repeat 4px -43px;
  opacity: 0.8;
}

.tree-menu-comm span strong {
  display: block;
  width: 82%;
  position: relative;
  line-height: 22px;
  padding: 2px 0;
  padding-left: 5px;
  color: #161719;
  font-weight: normal;
}

.tree-nav {
  background: #e7f2fe;
  border: 1px solid #bfdaf4;
  padding-left: 14px;
  margin-left: 0px;
}

.tree-title {
  border: 1px solid #fff;
  margin-top: 1px;
}
/*无箭头*/

.tree-contro-none .ico {
  background-position: -999px -99px;
}
/*箭头朝下*/

.tree-contro .ico {
  background-position: 3px -92px;
}
</style>
