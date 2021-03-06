// 时间转换
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        time = parseInt(time)
      } else {
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}
// 格式化时间
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
      '日'
      // +
      // d.getHours() +
      // '时' +
      // d.getMinutes() +
      // '分'
    )
  }
}

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

export function textFormat(e) {
  e.preventDefault()
  var text
  var clp = (e.originalEvent || e).clipboardData
  if (clp === undefined || clp === null) {
    text = window.clipboardData.getData('text') || ''
    if (text !== '') {
      if (window.getSelection) {
        var newNode = document.createElement('span')
        newNode.innerHTML = text
        window.getSelection().getRangeAt(0).insertNode(newNode)
      } else {
        document.selection.createRange().pasteHTML(text)
      }
    }
  } else {
    text = clp.getData('text/plain') || ''
    if (text !== '') {
      document.execCommand('insertText', false, text)
    }
  }
}
/**
 * @param {Function} fn 防抖函数
 * @param {Number} delay 延迟时间
 */
export function debounce(fn, delay) {
  var timer;
  return function () {
    var context = this;
    var args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}
// 根据身份证获取出生日期（yyyy-MM-dd）
export function GetBirthday(psidno) {
  var birthdayno, birthdaytemp
  if (psidno.length == 18) {
    birthdayno = psidno.substring(6, 14)
  } else if (psidno.length == 15) {
    birthdaytemp = psidno.substring(6, 12)
    birthdayno = "19" + birthdaytemp
  } else {
    return "";
  }
  var birthday = birthdayno.substring(0, 4) + "-" + birthdayno.substring(4, 6) + "-" + birthdayno.substring(6, 8)
  return birthday
}

// 根据输入的身份证获取性别代码
export function Getsex(psidno) {
  var sexno, sex
  if (psidno.length == 18) {
    sexno = psidno.substring(16, 17)
  } else if (psidno.length == 15) {
    sexno = psidno.substring(14, 15)
  } else {
    return "";
  }
  var tempid = sexno % 2;
  if (tempid == 0) {
    sex = 'F'
  } else {
    sex = 'M'
  }
  return sex
}
// 手机号验证规则
export function validatePhone(rule, value, callback) {
  const reg = /^1[3|4|5|6|7|8|9]\d{9}$/;
  if (!value) {
    return callback(new Error("请填写手机号码"));
  } else if (!reg.test(value)) {
    return callback(new Error("请填写正确的手机号码"));
  } else {
    callback();
  }
}
// 验证码验证规则
export function validateCode(rule, value, callback) {
  const reg = /^\d{6}$/;
  if (!value) {
    return callback(new Error("请填写短信验证码"));
  } else if (!reg.test(value)) {
    return callback(new Error("请填写6位短信验证码"));
  } else {
    callback();
  }
}
// 身份证验证规则
export function validateIdCard(rule, value, callback) {
  const reg = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  if (!value) {
    return callback(new Error("请填写身份证号"))
  } else if (!reg.test(value)) {
    return callback(new Error("请填写正确的身份证号"))
  } else {
    callback();
  }
}
// 时间验证规则
export function validateTime(rule, value, callback) {
  let time = new Date().valueOf()
  if (!value) {
    return callback(new Error("请选择时间"));
  } else if (value > time) {
    return callback(new Error("监测时间不能大于现在时间"));
  } else {
    callback();
  }
}
// 收缩压 舒张压 输入限制
export function validateDiastoleLowPressure(rule, value, callback) {
  if (!value) {
    return callback(new Error('舒张压不能为空'))
  } else if (value > 200) {
    return callback(new Error('舒张压不能超过200'))
  } else {
    callback();
  }
}
// 血糖保留一位小数
export function validateGlucoseScore(rule, value, callback) {
  if (!value) {
    callback(new Error("请输入血糖"));
  } else if (value.indexOf(".") != -1 && value.split(".").length > 2) {
    callback(new Error("请输入正确格式的血糖")); //防止输入多个小数点
  } else if (value.indexOf(".") != -1 && value.split(".")[1].length > 1) {
    callback(new Error("请输入正确的小数位数")); //小数点后两位
  } else {
    callback();
  }
};

// 保留N未小数
export function fomatFloat(value, n) {
  var f = Math.round(value * Math.pow(10, n)) / Math.pow(10, n);
  var s = f.toString();
  var rs = s.indexOf('.');
  if (rs < 0) {
    s += '.';
  }
  for (var i = s.length - s.indexOf('.'); i <= n; i++) {
    s += "0";
  }
  return s;
}

// 秒转时分
export function formatSeconds(value) {
  let result = parseInt(value)
  let h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600);
  let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
  let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));

  let res = '';
  if (h !== '00') res += `${h}时`;
  if (m !== '00') res += `${m}分`;
  res += `${s}秒`;
  return res;
}
// base64转file
export function base64ToFile(dataUrl, name) {
  var arr = dataUrl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], name + '.jpg', { type: "image/jpg" });
}

