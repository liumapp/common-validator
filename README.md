# common-validator
Vue2.0项目中常用的各种验证规则集合，仅适用于国内地区。

## 如何使用

* 通过NPM加载依赖

	npm install --save vue2-common-validator 

* 配置Main.js

````javascript	
import commonValidator from 'vue2-common-validator'
Vue.use(commonValidator);
````
### 手机号码验证

````javascript
checkLoginForm: {
	phone: [
	  {
	    validator: this.$commonValidator.phone,
	    trigger: "blur,change"
	  }
	]
}
````

### 姓名验证

````javascript
checkNameForm: {
	realname: [
	  {
	    validator: this.$commonValidator.realname,
	    trigger: "blur,change"
	  }
	]
}
````	

### 身份证验证

````javascript
checkIdCardForm: {
	idcard: [
	  {
	    validator: this.$commonValidator.idcard,
	    trigger: "blur,change"
	  }
	]
}
````	


