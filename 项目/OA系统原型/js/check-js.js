/********************************
Last Modify: 2004-12-15
author: wlb
version: 3.0
*********************************/
function check_2Date(fir,sec,val)
{
	//alert("enter!");
	var errMess = "";
	var CheckElement=fir;
	//alert("fir.value"+fir.value);
	//alert("sec.value"+sec.value);
	if(fir.value!="")
	{
		if(val)
		{
			errMess = checkDateMinute(fir);
		}
		else
		{
			errMess = checkDate(fir);
		}
		onchangeCheckNull(fir);
	}	
	if(errMess=="")
	{
		if(sec.value!="")
		{
			if(val)
			{
				errMess = checkDateMinute(sec);
			}
			else
			{
				errMess = checkDate(sec);
			}
			onchangeCheckNull(sec);
		}		
	}
	//alert(errMess);
	var eleErrMsg = CheckElement.parentNode.lastChild;
	if(eleErrMsg && eleErrMsg.name == "ErrMsg" )
	{
		if(errMess != "" )
		{
			errMess = "<img src='../images/error_m.gif' valign='top'/> " + errMess;			
		}
		eleErrMsg.innerHTML = "<br/>" + errMess;
	}
	if(errMess=="")
	{
		if(eleErrMsg.previousSibling&&eleErrMsg.previousSibling.name == "ErrMsg")
		{
			//alert("确实有2个");
			eleErrMsg.previousSibling.innerHTML = "<br/>";
		}
	}
}
//function checkValidate(CheckElement,)
function checkValidate(CheckElement,manual)
{
	
	//alert(CheckElement);
	if(!CheckElement.dataType)
	{
		return;
	}

	var errMess = "";
	//alert("enter!");
	sIfNull			=	CheckElement.dataType.substring(0,2);
	sOther			=	CheckElement.dataType.substring(2,CheckElement.dataType.length);
	var CheckdataType;
	if(sIfNull=="非空")
	{
		CheckdataType		=	sOther;
	}
	else
	{
		CheckdataType		=	CheckElement.dataType;
	}
	//alert(CheckdataType);
	if(CheckElement.value!="")
	{
		if(CheckdataType	==	"")
		{
			return;
		}
		
		switch(CheckdataType)
		{
			case '字符串': errMess = checkString(CheckElement);break;
			case '邮政编码': errMess = checkPost(CheckElement);break;
			case '长字符串': errMess = checkLongString(CheckElement);break;
			case '数字': errMess = checkNumber(CheckElement);break;
			case '百分比': errMess = checkPercent(CheckElement);break;
			case '整数': errMess = checkInt(CheckElement);break;
			//add by wlb 03/08/27
			case '正整数': errMess = checkPlusInt(CheckElement);break;
			case '日期': errMess = checkDate(CheckElement);break;
			case '年月日期': errMess = checkYearMonth(CheckElement);break;
			case '时刻': errMess = checkDateTime(CheckElement);break;
			//add by wlb 04/04/21
			case '日期时分': errMess = checkDateMinute(CheckElement);break;
			case '时分': errMess = checkMinute(CheckElement);break;
			case 'IP地址': errMess = checkIP(CheckElement);break;
			case 'Email': errMess = checkEmail(CheckElement);break;
			case '电话': errMess = checkPhone(CheckElement);break;
			case '手机': errMess = checkMobilephone(CheckElement);break;
			case '日期时间': errMess = checkTime(CheckElement);break;
			case '货币':errMess = checkCurrency(CheckElement);break;
			case '工期': errMess = checkPlusTime(CheckElement);break;
			default:alert('暂时不能识别:'+CheckElement.dataType+'的数据类型');
		}
	}
	//alert(errMess);
	if(manual)
	{
		
	}	
	else
	{
		onchangeCheckNull(CheckElement);
	}	
	

	var eleErrMsg = CheckElement.parentNode.lastChild;
	if(eleErrMsg && eleErrMsg.name == "ErrMsg" )
	{
		if(errMess != "" )
		{
			errMess = "<img src='../images/error_m.gif' valign='top'/> " + errMess;			
		}
		eleErrMsg.innerHTML = "<br/>" + errMess;
	}
	//alert(eleErrMsg.innerHTML);
	return true;
			
}

