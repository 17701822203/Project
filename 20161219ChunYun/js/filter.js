/**
 * Created by liu.p on 2016/4/8.
 */
var Filter = function(config){
};

Filter.prototype = {
    filterRule:{
        sfzNum:{
            reg:function(value){
                var iSum = 0;
                var info = "";
                var sId= value;
                var aCity = {
                    11 : "北京",
                    12 : "天津",
                    13 : "河北",
                    14 : "山西",
                    15 : "内蒙",
                    21 : "辽宁",
                    22 : "吉林",
                    23 : "黑龙",
                    31 : "上海",
                    32 : "江苏",
                    33 : "浙江",
                    34 : "安徽",
                    35 : "福建",
                    36 : "江西",
                    37 : "山东",
                    41 : "河南",
                    42 : "湖北",
                    43 : "湖南",
                    44 : "广东",
                    45 : "广西",
                    46 : "海南",
                    50 : "重庆",
                    51 : "四川",
                    52 : "贵州",
                    53 : "云南",
                    54 : "西藏",
                    61 : "陕西",
                    62 : "甘肃",
                    63 : "青海",
                    64 : "宁夏",
                    65 : "新疆",
                    71 : "台湾",
                    81 : "香港",
                    82 : "澳门",
                    91 : "国外"
                };
                if (!/^\d{17}(\d|x)$/i.test(sId)) {
                    return false;
                }
                sId = sId.replace(/x$/i, "a");
                //非法地区
                if (aCity[parseInt(sId.substr(0, 2))] == null) {
                    return false;
                }
                var sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2))
                    + "-" + Number(sId.substr(12, 2));
                var d = new Date(sBirthday.replace(/-/g, "/"));
                //非法生日
                if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d
                        .getDate())) {
                    return false;
                }
                for ( var i = 17; i >= 0; i--) {
                    iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
                }
                if (iSum % 11 != 1) {
                    return false;
                }
                return true;
            },
            Normal:'请输入的证件号码',
            error:'请输入正确的证件号码'
        },
        tbNum:{
            //reg:/(^[0-9]{8}$)|(^[HMhm]{1}[0-9]{8}$)/,
            reg:/(^[0-9]{8}$)|(^[0-9]{10}$)/,
            Normal:'请输入证件号码',
            error:'请输入正确的证件号码'
        },
        hxNum:{
            reg:/(^[HMhm]{1}[0-9]{8}$)|(^[HMhm]{1}[0-9]{10}$)/,
            Normal:'请输入证件号码',
            error:'请输入正确的证件号码'
        },
        hzNum:{
            reg:/^[a-zA-Z0-9]{5,17}$/,
            Normal:'请输入证件号码',
            error:'请输入正确的证件号码'
        },
        cName:{
            reg:/^[\u4e00-\u9fa5]{1,15}$/,
            Normal:'请填写姓名',
            error:'请填写正确的姓名'
        },
        eName:{
            reg: /^[a-z A-Z·.．\u4E00-\u9FA5]{2,30}$/,
            Normal:'请填写姓名',
            error:'请填写正确的姓名'
        },
        birthday:{
            reg:function(value){
                if(/[0-9]{4}[0-9]{2}[0-9]{2}/.test(value)){
                    var year = (value.substr(0,4));
                    var month = (value.substr(4,2));
                    var day = (value.substr(6,2));

                    var date = new Date(year+'/'+month+'/'+day);

                    if((date.getFullYear()==parseInt(year)) && (date.getMonth()+1 == parseInt(month)) && (date.getDate()==parseInt(day))){
                        var nowDate = new Date();

                        if((nowDate.getTime() - date.getTime())/1000 > 2592000 ){
                            return true;
                        }else{
                            return false;
                        }
                    }else{
                        return false;
                    }
                }else{
                    return false;
                }
            },
            Normal:'请填写生日',
            error:'请填写正确的生日'
        },
        phone:{
            reg:/^(1[3,5,7,8][0-9])\d{8}$/,
            Normal:'请输入手机号',
            error:'请输入正确手机号'
        },
        mail:{
            reg:/^\S+@\S+\.\S{2,5}$/,
            Normal:'请输入邮箱',
            error:'请输入正确的邮箱'
        },
        zipcode:{
            reg:/^[0-9]{6}$/,
            Normal:'请输入邮政编码',
            error:'请输入正确的邮政编码'
        },
        address:{
            reg:/\S/,
            Normal:'请输入邮寄地址',
            error:'请输入正确的邮寄地址'
        },
        contacts:{
            reg: /^.{1,30}$/,
            Normal:'输入的收件人',
            error:'输入正确的收件人'
        },
        companyName:{
            reg: /^.{1,30}$/,
            Normal:'请填写公司名称',
            error:'请填写公司名称'
        }
    },

    getRule:function(element){
        return this.filterRule[element.attr('filter-rule')];
    },

    filter:function(input){
        var self = this;
        var rule = this.getRule(input);
        if(input.attr('filter-empty') &&  input.val()=='' ){
            return true;
        }

        if(typeof rule.reg == "function"){

            if(rule.reg(input.val())){
                return true;
            }else if(input.val()==''){
                self.msg = rule.Normal;
                return false;
            }else{
                self.msg = rule.error;
                return false;
            }
        }else{
            if(rule.reg.test(input.val())){
                return true;
            }else if(input.val()==''){
                self.msg = rule.Normal;
                return false;
            }else{
                self.msg = rule.error;
                return false;
            }
        }
    },

    filterGroup:function(group){
        var self = this;
        var status = true;

        $('input[filter-group="'+group+'"]:visible').each(function(index,val){
            if($(val).attr('filter-empty') && ($(val).val()=='' || $(val).attr('placeholder') == $(val).val()) ){

            }else{
                if(!self.filter($(val))){
                    status = false;
                    return false;
                }
            }
        });
        return status;
    }
};