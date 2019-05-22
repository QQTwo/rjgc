var gcToggle = "#ffff00";
var gcBG = "#CCCCFF";

function IOFFICE_GetSelected(aCell)
{

  		window.returnValue = aCell.innerText;
		window.close();

}


function fPopUpDlg(dialogType,ctl,WINname,WINwidth,WINheight){

	var endtarget;
	if(dialogType == "POPUPLIST_MEETINGPRESIDIALDEPTNAME"){
        	endtarget = "../masterref/popup_meetingPresidialDeptName.jsp";
	}else if(dialogType == "POPUPLIST_MEETINGADDRESS"){
        	endtarget = "../masterref/popup_meetingAddress.jsp";
	}else if(dialogType == "POPUPLIST_MEETINGTITLE"){
        	endtarget = "../masterref/popup_meetingTitle.jsp";
	}else if(dialogType == "POPUPLIST_REMARK"){
		endtarget = "../masterref/popup_docr.jsp";
	}else if(dialogType == "POPUPLIST_POSITION"){
		endtarget = "../masterref/popup_position.jsp";
	}else if(dialogType == "POPUPLIST_UNIVERSITY"){
		endtarget = "../masterref/popup_university.jsp";
	}else if(dialogType == "POPUPLIST_MAJOR"){
		endtarget = "../masterref/popup_major.jsp";
	}else if(dialogType == "POPUPLIST_ORGAN"){
		endtarget = "../masterref/popup_organ.jsp";
	}else if(dialogType == "POPUPLIST_PROBLEMTYPE"){
		endtarget = "../masterref/popup_problemtype.jsp";
	}else if(dialogType == "POPUPLIST_CERTIFICATION"){
		endtarget = "../masterref/popup_certification.jsp";
	}else if(dialogType == "POPUPLIST_SCHEDULETYPE"){
		endtarget = "../masterref/popup_scheduletype.jsp";
	}else if(dialogType == "POPUPLIST_PLACE"){
		endtarget = "../masterref/popup_place.jsp";
	}else if(dialogType == "POPUPLIST_CONTRACTSTOP"){
		endtarget = "../masterref/popup_contractstop.jsp";
	}else if(dialogType == "POPUPLIST_WHITHER"){
		endtarget = "../masterref/popup_whither.jsp";
	}else if(dialogType == "POPUPLIST_MESSAGETITLE"){
		endtarget = "../masterref/popup_messagetitle.jsp";
	}else if(dialogType == "POPUPLIST_BOOKPURPOSE"){
		endtarget = "../masterref/popup_bookpurpose.jsp";
	} else if(dialogType == "POPUPLIST_CONTRACTSTOP"){
		endtarget = "../masterref/popup_contractstop.jsp";
	}else if(dialogType == "POPUPLIST_APPLICATIONTITLE"){
		endtarget = "../masterref/popup_applicationtitle.jsp";
	}else if(dialogType == "POPUPLIST_DDNAPPLICATIONTITLE"){
		endtarget = "../ddn/popup_ddnApplicationtitle.jsp";
	}else if(dialogType == "POPUPLIST_EMPCURPOSITION"){
		endtarget = "../masterref/popup_empcurposition.jsp";
	}else if(dialogType == "POPUPLIST_SHOWMESSAGETITLE"){
		endtarget = "../masterref/popup_showmessagetitle.jsp";
	}else if(dialogType == "POPUPLIST_COMPANYNAME"){
		endtarget = "../masterref/popup_companyname.jsp";
	}else if(dialogType == "POPUPLIST_BOOKPUBLISHER"){
		endtarget = "../masterref/popup_bookpublisher.jsp";
	}else if(dialogType == "POPUPLIST_BOOKLANGUAGE"){
		endtarget = "../masterref/popup_booklanguage.jsp";
	}else if(dialogType == "POPUPLIST_BOOKCLASSIFY"){
		endtarget = "../masterref/popup_bookclassify.jsp";
	}else if(dialogType == "POPUPLIST_PROVINCE"){
		endtarget = "../masterref/popup_province.jsp";
	}else if(dialogType == "POPUPLIST_RELATIONSHIP"){
		endtarget = "../masterref/popup_relationship.jsp";
	}else if(dialogType == "POPUPLIST_INDUSTRYTYPE"){
		endtarget = "../masterref/popup_industrytype.jsp";
	}else if(dialogType == "POPUPLIST_ENTERPRISETYPE"){
		endtarget = "../masterref/popup_enterprisetype.jsp";
	}else if(dialogType == "POPUPLIST_OPPRSTAGE"){
		endtarget = "../masterref/popup_opprstage.jsp";
	}else if(dialogType == "POPUPLIST_OPPRROLE"){
		endtarget = "../masterref/popup_opprrole.jsp";
	}else if(dialogType == "POPUPLIST_OPPRDOCTYPE"){
		endtarget = "../masterref/popup_opprdoctype.jsp";
	}else if(dialogType == "POPUPLIST_MEASUREUNIT"){
		endtarget = "../masterref/popup_measureunit.jsp";
	}else if(dialogType == "POPUPLIST_GERINFOTYPE"){
		endtarget = "../masterref/popup_gerinfotype.jsp";
	}else if(dialogType == "POPUPLIST_COLORPALATE"){
		endtarget = "../vote/palate.htm";
	}else if(dialogType == "POPUPLIST_SKILLNAME"){
		endtarget = "../masterref/popup_skilllist.jsp";
	}else if(dialogType == "POPUPLIST_SKILLLEVEL"){
		endtarget = "../masterref/popup_skilllevel.jsp";
	}else {
		endtarget = "../masterref/popup_posincharge.htm";
	}
	showx = event.screenX - event.offsetX - 4 - WINwidth ; // + deltaX;
	showy = event.screenY - event.offsetY + 18; // + deltaY;

	if (dialogType == "POPUPLIST_CONTRACTSTOP"){
	    showx = event.screenX - event.offsetX - WINwidth + 150;
  	    showy = event.screenY - event.offsetY + 20;


	}

	newWINwidth = WINwidth + 4 + 18;
	var features =
		'dialogWidth:'  + newWINwidth  + 'px;' +
		'dialogHeight:' + WINheight + 'px;' +
		'dialogLeft:'   + showx     + 'px;' +
		'dialogTop:'    + showy     + 'px;' +
		'directories:no; localtion:no; menubar:no; status=no; toolbar=no;scrollbars:no;Resizeable=no';


	var retval = window.showModalDialog(endtarget, " ", features );
	if( retval != null ){
		retval = trim(retval);
		ctl.value = retval;
	}else{
		//alert("canceled");
	}
}

