var BaseDate = function(string){
	this.init(string);
};

BaseDate.strToBaseDate = function(string){
	var date = false;

	if( string[0]=='2'&& (string.length==14 || string.length==8)){
		date = new Date(string.substr(0,4)+'/'+string.substr(4,2)+'/'+string.substr(6,2)+
			' '+(string.substr(8,2)!=''?string.substr(8,2):'00')+
			':'+(string.substr(10,2)!=''?string.substr(10,2):'00')+
			':'+(string.substr(12,2)!=''?string.substr(12,2):'00'));
	}
	if(string[0]=='2' && string.indexOf('-')>1){
		string = string.replace(/\-/g,'/');
		date = new Date(string);
	}

	if(!date){
		return false;
	}

	return new BaseDate(date.getTime()/1000);
};

BaseDate.prototype.init = function(stringDate){
	if(stringDate){
		if(!isNaN(stringDate)){
			this.date = new  Date(stringDate*1000);
		}else{
			var stringDate = stringDate.replace(/\-/g,'/');
			this.date = new Date(stringDate);
		}
	}else{
		this.date = new Date();
	}
}

BaseDate.prototype.formateHash = function(){
	return {
		'Y+':this.date.getFullYear(),

		'M+':this.getMonth(),
		'm+':this.date.getMonth()+1,

		'D+':this.getDate(),
		'd+':this.date.getDate(),

		'H+':this.getHours(),
		'h+':this.date.getHours(),

		'I+':this.getMinutes(),
		'i+':this.date.getMinutes(),

		'S+':this.getSeconds(),
		's+':this.date.getSeconds(),

		'W+':this.getWeek(),
		'w+':this.date.getDay()
	}
}

BaseDate.prototype.getMonth = function(){
	return  this.date.getMonth()+1 < 10 ? '0'+(parseInt(this.date.getMonth())+1) : this.date.getMonth()+1;
}

BaseDate.prototype.getDate = function(){
	return  this.date.getDate() < 10 ? '0'+this.date.getDate().toString() : this.date.getDate().toString();
}

BaseDate.prototype.getHours = function(){
	return  this.date.getHours() < 10 ? '0'+this.date.getHours().toString() : this.date.getHours().toString();
}

BaseDate.prototype.getMinutes = function(){
	return  this.date.getMinutes() < 10 ? '0'+this.date.getMinutes().toString() : this.date.getMinutes().toString();
}

BaseDate.prototype.getSeconds = function(){
	return  this.date.getSeconds() < 10 ? '0'+this.date.getSeconds().toString() : this.date.getSeconds().toString();
}

BaseDate.prototype.getWeek = function(){
	var day = this.date.getDay();
	var week = '';
	switch(day){
		case 0:
			week='日';
			break;
		case 1:
			week='一';
			break;
		case 2:
			week='二';
			break;
		case 3:
			week='三';
			break;
		case 4:
			week='四';
			break;
		case 5:
			week='五';
			break;
		case 6:
			week='六';
			break;
		default:
	}
	return week;
}

BaseDate.prototype.formate = function(string){
	var o = this.formateHash();
	for(var k in o)
		if(new RegExp("("+ k +")").test(string)){
			string = string.replace(RegExp.$1, (o[k]));
		}
	return string;
}

BaseDate.prototype.trimDay = function(){
	this.date.setHours(0);
	this.date.setMinutes(0);
	this.date.setSeconds(0);
	return this;
}

BaseDate.prototype.addYear = function(addYear){
	this.date.setFullYear(this.date.getFullYear()+addYear);
	return this;
}

BaseDate.prototype.addMonth = function(addMonth){
	this.date.setMonth(this.date.getMonth()+addMonth,1);
	return this;
}

BaseDate.prototype.addDay = function(addDay){
	this.date.setDate(this.date.getDate()+parseInt(addDay));
	return this;
}

BaseDate.prototype.addHours = function(addHour){
	this.date.setHours(this.date.getHours()+addHour);
	return this;
}

BaseDate.prototype.addMinutes = function(addMinutes){
	this.date.setMinutes(this.date.getMinutes()+addMinutes);
	return this;
}

BaseDate.prototype.addSeconds = function(addSeconds){
	this.date.setSeconds(this.date.getSeconds()+addSeconds);
	return this;
}

BaseDate.prototype.getNativeDate = function(){
	return this.date
}

BaseDate.prototype.stamp = function(){
	return parseInt(this.date.getTime()/1000);
}

BaseDate.prototype.getMonthWeek = function(date) {
	var mStart  = new BaseDate(this.formate('Y-m-d'));
	mStart.date.setDate('1');

	var j=0;

	for(var i=0;i<=this.date.getDate();i++){
		if(mStart.date.getDay()===date.date.getDay()){
			j++;
		}
		mStart.addDay(1);
	}
	return j+''+date.date.getDay();
};

//YYYY-mm-dd H:i:s
//YYYY-mm-dd
//YYYYmmddhhiiss
//YYYYmmddhhiiss
BaseDate.prototype.strToTime = function(string){
	if( string[0]=='2' (string.length==14 || string.length==8)){
		var date = new Date(string.substr(0,4)+'/'+string.substr(4,2)+'/'+string.substr(6,2)+'/'+string.substr(8,2)+
			' '+(string.substr(10,2)!=''?string.string.substr(10,2):'00')+
			':'+(string.substr(12,2)!=''?string.string.substr(12,2):'00')+
			':'+(string.substr(14,2)!=''?string.string.substr(14,2):'00'));
	}
};