function onchangeCheckNull(CheckElement)
{
	var tdEle = CheckElement.parentNode.previousSibling;
	//alert(tdEle.id);
	var starEle = tdEle.firstChild;
	//alert(starEle.name);
	if(starEle && starEle.name == "star")
	{
		
		//if(CheckElement.value == "" && CheckElement.dataType.substring(0,2)=="非空")
		if(CheckElement.dataType.substring(0,2)=="非空")
		{
			if(CheckElement.autoShowStar&&(CheckElement.autoShowStar=="false"))
			{
				starEle.innerHTML = "";
			}
			else
			{
				starEle.innerHTML = "*";
			}
			
		}
		else
		{
			starEle.innerHTML = "";
		}
	}
}

function autoCheckNull()
{
	//alert("ent");
	var eles		=	document.forms[0].elements;
	//alert(eles);
	for(i=0;i<eles.length;i++)
	{
		//alert(eles[i].dataType);
		if(eles[i].dataType)
		{
			tdEle = eles[i].parentNode.previousSibling;
			//alert(tdEle.id);
			if(eles[i].autoShowStar&&(eles[i].autoShowStar=="false"))
			{
				
			}
			else
			{
				tdEle.insertAdjacentHTML("afterBegin","<span name='star'  id=hehep class='data_text_star'></span>");
				onchangeCheckNull(eles[i]);
			}
			
			

			//eles[i].onchange = onchangeCheckValid;
			eles[i].parentNode.insertAdjacentHTML("beforeEnd", "<span name='ErrMsg'></span>");
		}
	}
}
function autoCheckThis(ele)
{
	if(ele.dataType)
	{
		tdEle = ele.parentNode.previousSibling;
		tdEle.insertAdjacentHTML("afterBegin","<span name='star'  id=hehep class='data_text_star'></span>");
		onchangeCheckNull(ele);
		ele.parentNode.insertAdjacentHTML("beforeEnd", "<span name='ErrMsg'></span>");
	}
}

function alertRightDate()
{
	bCheckLock	=	false;
	return("日期格式为:2000-12-31");
}
function checkDate(ele)
{
	var ev	=	ele.value;
	if (ev == "")
		return "";
	var evyear;
	var evmonth;
	var evdate;
	var iindex;
	if(ev.length<8)
	{
		return alertRightDate();
		//ele.value="";
	}
	iindex		=	ev.indexOf("-")
	if(iindex==-1)
	{
		return alertRightDate();
		//ele.value="";
	}
	evyear		=	ev.substring(0,iindex);
	if (evyear.length != 4)
	{
		return alertRightDate();
	}
	ev			=	ev.substring(iindex+1,ev.length);
	iindex		=	ev.indexOf("-")
	if(iindex==-1)
	{
		return alertRightDate();
		//ele.value="";
	}
	evmonth		=	ev.substring(0,iindex);
	if (evmonth.length >2)
	{
		return alertRightDate();
	}
	evdate		=	ev.substring(iindex+1,ev.length);
	if (evdate.length >2)
	{
		return alertRightDate();
	}
	var ndate	=	evmonth+"/"+evdate+"/"+evyear;
	var tdate	=	Date.parse(ndate);
	var ddate	=	new Date(tdate);
	if(isNaN(tdate))
	{
		return alertRightDate();
		//ele.value="";
	}
	if(	(evyear!=ddate.getFullYear()	)||(evmonth!=(ddate.getMonth()+1)	)||(evdate!=ddate.getDate())	)
	{
		return alertRightDate();
		//ele.value="";
	}
	return "";
}

