/**
 * @file index.js
 * @author liumapp
 * @email liumapp.com@gmail.com
 * @homepage http://www.liumapp.com
 * @date 2018/10/29
 */
import idCard from './lib/IdCard';
import phone from './lib/Phone';

var commonValidator = {};

commonValidator.install = function (Vue) {

  Vue.prototype.$commonValidator['phoneValidator'] = function (rule, value, callback) {
    if (!value) {
      return callback(new Error('手机号不能为空'));
    } else if (!phone.rule.test(value)) {
      callback('手机号格式不正确');
    } else {
      callback();
    }
  }

}


module.exports = commonValidator;
