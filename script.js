function CountLines(pFolder, re, aExtensions)
{
    var ForReading = 1, ForWriting = 2, ForAppending = 8;
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var oFolder = fso.GetFolder(pFolder);
    var oFiles;
    var pExt, oFile, line;
    var oExt = {};
    
    for (var i = 0; i < aExtensions.length; ++i)
        oExt[aExtensions[i]] = 0;
    
    for (oFiles = new Enumerator(oFolder.files); !oFiles.atEnd(); oFiles.moveNext())
    {
        oFile = oFiles.item()
        pExt = fso.GetExtensionName(oFile.Name).toLowerCase()
    
        if (pExt in oExt)
        {
            ts = oFile.OpenAsTextStream(ForReading);
    
            while (!ts.AtEndOfStream)
            {
                line = ts.ReadLine();
                if (line.search(re) != -1) ++oExt[pExt];
            }
            
            ts.Close();
        }
    }
    
    msg = "Count of lines:";
    for (var i = 0; i < aExtensions.length; ++i)
        msg += "\n  " + aExtensions[i] + ":  " + oExt[aExtensions[i]];
    WScript.Echo(msg);
}
 
 
function SortFiles(pFolder)
{
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var oFolder = fso.GetFolder(pFolder);
    aFiles = [];
    
    for (oFiles = new Enumerator(oFolder.files); !oFiles.atEnd(); oFiles.moveNext())
        aFiles.push(oFiles.item().Name);
          
    pFilesList = "";
    for (var i = 0; i < aFiles.length; ++i)
        pFilesList += aFiles[i] + "\n";
    
    WScript.Echo(pFilesList);
}
 

 
 
extensions = ["txt", "asm", "inf"];
 
oArgs = WScript.Arguments;
 
if (oArgs.length == 0)
{
    WScript.Echo("Using:\n  Zadanie 1 :\n  script.js 1 c:\\NamePapka SearchLine\n  2. Zadanie 2:\n  script.js 2 c:\\NamePapka")
}
 
else if (oArgs(0) == "1")
{
    if (oArgs.length > 2)
        CountLines(oArgs(1), oArgs(2), extensions);
    else if (oArgs.length == 2)
        CountLines(".", oArgs(1), extensions);
}
 
else if (oArgs(0) == "2")
{
    if (oArgs.length == 1)
        SortFiles(".");
    else if (oArgs.length == 2)
        SortFiles(oArgs(1));
}