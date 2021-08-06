// import parseTime, formatTime and set to filter
export { parseTime, formatTime } from '@/utils'

/**
 * Show plural label if time is plural number
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

/**
 * @param {number} time
 */
export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * 转换关系
 * @param {value} string
 */
export function relationshipDic(value) {
  const dic = {
    '1': '户主',
    '2': '配偶',
    '3': '子女',
    '4': '租客',
    '5': '父母',
    '6': '亲属',
    '7': '对象',
    '8': '朋友',
    '9': '孙子女',
    '10': '兄弟'
  }
  return dic[value]
}
/**
 * 转换状态
 * @param {value} string
 */
export function statusDic(value) {
  const dic = {
    '1': '在户',
    '2': '外出务工',
    '3': '搬离'
  }
  return dic[value]
}
/**
 * 转换状态
 * @param {value} string
 */
export function delFlagDic(value) {
  const dic = {
    '0': '正常',
    '2': '冻结'
  }
  return dic[value]
}
/**
 * 转换状态
 * @param {value} string
 */
export function stateDic(value) {
  const dic = {
    '0': '上架',
    '1': '下架'
  }
  return dic[value]
}

/**
 * 转换角色
 * @param {value} string
 */
export function memberTypeDic(value) {
  const dic = {
    '1': '超级管理员',
    '2': '街道管理员',
    '3': '村管理员',
    '4': '小组长'
  }
  return dic[value] ? dic[value] : '超级管理员'
}
/**
 * 转换行政类型
 * @param {value} string
 */
export function adminTypeDic(value) {
  const dic = {
    '1': '区',
    '2': '街道',
    '3': '楼宇'
  }
  return dic[value]
}
/**
 * 转换组织类型
 * @param {value} string
 */
export function aorganizationTypeDic(value) {
  const dic = {
    '1': '政委',
    '2': '一级党组织',
    '3': '二级党组织'
  }
  return dic[value]
}
/**
 * 转换网格类型
 * @param {value} string
 */
export function gridTypeDic(value) {
  const dic = {
    '1': '镇',
    '2': '街道',
    '3': '村',
    '4': '小组'
  }
  return dic[value]
}
/**
 * 转换事迹类型
 * @param {value} string
 */
export function eventTypeDic(value) {
  const dic = {
    '1': '坏事迹',
    '2': '普通事迹',
    '3': '好事迹'
  }
  return dic[value]
}
/**
 * 转换相关人员
 * @param {data} arry
 */
export function messageUserSOS(data) {
  const arry = []
  if (data && data.length) {
    data.map((item) => {
      arry.push(item.householdUserName)
    })
  }
  return arry.join('、')
}
/**
 * 转换网格
 * @param {data} obj
 */
export function gridSO(data) {
  let arry = ''
  if (data) {
    const villageGridName = data.villageGridName || ''
    const oneGridName = data.oneGridName || ''
    const twoGridName = data.twoGridName || ''
    arry = villageGridName + '-' + oneGridName + '-' + twoGridName
  }
  return arry
}
