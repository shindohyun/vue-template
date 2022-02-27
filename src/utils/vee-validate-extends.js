import {extend} from 'vee-validate'
import { required, email, confirmed } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: (fieldName) => `${fieldName}은(는) 필수 항목 입니다.`
})

// 예: 01011112222
extend('mobile', {
  validate: (value) => /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/.test(value),
  message: (fieldName) => `${fieldName} 형식이 아닙니다.`
})

// 예: 0211112222
extend('tel', {
  validate: (value) => /^\d{2,3}\d{3,4}\d{4}$/.test(value),
  message: (fieldName) => `${fieldName} 형식이 아닙니다.`
})

// 주민등록번호 (RRN: Resident Registration Number)
// 예: xxxxxx-xxxxxxx
extend('rrn', {
  validate: (value) => /^(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))-[1-4][0-9]{6}$/.test(value),
  message: (fieldName) => `${fieldName} 형식이 아닙니다.`
})

// 예: YYYY-MM-DD
extend('date', {
  validate: (value) => /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/.test(value),
  message: (fieldName) => `${fieldName} 형식이 아닙니다.`
})

// 예: YYYYMMDD
extend('dateNoHyphen', {
  validate: (value) => /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/.test(value),
  message: (fieldName) => `${fieldName} 형식이 아닙니다.`
})

extend('email', {
  ...email,
  message: (fieldName) => `${fieldName} 형식이 아닙니다.`
})

extend('confirmed', {
  ...confirmed,
  params: ['target'],
  message: (fieldName, placeholders) => `${placeholders.target}가 일치하지 않습니다.`
});

const ID_MIN = 5
const ID_MAX = 20
const ID_REGEX = new RegExp("^[a-z0-9-_]{"+ ID_MIN + "," + ID_MAX + "}$")
extend('id', {
  validate: (value) => ID_REGEX.test(value),
  message: (fieldName) => `${fieldName}는 ${ID_MIN}~${ID_MAX}자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.`
})

const PASSWORD_MIN = 8
const PASSWORD_MAX = 16
const PASSWORD_REGEX = new RegExp("^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{" + PASSWORD_MIN + "," + PASSWORD_MAX + "}$")
extend('password', {
  validate: (value) => PASSWORD_REGEX.test(value),
  message: (fieldName) => `${fieldName}는 ${PASSWORD_MIN}~${PASSWORD_MAX}자 영문 대 소문자, 숫자, 특수문자 조합을 사용하세요.`
})

const NAME_MIN = 2
const NAME_MAX = 16
const NAME_REGEX = new RegExp("^[가-힣a-zA-Z]{"+ NAME_MIN + "," + NAME_MAX +"}$")
extend('name', {
  validate: (value) => NAME_REGEX.test(value),
  message: (fieldName) => `${fieldName}은 한글과 영문 대 소문자를 사용하세요. (특수기호, 공백 사용 불가, ${NAME_MIN}~${NAME_MAX}자)`
})
