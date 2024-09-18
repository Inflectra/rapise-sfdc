# Overview

Framework for testing Salesforce applications

- Reusable actions are defined in `Sfdc` module.
- Data for each test case is defined in `Data.xlsx`.
- `Dropdowns.xlsx` contains lists of values for [RVL dropdowns](https://rapisedoc.inflectra.com/Guide/rvl_editor/#param-dropdowns).
- `Output.xlsx` is used to persist data between test executions (see SetOutputValue, GetOutputValue common functions below).
 
The way of test parameterization and reading data from an Excel spreadsheet is described in the docs:

[Data-Driven Testing](https://rapisedoc.inflectra.com/Guide/ddt/)

## Browser Profiles

The framework includes a local Chrome [browser profile](https://rapisedoc.inflectra.com/Guide/browser_settings/#local-browser-profiles) located in `Profiles\SeleniumProfiles` folder. This profile is configured to launch Chrome with the same user data profile to deal with MFA in Salesforce. It launches Chrome with these arguments:

```javascript
["disable-notifications", "user-data-dir=C:\\ProgramData\\Inflectra\\Rapise\\Temp\\Chrome"]
```

## Common Actions

All actions are defined in `Sfdc` module and implemented in `Sfdc.js`. Look into this file for details.

![Global Object](Media/Sfdc.png)

### Sfdc.Launch

Launches Salesforce in a browser. SfdcUrl, UserName, Password must be set in Config.xlsx

![SfdcLaunch RVL](Media/SfdcLaunch.png)

### Sfdc.OpenApp

Opens application.

![SfdcOpenApp RVL](Media/SfdcOpenApp.png)

![OpenApp](Media/OpenApp.png)

### Sfdc.NavigateModule

Navigates to module using nav bar.

![SfdcNavigateModule RVL](Media/SfdcNavigateModule.png)

![NavigateModule](Media/NavigateModule.png)

### Sfdc.SelectListView

Selects list view.

![SfdcSelectListView RVL](Media/SfdcSelectListView.png)

![SelectListView](Media/SelectListView.png)

### Sfdc.SearchTable

Searches data in a table.

![SfdcSearchTable RVL](Media/SfdcSearchTable.png)

![SearchTable](Media/SearchTable.png)

### Sfdc.SelectComboboxItem

Selects item from a combobox.

![SfdcSelectComboboxItem RVL](Media/SfdcSelectComboboxItem.png)

![SelectComboboxItem](Media/SelectComboboxItem.png)

### SetOutputValue

Writes key/value pair to Output.xlsx

![SetOutputValue RVL](Media/SetOutputValue.png)

### GetOutputValue

Reads value from Output.xlsx

![GetOutputValue RVL](Media/GetOutputValue.png)