// 文化程度
export const educationType = [
  { id: 1, label: "研究生及以上", value: "POSTGRADUATE" },
  { id: 2, label: "大学本科", value: "UNDERGRADUATE" },
  { id: 3, label: "大学专科和专科学校", value: "SPECIALIST" },
  { id: 4, label: "中专", value: "TECHNICAL_SECONDARY" },
  { id: 5, label: "技工学校", value: "MECHANIC" },
  { id: 6, label: "高中", value: "SENIOR_MIDDLE" },
  { id: 7, label: "初中及以下", value: "JUNIOR_HIGH" },
]
// 医师类型列表
export const doctorTypeList = [
  { id: 1, label: "医师", value: "PHYSICIAN" },
  { id: 2, label: "主治医师", value: "ATTENDING_PHYSICIAN" },
  { id: 3, label: "副主任医师", value: "ASSOCIATE_CHIEF_PHYSICIAN" },
  { id: 4, label: "主任医师", value: "CHIEF_PHYSICIAN" },
]

// 随访方式列表
export const followTypeList = [
  { id: 1, label: "门诊随访", value: "OUTPATIENT" },
  { id: 2, label: "家庭随访", value: "FAMILY" },
  { id: 3, label: "电话随访", value: "PHONE" },
  { id: 4, label: "视频随访", value: "VIDEO" },
  { id: 5, label: "集体随访", value: "COLLECTIVE" },
]
// 随访类型
export const followType = [
  { id: 1, label: "高血压", value: "HIGH_BLOOD" },
  { id: 2, label: "糖尿病", value: "DIABETES" },
]
// 审核类型
export const auditStatus = [
  { id: 1, label: "待公司审核", value: "TO_AUDIT" },
  { id: 2, label: "公司已审核", value: "PLATFORM_COMPLETE_AUDIT" },
  { id: 3, label: "待医院审核", value: "TO_HOSPITAL_AUDIT" },
  { id: 4, label: "医院已审核", value: "HOSPITAL_COMPLETE_AUDIT" },
  { id: 5, label: "已作废", value: "INVALID" },
]
// 角色类型
export const adminRoleTypeList = [
  { id: 1, label: "管理员", value: "ADMIN" },
  { id: 2, label: "运营人员", value: "OPERATOR" },
  { id: 3, label: "数据大图", value: "VIEWER" },
  { id: 4, label: "医院心电医师", value: "HOSPITAL_ECG_DOCTOR" },
  { id: 5, label: "公司心电医师", value: "PLAT_FORM_ECG_DOCTOR" },
]
// 设备类型
export const deviceTypeList = [
  { id: 1, label: "苹果", value: "IOS" },
  { id: 2, label: "安卓", value: "ANDROID" },
  // { id: 3, label: "H5", value: "H5" },
  // { id: 4, label: "PC", value: "PC_WEB" },
]

// app类型列表
export const appTypeList = [
  { id: 1, label: "医师端", value: "DOCTOR" },
  { id: 2, label: "用户端", value: "PATIENT" },
]

// banner上下架状态
export const typeList = [
  { id: 1, label: "上架", value: "UP" },
  { id: 2, label: "下架", value: "DOWN" },
]

// 新闻资讯上下架状态
export const newsStatusList = [
  { id: 1, label: "上架", value: "SHOW" },
  { id: 2, label: "下架", value: "DELETE" },
]
// 新闻类型
export const newsTypeList = [
  { id: 1, label: "资讯", value: "NEWS" },
  { id: 2, label: "视频", value: "VIDEO" },
  { id: 3, label: "直播", value: "LIVE" },
]
// 海多新闻类型
export const hidoNewsTypeList = [
  { id: 1, label: "媒体报道", value: "HD_REPORTS" },
  { id: 2, label: "企业动态", value: "HD_DYNAMIC" },
  { id: 3, label: "视频集锦", value: "HD_VIDEO" },
  { id: 4, label: "政策解读", value: "HD_POLICY_INTERPRETATION" },
  { id: 5, label: "政策支持", value: "HD_POLICY_SUPPORT" },
]
// 医院级别列表
export const hospitalClassList = [
  { id: 1, label: "三甲", value: "CLASS_3_A" },
  { id: 2, label: "三乙", value: "CLASS_3_B" },
  { id: 3, label: "二甲", value: "CLASS_2_A" },
  { id: 4, label: "二乙", value: "CLASS_2_B" },
  { id: 5, label: "一级", value: "CLASS_1_A" },
]

