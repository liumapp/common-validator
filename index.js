/**
 * @file index.js
 * @author liumapp
 * @email liumapp.com@gmail.com
 * @homepage http://www.liumapp.com
 * @date 2018/10/29
 */
import idCard from './lib/IdCard';
import phoneValidator from './lib/phoneValidator';

let commonValidator = {};

commonValidator.install = function (Vue, options) {

  let opt = {
    defaultType: 'phone'
  };

  for (property in options) {
    opt[property] = options[property]
  };

  Vue.prototype.$commonValidator = function (type, rule, value, callback) {

    let curType = type ? type : opt.defaultType

    switch (curType) {
      case 'phone':
        phone(rule, value, callback);
        break;
      case 'idcard':
        idcard(rule, value, callback);
        break;
      case 'hello':
        hello();
        break;
      default:
        console.log('get the wrong type !')
    }
  };

  ['phone', 'idcard', 'hello'].forEach(function (type){
    Vue.prototype.$commonValidator[type] = function (rule, value, callback) {
      return Vue.prototype.$commonValidator(type, rule, value, callback)
    }
  });

  let hello = function () {
    alert(phoneValidator.rule);
  }

  let phone = function (rule, value, callback) {
    if (!value) {
      return callback(new Error('手机号不能为空'));
    } else if (!phoneValidator.rule.test(value)) {
      callback('手机号格式不正确');
    } else {
      callback();
    }
  }

  let idcard = function (rule, value, callback) {

  }

}

export default commonValidator;
// module.exports = commonValidator;
