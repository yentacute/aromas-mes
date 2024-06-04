import { parseTime } from './ruoyi'

/**
 * 表格时间格式化
 */
export function formatDate(cellValue) {
  if (cellValue == null || cellValue == "") return "";
  var date = new Date(cellValue)
  var year = date.getFullYear()
  var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str) {
  // returns the byte length of an utf8 string
  let s = str.length
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xDC00 && code <= 0xDFFF) i--
  }
  return s
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

/**
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

export function makeMap(str, expectsLowerCase) {
  const map = Object.create(null)
  const list = str.split(',')
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true
  }
  return expectsLowerCase
    ? val => map[val.toLowerCase()]
    : val => map[val]
}

export const exportDefault = 'export default '

export const beautifierConf = {
  html: {
    indent_size: '2',
    indent_char: ' ',
    max_preserve_newlines: '-1',
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: 'separate',
    brace_style: 'end-expand',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: false,
    end_with_newline: true,
    wrap_line_length: '110',
    indent_inner_html: true,
    comma_first: false,
    e4x: true,
    indent_empty_lines: true
  },
  js: {
    indent_size: '2',
    indent_char: ' ',
    max_preserve_newlines: '-1',
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: 'normal',
    brace_style: 'end-expand',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: true,
    end_with_newline: true,
    wrap_line_length: '110',
    indent_inner_html: true,
    comma_first: false,
    e4x: true,
    indent_empty_lines: true
  }
}

// 首字母大小
export function titleCase(str) {
  return str.replace(/( |^)[a-z]/g, L => L.toUpperCase())
}

// 下划转驼峰
export function camelCase(str) {
  return str.replace(/_[a-z]/g, str1 => str1.substr(-1).toUpperCase())
}

export function isNumberStr(str) {
  return /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g.test(str)
}

// 时间日期快捷选项，今天、昨天、本周、上周、本月、上月、本年累计，2023年至今 0：00 - 23:59:59 时间戳
export const shortcuts = [
  {
    text: "今日",
    value: () => {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      const start = now.getTime();
      now.setHours(23, 59, 59, 999);
      const end = now.getTime();
      return [start, end];
    }
  },
  {
    text: "昨日",
    value: () => {
      const now = new Date();
      now.setDate(now.getDate() - 1);
      now.setHours(0, 0, 0, 0);
      const start = now.getTime();
      now.setHours(23, 59, 59, 999);
      const end = now.getTime();
      return [start, end];
    }
  },
  {
    text: "上周",
    value: () => {
      function getPreStartDate() {
        const now = new Date().getTime();
        const curDay = new Date().getDay()
        const oneDay = 86400000;
        if (curDay == 1) {
          return new Date(now).setHours(0, 0, 0, 0) - oneDay*7
        }
        if (curDay == 0) {
          return new Date(now - 6*oneDay).setHours(0, 0, 0, 0)- oneDay*7
        }
        return new Date(now - ((curDay - 1) *oneDay)- oneDay*7).setHours(0, 0, 0, 0)
      }
      function getPreEndDate() {
        const now = new Date().getTime();
        const curDay = new Date().getDay()
        const oneDay = 86400000;
        if (curDay == 0) {
          return new Date(now).setHours(23, 59, 59, 999)- oneDay*7
        }
        return new Date(now + (7 - curDay)*oneDay).setHours(23, 59, 59, 999)- oneDay*7;
      }
      // const now = new Date("2024/1/14");
      // const firstDayOfWeek = new Date(
      //   now.getFullYear(),
      //   now.getMonth(),
      //   now.getDate() - now.getDay() - 6
      // );
      // firstDayOfWeek.setHours(0, 0, 0, 0);
      // const start = firstDayOfWeek.getTime();
      // const lastDayOfWeek = new Date(
      //   now.getFullYear(),
      //   now.getMonth(),
      //   now.getDate() - now.getDay()
      // );
      // lastDayOfWeek.setHours(23, 59, 59, 999);
      // const end = lastDayOfWeek.getTime();
      return [getPreStartDate(), getPreEndDate()];
    }
  },
  {
    text: "本周",
    value: () => {
      function getStartDate() {
        const now = new Date().getTime();
        const curDay = new Date().getDay()
        const oneDay = 86400000;
        if (curDay == 1) {
          return new Date(now).setHours(0, 0, 0, 0)
        }
        if (curDay == 0) {
          return new Date(now - 6*oneDay).setHours(0, 0, 0, 0)
        }
        return new Date(now - ((curDay - 1) *oneDay)).setHours(0, 0, 0, 0)
      }
      function getEndDate() {
        const now = new Date().getTime();
        const curDay = new Date().getDay()
        const oneDay = 86400000;
        if (curDay == 0) {
          return new Date(now).setHours(23, 59, 59, 999)
        }
        return new Date(now + (7 - curDay)*oneDay).setHours(23, 59, 59, 999);
      }
      return [getStartDate(), getEndDate()];
    }
  },
  {
    text: "本月",
    value: () => {
      // 获取起始时间戳
      const start = new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          1
      ).getTime();
      // 获取结束时间戳
      const end =
          new Date(
              new Date().getFullYear(),
              new Date().getMonth() + 1,
              0
          ).getTime() +
          24 * 60 * 60 * 1000 -
          1;
      return [start, end];
    }
  },
  {
    text: "上月",
    value: () => {
      // 获取当前日期
      const currentDate = new Date();
      // 获取上个月的年份和月份
      let lastMonthYear = currentDate.getFullYear();
      let lastMonthMonth = currentDate.getMonth() - 1;
      if (lastMonthMonth < 0) {
        // 如果上个月是去年的月份，则需要调整年份和月份
        lastMonthYear--;
        lastMonthMonth = 11; // 11 表示 12 月份
      }
      // 创建上个月的开始时间
      const lastMonthStartDate = new Date(lastMonthYear, lastMonthMonth, 1);
      const start = lastMonthStartDate.getTime();
      // 创建上个月的结束时间
      const lastMonthEndDate = new Date(lastMonthYear, lastMonthMonth + 1, 0);
      const end = lastMonthEndDate.getTime() + 24 * 60 * 60 * 1000 - 1;
      return [start, end];
    }
  },
  {
    text: "本年累计",
    value: () => {
      const start = new Date(new Date().getFullYear(), 0).getTime();
      const end =
          new Date(new Date().toLocaleDateString()).getTime() +
          24 * 60 * 60 * 1000 -
          1;
      return [start, end];
    }
  },
  {
    text: "2023年至今",
    value: () => {
      const start = new Date("2023-01-01 00:00:00").getTime();
      const end =
          new Date(new Date().toLocaleDateString()).getTime() +
          24 * 60 * 60 * 1000 -
          1;
      return [start, end];
    }
  }
];

// 时间选择器默认起止时间
export const defaultTime = [
  new Date(2000, 1, 1, 0, 0, 0),
  new Date(2000, 2, 1, 23, 59, 59)
];