// 关系列表
export const relationshipList = [
  { id: 1, label: "家人", value: "FAMILY" },
  { id: 2, label: "朋友", value: "FRIENDS" },
  { id: 3, label: "亲人", value: "RELATIVE" },
]

// 加入方式
export const resourceTypeList = [
  { id: 1, label: "医院派发", value: "ADMIN" },
  { id: 2, label: "主动加入", value: "INITIATIVE" },
]
// 性别列表
export const genderList = [
  { id: 1, label: "男", value: "MALE" },
  { id: 2, label: "女", value: "FEMALE" },
]

// 状态
export const statusList = [
  { id: 1, label: "未完成", value: "PENDING" },
  { id: 2, label: "已完成", value: "FINISH" },
  { id: 3, label: "已取消", value: "CANCEL" },
  { id: 4, label: "超时", value: "OVERDUE" }
]

// 高血压糖尿病结果列表
export const healthList = [
  { id: 1, label: "健康", value: "HEALTH" },
  { id: 4, label: "轻度", value: "SLIGHT" },
  { id: 3, label: "中度", value: "MEDIUM" },
  { id: 2, label: "重度", value: "SERIOUS" },
]

// 心率枚举
export const heartList = [
  { id: 1, label: "稍慢", value: "SLOW" },
  { id: 2, label: "稍快", value: "FAST" },
  { id: 3, label: "正常", value: "NORMAL" },
]


// 用户状态
export const userStatusList = [
  { id: 1, label: "良好", value: "HEALTH" },
  { id: 2, label: "轻微", value: "SLIGHT" },
  { id: 3, label: "严重", value: "SERIOUS" },
]

// 饮食习惯
export const eatHabitsList = [
  { id: 1, label: "清淡", value: "LIGHT" },
  { id: 2, label: "高盐", value: "HIGH_SALT" },
  { id: 3, label: "高脂 ", value: "HIGH_FAT" },
  { id: 4, label: "高糖", value: "HIGH_GLUCOSE" },
]

// 是否饮酒 抽烟
export const isSmokeList = [
  { id: 1, label: "从不", value: "NEVER" },
  { id: 2, label: "偶尔", value: "HAPLY" },
  { id: 3, label: "经常 ", value: "OFTEN" },
  { id: 4, label: "已戒", value: "QUIT" },
]

// 熬夜情况
export const stayUpLateList = [
  { id: 1, label: "从不", value: "NEVER" },
  { id: 2, label: "偶尔", value: "HAPLY" },
  { id: 3, label: "经常 ", value: "OFTEN" },
]

// 运动情况
export const exerciseList = [
  { id: 1, label: "1-3次", value: "ONE_THREE" },
  { id: 2, label: "4-7次", value: "FOUR_SEVEN" },
  { id: 3, label: "大于7次", value: "EXCEED_SEVEN" },
  { id: 4, label: "不运动 ", value: "NONE" },
]

// 慢性病史
export const chronicDiseaseList = [
  { id: 1, label: "糖尿病", value: "DIABETES" },
  { id: 2, label: "高血压", value: "HYPERTENSION" },
  { id: 3, label: "肿瘤", value: "TUMOR" },
  { id: 4, label: "慢性支气管炎 ", value: "CHRONIC_BRONCHITIS" },
  { id: 5, label: "心脏病 ", value: "HEART_DISEASE" },
  { id: 6, label: "其他 ", value: "OTHER" },
]

//  肝肾功能情况
export const liverFunction = [
  { id: 1, label: "异常", value: "ABNORMAL" },
  { id: 2, label: "正常", value: "NORMAL" },
]

//  有无情况
export const carotidPlaque = [
  { id: 1, label: "有", value: "HAVE" },
  { id: 2, label: "无", value: "NONE" },
]

//  静坐时长
export const sitType = [
  { id: 1, label: "小于八小时", value: "BEFORE_EIGHT" },
  { id: 2, label: "大于八小时", value: "AFTER_EIGHT" },
]

// 血型类型
export const bloodTypeList = [
  { id: 1, label: "A型", value: "A" },
  { id: 2, label: "B型", value: "B" },
  { id: 3, label: "O型", value: "O" },
  { id: 4, label: "AB型", value: "AB" },
  { id: 5, label: "AB型RH阳性", value: "RH_Y" },
  { id: 6, label: "AB型RH阴性", value: "RH_N" },
  { id: 7, label: "不详", value: "UNKNOWN" },
]
// 血型类型
export const marriageList = [
  { id: 1, label: "未婚", value: "UNMARRIED" },
  { id: 2, label: "已婚", value: "MARRIED" },
  { id: 3, label: "丧偶", value: "WIDOWED" },
  { id: 4, label: "离婚", value: "DIVORCE" },
  { id: 5, label: "其他", value: "OTHER" },
]
// 转诊状态列表
export const transferStatusList = [
  { id: 1, label: "待转诊确认", value: "WAIT" },
  { id: 2, label: "转诊中", value: "ING" },
  { id: 3, label: "已转诊", value: "END" },
  { id: 4, label: "未转诊", value: "NONE" },
  { id: 5, label: "向上转诊", value: "UP" },
  { id: 6, label: "向下转诊", value: "DOWN" },
  { id: 7, label: "转诊拒绝", value: "REFUSE" },
]