function checkYearMonth(ele)
{
	var ev		=	ele.value;
	if (ev == "")
		return "";	
	var evyear;
	var evmonth;
	var iindex;
	if(ev.length<6)
	{
		return alertRightYearMonthDate();
		//ele.value="";
	}
	iindex		=	ev.indexOf("-")
	if(iindex==-1)
	{
		return alertRightYearMonthDate();
		//ele.value="";
	}
	evyear		=	ev.substring(0,iindex);
	if (evyear.length != 4)
	{
		return alertRightYearMonthDate();
	}
	ev			=	ev.substring(iindex+1,ev.length);
	evmonth		=	ev;
	if (evmonth.length >2)
	{
		return alertRightYearMonthDate();
	}

	var ndate	=	evmonth+"/"+"01"+"/"+evyear;
	var tdate	=	Date.parse(ndate);
	var ddate	=	new Date(tdate);
	if(isNaN(tdate))
	{
		return alertRightYearMonthDate();
		//ele.value="";
	}
	if(	(evyear!=ddate.getFullYear()	)||(evmonth!=(ddate.getMonth()+1)))
	{
		return alertRightYearMonthDate();
		//ele.value="";
	}
	return "";
}

function alertRightYearMonthDate()
{
	bCheckLock = false;
	return "格式:2003-6";
}

