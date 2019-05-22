//////////////////////////////////////////////////////////////////////
//
//  ======================================================
//  GLADIATOR JAVASCRIPT CALENDAR AND JULIAN DAY FUNCTIONS
//  ======================================================
//
//  Javascript Calendar and Julian day to Gregorian date
//  conversion functions
//
//  VERSION: 1.0.0 dated 2003.10.15
//
//  COPYRIGHT (c) 2003 by Edward H. Trager.  ALL RIGHTS RESERVED.
//  Ann Arbor, Michigan, USA.
//
//  This file and the accompanying Cascading Style Sheet file,
//  calendar.css, are released under the
//  GNU GENERAL PUBLIC LICENSE (GPL) -- see terms below.  You
//  are basically free to use and modify these files, but you
//  must preserve the copyright notice above.
//
//  AUTHOR
//  ------
//
//  Edward H. Trager  <ehtrager@umich.edu>
//
//  DESCRIPTION
//  -----------
//
//  The main purpose of this file and its accompanying Cascading
//  Style Sheet, calendar.css, are to provide a Javascript popup
//  calendar for use in modern browser-based applications.
//
//  The popup calendar uses "dayOfWeek( julianDay() )" to determine
//  the day of the week of the first day of the month.
//  A complementary "julianGregorianDate()" function is also
//  provided so that you can make round-trip conversions between
//  Julian days and calendar dates if your application should
//  require it.  These functions are based directly on the
//  algorithms presented in Press et al., "Numerical Recipes in C"
//  (Cambridge University Press, 1988). The "julianGregorianDate()"
//  function is not actually required for the popup calendar
//  to work.
//
//  Unlike many other Javascript calendars that one finds on the
//  web, this calendar relies entirely on the World Wide Web
//  Consortium's (W3C) Document Object Model (DOM) and Cascading
//  Style Sheet (CSS) standards for its operation.  There is not
//  a single line of Netscape- or Internet Explorer-specific
//  code in the beast.  As a result, the code is relatively short
//  and simple, and it should work on all DOM- and CSS-compliant
//  browsers.
//
//  Also unlike many other Javascript calendars, this one will
//  happily give you a calendar for any year in the past
//  (but not preceding January 1st, 4713 BCE) or future
//  Of course you must recognize that the Gregorian calendar only
//  took effect in 1582 when Pope Gregory XIII implemented it based
//  on the recommendations of the commission headed by the Jesuit
//  mathematician and astronomer, Christoph Clavius.  At that time,
//  only the Catholic countries adopted it immediately.  Some
//  countries did not adopt it until much later.  For example, the
//  English and the American colonies did not adopt it until the
//  middle of the 18th century.  Keep this in mind if your application
//  requires historical dates!
//
//  SUMMARY OF GPL LICENSING TERMS
//  ------------------------------
//
//  This program is free software; you can redistribute it and/or
//  modify it under the terms of the GNU General Public
//  License as published by the Free Software Foundation; either
//  version 2 of the License, or (at your option) any later version.
//
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
//  General Public License for more details.
//
//  You should have received a copy of the GNU General Public
//  License along with this software source code distribution; if not,
//  write to the Free Software Foundation, Inc., 59 Temple Place -
//  Suite 330, Boston, MA 02111-1307, USA, or review the license
//  online at:
//
//     http://www.gnu.org/licenses/gpl.txt
//
//////////////////////////////////////////////////////////////////////
//
// calendar.js
//
//////////////////////////////////////////////////////////////////////