BaseDate.prototype.getLunar = function(date) {
	var objDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
	var i, leap=0, temp=0
	var baseDate = new Date(1900,0,31)
	// Mac和linux平台的firefox在此处会产生浮点数错误
	var offset = Math.round((objDate - baseDate)/86400000)
	var res = {};
	res.dayCyl = offset + 40
	res.monCyl = 14

	for(i=1900; i<2050 && offset>0; i++) {
		temp = this.lYearDays(i)
		offset -= temp
		res.monCyl += 12
	}

	if(offset<0) {
		offset += temp;
		i--;
		res.monCyl -= 12
	}

	res.year = i
	res.yearCyl = i-1864

	leap = this.leapMonth(i) //闰哪个月
	res.isLeap = false

	for(i=1; i<13 && offset>0; i++) {
	//闰月
		if(leap>0 && i==(leap+1) && res.isLeap==false){
			--i;
			res.isLeap = true;
			temp = this.leapDays(res.year);
		}else{
			temp = this.monthDays(res.year, i);
		}

		//解除闰月
		if(res.isLeap==true && i==(leap+1)) res.isLeap = false

		offset -= temp
		if(res.isLeap == false) res.monCyl ++
	}

	if(offset==0 && leap>0 && i==leap+1){
		if(res.isLeap){
			res.isLeap = false;
		}
		else{
			res.isLeap = true; --i; --res.monCyl;
		}
	}

	if(offset<0){
		offset += temp; --i; --res.monCyl;
	}

	res.month = i;
	res.day = offset + 1;
	var bDate = new BaseDate(res.year+'-'+res.month+'-'+res.day);
	bDate.isLeap = res.isLeap;
	return bDate;
};

BaseDate.prototype.lYearDays = function(y) {
	var i, sum = 348
	for(i=0x8000; i>0x8; i>>=1) sum += (lunarInfo[y-1900] & i)? 1: 0
	return(sum+this.leapDays(y))
};

//返回农历 y年的闰月的天数
BaseDate.prototype.leapDays = function(y) {
	if(this.leapMonth(y)) return((lunarInfo[y-1900] & 0x10000)? 30: 29)
	else return(0)
};

//返回农历 y年闰哪个月 1-12，没闰返回 0
BaseDate.prototype.leapMonth = function(y) {
	return(lunarInfo[y-1900] & 0xf)
};

//返回农历 y年m月的总天数
BaseDate.prototype.monthDays = function(y,m) {
	return( (lunarInfo[y-1900] & (0x10000>>m))? 30: 29 )
};

BaseDate.prototype.getCDay = function(d){
	var s;

	switch (d) {
	   case 10:
		  s = '初十'; break;
	   case 20:
		  s = '二十'; break;
		  break;
	   case 30:
		  s = '三十'; break;
		  break;
	   default :
		  s = nStr2[Math.floor(d/10)];
		  s += nStr1[d%10-1];
	}
	return(s);
};

BaseDate.prototype.getFtv = function(date){
	var key = date.getMonth()+''+date.getDate();
	var wkey = date.getMonth()+''+date.getMonthWeek(date);
	if(sFtv[key]){
		return sFtv[key];
	}else if(wFtv[wkey]){
		return wFtv[wkey];
	}
	return false;
};

BaseDate.prototype.getLFtv = function(date){
	var key = date.getMonth()+''+date.getDate();
	if(lFtv[key]){
		return lFtv[key];
	}
	return false;
};

var lunarInfo = new Array(
	0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,
	0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,
	0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,
	0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,
	0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,
	0x1ab54,0x02b60,0x09570,0x052f2,0x04970,
	0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,
	0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,
	0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,
	0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,
	0x06ca0,0x0b550,0x15355,0x04da0,0x0a5d0,
	0x14573,0x052d0,0x0a9a8,0x0e950,0x06aa0,
	0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,
	0x05260,0x0f263,0x0d950,0x05b57,0x056a0,
	0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,
	0x0d250,0x0d558,0x0b540,0x0b5a0,0x195a6,
	0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,
	0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,
	0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,
	0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,
	0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,
	0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,
	0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,
	0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,
	0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,
	0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,
	0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,
	0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,
	0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,
	0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0
);

var nStr1 = new Array('一','二','三','四','五','六','七','八','九','十');
var nStr2 = new Array('初','十','廿','卅');

//阴历
var sFtv = {
	"0101":"元旦",
	"0214":"情人节",
	"0308":"妇女节",
	"0312":"植树节",
	"0401":"愚人节",
	"0422":"地球日",
	"0501":"劳动节",
	"0504":"青年节",
	"0531":"无烟日",
	"0601":"儿童节",
	"0606":"爱眼日",
	"0701":"建党日",
	"0801":"建军节",
	"0910":"教师节",
	"1001":"国庆节",
	"1031":"万圣节",
	"1111":"光棍节",
	"1224":"平安夜",
	"1225":"圣诞节",
};

//某月的第几个星期几。 5,6,7,8 表示到数第 1,2,3,4 个星期几
//var wFtvDate = (tmp2 == 0 ? 7 : 0) + (tmp1 - 1)*7 + tmp2;
var wFtv = {
	"0520":"母亲节",
	"0630":"父亲节",
	"1144":"感恩节"
};

		//农历节日
var lFtv = {
	"0101":"春节",
	"0115":"元宵节",
	"0202":"龙抬头",
	"0505":"端午节",
	"0707":"七夕",
	"0715":"中元节",
	"0815":"中秋节",
	"0909":"重阳节",
	"1208":"腊八节",
	"1223":"小年",
	"1230":"除夕"
};