function alertDateTime()
{
	bCheckLock = false;
	return "格式:2003-6-1 12:00:00";
}
function alertDateMinute()
{
	bCheckLock = false;
	return "格式:2003-6-1 12:00";
}
function alertTime()
{
	bCheckLock = false;
	return "格式:12:00:00";
}
/* 检查DateTime类型是否满足"yyyy-mm-dd MM-mm-ss"形式. */
function checkDateTime(ele)
{
	var str = ele.value;
	if (str == "")
		return "";	
	if (str.length < 14) {
		return alertDateTime();
	}
	var iSpc = str.indexOf(" ");
	if (iSpc == -1) {
		return alertDateTime();
	}
	
	var ev = str.substring(0, iSpc);
	var et = str.substring(iSpc + 1, str.length);
	var idx;
	var evyear, evmonth, evdate;
	var hour, minute, second;
	
	idx = ev.indexOf("-");
	if (idx == -1) {
		return alertDateTime();
	}
	
	evyear = ev.substring(0, idx);
	if (evyear.length != 4)
	{
		return alertDateTime();
	}
	ev = ev.substring(idx + 1, ev.length);
	idx = ev.indexOf("-");
	if (idx == -1) {
		return alertDateTime();
	}
	
	evmonth		=	ev.substring(0,idx);
	if (evmonth.length >2)
	{
		return alertDateTime();
	}
	evdate		=	ev.substring(idx+1,ev.length);
	if (evdate.length >2)
	{
		return alertDateTime();
	}
	var ndate	=	evmonth + "/" + evdate + "/" + evyear;
	var tdate	=	Date.parse(ndate);
	var ddate	=	new Date(tdate);
	if(isNaN(tdate)) {
		return alertDateTime();
	}
	
	if ((evyear != ddate.getFullYear()) || (evmonth != (ddate.getMonth() + 1)) || (evdate != ddate.getDate())) {
		return alertDateTime();
	}
	
	idx = et.indexOf(":");
	if (idx == -1) {
		return alertDateTime();
	}
	
	hour = et.substring(0, idx);
	et = et.substring(idx + 1, et.length);
	var hr = new Number(hour);
	if (isNaN(hr)) {
		return alertDateTime();
	} else {
		if (hr < 0 || hr > 24) {
			return alertDateTime();
		}
	}
	
	idx = et.indexOf(":");
	if (idx == -1) {
		return alertDateTime();
	}

	minute = et.substring(0, idx);
	second = et.substring(idx + 1, et.length);

	mint = new Number(minute);
	sec = new Number(second);
	if (isNaN(mint) || isNaN(sec)) {
		return alertDateTime();
	} else {
		if (mint < 0 || mint > 59 || sec < 0 || sec > 59) {
			return alertDateTime();
		}
	}
	
	return "";
}
function checkTime(ele)
{
	var str = ele.value;
	if (str == "")
		return "";		
	if (str.length < 5) {
		return alertTime();
	}
	if (str.length > 8) {
		return alertTime();
	}
	var idx = str.indexOf(":");
	if (idx == -1) {
		return alertTime();
	}
	
	var hour = str.substring(0, idx);
	if(hour=="")
	{
		return alertTime();
	}	
	var et = str.substring(idx + 1, str.length);
	var hr = new Number(hour);
	if (isNaN(hr)) 
	{
		
		return alertTime();
	} 
	else 
	{
		
		if (hr < 0 || hr > 23) 
		{
			
			return alertTime();
		}
	}
	idx = et.indexOf(":");
	if (idx == -1) {
		return alertTime();
	}

	var minute = et.substring(0, idx);
	if(minute=="")
	{
			return alertTime();
	}	
	var second = et.substring(idx + 1, et.length);
	if(second=="")
	{
			return alertTime();
	}	
	var mint = new Number(minute);
	var sec = new Number(second);
	if (isNaN(mint) || isNaN(sec)) {
		return alertTime();
	} else {
		if (mint < 0 || mint > 59 || sec < 0 || sec > 59) {
			return alertTime();
		}
	}
	
	return "";
}
function checkNumber(ele)
{
	if (ele.value == "")
		return "";	
	var elevalue	=	new Number(ele.value);
	if(isNaN(elevalue))
	{
		bCheckLock	=	false;
		return("只能输入数字"); 
	}
	ele.value=elevalue;
	if(ele.maxValue)
	{
		return(checkmaxValue(ele));
	}
	if(ele.minValue)
	{
		return(checkminValue(ele));
	}
	return "";
}
function checkCurrency(ele)
{
	//alert("start");
	if (ele.value == "")
		return "";		
	var elevalue	=	new Number(ele.value);
	if(isNaN(elevalue))
	{
		bCheckLock	=	false;
		return("只能输入数字"); 
	}
	if(elevalue<0)
	{
		bCheckLock	=	false;
		return("不能输入负数"); 
	}		
	//ele.value=elevalue;
	var tempnum=elevalue;
	//alert(tempnum);
	if(ele.value.indexOf(".")>=0)
	{
		var su=ele.value.indexOf(".");
		var s=ele.value.substring(su+1);
		//alert(s);
		
		if(s.length>2)
		{
			var res="只能输入两位小数";
			return(res); 
		}
		else if (s.length == 1)
		{
			//alert("就是一个点");
			ele.value=ele.value+"0";
		}
		else if(s.length==0)
		{
			ele.value=ele.value+"00";
		}
		/*
		else
		{
			//alert("点都够了!");
			tempnum=Math.round(tempnum*100)/100;
			ele.value=tempnum;
		}*/
	}	
	else
	{
		ele.value=tempnum+".00";
	}
	
	if(ele.maxValue)
	{
		var res = checkmaxValue(ele);
		if(res != "")
		{
			return res;
		}
	}
	
	if(ele.minValue)
	{
		var res = checkminValue(ele);
		if(res != "")
		{
			return res;
		}
	}
	
	return "";
	
}	
function checkmaxValue(sElement)
{
	var sMaxNumber		=	new Number(sElement.maxValue);
	var sCurrentNumber	=	new Number(sElement.value);
	if(sCurrentNumber>sMaxNumber)
	{
		bCheckLock	=	false;
		return "最大值:" + sElement.maxValue;
	}
	
	if(sElement.minValue)
	{
		var sMinNumber	=	new Number(sElement.minValue);
		if(sCurrentNumber < sMinNumber)
		{
			bCheckLock	=	false;
			return "最小值:" +  sElement.minValue;
		}	
	}	
	return "";
}

function checkminValue(sElement)
{
	var sCurrentNumber	=	new Number(sElement.value);
	var sMinNumber	=	new Number(sElement.minValue);
	if(sCurrentNumber < sMinNumber)
	{
			bCheckLock	=	false;
			return "最小值:" +  sElement.minValue;
	}	
	return "";
}

function checkInt(ele)
{
	if (ele.value == "")
		return "";	
	var elevalue	=	new Number(ele.value);
	if(isNaN(elevalue))
	{
		return "只能输入整数";
	}
	if(ele.value.indexOf(".")!=-1)
	{
		return "只能输入整数";
	}
	ele.value=elevalue;
	if(ele.maxValue)
	{
		return(checkmaxValue(ele));
	}
	if(ele.minValue)
	{
		return(checkminValue(ele));
	}
	return "";
}

