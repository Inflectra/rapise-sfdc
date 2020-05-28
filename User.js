//Put your custom functions and variables in this file

g_recordUrls = false;
g_browserLibrary = "Chrome";

if (!g_recording)
{
	TestInit = function()
	{
		Global.DoLoadObjects('%WORKDIR%/Objects.js');
		Navigator.EnsureVisibleVerticalAlignment = "center";
		Navigator.NativeEvents = true;
	}
}

function SfdcFindObject(/**string*/ xpath)
{
	for(var i = 0; i < g_objectLookupAttempts; i++)
	{
		var obj = Navigator.Find(xpath);
		if (obj)
		{
			return obj;
		}
		Global.DoSleep(g_objectLookupAttemptInterval);
	}
	return null;
}

/**
 * Launches Salesforce in a browser. SfdcUrl, UserName, Password must be set in Config.xlsx
 */
function SfdcLaunch()
{
	var url = Global.GetProperty("SfdcUrl", "", "%WORKDIR%\\Config.xlsx");
	var usr = Global.GetProperty("UserName", "", "%WORKDIR%\\Config.xlsx");
	var pwd = Global.GetProperty("Password", "", "%WORKDIR%\\Config.xlsx");
	
	LoginSfdc(url, usr, pwd);
}

/**
 * Opens application.
 * @param app Name of an application (e.g. Service, Marketing, Sales).
 */
function SfdcOpenApp(/**string*/ app)
{
	SeS("G_Waffle").DoClick();
	var xpath = "//a[@data-label='" + app + "']";
	var obj = SfdcFindObject(xpath);
	if (obj)	
	{
		obj.object_name = app;
		obj.DoClick();
	}
	else
	{
		Tester.Assert("App element is not found: " + app, false);
	}
}

/**
 * Navigates to module using nav bar.
 * @param module Name of a module (e.g. Leads, Contacts, Opportunities).
 */
function SfdcNavigateModule(/**string*/ module)
{
	var xpath = "//one-app-nav-bar-item-root/a[@title='" + module + "']";
	var obj = SfdcFindObject(xpath);
	if (obj)	
	{
		obj.object_name = module;
		obj.DoClick();
	}
	else
	{
		Tester.Assert("Module element is not found: " + module, false);
	}
}

/** 
 * Selects list view.
 * @param view Name of a view. E.g. Recently Viewed, All Open Leads
 */
function SfdcSelectListView(/**string*/ view)
{
	SeS("G_Select_List_View").DoClick();
	var xpath = "//a[@role='option']//span[text()='" + view + "']";
	var obj = SfdcFindObject(xpath);
	if (obj)	
	{
		obj.object_name = view;
		obj.DoClick();
	}
	else
	{
		Tester.Assert("View element is not found: " + view, false);
	}
}

/**
 * Searches data in a table.
 */
function SfdcSearchTable(/**string*/ value)
{
	var xpath = "//input[@type='search' and @class='slds-input']";
	var obj = SfdcFindObject(xpath);
	if (obj)	
	{
		obj.object_name = "Search";
		obj.DoClick();
		obj.DoSetText(value);
		obj.DoSendKeys("{ENTER}");
	}
	else
	{
		Tester.Assert("Search element is not found", false);
	}
}

/** 
 * Selects item from a combobox
 * @param item Item name.
 * @param name Name of a combobox.
 */
function SfdcSelectComboboxItem(/**string*/ name, /**string*/ item)
{
	var xpath = "//a[@role='button' and ../../../../..//span[text()='" + name + "']]";
	var obj = SfdcFindObject(xpath);
	if (obj)	
	{
		obj.object_name = name;
        obj.DoEnsureVisible();
		obj.DoClick(obj.GetWidth() - 20);
		var itemObj = SfdcFindObject("//a[@title='" + item + "' and @role='menuitemradio']");
		if (itemObj)
		{
			itemObj.object_name = item;
			itemObj.DoClick();
		}
		else
		{
			Tester.Assert("Item element is not found: " + item, false);
		}
	}
	else
	{
		Tester.Assert("Combobox element is not found: " + name, false);
	}
}

/**
 * Writes key/value pair to Output.xlsx
 * @param key
 * @param value
 */
function SetOutputValue(/**string*/ key, /**string*/ value)
{
	Global.SetProperty(key, value, "%WORKDIR%\\Output.xlsx");
}


/**
 * Reads value from Output.xlsx
 * @param key
 * @param [defValue]
 */
function GetOutputValue(/**string*/ key, /**string*/ defValue)
{
	return Global.GetProperty(key, defValue, "%WORKDIR%\\Output.xlsx");
}

/**
 * Navigates to the specified URL and performs login.
 * Opens a browser if necessary.
 * @param url
 * @param userName
 * @param password
 */
function LoginSfdc(/**string*/ url, /**string*/ userName, /**string*/ password)
{
	var o = {
		"UserName": "//input[@id='username']",
		"Password": "//input[@id='password']",
		"Sumbit": "//input[@id='Login']"	
	};

	Navigator.Open(url);
	Navigator.SetPosition(0, 0);
	
	Tester.SuppressReport(true);

	try
	{
		Navigator.Find(o["UserName"]).DoSetText(userName);
		Navigator.Find(o["Password"]).DoSetText(password);
		Navigator.Find(o["Sumbit"]).DoClick();
		Global.DoSleep(2000);
		Tester.SuppressReport(false);
		Tester.Message("Logged in as " + userName);
	}
	catch(e)
	{
		Tester.SuppressReport(false);	
		Tester.Message(e.message);
	}	
}