function fPopUpCalendarDlg(ctrlobj,prePath)
{
	showx = event.screenX - event.offsetX - 4 - 210 ; // + deltaX;
	showy = event.screenY - event.offsetY + 18; // + deltaY;
	newWINwidth = 210 + 4 + 18;
	//alert(prePath);
			var completP;
			if(prePath==undefined){
				  completP="../js/masterref/CalendarDlgCN.htm";
			}
			else{
				completP= prePath+"../js/masterref/CalendarDlgCN.htm";
			}
	retval = window.showModalDialog(completP, "", "dialogWidth:197px; dialogHeight:210px; dialogLeft:"+showx+"px; dialogTop:"+showy+"px; status:no; directories:yes;scrollbars:no;Resizable=no; "  );
	if( retval != null ){
		ctrlobj.value = retval;
	}else{
		//alert("canceled");
	}
}

function fPopUpColorDlg(ctrlobj)
{
	showx = event.screenX - event.offsetX - 4 - 210 ; // + deltaX;
	showy = event.screenY - event.offsetY + 18; // + deltaY;
	newWINwidth = 380 + 4 + 18;

	retval = window.showModalDialog("../vote/palette.htm", "", "dialogWidth:242px; dialogHeight:333px; dialogLeft:"+showx+"px; dialogTop:"+showy+"px; status:no; directories:yes;scrollbars:no;Resizable=no; "  );
	if( retval != null ){
		ctrlobj.value = retval;
	}else{
		return;
	}
}

function fPopUpChart(dialogType,WINwidth,WINheight, para1,para2)
{
	showx = event.screenX / 3 ; // + deltaX;
	showy = event.screenY / 3 ; // + deltaY;

	var features =
		'dialogWidth:'  + WINwidth  + 'px;' +
		'dialogHeight:' + WINheight + 'px;' +
		'dialogLeft:'   + showx     + 'px;' +
		'dialogTop:'    + showy     + 'px;' +
		'directories:no; localtion:no; menubar:no; status=no; toolbar=no;scrollbars:no;Resizeable=no';

	if(dialogType == "POPUP_VOTECHART"){
		endtarget = "../vote/vote-chart.do?action=Init&serialId=" + para1;
	}
	var retval = window.showModalDialog(endtarget, " ", features );
}