//add by wlb 03/08/27 只能输入正整数
function checkPlusInt(ele)
{
	if (ele.value == "")
		return "";	
	var elevalue	=	new Number(ele.value);
	if(isNaN(elevalue))
	{
		return "只能输入正整数";
	}
	if(ele.value.indexOf(".")!=-1)
	{
		return "只能输入正整数";
	}
	if(elevalue <=  0)
	{
		return "只能输入正整数";
	}
	
	ele.value=elevalue;
	if(ele.maxValue)
	{
		return(checkmaxValue(ele));
	}
	if(ele.minValue)
	{
		return(checkminValue(ele));
	}
	return "";
}

//add by wlb 04/12/27 （大于0的正整数）
function checkPlusTime(ele)
{
	if (ele.value == "")
		return "";	
	var elevalue	=	new Number(ele.value);
	if(isNaN(elevalue))
	{
		return "只能输入正整数";
	}
	if(ele.value.indexOf(".")!=-1)
	{
		return "只能输入正整数";
	}
	if(elevalue <  0)
	{
		return "只能输入正整数";
	}
	
	ele.value=elevalue;
	if(ele.maxValue)
	{
		return(checkmaxValue(ele));
	}
	if(ele.minValue)
	{
		return(checkminValue(ele));
	}
	return "";
}

/*
  检查DateTime类型是否满足"hh:mi"形式.
*/
function checkMinute(checkEle){
	//alert("enter");
	var str = checkEle.value;
	if (str == "")
		return "";		
	//alert(str.length);
	if((str.length!=5)&&(str.length!=4))
	{		
		//alert("1");
		return alertMinute();
	}
	//alert("conti");
	var idx = str.indexOf(":");
	if (idx != 2){
		if(idx !=1)
			return alertMinute();
	}
	var h = str.substring(0,idx);
	var m = str.substring(idx+1,str.length);
	
	h = new Number(h);
	m = new Number(m);
	if(isNaN(h)){
		return alertMinute();
	}else{
		if(h < 0 || h > 23)
			return alertMinute();
	}
	
	if(isNaN(m)){
		return alertMinute();
	}else{
		if(m <0 || m >59)
			return alertMinute();
	}
	return "";
}

function alertMinute()
{
	//alert("alertMinute");
	bCheckLock = false;
	return "格式:12:00";
}

/*
  时间格式这能写道分钟
  检查DateTime类型是否满足"yyyy-mm-dd hh-mm"形式.
*/
function checkDateMinute(ele)
{
	var str = ele.value;
	if (str == "")
		return "";		
	if (str.length < 12) 
	{
		return alertDateMinute();
	}
	var iSpc = str.indexOf(" ");
	if (iSpc == -1) {
		return alertDateMinute();
	}
	
	var ev = str.substring(0, iSpc);
	var et = str.substring(iSpc + 1, str.length);
	var idx;
	var evyear, evmonth, evdate;
	var hour, minute, second;
	
	idx = ev.indexOf("-");
	if (idx == -1) {
		return alertDateMinute();
	}
	
	evyear = ev.substring(0, idx);
	if (evyear.length != 4)
	{
		return alertDateMinute();
	}
	ev = ev.substring(idx + 1, ev.length);
	idx = ev.indexOf("-");
	if (idx == -1) {
		return alertDateMinute();
	}
	
	evmonth		=	ev.substring(0,idx);
	if (evmonth.length >2)
	{
		return alertDateMinute();
	}
	evdate		=	ev.substring(idx+1,ev.length);
	if (evdate.length >2)
	{
		return alertDateMinute();
	}
	var ndate	=	evmonth + "/" + evdate + "/" + evyear;
	var tdate	=	Date.parse(ndate);
	var ddate	=	new Date(tdate);
	if(isNaN(tdate)) {
		return alertDateMinute();
	}
	
	if ((evyear != ddate.getFullYear()) || (evmonth != (ddate.getMonth() + 1)) || (evdate != ddate.getDate())) {
		return alertDateMinute();
	}
	
	idx = et.indexOf(":");
	if (idx == -1) 
	{
		return alertDateMinute();
	}
	
	hour = et.substring(0, idx);
	et = et.substring(idx + 1, et.length);
	var hr = new Number(hour);
	if (isNaN(hr)) 
	{
		return alertDateMinute();
	} else 
		{
		if (hr < 0 || hr >= 24) {
			return alertDateMinute();
		}
	}
	
	/*
	idx = et.indexOf(":");
	if (idx == -1) {
		return alertDateMinute();
	}
	*/
	minute = et;
	//minute = et.substring(0, idx);//这样可以加秒
	//second = et.substring(idx + 1, et.length);

	mint = new Number(minute);
	//sec = new Number(second);
	if (isNaN(mint)) 
	{
		return alertDateMinute();
	} else 
	{
		if (mint < 0 || mint > 59) 
		{
			return alertDateMinute();
		}
	}
	
	return "";
}


