fetch("https://osteapi-miquel.herokuapp.com/api/v1/cheeses")
.then(res => res.json())
.then(data => {
    console.log(data)
})