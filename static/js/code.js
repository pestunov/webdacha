var items = document.getElementsByClassName("mybut");
var i;

for (i = 0; i < items.length; i++) {
    items[i].addEventListener("click", function() {
	if ((this.tag == undefined) || (this.tag == 0)) {
	    this.tag = 1;
	    this.style.height = "200px";
	    this.style.width = "100%";
	    
	} else if (this.tag == 1) {
	    this.tag = 0;
	    this.style.width = "auto";
	    this.style.height = "auto";
	}
    });
  }