export const equipmentResourceTypeList = [
  { id: 1, label: "手动录入", value: "MANUAL" },
  { id: 2, label: "设备监测", value: "DETECTION" }
]
// 心里调整 遵医行为
export const complianceList = [
  { id: 1, label: "非常好", value: "VERY_GOOD" },
  { id: 2, label: "良好", value: "GOOD" },
  { id: 3, label: "一般", value: "GENERAL" },
  { id: 4, label: "差", value: "DIFF" }
]
// 随访分类
export const followClassStatusList = [
  { id: 1, label: "控制满意", value: "SATISFACTION" },
  { id: 2, label: "控制不满意", value: "NO_SATISFACTION" },
  { id: 3, label: "不良反应", value: "ADVERSE_REACTIONS" },
  { id: 4, label: "并发症", value: "COMPLICATION" }
]
// 糖尿病症状类型
export const symptomTypeList = [
  { id: 1, label: "多饮", value: "MANY_DRINK" },
  { id: 2, label: "多食", value: "MANY_EAT" },
  { id: 3, label: "多尿", value: "MANY_PEE" },
  { id: 8, label: "体重减轻", value: "WEIGHT_LOSS" },
  { id: 9, label: "头晕", value: "DIZZINESS" },
  { id: 6, label: "四肢麻木", value: "NUMBNESS_IN_HANDS_AND_FEET" },
  { id: 7, label: "乏力", value: "FATIGUE" },
  { id: 4, label: "视力模糊", value: "BLURRED_VISION" },
  { id: 5, label: "皮肤感染", value: "SKIN_INFECTION" },
]
// 高血压症状类型
export const bloodSymptomTypeList = [
  { id: 9, label: "头晕", value: "DIZZINESS" },
  { id: 10, label: "头痛", value: "HEADACHE" },
  { id: 11, label: "心悸", value: "PALPITATIONS" },
  { id: 12, label: "胸闷", value: "CHEST_TIGHTNESS" },
  { id: 13, label: "胸痛", value: "CHEST_PAIN" },
  { id: 14, label: "下肢浮肿", value: "SWELLING_OF_LOWER_EXTREMITIES" },
]
// 足动脉
export const dorsalArteryStatusList = [
  { id: 1, label: "触及", value: "TOUCH" },
  { id: 2, label: "未触及", value: "NONE_TOUCH" },
]
// 并发症症状
export const complicationTypeList = [
  { id: 1, label: "糖尿病足", value: "DIABETIC_FOOT" },
  { id: 2, label: "糖尿病眼病", value: "DIABETIC_EYE_DISEASE" },
  { id: 3, label: "糖尿病肾病", value: "DIABETIC_NEPHROPATHY" },
  { id: 4, label: "心脑血管病变", value: "CARDIOVASCULAR_AND_CEREBROVASCULAR_DISEASE" },
  { id: 5, label: "各类感染", value: "VARIOUS_INFECTIONS" },
  { id: 6, label: "糖尿病酮症酸中毒", value: "DIABETIC_KETOACIDOSIS" },
  { id: 7, label: "高渗性昏迷", value: "HYPERTONIC_COMA" },
  { id: 8, label: "低血糖", value: "HYPOGLYCEMIA" },
]
// 高血压并发症症状
export const bloodComplicationTypeList = [
  { id: 9, label: "冠心病", value: "CORONARY_HEART_DISEASE" },
  { id: 10, label: "心律失常", value: "ARRHYTHMIA" },
  { id: 11, label: "房颤", value: "ATRIAL_FIBRILLATION" },
  { id: 12, label: "心肌梗塞", value: "MYOCARDIAL_INFARCTION" },
  { id: 13, label: "脑溢血", value: "CEREBRAL_HEMORRHAGE" },
  { id: 14, label: "脑梗塞", value: "CEREBRAL_INFARCTION" },
  { id: 15, label: "视力减退", value: "VISION_LOSS" },
  { id: 16, label: "眼底出血", value: "FUNDUS_BLEEDING" },
  { id: 17, label: "下肢动脉硬化（间歇性跛行）", value: "LIMB_ARTERIOSCLEROSIS" },
]
// 转诊原因
export const referralReasonStatusesList = [
  { id: 1, label: "空腹血糖≥16.7mmol", value: "FASTING_BLOOD_GLUCOSE" },
  { id: 2, label: "收缩压≥180mmHg和（或）舒张压≥110mmHg", value: "SHRINK_HIGH_PRESSURE_OR_DIASTOLE_LOW_PRESSURE" },
  { id: 3, label: "意识或行为改变、呼吸有烂苹果丙酮味、心悸、出汗、食欲减退、恶心、呕吐、多饮、多尿、腹痛、有深大呼吸、皮肤潮红", value: "BEHAVIOR_CHANGE" },
  { id: 4, label: "持续性心动过速（心率超过100次/分钟）", value: "PERSISTENT_TACHYCARDIA" },
  { id: 5, label: "体温超过39摄氏度", value: "TEMPERATURE_EXCEEDS" },
  { id: 6, label: "其他的突发异常情况（如视力突然骤降、妊娠期及哺乳期血糖高于正常等危险情况之一）", value: "OTHER_ABNORMALITIES" },
  { id: 7, label: "存在不能处理的其他疾病", value: "CANT_HANDLE_DISEASE" },
  { id: 8, label: "连续两次血糖控制不满意", value: "CONTINUOUS_TWO_BLOOD_SUGAR_CONTROL_NO_SATISFACTION" },
  { id: 9, label: "药物不良反应难以控制", value: "DRUG_ADVERSE_REACTIONS_CANT_CONTROL" },
  { id: 10, label: "出现新的并发症或原有并发症加重", value: "NEW_COMPLICATION" },
]
// 高血压转诊原因
export const BloodReferralReasonStatusesList = [
  { id: 2, label: "收缩压≥180mmHg和（或）舒张压≥110mmHg", value: "SHRINK_HIGH_PRESSURE_OR_DIASTOLE_LOW_PRESSURE" },
  { id: 11, label: "意识改变、剧烈头痛或头晕、恶心呕吐、视力模糊、眼痛、心悸、胸闷、喘憋不能平卧、心前区疼痛", value: "CHANGE_OF_CONSCIOUSNESS" },
  { id: 7, label: "存在不能处理的其他疾病", value: "CANT_HANDLE_DISEASE" },
  { id: 12, label: "处于妊娠期或哺乳期同时血压高于正常等危急情况", value: "ARE_PREGNANT_OR_BREASTFEEDING" },
  { id: 13, label: "连续两次血压控制不满意", value: "UNSATISFACTORY_BLOOD_PRESSURE_CONTROL" },
  { id: 14, label: "连续两次出现药物不良反应没改善", value: "ADVERSE_DRUG_REACTIONS_HAVE_NOT_IMPROVED" },
  { id: 10, label: "出现新的并发症或原有并发症加重", value: "NEW_COMPLICATION" },
]
// 胰岛素品种
export const insulinVarietiesTypeList = [
  { id: 1, label: "动物胰岛素", value: "ANIMAL" },
  { id: 2, label: "人胰岛素和胰岛素类似物", value: "HUMAN" },
  { id: 3, label: "短效胰岛素", value: "SHORT_TERM" },
  { id: 4, label: "中效胰岛素", value: "DURING_TERM" },
  { id: 5, label: "长效胰岛素", value: "LONG_TERM" },
  { id: 6, label: "混合胰岛素", value: "MIXING_TERM" },
]
// 胰岛素用法
export const insulinUsingsList = [
  { id: 1, label: "餐前", value: "BEFORE_MEAL" },
  { id: 2, label: "皮下", value: "SUBCUTANEOUS" },
]
// 服药依从性
export const medicationStatusList = [
  { id: 1, label: "规律服药", value: "LAW" },
  { id: 2, label: "间断服药", value: "INTERMITTENT" },
  { id: 3, label: "不服药", value: "NONE" },
]
// 药物不良反应
export const drugReactionList = [
  { id: 1, label: "有", value: "HAVE" },
  { id: 2, label: "无", value: "NONE" },
]
export const hypoglycemiaReactionList = [
  // { id: 1, label: "有", value: "HAVE" },
  { id: 2, label: "无", value: "NONE" },
  { id: 3, label: "偶尔", value: "OCCASIONALLY" },
  { id: 4, label: "频繁", value: "FREQUENTLY" },
]
// 个性化健康教育
export const healthEducationTypesList = [
  { id: 2, label: "限盐", value: "LIMIT_SALT" },
  { id: 3, label: "限烟或戒烟", value: "LIMIT_SMOKE" },
  { id: 4, label: "限酒或戒酒", value: "LIMIT_LIQUEUR" },
  { id: 5, label: "减少甜食", value: "LIMIT_SWEETS" },
  { id: 6, label: "减少膳食脂肪", value: "LIMIT_DIETARY_FAT" },
  { id: 7, label: "平衡膳食", value: "BALANCED_DIET" },
  { id: 8, label: "适当运动", value: "PROPER_EXERCISE" },
  { id: 9, label: "定期监测血糖(空腹血糖和餐后小时)", value: "MONITOR_BLOOD_SUGAR_REGULARLY" },
  { id: 10, label: "定期测量血压", value: "REGULAR_BLOOD_PRESSURE_MEASUREMENT" },
  { id: 11, label: "放松情绪", value: "RELAX_EMOTIONS" },
  { id: 12, label: "适当用药", value: "APPROPRIATE_MEDICATION" },
  { id: 13, label: "预防低血糖", value: "PREVENT_HYPOGLYCEMIA" },
  { id: 14, label: "用药指导", value: "MEDICATION_GUIDANCE" },
]
// 药品过敏
export const allergyTypesList = [
  { id: 1, label: "非药品过敏", value: "NO_DRUG_ALLERGY" },
  { id: 2, label: "药品过敏", value: "DRUG_ALLERGY" },
]
// 既往史疾病
export const pastHistoryTypeList = [
  { id: 1, label: "疾病", value: "DISEASE" },
  { id: 2, label: "手术", value: "SURGERY" },
  { id: 3, label: "外伤", value: "TRAUMA" },
  { id: 4, label: "输血", value: "BLOOD_TRANSFUSION" },
]
// 暴露史
export const exposureTypesList = [
  { id: 1, label: "化学品", value: "CHEMICALS" },
  { id: 2, label: "毒物", value: "POISON" },
  { id: 3, label: "射线", value: "RAYS" },
  { id: 4, label: "针刺伤", value: "NEEDLE_STICK_INJURY" },
]
// 家族史
export const diseaseTypeList = [
  { id: 1, label: "高血压", value: "HIGH_BLOOD" },
  { id: 2, label: "糖尿病", value: "DIABETES" },
  // { id: 3, label: "心率", value: "HEART_RATE" },
  { id: 4, label: "冠心病", value: "CORONARY_HEART_DISEASE" },
  { id: 5, label: "慢性阻塞性肺疾病", value: "CHRONIC_OBSTRUCTIVE_PULMONARY" },
  { id: 6, label: "恶性肿瘤", value: "MALIGNANT_TUMOR" },
  { id: 7, label: "脑卒中", value: "STROKE" },
  { id: 8, label: "重性精神疾病", value: "SEVERE_MENTAL_ILLNESS" },
  { id: 9, label: "结核病", value: "TUBERCULOSIS" },
  { id: 10, label: "肝炎", value: "HEPATITIS" },
  { id: 11, label: "先天畸形", value: "CONGENITAL_MALFORMATIONS" },
  { id: 12, label: "其他", value: "OTHER" },
]
// 残疾情况
export const disabilityTypesList = [
  { id: 1, label: "视力残疾", value: "VISION" },
  { id: 2, label: "听力残疾", value: "HEARING" },
  { id: 3, label: "言语残疾", value: "SPEECH" },
  { id: 4, label: "肢体残疾", value: "LIMB" },
  { id: 5, label: "智力残疾", value: "INTELLECT" },
  { id: 6, label: "精神残疾", value: "SPIRIT" },
]
// 血糖监测类型
export const glucoseDetectType = [
  { id: 1, label: "凌晨", value: "EARLYMORNING" },
  { id: 2, label: "空腹", value: "LIMOSIS" },
  { id: 3, label: "早餐后", value: "AFTERBREAKFAST" },
  { id: 4, label: "午餐前", value: "BEFORELUNCH" },
  { id: 5, label: "午餐后", value: "AFTERLUNCH" },
  { id: 6, label: "晚餐前", value: "BEFOREDINNER" },
  { id: 7, label: "晚餐后", value: "AFTERDINNER" },
  { id: 8, label: "睡前", value: "BEFOREGOINGTOBED" },
  { id: 9, label: "随机", value: "RANDOM" },
]
// 心率测量结果
export const resultStatus = [
  { id: 2, label: "正常", value: "NORMAL" },
  { id: 3, label: "导联脱落", value: "FALL_OFF" },
  { id: 4, label: "数据干扰", value: "INTERFERENCE" },
]
// 处置建议类型
export const suggestionList = [
  { id: 2, label: "重新测量", value: "REMEASURE" },
  { id: 3, label: "定期复查", value: "REGULAR_REVIEW" },
  { id: 4, label: "治疗后复查", value: "AFTER_TREATMENT_REVIEW" },
  { id: 5, label: "进一步检查治疗", value: "FURTHER_TREATMENT" },
  { id: 6, label: "转诊治疗", value: "REFERRAL_TREATMENT" },
  { id: 7, label: "转院治疗", value: "TRANSFER_TREATMENT" },
]
// Ai任务状态
export const AiTaskStatus = [
  { id: 2, label: "未开始", value: "NOT_STARTED" },
  { id: 3, label: "进行中", value: "IN_PROCESS" },
  { id: 4, label: "已完成", value: "COMPLETED" },
  { id: 5, label: "可运行", value: "RUNNABLE" },
  { id: 6, label: "用户暂停", value: "USER_PAUSE" },
  { id: 7, label: "系统暂停", value: "SYSTEM_SUSPENDED" },
  // { id: 8, label: "已终止", value: "TERMINATE" },
  // { id: 9, label: "排队中", value: "IN_QUEUE" },
  { id: 10, label: "系统挂起", value: "SYSTEM_HANG_UP" },
  // { id: 11, label: "等待重呼", value: "WAITING_FOR_REDIAL" },
  // { id: 12, label: "账户禁用", value: "ACCOUNT_DISABLE" },
  // { id: 13, label: "系统维护", value: "MAINTAIN" },
]
// 通话 状态
export const AiResultStatus = [
  { id: 2, label: "已接听", value: "ANSWERED" },
  { id: 3, label: "无应答", value: "NO_ANSWER" },
  { id: 4, label: "忙线中", value: "BUSY" },
  { id: 5, label: "关机", value: "POWER_OFF" },
  { id: 6, label: "停机", value: "OUT_OF_SERVICE" },
  { id: 7, label: "拒接", value: "REFUSED" },
  { id: 8, label: "空号 ", value: "VACANT_NUMBER" },
  { id: 9, label: "无法接通", value: "CAN_NOT_CONNECT" },
  { id: 10, label: "主叫欠费", value: "FROM_PHONE_ERROR" },
  { id: 11, label: "外呼失败", value: "SYSTEM_ERROR" },
  // { id: 12, label: "多并发呼损", value: "CALL_LOSS" },
  // { id: 13, label: "转人工呼损", value: "TRANSFER_ARTIFICIAL" },
]