//
// julianDay()
//
// Arguments: Y: year; M: month; D: date;
// Return: Julian day number;
//
// julianDay and julianGregorianDate algorithms adapted
// from Press et al., "Numerical Recipes in C"
// (Cambridge Univ. Press).  The Javascript adaptation
// presented here also borrows a bit from Marc A. Murison's
// Javascript implementation shown on the U.S. Naval Observatory's
// Astronomical Applications Dept. web page, "Julian Date Converter"
// at http://aa.usno.navy.mil/data/docs/JulianDate.html
//
function julianDay( Y, M, D ){

	var y,m,d;

	// Guard against arguments that are really passed as strings:
	y=parseInt(Y);
	m=parseInt(M);
	d=parseInt(D);

	var jy,ja,jm;

	// Don't permit year zero: it does not exist in the Julian calendar:
	if( y==0 ){
		alert("There was no year zero in the Julian calendar.");
		return "invalid";
	}

	// Don't permit the missing 10 days in October of 1582:
	if( y==1582 && m==10 && d>4 && d<15 ){
		alert("October 5th to 14th were skipped in October of 1582\nwhen Pope Gregory XIII implemented the calendar reforms\nof the commission headed by the Jesuit mathematician and astronomer\nChristoph Clavius.");
		return "invalid";
	}

	// Negative years represent years before the Common Era (BCE).
	// Correct for the fact that there was no year zero:
	if(y<0) y++;

	if(m>2){
		jy=y;
		jm=m+1;
	}else{
		jy=y-1;
		jm=m+13;
	}

	var julian = Math.floor( Math.floor(365.25*jy) + Math.floor(30.6001*jm) + d + 1720995 );

	// Check for the switch to the Gregorian calendar:
	var gregorianStart = 15 + 31*( 10 + 12*1582 );

	if( d + 31*(m + 12*y) >= gregorianStart ){
		ja = Math.floor(0.01*jy);
		julian += 2 - ja + Math.floor(0.25*ja);
	}

	// return the Julian day number:
	return julian;

}

//
// julianGregorianDate()
//
// Argument: Julian day number;
// Return: Julian or Gregorian date string in ISO YYYY-MM-DD form;
//
// julianDay and julianGregorianDate algorithms adapted
// from Press et al., "Numerical Recipes in C"
// (Cambridge Univ. Press).  The Javascript adaptation
// presented here also borrows a bit from Marc A. Murison's
// Javascript implementation shown on the U.S. Naval Observatory's
// Astronomical Applications Dept. web page, "Julian Date Converter"
// at http://aa.usno.navy.mil/data/docs/JulianDate.html
//
function julianGregorianDate( julian ){

	var j1, j2, j3, j4, j5;

	// This is of course the Julian day number
	// for October 15, 1582:
	var gregorianStart  = 2299161;
	if( julian >= gregorianStart ){
		var tmp = Math.floor( ( (julian - 1867216) - 0.25 ) / 36524.25 );
		j1 = julian + 1 + tmp - Math.floor(0.25*tmp);
	}else{
		j1 = julian;
	}

	j2 = j1 + 1524;
	j3 = Math.floor( 6680.0 + ( (j2 - 2439870) - 122.1 )/365.25 );
	j4 = Math.floor(j3*365.25);
	j5 = Math.floor( (j2 - j4)/30.6001 );

	var d = Math.floor(j2 - j4 - Math.floor(j5*30.6001));
	var m = Math.floor(j5 - 1);
	if( m > 12 ) m -= 12;
	var y = Math.floor(j3 - 4715);
	if( m > 2 ) y--;
	if( y <= 0 ) y--;

	return formatISODate(y,m,d);

}

//
// dayOfWeek()
//
// Argument: Julian day number;
// Return: Day of week;
//
function dayOfWeek( julian ){

	return (julian+1)%7;

}

//
// padWithZeros()
//
// Arguments: number: value to display; length: total length to display;
// Return: number padded out with zeros;
//
function padWithZeros(number,length) {
	 var str = "" + number;
	 while( str.length < length ) str = '0' + str;
	 return str;
}


//
// formatISODate()
//
// Arguments: year, month, day
// Return: Date string in ISO 8601 format for CE years.
//
//         For years BCE, the year is padded to 4 digits
//         and is prefixed with a negative sign.
//         Actual ISO 8601 conformance would require
//         expanding the padding of BCE years
//         beyond 4 digits, which I do not do, and then
//         prefixing with a negative sign.
//
//         NOTE BENE: If your application really
//         requires accurate representation of dates
//         before 1582, consider modifying this function
//         to return the Julian day number instead.  This
//         would solve the issue of BCE dates as well.
//
function formatISODate( year, month, day ){

	// Date delimiter:
	var delimiter="-";
	if(year<0){
		year= -year; year = "-" + padWithZeros(year,4);
	}else{
		year = padWithZeros(year,4);
	}
	return year + delimiter + padWithZeros(month,2) + delimiter + padWithZeros(day,2);

}

