
function cheeseManipulator (data) {
    var cheeseTemplate = document.querySelector("#cheeseTemplate")
    var cheeses = data.results;
    cheeses.forEach(cheese => {
        let clone = cheeseTemplate.content.cloneNode(true);
        
        clone.querySelector(".cheese").dataset.id = cheese._id;
        if(cheese.img) {
            clone.querySelector(".cheeseHeader").style.backgroundImage = `url("${cheese.img}")`
        } else {
            clone.querySelector(".cheeseHeader").style.backgroundImage = `url("https://via.placeholder.com/200.png")`
    
        }
        clone.querySelector(".cheeseHeading").innerText = cheese.name;
        clone.querySelector(".cheesePrice").innerText = cheese.price.$numberDecimal + " DKK"
        clone.querySelector(".cheeseWeight").innerText = cheese.weight + "g";
        clone.querySelector(".cheeseStrength").innerText = cheese.strength;
        clone.querySelector(".cheeseBrand").innerText = cheese.brand;
    
        document.querySelector(".cheeseContainer").appendChild(clone)
    });
    
}
export default cheeseManipulator;