function checkPercent(ele)
{
	if (ele.value == "")
		return "";		
	var elevalue	=	new Number(ele.value);
	if(isNaN(elevalue)||(elevalue<0)||(elevalue>100))
	{
		bCheckLock	=	false;
		return "必须是0到100之间数字";
	}
	ele.value=elevalue;
	if(ele.maxValue)
	{
		return(checkmaxValue(ele));
	}
	if(ele.minValue)
	{
		return(checkminValue(ele));
	}
	return true;
}

function checkString(ele)
{
	if (ele.value == "")
		return "";		
	//暂时规定字符串内不能包含单引号以及双引号,如果找到了清空此输入框
	if(ele.value.indexOf("'")!=-1)
	{
		bCheckLock	=	false;
		return('不能包含单引号');
	}
	if(ele.value.indexOf("\"")!=-1)
	{
		bCheckLock	=	false;
		return('不能包含双引号');
	}
	var regobj	=	/\s+$/g;
	var s_end	=	(ele.value).replace(regobj,'');
	var regobjb	=	/^\s+/g;
	ele.value	=	(s_end).replace(regobjb,'');
	return "";
}

function checkLongString(ele)
{
	if (ele.value == "")
		return "";		
	//暂时规定长字符串内不能包含单引号以及双引号,如果找到了，去处这些单引号和双引号
	if(ele.value.indexOf("'") != -1)
	{
		return "不能包含单引号";
	}
	if(ele.value.indexOf("\"") != -1)
	{
		return "不能包含双引号";
	}

	if(ele.maxL)
	{
		if(ele.value.length>ele.maxL)
		{
			return "最大长度:" + ele.maxL;
		}
	}
	var regobj	=	/\s+$/g;
	var s_end	=	(ele.value).replace(regobj,'');
	var regobjb	=	/^\s+/g;
	ele.value	=	(s_end).replace(regobjb,'');
	return "";
}


function alertRightPost()
{
	bCheckLock	=	false;
	return "格式:710043";
}

function checkPost(ele)
{
	if (ele.value == "")
		return "";		
	if(ele.value.length != 6)
	{
		return alertRightPost();
	}
	
	var num	=	new Number(ele.value);
	
	if(isNaN(num))
	{
		return alertRightPost();
	}
	
	if(num < 0)
	{
		return alertRightPost();
	}
	
	if(ele.value.indexOf(".")!=-1)
	{
		return alertRightPost();
	}
	return "";
}


function alertRightPhone()
{
	bCheckLock	=	false;
	return "格式:029-12345678";
}


function checkPhone(ele)
{
	var ev	=	ele.value;
	if (ev == "")
		return "";			
	//检测长度是否足够
	if(ev.length<7)
	{
		return alertRightPhone();
	}
	//检测长度是否超过限制
	if(ev.length>20)
	{
		return alertRightPhone();
	}
	//检测是否含有非法字符
	if(	(ev.indexOf("'")!=-1)||(ev.indexOf("\"")!=-1))
	{
		return alertRightPhone();
	}
	//允许出现两次"("号,两次")"号,两次"-"号,一次","号,一次";"号
	//其余的必须为数字
	var re = "(";
	var sTemp = ev.replace(re, "" );
	re =")";
	sTemp = sTemp.replace(re, "" );
	re = "-";
	
	sTemp = sTemp.replace(re, "");
	
	re = "(";
	var sTemp = sTemp.replace(re, "" );
	re =")";
	sTemp = sTemp.replace(re, "" );
	re = "-";
	
	sTemp = sTemp.replace(re, "");
	
	re = ",";
	sTemp = sTemp.replace( re, "" );
	re = ";";
	sTemp = sTemp.replace( re, "" );
	
	var elevalue	=	new Number(sTemp);
	if( isNaN(elevalue) )
	{
		return alertRightPhone();
	}
	return "";
}


