// Put functions and global variables shared across all test cases here

g_recordUrls = false;

/**
 * Run this code before each test case.
 */
SeSOnTestInit(function() {
	if (g_entryPointName == "Test") {
		// Put your common initialization code here
	}
});

/**
 * Run this code after each test case.
 */
SeSOnTestFinish(function() {
	if (g_entryPointName == "Test") {
		// Put your common finalization code here
		Navigator.Close();
	}
});

/**
 * Selenium capabilities callback.
 */
function GetWebDriverNonProfileCapabilities(profile)
{
	var caps = {};

	// set capabilities based on profile name
	Tester.Message("GetWebDriverNonProfileCapabilities: " + profile);
	if (profile == "ChromeParallel")
	{
		Tester.Message("Thread: " + g_playerThread);
		var suffix = g_playerThread ? "T" + g_playerThread : "";
		var dataDir = "C:\\ProgramData\\Inflectra\\Rapise\\Temp\\Chrome" + suffix;
		Tester.Message("Data Dir: " + dataDir);
		caps["args"] = ["user-data-dir=" + dataDir];
	}
	
	return caps;
}
