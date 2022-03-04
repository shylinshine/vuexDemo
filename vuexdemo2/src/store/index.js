import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 所有的任务列表
    list: [],
    //文本框的内容
    inputValue: 'aaa',
    //下一个Id
    nextId: 5,
    viewKey: 'all'
  },
  // 相当于包装器
  getters: {
    //统计未完成任务的条数
    unDoneLength(state) {
      return state.list.filter(x => x.done === false).length
    },
    infoList(state) {
      if(state.viewKey === 'all') {
        return state.list
      }
      if(state.viewKey === 'undone') {
        return state.list.filter(x => x.done === false)
      }
      if(state.viewKey === 'done') {
        return state.list.filter(x => x.done === true)
      }
      return state.list
    }
  },
  mutations: {
    initList(state, list) {
      // 在mutation中给list赋值
      state.list = list

    },
    //为store中的 inputValue赋值
    setInputValue(state, val) {
      state.inputValue = val
    },
    //添加列表项
    addItem(state) {
      const obj = {
        id: state.nextId,
        info: state.inputValue.trim(),
        done:false
      }
      //添加
      state.list.push(obj)
      state.nextId++
      state.inputValue=''
    },
    // 根据id删除对应的任务事项
    removeItem(state, id) {
      // 根据ID查找对应项的索引
      const i = state.list.findIndex(x => x.id === id)
      // 根据索引，删除对应的元素
      if(i != -1) {
        state.list.splice(i, 1)
      }
    },
    // 修改列表项的选中状态
    changeStatus(state, param) {
      const i = state.list.findIndex(x => x.id === param.id)
      if(i != -1) {
        state.list[i].done = param.status
      }
    },
    cleanDone(state)  {
      state.list = state.list.filter( x => x.done === false)
    },
    // 修改视图的关键字
    changeViewKey(state, key) {
      state.viewKey = key


    }
  },
  actions: {
    //action中进行异步操作（发请求等）
    getList(context) {
      axios.get('./list.json').then(({ data }) => {
        // console.log(data)
        //请求成功之后调用commit（）函数
        context.commit('initList', data)

      })

    }
  },
  modules: {
  }
})
