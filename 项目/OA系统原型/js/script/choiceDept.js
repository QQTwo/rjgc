function fPopUpDeptTreeSingle(name){
 var val = window.showModalDialog("/egov/Comm/UnitTree.jsp?CodeType=1&ChkType=2","",'dialogHeight:515px;dialogWidth:450px');//复选机构
 if(val != null){
   var strlength= val.length;//取出返回字符串的长度
   var orgstr = val ;//初始化操作字符串
   var swt = true;
   var deptValue ="";
   while(swt){
   	var untssplite  = orgstr.indexOf(";");//不同机构之间
	if(!(untssplite==-1)){
	  var str1 = orgstr.substring(0,untssplite);//取机构
	  var str2 = orgstr.substring(untssplite+1,orgstr.length);//取后续机构字符串,待用
	  orgstr = str2;//更新当前的待用字符串
//	  num.value=num.value+"|"+str1.substring(0,str1.indexOf("|"));
	  deptValue=deptValue+" "+str1.substring(str1.indexOf("|")+1,str1.length);
	}else{swt = false;}//最后一个字符串，置开关为false
   }
   name.value = deptValue;
 }else{
   name.value="选择错误！";
 }
}

function fPopUpDeptTreeMult(name){
 var val = window.showModalDialog("../egov/Comm/UnitTree.jsp?CodeType=1&ChkType=1","",'dialogHeight:515px;dialogWidth:450px');//复选机构
 if(val != null){
   var strlength= val.length;//取出返回字符串的长度
   var orgstr = val ;//初始化操作字符串
   var swt = true;
   var deptValue ="";
   while(swt){
   	var untssplite  = orgstr.indexOf(";");//不同机构之间
	if(!(untssplite==-1)){
	  var str1 = orgstr.substring(0,untssplite);//取机构
	  var str2 = orgstr.substring(untssplite+1,orgstr.length);//取后续机构字符串,待用
	  orgstr = str2;//更新当前的待用字符串
//	  num.value=num.value+"|"+str1.substring(0,str1.indexOf("|"));
	  deptValue=deptValue+" "+str1.substring(str1.indexOf("|")+1,str1.length);
	}else{swt = false;}//最后一个字符串，置开关为false
   }
   name.value = deptValue;
 }else{
   name.value="选择错误！";
 }
}