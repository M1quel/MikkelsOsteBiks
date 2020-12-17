import fetcher from "./assets/js/fetch.js";
import cheeseManipulator from "./assets/js/cheese-manipulator.js";
import navigationContent from "./assets/js/navigationContent.js";

var baseURL = "https://osteapi-miquel.herokuapp.com/api/v1/cheeses";
var loadMoreBtn = document.querySelector(".loadMoreBtn");

// menu return btn





fetcher(baseURL)
.then(data => {
    cheeseManipulator(data)
    
    loadMoreBtn.dataset.src = data.next;
    loadMoreBtn.addEventListener("click", loadMore)

    navigationContent();

})


function loadMore () {
    var link = loadMoreBtn.dataset.src;
    fetcher(link)
    .then(data => {
        cheeseManipulator(data)
        if(data.next == null) {
            loadMoreBtn.style.display = "none"
        } else {
            loadMoreBtn.style.display = "block"
            loadMoreBtn.dataset.src = data.next;
            loadMoreBtn.addEventListener("click", loadMore)

        }
    })
}