

function getData(event) {
    event.preventDefault();

    let input = document.getElementById("input").value;
    let results = document.getElementById("result");
    results.innerHTML = "";
    results.className = "container border border-secondary rounded results d-flex flex-row justify-content-center" 
    results.innerHTML = `
    <img src="images/load.gif" class="d-inline-block align-self-senter">
    `
    fetchData(input).then(function (data) {
        console.log(data)
        if (!data) {
            results.innerHTML = `
            <h4 class="text-secondary align-self-center">No Results</h4>`
        } else {
            results.className = "container border border-secondary rounded results"
            results.innerHTML = `
            <div class="row cardDiv" id="results">
            </div>
            `
            let resultCard = document.getElementById("results");
            data.map(elem => {
                resultCard.innerHTML += `
                <div class="card col-sm-12 col-md-4" style="width: 18rem;">
                <img class="card-img-top" src="${elem.avatar_url}" alt="Card image cap">
                <div class="card-body">
                  <h5 class="card-title">${elem.login}</h5>
                  <a href="${elem.html_url}" class="btn btn-primary w-100">see on Git</a>
                </div>
                </div>
            `
            })

        }
    })



}



function fetchData(value) {
    console.log(value)
    return new Promise(function (resolve, reject) {
        let url = `https://api.github.com/users/${value}/followers`
        fetch(url).then(function (data) {
            return data.json()
        }).then(function (jsonData) {
            resolve(jsonData)
        })
    })
}


if("serviceWorker" in navigator){
    navigator.serviceWorker.register("../sw.js")
    console.log("sw registered")
}