/*
 * @Author: your name
 * @Date: 2021-04-20 20:42:40
 * @LastEditTime: 2021-04-20 21:21:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rewrite\Vue\observe-demo\observe.js
 */

function updateView() {
  console.log('视图更新');
}

// 重新定义属性，监听起来
function defineReactive(target, key, value) {
  // 深度监听
  observe(value);

  // 核心API
  Object.defineProperty(target, key, {
    get() {
      return value;
    },
    set(newVal) {
      // 深度监听
      observe(newVal);

      // 设置新值
      // 注意，value 一直在闭包中，此处设置完之后，再 get 时也是会获取最新的值
      value = newVal;

      // 触发更新
      updateView();
    },
  });
}

// 监听对象属性
function observe(target) {
  if (typeof target != 'object' || target === null) {
    return target;
  }

  // 重新定义各个属性
  for (let key in target) {
    defineReactive(target, key, target[key]);
  }
}

// data数据
const data = {
  name: 'zhangsan',
  age: 30,
  info: {
    address: '北京',
  },
  nums: [10, 20, 30],
};

//监听数据
observe(data);

// 测试
data.name = 'list';
data.age = 12;
data.info.address = '上海';
data.info = { area: '华北' };
data.info.area = '华东';
