// 验证手机号码
export function checkPhoneNumber(rule, value, callback) {
  const reg = /^((\d{7,8})|(1[3465789]\d{9}))$/
  if (!value) {
    // return callback(new Error('请填写手机号码'))
    callback()
  } else if (!reg.test(value)) {
    return callback(new Error('请填写正确的手机号码'))
  } else {
    callback()
  }
}

export function checkIdNum(rule, value, callback) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  if (!value) {
    // return callback(new Error('证件号码不能为空'))
    callback()
  } else if (!reg.test(value)) {
    return callback(new Error('证件号码不正确'))
  } else {
    callback()
  }
}
// export default {
//   checkPhone: [{ required: true, validator: checkPhoneNumber, trigger: 'blur' }],
//   checkId: [{ required: true, validator: checkIdNum, trigger: 'blur' }]
// }
