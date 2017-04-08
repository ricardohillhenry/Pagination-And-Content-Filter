var addList = document.getElementsByClassName("student-list")[0],
clicker = document.getElementsByTagName("h2")[0],
pageHeader = document.getElementsByClassName('page-header')[0],
studentSearch = document.createElement("div"),
body = document.getElementsByClassName("page")[0],
pagination = document.createElement("div"),
paginationUl = document.createElement("ul");

addList.setAttribute('id','list');
clicker.setAttribute('id', 'clicker');
studentSearch.setAttribute('class', 'student-search');
pagination.setAttribute('class', 'pagination');
paginationUl.setAttribute("id", "pagination");
pageHeader.appendChild(studentSearch);
body.appendChild(pagination);
pagination.appendChild(paginationUl);


var listChildNodes = Array.from(document.getElementById("list").children),
nameList = document.getElementById("pagination"),
searchFor = "",
clickIndex = 0,
outputSize = 10,
itemsPerPage = 10,
numArray = [],
pages = calculatePages(listChildNodes),
searchResults = [],
searchResultsPages = 0,
buttonArr = [],
paginationChildNodes,
paginationChildNodesLength;
createNumArray();


 document.getElementsByClassName("student-search")[0].innerHTML = "<input placeholder=\"Search for students...\"> <button>Search</button>";
// Dynamically Adding Pagination Buttons
addButtons(nameList, pages);

$(".student-search button").click(function(){
	searchFor = $("input").val().toLowerCase();
	clearList();
	resetClass();
	if(searchResults.length > 0){
		searchResults.length = 0;
	}
	removeButtons(nameList, pages);
	listChildNodes.forEach(function(item){
		if((item.children[0].children[1].innerHTML.toLowerCase()).includes(searchFor) || (item.children[0].children[2].innerHTML.toLowerCase()).includes(searchFor)){
			resetClass();
			searchResults.push(item);
		}

	});

	searchResultsPages = calculatePages(searchResults);
	addButtons(nameList, searchResultsPages);

	nextTen(0, searchResultsPages, searchResults);
	paginationChildNodes = function(){ return Array.from(document.getElementById('pagination').children);}();
	paginationChildNodes[0].firstElementChild.className = "active";
	for (var i = 0; i < searchResultsPages; i++) {
		$("#" + String(i)).click(makeClickable(i, searchResultsPages, searchResults));
		//paginationChildNodes[i].firstElementChild.className = "active";
		//console.log(paginationChildNodes[0].firstElementChild);
		makeClickable(i, searchResultsPages, searchResults);
	}
});
	
 paginationChildNodes = function(){ return Array.from(document.getElementById('pagination').children);}();
 paginationChildNodesLength = function(){ return document.getElementById('pagination').children.length;};

window.onload = function(){
	//When the page loads, ten users are displayed, the entire list is paginated, and the first li is active.
	nextTen(0, pages, listChildNodes);
	paginationChildNodes[0].firstElementChild.className = "active";
	for (var i = 0; i < paginationChildNodesLength(); i++) {
		$("#" + String(i)).click(makeClickable(i, pages, listChildNodes));
	}
};


/*========== Function Declarations ==========*/

function makeClickable(item, pageCount, arr){
	//This function makes the list items buttons by reovering the clicked "page" of users, and assigning the class
	//active to the appropriate list item(s).
	return function(){
		nextTen(item, pageCount, arr);
		paginationChildNodes[item].firstElementChild.className = "active";
	};
}

function resetClass(){
	//This function loops through each li, and removes the classes associated with them -- most importantly, "active"
	paginationChildNodes.forEach(function(item){
		item.firstElementChild.className = " ";
	});
}

function createNumArray(){
	//Creates an array of numbers to be used for creating pagination buttons
	for(var i = 0; i < pages; i++){
		numArray += i.toString();
	}
}

function clearList(){
	//Clears the page of its currently displayed users
	listChildNodes.forEach(function(item){
		item.style.display = 'none';
		resetClass();
	});
}

function nextTen(scaler, pageCount, arr){
	//Uses the provided parameters to cycle through (paginate) a provided list/array of users
	//How many are displayed on a single page is dependent on the value held by outputSize
	clearList();
	var currentSize;
	if(arr.length < outputSize){
		for(var i = 0; i < arr.length; i++){
			arr[i].style.display = "block";
			clickIndex++;		
		}
	}else if(scaler === 0){
		// currentSize = 
		for(var i = 0; i < outputSize; i++){
			arr[i].style.display = "block";
			clickIndex++;		
		}
	}else{
		if(scaler === pageCount - 1) //will produce index for last page 
			currentSize = outputSize * (scaler + 1) - ((outputSize * (scaler + 1)) - (arr.length));
		else
			currentSize = outputSize * (scaler + 1);
		for(var i = outputSize * scaler; i < currentSize; i++){
		    arr[i].style.display = "block";
		    clickIndex++;
		}
	}
}

function addButtons(unorderedList, pageCount){
	//This function populates an empty ul with li containing anchor children to be used as numeric page navigators
	unorderedList.style.display = "block";
	for(var i = 0; i < pageCount; i++){
		var ul = unorderedList;
			var li = document.createElement("li");
			var a = document.createElement("a");
		
			ul.appendChild(li);
			li.appendChild(a);
			a.appendChild(document.createTextNode(Number(numArray[i]) + 1));
			a.id = String(i);
			buttonArr.push(li);
	}
}

function removeButtons(unorderedList, pageCount){
	//removes all displayed buttons, and empties the array holding them
	var ul = Array.from(unorderedList.children);
	unorderedList.style.display = "none";
	ul.forEach(function(item){
		item.remove();
	});
	unorderedList = [];
}

function calculatePages(arr){
	//A function to calculate how many pages will be needed depending on the fed array of users
	return Math.ceil(arr.length / itemsPerPage);
}