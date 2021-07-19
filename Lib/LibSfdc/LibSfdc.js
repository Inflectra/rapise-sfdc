// Put library code here

function Sfdc_Launch()
{
	SfdcLaunch();
}

function Sfdc_OpenApp(/**string*/ app)
{
	SfdcOpenApp(app);
}

function Sfdc_NavigateModule(/**string*/ module)
{
	SfdcNavigateModule(module);
}

function Sfdc_SelectListView(/**string*/ view)
{
	SfdcSelectListView(view);
}

function Sfdc_SearchTable(/**string*/ value)
{
	SfdcSearchTable(value);
}

function Sfdc_SelectComboboxItem(/**string*/ name, /**string*/ item)
{
	SfdcSelectComboboxItem(name, item);
}

function Sfdc_SaveDom()
{
	SfdcSaveDom();
}

if (typeof(SeSGlobalObject) != "undefined")
{
	SeSGlobalObject("Sfdc");
}