//added by wlb at 2002-08-12
function checkMobilephone(ele)
{
	if (ele.value == "")
		return "";		
	if (ele.value.length !== 11) 
	{
		return "手机号码应为11位！";
	}
	var elevalue	=	new Number(ele.value);
	if( isNaN(elevalue) )
	{
		return "手机号码必须是数字！";
	}
	if (ele.value.substring(0,2) != '13') 
	{
		return "输入的不是手机号码";
	}
	return "";
}

function alertRightIP()
{
	bCheckLock	=	false;
	return "格式:192.168.0.1";
}

function checkIP(ele)
{
	if (ele.value == "")
		return "";	
	//add by wlb 修改了ip验证代码
	try
	{
		var sReturn = "";
		var evalue = ele.value;
		var arrEvalue = evalue.split(".");
		if(arrEvalue.length != 4)
		{
			sReturn = alertRightIP();
		}
		else
		{
			for(var i = 0;i < arrEvalue.length;i++)
			{
				var ipNum = new Number(arrEvalue[i]);
				if(isNaN(ipNum) || ipNum - 0 < 0 || ipNum - 255 > 0)
				{
					sReturn = alertRightIP();
					break;
				}
			}
		}
		return sReturn;
	}
	catch(e)
	{
		return alertRightIP();
	}
	/*
	try{
		var ev	=	ele.value;
		for(i=0;i<3;i++)
		{
			var ii	=	ev.indexOf(".");
			if(ii<=0)
			{
				return alertRightIP();
			}
			var ippart	=	ev.substring(0,ii);
			var re	= / /g;
			ippart=ippart.replace(re,'');
			if(ippart.length==0)
			{
				return alertRightIP();
			}
			var nippart	=	new Number(ippart);
			if(isNaN(nippart))
			{
				return alertRightIP();
			}
			if (	(nippart<0)	||	(nippart>255)	|| ippart.length>3)
			{
				return alertRightIP();
			}
			ev	=	ev.substring(ii+1,ev.length);
		}
		var nn	=	ev.indexOf(".");
		if(nn>=0)
		{
				return alertRightIP();
		}
		var re	= / /g;
		ev=ev.replace(re,'');
		if(ev.length==0)
		{
				return alertRightIP();
		}
		var nev	=	new Number(ev);
		if(isNaN(nev))
		{
				return alertRightIP();
		}
		if (	(nev<0)	||	(nev>255)	|| ev.length>3	)
		{
				return alertRightIP();
		}
		return "";
	}catch(e)
	{
		return alertRightIP();
	}
	*/
}


function checkEmail(ele)
{
	if (ele.value == "")
		return "";	
	var index = ele.value.indexOf("@");
	if(index < 0)
	{
		return "错误的Email格式";
	}
	
	if(ele.value.indexOf("@",index+1) != -1)
	{
		return "错误的Email格式";
	}

	if(ele.value.length < 6 ) 
	{
		return "错误的Email格式!";
	}
	var iDot;
	var sTail;
	iDot = ele.value.lastIndexOf(".");
	sTail = ele.value.substring(iDot, ele.value.length);
	sTail = sTail.toLowerCase();
	if (!(sTail == ".cn" || sTail == ".com" || sTail == ".net" || sTail == ".org" || sTail == ".edu")) 
	{
		return "错误的Email格式!";
	}
	return "";
}

