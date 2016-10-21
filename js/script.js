var listChildNodes = Array.from(document.getElementById("list").children),
nameList = document.getElementById("pagination"),
clicker = document.getElementById("clicker"),
search = document.getElementsByClassName("student-search")[0].innerHTML = "<input placeholder=\"Search for students...\"> <button>Search</button>",
searchFor = "",
clickIndex = 0,
outputSize = 10,
itemsPerPage = 10,
numArray = [],
listItems = document.createElement("li"),
pages = Math.ceil(listChildNodes.length / itemsPerPage);
createNumArray();

// Dynamically Adding Pagination Buttons
for(var i = 0; i < pages; i++){
	var ul = document.getElementById("pagination");
		var li = document.createElement("li");
		var a = document.createElement("a");
	
		ul.appendChild(li);
		li.appendChild(a);
		a.appendChild(document.createTextNode(Number(numArray[i]) + 1));
		a.id = String(i);
}

$(".student-search button").click(function(){
	searchFor = $("input").val().toLowerCase();
	clearList();
	
	listChildNodes.forEach(function(item){
		if((item.children[0].children[1].innerHTML.toLowerCase()).includes(searchFor) || (item.children[0].children[2].innerHTML.toLowerCase()).includes(searchFor)){
			resetClass();
			item.style.display = "block";
		}
	});
});

var paginationChildNodes = Array.from(document.getElementById('pagination').children);

window.onload = function(){	
	nextTen(0);
	paginationChildNodes[0].firstElementChild.className = "active";
};

$("#0").click(function(){
	nextTen(0);
	paginationChildNodes[0].firstElementChild.className = "active";
});
$("#1").click(function(){
	nextTen(1);
	paginationChildNodes[1].firstElementChild.className = "active";
});
$("#2").click(function(){
	nextTen(2);
	paginationChildNodes[2].firstElementChild.className = "active";
});
$("#3").click(function(){
	nextTen(3);
	paginationChildNodes[3].firstElementChild.className = "active";
});
$("#4").click(function(){
	nextTen(4);
	paginationChildNodes[4].firstElementChild.className = "active";
});
$("#5").click(function(){
	nextTen(5);
	paginationChildNodes[5].firstElementChild.className = "active";
});

/*========== Function Declarations ==========*/
function resetClass(){
	paginationChildNodes.forEach(function(item){
		item.firstElementChild.className = " ";
	});
}
function createNumArray(){
	for(var i = 0; i < pages; i++){
		numArray += i.toString();
	}
}

function clearList(){
	listChildNodes.forEach(function(item){
		item.style.display = 'none';
		resetClass();
	});
}

function nextTen(scaler){	
	clearList();
	if(scaler === 0){
		for(var i = 0; i < outputSize; i++){
			listChildNodes[i].style.display = "block";
			clickIndex++;		
		}
	}else{
		for(var i = outputSize * scaler; i < outputSize * (scaler + 1); i++){
		    listChildNodes[i].style.display = "block";
		    clickIndex++;   
		}
	}
}