// 打印 状态
export const printStatusList = [
  { id: 2, label: "已打印", value: "HAVE_PRINT" },
  { id: 3, label: "未打印", value: "NOT_PRINT" },
]

// 问题统计 用户回答状态
export const problemState = [
  { id: 2, label: "是", value: "YES" },
  { id: 3, label: "否", value: "NO" },
  { id: 4, label: "不知道", value: "UNKNOWN" },
  { id: 5, label: "不明确", value: "UNRECOGNIZED" },
]

// 积分商城 订单状态
export const ordeStatus = [
  { id: 1, label: "已完成", value: "SUCCESS" },
  { id: 2, label: "待收货", value: "WAIT_CONFIRM" },
  { id: 3, label: "待发货", value: "WAIT_DELIVERY" },
]

// 所有枚举类型转义
export const formatterElement = {
  // 随访方式
  followType: {
    OUTPATIENT: "门诊随访",
    FAMILY: "家庭随访",
    PHONE: "电话随访",
    VIDEO: "视频随访",
    COLLECTIVE: "集体随访",
  },
  // 随访类型
  followTypeList: {
    HIGH_BLOOD: "高血压",
    DIABETES: "糖尿病",
  },
  // 高血压状态
  highBlood: {
    HEALTH: "健康",
    SLIGHT: "轻度",
    MEDIUM: "中度",
    SERIOUS: "重度",

  },
  // 糖尿病状态
  diabetes: {
    HEALTH: "健康",
    SLIGHT: "轻度",
    MEDIUM: "中度",
    SERIOUS: "重度",
  },
  // 心率状态
  heart: {
    NORMAL: "正常",
    SLOW: "稍慢",
    FAST: "稍快",
  },
  // 加入方式
  resource: {
    ADMIN: "医院派发",
    INITIATIVE: "主动加入",
  },
  doctorType: {
    PHYSICIAN: "医师",
    ATTENDING_PHYSICIAN: "主治医师",
    ASSOCIATE_CHIEF_PHYSICIAN: "副主任医师",
    CHIEF_PHYSICIAN: "主任医师",
  },
  status: {
    PENDING: "未完成",
    FINISH: "已完成",
    CANCEL: "已取消",
    OVERDUE: "超时",
  },
  contentType: {
    NEWS: "资讯",
    VIDEO: "视频",
    LIVE: "直播",
  },
  hidoContentType: {
    HD_REPORTS: "媒体报道",
    HD_DYNAMIC: "企业动态",
    HD_VIDEO: "视频集锦",
    HD_POLICY_INTERPRETATION: "政策解读",
    HD_POLICY_SUPPORT: "政策支持",
  },
  // 医院级别列表
  hospitalType: {
    CLASS_3_A: "三甲",
    CLASS_3_B: "三乙",
    CLASS_2_A: "二甲",
    CLASS_2_B: "二乙",
    CLASS_1_A: "一级",
  },
  gender: {
    MALE: "男",
    FEMALE: "女"
  },
  relationship: {
    FAMILY: "家人",
    FRIENDS: "朋友",
    RELATIVE: "亲人"
  },
  appType: {
    DOCTOR: "医师端",
    PATIENT: "用户端",
  },
  deviceType: {
    IOS: "苹果",
    ANDROID: "安卓",
    H5: "H5",
    PC: "PC",
  },
  userStatus: {
    HEALTH: "良好",
    SLIGHT: "轻微",
    SERIOUS: "严重",
  },
  transferStatus: {
    WAIT: "待转诊确认",
    ING: "转诊中",
    END: "已转诊",
    NONE: "未转诊",
    UP: "向上转诊",
    DOWN: "向下转诊",
    REFUSE: "转诊拒绝",
  },
  transferStatus: {
    WAIT: "待转诊确认",
    ING: "转诊中",
    END: "已转诊",
    NONE: "未转诊",
    UP: "向上转诊",
    DOWN: "向下转诊",
    REFUSE: "转诊拒绝",
  },
  diseaseType: {
    HIGH_BLOOD: "高血压",
    DIABETES: "糖尿病",
    HEART_RATE: "心率",
    CORONARY_HEART_DISEASE: "冠心病",
    CHRONIC_OBSTRUCTIVE_PULMONARY: "慢性阻塞性肺疾病",
    MALIGNANT_TUMOR: "恶性肿瘤",
    STROKE: "脑卒中",
    SEVERE_MENTAL_ILLNESS: "重性精神疾病",
    TUBERCULOSIS: "结核病",
    HEPATITIS: "肝炎",
    CONGENITAL_MALFORMATIONS: "先天畸形",
    OTHER: "其他",
  },
  glucoseDetectType: {
    EARLYMORNING: "凌晨",
    LIMOSIS: "空腹",
    AFTERBREAKFAST: "早餐后",
    BEFORELUNCH: "午餐前",
    AFTERLUNCH: "午餐后",
    BEFOREDINNER: "晚餐前",
    AFTERDINNER: "晚餐后",
    BEFOREGOINGTOBED: "睡前",
    RANDOM: "随机",
  },
  auditStatus: {
    TO_AUDIT: "待公司审核",
    PLATFORM_COMPLETE_AUDIT: "公司已审核",
    TO_HOSPITAL_AUDIT: "待医院审核",
    HOSPITAL_COMPLETE_AUDIT: "医院已审核",
    INVALID: "已作废",
  },
  // Ai任务状态
  transitionStatus: {
    NOT_STARTED: "未开始",
    IN_PROCESS: "进行中",
    COMPLETED: "已完成",
    RUNNABLE: "可运行",
    USER_PAUSE: "用户暂停",
    SYSTEM_SUSPENDED: "系统暂停",
    // IN_QUEUE: "排队中",
    SYSTEM_HANG_UP: "系统挂起",
    WAITING_FOR_REDIAL: "已终等待重呼止",
    ACCOUNT_DISABLE: "账户禁用",
    MAINTAIN: "系统维护",
  },
  // 已呼用户 通话状态
  phoneState: {
    ANSWERED: '已接听',
    NO_ANSWER: '无应答',
    BUSY: '忙线中',
    POWER_OFF: '关机',
    OUT_OF_SERVICE: '停机',
    REFUSED: '拒接',
    VACANT_NUMBER: '空号',
    CAN_NOT_CONNECT: '无法接通',
    FROM_PHONE_ERROR: '主叫欠费',
    SYSTEM_ERROR: '外呼失败',
    // CALL_LOSS: '多并发呼损',
    // TRANSFER_ARTIFICIAL: '转人工呼损',
  },
  hangUpState: {
    REMOTE_HANGUP: '用户挂断',
    INITIAL_HANGUP: 'AI挂断',
    CS_HANGUP: '人工坐席挂断',
    OTHER_HANGUP: '未知原因',
  },
  // 积分商城 订单状态
  goodsOrde: {
    SUCCESS: '已完成',
    WAIT_CONFIRM: '待收货',
    WAIT_DELIVERY: '待发货',
  }
}