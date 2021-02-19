var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
	this.style.display = "none";
    this.nextElementSibling.style.display = "block";
  });
}

var coll = document.getElementsByClassName("collapsible_in");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
	this.style.display = "none";
    this.prevElementSibling.style.display = "block";
  });
}

/*
for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
	this.style.display = "none";
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
*/