//
// setToday(): Sets objectId's value to today's ISO 8601 date string
// Arguments: Id of the target object (i.e., a text entry widget)
//
function setToday( objectId ){

	var today = new Date();
	document.getElementById( objectId ).value = formatISODate( today.getFullYear(), today.getMonth()+1, today.getDate() );

}

//
// callCalendar(): Examines the objectId's value to see if a seed year, month, and/or day
//                 are present to use for seeding generateCalendar(), and then calls
//                 generateCalendar() with the objectId as the target.
//
function callCalendar( objectId ){

	var dateString=document.getElementById( objectId ).value;
	// Normalize possibly variant delimiters to the ISO preferred delimiter:
	var re = new RegExp( '[/\.\ ]', 'gi' );
	dateString=dateString.replace( re, "-" );
	// Split the date string:
	dateComponents=dateString.split("-");
	var year,month,day;
	year=dateComponents[0];
	month=dateComponents[1];
	day=dateComponents[2];
	generateCalendar( year, month, day, objectId );

}

//
// setDate()
//
function setDate(day){

	// Format the date string:
	year =document.getElementById("currentYear").value;
	month=document.getElementById("currentMonth").value;
	isoDateString=formatISODate(year,month,day);
	// Get the destination object id:
//	idString = document.getElementById("destinationId").value;
//	alert(isoDateString);
	// Store the value:
	calendarlist.location.href="dailywork_list.htm";//document.getElementById( idString ).value=isoDateString;
//	window.close();
//
}

//
// previousYear()
//
function previousYear(){

	year =parseInt(document.getElementById("currentYear").value);
	month=parseInt(document.getElementById("currentMonth").value);
	day  =parseInt(document.getElementById("currentDay").value);
	destination = document.getElementById("destinationId").value;
	year -= 1;
	// Remember that there was no year zero:
	if( year==0 ) year = -1;
	//
	// NOTE BENE: The generateCalendar() function *MUST* be called
	// from the "window.opener" window.  Otherwise, if you just call
	// "generateCalendar()" from *this* window, then the "opener"
	// property becomes the calendar popup window itself in the new
	// incarnation of the calendar window -- instead of being
	// the form window -- and then you would be stuck with no
	// way to access the form elements in the main form window!
	//
//	window.opener.generateCalendar(year,month,day,destination);
	generateCalendar(year,month,day,destination);
}

//
// previousMonth()
//
function previousMonth(){

	year =parseInt(document.getElementById("currentYear").value);
	month=parseInt(document.getElementById("currentMonth").value);
	day  =parseInt(document.getElementById("currentDay").value);
	destination = document.getElementById("destinationId").value;
	month -= 1;
	if(month<1){
		month = 12;
		year -= 1;
		if( year==0 ) year = -1;
	}
//	window.opener.generateCalendar(year,month,day,destination);
	generateCalendar(year,month,day,destination);
}

//
// nextMonth()
//
function nextMonth(){

	year =parseInt(document.getElementById("currentYear").value);
	month=parseInt(document.getElementById("currentMonth").value);
	day  =parseInt(document.getElementById("currentDay").value);
	destination = document.getElementById("destinationId").value;
	month += 1;
	if(month>12){
		month = 1;
		year += 1;
		if( year==0 ) year = 1;
	}
//	window.opener.generateCalendar(year,month,day,destination);
	generateCalendar(year,month,day,destination);

}

//
// nextYear()
//
function nextYear(){

	year =parseInt(document.getElementById("currentYear").value);
	month=parseInt(document.getElementById("currentMonth").value);
	day  =parseInt(document.getElementById("currentDay").value);
	destination = document.getElementById("destinationId").value;
	year += 1;
	// Remember that there was no year zero:
	if( year==0 ) year = 1;
//	window.opener.generateCalendar(year,month,day,destination);
	generateCalendar(year,month,day,destination);
}

