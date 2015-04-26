function MenuChoice()
{
    if (document.getElementById("menu").value == "Display Category List")
    {
        document.getElementById("section1").style.visibility = "visible";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Add Product Category")
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "visible";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Change Category Description") 
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "visible";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Delete a Category")
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "visible";
        document.getElementById("section5").style.visibility = "hidden";
    }
    else
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "visible";
    }
}

function GetCategory()
{
    var objRequest = new XMLHttpRequest(); //Create AJAX request object
    
    //Create URL
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getAllCategories";
 
    //Checks that the object has returned data
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            CategoryOutput(output);
        }
    }
 
    //Initiate the server request
    objRequest.open("GET", url, true);
    objRequest.send();
}

function CategoryOutput(result)
{
    var count = 0;
    var displaytext = "";
 
    var displaytext = "<table><tr><th>Category ID</th><th>Customer Name</th><th>Category Description</th></tr>"; //Create table headers
    
    //Loop to extract data from the response object
    for (count = 0; count < result.GetAllCategoriesResult.length; count++)
    {
        displaytext += "<tr><td>" + result.GetAllCategoriesResult[count].CID + "</td><td>" + result.GetAllCategoriesResult[count].CName + "</td><td>" + result.GetAllCategoriesResult[count].CDescription + "</td></tr>";
    }
    displaytext += "</table>";
    document.getElementById("categorydisplay").innerHTML = displaytext;
}

function CreateCategory()
{
    var objRequest = new XMLHttpRequest();
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/CreateCategory";
 
    //Collect Category data from web page
    var categoryname = document.getElementById("catname").value;
    var categorydesc = document.getElementById("catdesc").value;
 
    //Create the parameter string
    var newcategory = '{"CName":"' + categoryname + '","CDescription":"' + categorydesc + '"}';
 
    //Checking for AJAX operation return
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result = JSON.parse(objRequest.responseText);
            AddOperationResult(result);
        }
    }
 
    //Start AJAX request
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(newcategory);
}

function AddOperationResult(output)
{
    if (output.WasSuccessful == 1)
    {
        document.getElementById("catresult").innerHTML = "The operation was successful!"
    }
    else
    {
        document.getElementById("catresult").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
    }
}

function ChangeDesc()
{
    var objRequest = new XMLHttpRequest();
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/updateCatDescription";
 
    //Collect Order data from web page
    var categoryid = document.getElementById("cid").value;
    var categorydesc = document.getElementById("cdesc").value;
 
    //Create the parameter string
    var newdesc = '{"CID":"' + categoryid + '","CDescription":"' + categorydesc +'"}';
     
    //Checking for AJAX operation return
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result = JSON.parse(objRequest.responseText);
            DescResult(result);
        }
    }
 
    //Start AJAX request
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(newdesc);
}

function DescResult(output)
{
    if (output == 1)
    {
        document.getElementById("descresult").innerHTML = "The operation was not successful!"
    }
    else
    {
        document.getElementById("descresult").innerHTML = "The operation was successful!" + "<br>" + output.Exception;
    }
}

function DeleteCategory()
{
    confirm("Are you sure?");
    var objRequest = new XMLHttpRequest(); //Create AJAX request object
    
    //Create URL and Query string
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/deleteCategory/";
    
    url += document.getElementById("cid2").value;
 
    //Checks that the object has returned data
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            DeleteOutput(output);
        }
    }
 
    //Initiate the server request
    objRequest.open("GET", url, true);
    objRequest.send();
}

function DeleteOutput(output)
{
    if (output.DeleteCategoryResult.WasSuccessful == 1)
    {
        document.getElementById("deleteresult").innerHTML = "The operation was successful!"
    }
    else
    {
        document.getElementById("deleteresult").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
    }
}