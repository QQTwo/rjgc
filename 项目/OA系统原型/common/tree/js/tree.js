function clickBar(no)
{
	//document.all["bar"].background="/egov/images/obrs-bar-00"+no+".gif";
	if(no==1)
	{
		document.all["AllTree"].style.display="none";
		document.all["DepartmentTree"].style.display="none";
		document.all["UnitTree"].style.display="none";
		document.all["PolityTree"].style.display="none";
		document.all["CustTree"].style.display="block";
		document.all["divtype"].value = "cust";
        }
	if(no==2)
	{
		document.all["AllTree"].style.display="none";
		document.all["DepartmentTree"].style.display="block";
		document.all["UnitTree"].style.display="none";
		document.all["PolityTree"].style.display="none";
		document.all["CustTree"].style.display="none";
		document.all["divtype"].value = "dept";
        }
	if(no==3)
	{
		document.all["AllTree"].style.display="none";
		document.all["DepartmentTree"].style.display="none";
		document.all["UnitTree"].style.display="block";
		document.all["PolityTree"].style.display="none";
		document.all["CustTree"].style.display="none";
		document.all["divtype"].value = "unit";
        }
	if(no==4)
	{
		document.all["AllTree"].style.display="none";
		document.all["DepartmentTree"].style.display="none";
		document.all["UnitTree"].style.display="none";
		document.all["PolityTree"].style.display="block";
		document.all["CustTree"].style.display="none";
		document.all["divtype"].value = "polity";
        }
	if(no==5)
	{
		document.all["AllTree"].style.display="block";
		document.all["DepartmentTree"].style.display="none";
		document.all["UnitTree"].style.display="none";
		document.all["PolityTree"].style.display="none";
		document.all["CustTree"].style.display="none";
		document.all["divtype"].value = "all";
        }
}

function clickNode(no,type)
{
	var flag = type;
	var divtype = document.all["divtype"].value;
	if(flag==1)
	{
		if(document.all[divtype+"_Dis_"+no].style.display=="block")
		{
			document.all[divtype+"_Dis_"+no].style.display="none";
		}
		else
		{
			document.all[divtype+"_Dis_"+no].style.display="block";
		}
	}
	if(flag==2)
	{
		if(document.all[divtype+"_Unit_"+no].style.display=="block")
		{
			document.all[divtype+"_Unit_"+no].style.display="none";
		}
		else
		{
			document.all[divtype+"_Unit_"+no].style.display="block";
		}
	}
}

function ok()
{
	var cont = document.all["cont"].value;
	var divtype = document.all["divtype"].value;
	var reval="";
	//alert(document.all["chk"].value);
	for(i=0;i<cont;i++)
	{
		if(document.all[divtype+"_chk_"+i] && document.all[divtype+"_chk_"+i].checked)
		{
			reval+=document.all[divtype+"_chk_"+i].value;
                }
	}
	if(document.all[divtype+"_chk"])
	{
		reval += document.all["onlyone"].value;
	}
	//alert(reval);
	window.returnValue=reval;
	window.close();
}
function ok1()
{
	var cont = document.all["cont"].value;
	var divtype = document.all["divtype"].value;
	//alert(divtype);
	var reval="";
	//alert(document.all["chk"].value);
	for(i=0;i<cont;i++)
	{
		if(document.all[divtype+"_chk"+i] && document.all[divtype+"_chk"+i].checked)
		{
			reval+=document.all[divtype+"_chk"+i].value;
                }
	}
	if(document.all[divtype+"_chk"])
	{
		reval += document.all["onlyone"].value;
	}
	//alert(reval);
	window.returnValue=reval;
	window.close();
}