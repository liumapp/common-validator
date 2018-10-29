/**
 * @file idcardValidator.js
 * @author liumapp
 * @email liumapp.com@gmail.com
 * @homepage http://www.liumapp.com
 * @date 2018/10/29
 */

/**
 * 身份证校验
 */
let idcardValidator = {
  /**
   * 身份证验证
   */
  idCardValidate: function(idCard) {
    idCard = idCard ? idCard.replace(/ /g, '') : idCard; // 对身份证号码做处理。包括字符间有空格。
    /**
     * 验证15位数身份证号码中的生日是否是有效生日
     *
     * @param idCard15
     *            15位书身份证字符串
     * @return
     */
    let isValidityBrithBy15IdCard = function(idCard15) {
      let year = idCard15.substring(6, 8);
      let month = idCard15.substring(8, 10);
      let day = idCard15.substring(10, 12);
      let temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
      // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法
      if (
        temp_date.getYear() !== parseFloat(year) ||
        temp_date.getMonth() !== parseFloat(month) - 1 ||
        temp_date.getDate() !== parseFloat(day)
      ) {
        return false;
      }
      return true;
    };
    /**
     * 验证18位数身份证号码中的生日是否是有效生日
     *
     * @param {String} idCard18
     *            18位书身份证字符串
     * @return {Boolean}
     */
    let isValidityBrithBy18IdCard = function(idCard18) {
      let year = idCard18.substring(6, 10);
      let month = idCard18.substring(10, 12);
      let day = idCard18.substring(12, 14);
      let temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
      // 这里用getFullYear()获取年份，避免千年虫问题
      if (
        temp_date.getFullYear() !== parseFloat(year) ||
        temp_date.getMonth() !== parseFloat(month) - 1 ||
        temp_date.getDate() !== parseFloat(day)
      ) {
        return false;
      }
      return true;
    };
    /**
     * 判断身份证号码为18位时最后的验证位是否正确
     *
     * @param {Array} a_idCard
     *            身份证号码数组
     * @return {Boolean}
     */
    let isTrueValidateCodeBy18IdCard = function(a_idCard) {
      let Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]; // 加权因子
      let ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; // 身份证验证位值.10代表X
      let sum = 0; // 声明加权求和变量
      if (a_idCard[17].toLowerCase() === 'x') {
        a_idCard[17] = 10; // 将最后位为x的验证码替换为10方便后续操作
      }
      for (let i = 0; i < 17; i++) {
        sum += Wi[i] * a_idCard[i]; // 加权求和
      }
      valCodePosition = sum % 11; // 得到验证码所位置
      if (String(a_idCard[17]) === String(ValideCode[valCodePosition])) {
        return true;
      }
      return false;
    };
    if (/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idCard)) {
      if (idCard.length === 15) {
        return isValidityBrithBy15IdCard(idCard); // 进行15位身份证的验证
      } else if (idCard.length === 18) {
        let a_idCard = idCard.split(''); // 得到身份证数组
        if (
          isValidityBrithBy18IdCard(idCard) &&
          isTrueValidateCodeBy18IdCard(a_idCard)
        ) {
          // 进行18位身份证的基本验证和第18位的验证
          return true;
        }
        return false;
      }
    } else {
      return false;
    }
  },
  /**
   * 通过身份证获取出生日期
   *
   * @param {String} idCard
   *            15/18位身份证号码
   * @return {Boolean}
   */
  birthDayByIdCard: function(idCard) {
    idCard = idCard ? idCard.replace(/ /g, '') : idCard; // 对身份证号码做处理。包括字符间有空格。
    if (!this.idCardValidate(idCard)) return null;
    let year, month, day;
    if (idCard.length === 15) {
      year = idCard.substring(6, 8);
      month = idCard.substring(8, 10);
      day = idCard.substring(10, 12);
    } else {
      year = idCard.substring(6, 10);
      month = idCard.substring(10, 12);
      day = idCard.substring(12, 14);
    }
    return year + '-' + month + '-' + day;
  },
  /**
   * 通过身份证判断是男是女
   *
   * @param {String} idCard
   *            15/18位身份证号码
   * @return {String} '0'-男,'1'-女
   */
  maleOrFemalByIdCard: function(idCard) {
    idCard = idCard ? idCard.replace(/ /g, '') : idCard; // 对身份证号码做处理。包括字符间有空格。
    if (!this.idCardValidate(idCard)) return null;
    if (idCard.length === 15) {
      if (idCard.substring(14, 15) % 2 === 0) {
        return '1';
      }
      return '0';
    } else if (idCard.length === 18) {
      if (idCard.substring(14, 17) % 2 === 0) {
        return '1';
      }
      return '0';
    }
    return null;
  }
};

export default idcardValidator;