function CheckAll(ifCheckNull, eles)
{

	var errMsg = "";
	for(i=0;i<eles.length;i++)
	{
		
		if(eles[i].dataType)
		{
			
			var errMess = "";
			var CheckElement = eles[i];
			sIfNull			=	CheckElement.dataType.substring(0,2);
			sOther			=	CheckElement.dataType.substring(2,CheckElement.dataType.length);
			var CheckdataType;
			if(sIfNull=="非空")
			{
				CheckdataType		=	sOther;
			}
			else
			{
				CheckdataType		=	CheckElement.dataType;
			}
			if(CheckElement.value)
			{
				if(CheckdataType !=	"")
				{
					switch(CheckdataType)
					{
						case '字符串': errMess = checkString(CheckElement);break;
						case '邮政编码': errMess = checkPost(CheckElement);break;
						case '长字符串': errMess = checkLongString(CheckElement);break;
						case '数字': errMess = checkNumber(CheckElement);break;
						case '百分比': errMess = checkPercent(CheckElement);break;
						case '整数': errMess = checkInt(CheckElement);break;
						//add by wlb 03/08/27
						case '正整数': errMess = checkPlusInt(CheckElement);break;
						case '日期': errMess = checkDate(CheckElement);break;
						//add by wlb 04/04/21
						case '日期时分': errMess = checkDateMinute(CheckElement);break;
						
						case '年月日期': errMess = checkYearMonth(CheckElement);break;
						
						case '时分': errMess = checkMinute(CheckElement);break;
						case '时刻': errMess = checkDateTime(CheckElement);break;
						case 'IP地址': errMess = checkIP(CheckElement);break;
						case 'Email': errMess = checkEmail(CheckElement);break;
						case '电话': errMess = checkPhone(CheckElement);break;
						case '手机': errMess = checkMobilephone(CheckElement);break;
						case '日期时间': errMess = checkTime(CheckElement);break;
						case '工期': errMess = checkPlusTime(CheckElement);break;
						case '货币':errMess = checkCurrency(CheckElement);break;
						default:alert('暂时不能识别:'+CheckElement.dataType+'的数据类型');
					}
				}
			}
		
			if(ifCheckNull)
			{
				
				if(CheckElement.value == "" && CheckElement.dataType.substring(0,2)=="非空")
				{
					errMess = "必须填写;";
				}
			
			}
			//alert(errMess);
			if(errMess != "")
			{
				var disName = CheckElement.dispName;
				//alert(disName);
				/*
				if(CheckElement.dispName)
				{
					disName = CheckElement.dispName;
				}
				*/
				errMsg = errMsg + "<br/>" + disName + ":" + errMess;
				
			}
		}
	}
	return errMsg;
}

//功能：扩展日期函数，支持YYYY-MM-DD或YYYY-MMDD hh:mm:ss字符串格式
//返回：如果正确，则返回javascript中支持UTC日期格式，如果错误，则返回false  
//日期：2004-12-15
//举例： var myDate = Date_Ex("2004-12-21 23:01:00"); //返回正确的日期
//       var myDate = Date_Ex("2004-12-21");     //返回正确的日期
//       var myDate = Date_Ex("2004-23-12 12:60:29");//返回false，且提示日期或时间超出有效范围
function Date_Ex(value1)
{
 var strDate = value1;
 if (strDate.length == 0)
  return false;

 //先判断是否为短日期格式：YYYY-MM-DD，如果是，将其后面加上00:00:00，转换为YYYY-MM-DD hh:mm:ss格式
 var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})/;   //短日期格式的正则表达式
 var r = strDate.match(reg);

 if (r != null)   //说明strDate是短日期格式，改造成长日期格式
   strDate = strDate + " 00:00:00";
 
 reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})/;
 r = strDate.match(reg);
 if (r == null)
 {
  alert("你输入的日期格式有误，正确格式为：2004-12-01 或 2004-12-01 12:23:45");
  return false;
 }

 var d = new Date(r[1], r[3]-1,r[4],r[5],r[6],r[7]);
 if (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]&&d.getHours()==r[5]&&d.getMinutes()==r[6]&&d.getSeconds()== r[7])
 {
  return d;
 }
 else
 {
  alert("你输入的日期或时间超出有效范围，请仔细检查！");
  return false;
 }
}