//
// generateCalendar()
//
// Arguments: Year, Month, Day, and the ID of the target element.
//
// This function creates the popup calendar.  Clicking on a date
// populates the target element with the chosen date in ISO 8601
// YYYY-MM-DD format (for Common Era years: years before Common Era
// are prefixed with a negative sign) and closes the popup window.
//
function generateCalendar( Y, M, D, targetId ){

	// Names of the Months:
	//var Month = new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
	//var Month = new Array("1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月");
	var Month = new Array("1","2","3","4","5","6","7","8","9","10","11","12");
	// Days of the Week:
	//var Day = new Array("Sun","Mon","Tue","Wed","Thu","Fri","Sat");
	//var Day = new Array("日","一","二","三","四","五","六");
	var Day = new Array("<img src='../images/7.gif'>","<img src='../images/1.gif'>","<img src='../images/2.gif'>","<img src='../images/3.gif'>","<img src='../images/4.gif'>","<img src='../images/5.gif'>","<img src='../images/6.gif'>");
	// Digits (if you want to use something other than Arabic-Indic digits):
	// var Digits = new Array("0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31");

	var daysInMonth = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
	var daysInAWeek=7;
	var OutputString;

	// Guard against arguments that are really passed as strings:
	// Get year:
	var today = new Date();
	if( Y=="" || isNaN(Y) ){
		thisYear=today.getFullYear();
	}else{
		thisYear=parseInt(Y);
	}
	// Get month:
	if( M=="" || isNaN(M) ){
		thisMonth=today.getMonth()+1;
	}else{
		thisMonth=parseInt(M);
		if(thisMonth<1) thisMonth=1;
		if(thisMonth>12) thisMonth=12;
	}
	// Get day:
	if( D=="" || isNaN(D) ){
		thisDay=today.getDate();
	}else{
		thisDay=parseInt(D);
		if(thisDay<0) thisDay=1;
		if(thisDay>31) thisDay=31;
	}

	// Calculate the number of days in February:
	if ((thisYear % 4) == 0){
		daysInMonth[ 1 ] = 29;
		if((thisYear % 100) == 0 && (thisYear % 400) != 0){
			daysInMonth[ 1 ] = 28;
		}
	}

	// Document header:
	OutputString = "<%@ page contentType=\"text/html; charset=GBK\" %>";
	OutputString += "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0.1//EN\"\n";
	OutputString += "   \"http://www.w3.org/TR/html4/strict.dtd\">\n";
	OutputString += "<html>\n <head>\n";
	OutputString += "  <title>Gladiator \uFFFD\uFFFDュ\uFFFD\uFFFD</title>\n";
	OutputString += "  <meta http-equiv=\"Content-Type\" content=\"text/html; charset=2312\">\n";
	OutputString += "  <link href=\"../style/styles.css\" rel=\"STYLESHEET\" type=\"text/css\">\n <link rel=\"stylesheet\" title=\"Default Style\" href=\"../style/calendar.css\" type=\"text/css\" media=\"screen\">\n";
	OutputString += "  <script type=\"text/javascript\" src=\"../style/calendar.js\"></script>\n";
	OutputString += " </head>\n <body class=\"body0\" id=\"mycal\">\n";

	// Start the calendar table with day headings:
	OutputString += "<table border='1' align='center'>\n <tr>\n";
	OutputString += "<td class='calendarheading' colspan='7' align='center'><table class='normal' width='100%' height='100%' border='0' cellpadding='0' cellspacing='0'><tr><td class='normal' width='21'>&nbsp;</td>\n";
//	OutputString += " <td class=\"calendarheading\"><div class=\"cssleftstretcharrow\" onclick=\"previousYear()\"><!-- left arrow --></div></td>\n";
//	OutputString += " <td class=\"calendarheading\"><div class=\"cssleftarrow\" onclick=\"previousMonth()\"><!-- left arrow --></div></td>\n";
	OutputString += " <td class=\"normal\"><img style='cursor:hand' src='../images/preyear.gif' onclick=\"previousYear()\"></td>\n";
	OutputString += " <td class=\"normal\"><img style='cursor:hand' src='../images/premonth.gif' onclick=\"previousMonth()\"></td>\n";
	// Print the year heading: If year<0, negate and print "BCE"; if 0<year<1000, print "CE":
//	OutputString += " <td class=\"calendarheading\" colspan=\"3\">";
	if( thisYear < 0 ) yearString = -thisYear + " BCE";
	else if( thisYear < 1000 ) yearString = thisYear + " CE";
	else yearString = thisYear;
	OutputString += "<td class='normal' width='30'>"+yearString + "</td><td class='normal'><img src='../images/year.gif'></td>";
	// Print the month heading:
	OutputString += "<td class='normal' width='20'>"+Month[ thisMonth-1 ] + "</td><td class='normal'><img src='../images/month.gif'></td>";

//	OutputString += " <td class=\"calendarheading\"><div class=\"cssrightarrow\" onclick=\"nextMonth()\"><!-- right arrow --></div></td>\n";
//	OutputString += " <td class=\"calendarheading\"><div class=\"cssrightstretcharrow\" onclick=\"nextYear()\"><!-- right arrow --></div></td>\n";
	OutputString += " <td class=\"normal\"><img style='cursor:hand' src='../images/nextmonth.gif' onclick=\"nextMonth()\"></td>\n";
	OutputString += " <td class=\"normal\"><img style='cursor:hand' src='../images/nextyear.gif' onclick=\"nextYear()\"></td>\n";
	OutputString += "<td class='normal' width='21'>&nbsp;</td></tr></table></td></tr>\n <tr>\n";
	for(i=0;i<daysInAWeek;i++){
		OutputString += "  <th>" + Day[i] + "</th>\n";
	}
	OutputString += " </tr>\n <tr>\n";

	// Get the day of week of the first of the month:
	var firstDay=dayOfWeek( julianDay( thisYear, thisMonth, 1 ) );
	//alert( Day[ firstDay ] );

	// First week:
	for(i=0;i<firstDay;i++){
		OutputString += "  <td>&nbsp;</td>\n";
	}
	for(d=1;i<daysInAWeek;i++,d++){
		// Special handling for October of 1582:
		if( d==5 && thisMonth==10 && thisYear==1582 ) d+=10;
		OutputString += "  <td";
		if(d==thisDay) OutputString += " onmouseover=\"this.className='thisdayhover'\" onmouseout=\"this.className='thisday'\" class='thisday'";
		else OutputString += " onmouseover=\"this.className='tdhover'\" onmouseout=\"this.className='tdnormal'\"";
		OutputString += " onclick=\"setDate(" + d + ")\">" + d + "</td>\n";
	}

	// Subsequent weeks;
	var lastDayOfMonth=daysInMonth[thisMonth-1];
	for(j=1;j<6 && d<=lastDayOfMonth;j++){
		OutputString += " </tr>\n <!-- Week " + (j+1) + " -->\n<tr>\n";
		// Days in this month:
		for( i=0; i<daysInAWeek && d<=lastDayOfMonth;i++,d++){
			OutputString += "  <td";
			if(d==thisDay) OutputString += " onmouseover=\"this.className='thisdayhover'\" onmouseout=\"this.className='thisday'\" class='thisday'";
			else OutputString += " onmouseover=\"this.className='tdhover'\" onmouseout=\"this.className='tdnormal'\"";
			OutputString += " onclick=\"setDate(" + d + ")\">" + d + "</td>\n";
		}
		// Finish out the row:
		for(;i<daysInAWeek;i++){
			OutputString += "  <td>&nbsp;</td>\n";
		}
	}
	// Finish the HTML, with hidden vars:
	OutputString += "  </tr>\n";
	OutputString += " </table>\n";
	OutputString += " <p>\n";
	OutputString += "  <input type=\"hidden\" id=\"currentYear\" value=\"" + thisYear + "\">\n";
	OutputString += "  <input type=\"hidden\" id=\"currentMonth\" value=\"" + thisMonth + "\">\n";
	OutputString += "  <input type=\"hidden\" id=\"currentDay\" value=\"" + thisDay + "\">\n";
	OutputString += "  <input type=\"hidden\" id=\"destinationId\" value=\"" + targetId + "\">\n";
//	OutputString += " </p>\n ";
	OutputString += " </p>\n </body>\n</html>\n";

//	var calendarWindow;
//	if( !calendarWindow || calendarWindow.closed() ){
//		calendarWindow = window.open("","Calendar","screenX=50, screenY=50, width=325, height=275,resizable=no");
//	}
//	document.clear();
	document.write(OutputString);
	document.close();

}
