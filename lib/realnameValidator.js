/**
 * @file nameValidator.js
 * @author liumapp
 * @email liumapp.com@gmail.com
 * @homepage http://www.liumapp.com
 * @date 2018/10/29
 */

let realnameValidator = {
  /**
   * 判断姓名是否合法
   * 1. 姓名字段不能为空
   * 2. 姓名字段中不允许含有数字\标点符号(“·”除外），且首位与末位不能为空格
   * 3. 姓名字段中不允许含有汉字又同时含有字母
   * 4. 姓名字段长度不小于2个字符
   */
  validateRealName: function (value) {
    return /^[\u2E80-\u9FFF]+[·|\s|\u2E80-\u9FFF]*[\u2E80-\u9FFF]+$/.test(value) || /^[a-zA-Z]+[•|\s|a-zA-Z]*[a-zA-Z|•]+$/.test(value);
  }
};

export default realnameValidator;

