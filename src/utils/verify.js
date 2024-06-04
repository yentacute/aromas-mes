/*一. 自定义校验*/
// 手机号码验证
export const validatePhone = (rule, value, callback) => {
  const patter = new RegExp('^1[3|4|5|6|7|8|9][0-9]{9}$')
  if (!value) {
    callback()
  } else
    if (!patter.test(value)) {
      return callback(new Error('请输入正确格式的手机号'))
    } else {
      callback()
    }
}
// 邮箱的正则
export const validateEmail = (rule, value, callback) => {
  const mailbox = new RegExp('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$')
  if (!value) {
    callback()
  } else if (!mailbox.test(value)) {
    return callback(new Error('请输入正确格式的邮箱'))
  } else {
    callback()
  }
}
// 2. 身份证号
export const validateIdCardNo = (rule, value, callback) => {
  const mailbox = new RegExp('^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$')
  if (!value) {
    callback()
  } else if (!mailbox.test(value)) {
    return callback(new Error('请输入正确格式的身份证号！'))
  } else {
    callback()
  }
}
// 3. 账号校验
export const valiAccountPass = (rule, value, callback) => {
  let reg = /^[a-zA-Z0-9./_@]+$/;
  if (reg.test(value)) {
    callback()
  } else {
    callback(new Error('请输入数字、字母或./_@'))
  }
}
//4. 密码校验
export const valiPasswordPass = (rule, value, callback) => {
  let reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}$/;
  if (reg.test(value)) {
    callback()
  } else {
    callback(new Error('用户名密码必须包含数字大小写字母和特殊字符'))
  }
}
//5. 银行卡号
// 银行卡号校验函数
export const checkCardNum = (rule, value, callback) => {
  var reg = /^([1-9]{1})(\d{14}|\d{18})$/;
  if (!value) {
    callback()
  } else if (reg.test(value)) {
    callback();
  } else {
    callback(new Error('银行卡号格式不正确'));
  }
}
/*二. 常用验证*/

//验证非空
export const requiredCheck = (msg, trigger = 'blur') => [{ required: true, message: msg, trigger: trigger }]

//校验字数范围
export const rangeCheck = ({ min, max, message }) => [{ min: min, max: max, message: message || `长度${min}到${max}个字符`, trigger: ["blur", 'change'] },]
//手机号码验证正则
export const telCheck = [{ pattern: /^1[3456789]\d{9}$/, message: "手机号格式不对", trigger: ["blur", 'change'] }]

//身份证验证
export const idCardCodeCheck = [
  {
    pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
    message: '证件号码格式有误！',
    trigger: 'blur',
  }]

//校验是否为数字
export const numberCheck = [{ pattern: /^[0-9]*$/, message: '请输入数字', trigger: ["blur", 'change'] }]

//校验座机号
export const landlineNumberCheck = [{ pattern: /^\d{3,4}\-\d{7,8}$/, message: "座机不正确,格式为：区号-座机号，例如：	07558886666", trigger: "blur" }]

//校验是否为汉字
export const hanzi = [{ pattern: /^[\u4e00-\u9fa5]{0,}$/, message: "姓名格式错误,请检查", trigger: "blur" }]

//金额校验,允许负数,两位小数
export const monnyPositiveCheck = [{ pattern: /(^([-]?)[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^([-]?)(0){1}$)|(^([-]?)[0-9]\.[0-9]([0-9])?$)/, message: '请输入正确的金额！', trigger: 'blur' }]

//金额校验,不允许负数,两位小数
export const monnyAllCheck = [{ pattern: /^\d+\.?\d{0,2}$/, message: '请输入正确的金额！', trigger: 'blur' }]
export const titleCheck = [
  {
    pattern: /^[\u4e00-\u9fa50-9-]+$/,
    message: "标题仅限汉字数字和短横线（-）！",
    trigger: ["blur"]
  }
];
