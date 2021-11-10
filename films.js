


$('#search-input').on('keyup', function () {
    var value = $(this).val()
    console.log('Value:', value)
    var data = searchTable(value, myArray)
    buildTable(data)
})



buildTable(myArray.slice(0, 15)) // slice pour que afficher les 15 premiers films
addCategs() // appel de la fonction addCategs

function searchTable(value, data) { // filtrer une data 
    var filteredData = []

    for (var i = 0; i < data.length; i++) {
        value = value.toLowerCase()
        var name = data[i].name.toLowerCase()

        if (name.includes(value)) {
            filteredData.push(data[i])

        }
    }

    return filteredData
}

$('th').on('click', function () {
    var column = $(this).data('colname')
    var order = $(this).data('order')
    var text = $(this).html()
    text = text.substring(0, text.length - 1);



    if (order == 'desc') {
        myArray = myArray.sort((a, b) => a[column] > b[column] ? 1 : -1)
        $(this).data("order", "asc");
        text += '&#9660'
    } else {
        myArray = myArray.sort((a, b) => a[column] < b[column] ? 1 : -1)
        $(this).data("order", "desc");
        text += '&#9650'
    }

    $(this).html(text)
    buildTable(myArray) // buildTable pour mon html 
})

function buildTable(data) { //fonction pour construire le tableau card
    var table = document.getElementById('myTable')

    table.innerHTML = ''

    for (var i = 0; i < data.length; i++) { // link mn js a mon style et add bootstrap
        let visible = data[i].plot;
        {
            visible += " ... Plus";
        }


        var row = ` <tr>
            <link rel="stylesheet" href="css/style.css"> 
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous">
                          
            
           
                           
                          

                            <td>  <img class="card-img" src="${data[i].posterUrl}alt="card-img"></img><td>  
                            <div class="col-md-8"                            
                            <div class="card-body">
                            <h5 class="card-title"> ${data[i].title}</h5>
							<p class="card-text"><h5> ${data[i].year}</h5>
							<p> ${data[i].runtime} min
                            <p><h6>Genres:</h6> ${data[i].genres}
                            <p><h6>Director:</h6> ${data[i].director}
                            <p><h6>Actors:</h6> ${data[i].actors}
                            <p><h6>Description:</h6> ${visible}<p>
                            <a href="#" class="btn btn-primary">Ajouter au panier<a/>
                            <a href="#" class="btn btn-primary">Bande annonce<a/>
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop1" onclick="modifierFilm(${i});">Modifier film</button>
                                        
              
              
              </div>


             


              </tr>
					  <div>`

        table.innerHTML += row


    }

}
function myFunction()  // appel function buildTable pour mes card
{

    buildTable(myArray)
};

function addCategs() { // add la categorie selectionne

    let selCategs = document.getElementById("films");

    for (let i = 0; i < selCategs; i++) {



    }
    for (let uneCateg of listeCategories) {
        selCategs.options[selCategs.options.length] = new Option(uneCateg, uneCateg);
    }
}

function chargerCategs() { // afficher les films par categorie selection pour l usager du site 
    var selCategs = document.getElementById("films").value;
    var selection = []

    for (unFilm of myArray) {
        for (i = 0; i < unFilm.genres.length; i++) {
            if (unFilm.genres[i] == selCategs) {
                selection.push(unFilm)
            }
        }
    }

    buildTable(selection) // retourne le tableau avec les card des film selection/ dans la categ
}
function chargerCategs() { // afficher les films par categorie selection pour l usager du site 
    var selCategs = document.getElementById("films").value;
    selection = selectCategs(selCategs, myArray)

    buildTable(selection) // retourne le tableau avec les card des film selection/ dans la categ
}

function selectCategs(selCategs, data) { // afficher les films par categorie selection pour l usager du site 
    var selection = []

    for (unFilm of data) {
        for (i = 0; i < unFilm.genres.length; i++) {
            if (unFilm.genres[i] == selCategs) {
                selection.push(unFilm)
            }
        }
    }

    return selection // retourne le tableau avec les card des film selection/ dans la categ
}


// functiion search film 

function searchTable1(value, data) { // afficher film selon la recherche voulu
    var filteredData = []

    for (var i = 0; i < data.length; i++) {
        value = value.toLowerCase()
        var title = data[i].title.toLowerCase()
        var actors = data[i].actors.toLowerCase()
        var plot = data[i].plot.toLowerCase()
        //  var genres = data[i].title.toLowerCase()




        if (title.includes(value) || actors.includes(value) || plot.includes(value)) {
            filteredData.push(data[i])


        }

    }

    return filteredData
}

function rechercher() {
    var search = document.getElementById("form1").value;
    selection = searchTable1(search, myArray)

    buildTable(selection) // retourne le tableau avec les card des film selection/ dans la categ
}



function addFilm() {

    let id = document.getElementById('numero').value;
    let title = document.getElementById('titre').value;
    let year = document.getElementById('annee').value;
    let runtime = document.getElementById('duree').value;
    let genres = document.getElementById('categorie').value;
    let director = document.getElementById('directeur').value;
    let actors = document.getElementById('acteur').value;
    let plot = document.getElementById('description').value;
    //   let posterUrl = document.getElementById('photo').value;



    let unFilm = { "id": id, "title": title, "year": year, "runtime": runtime, "genres": genres, "director": director, "actors": actors, "plot": plot };
    myArray.push(unFilm);
    console.log(myArray);

}

function addFilmAndRefreshPage() {
    addFilm();
    buildTable(myArray);
}



let enleverFilm = (leFilm) => {
    let racine = leFilm;
    alert(JSON.stringify(racine));
}


$("#form").submit(function (event) {
    event.preventDefault(); //prevent default action 
    var post_url = $(this).attr("submit"); //get form action url
    var form_data = $(this).serialize(id, title, year, runtime, genres, director, actors, plot); //Encode form elements for submission

    $.post(post_url, form_data, function (response) {
        $("#server-results").html(response);
    });
});

function modifierFilm(index) {
    console.log(index)
    document.getElementById('numero1').value = myArray[index].id;
    document.getElementById('titre1').value = myArray[index].title;
    document.getElementById('annee1').value = myArray[index].year;
    document.getElementById('duree1').value = myArray[index].runtime;
    document.getElementById('categorie1').value = myArray[index].genres;
    document.getElementById('directeur1').value = myArray[index].director;
    document.getElementById('acteur1').value = myArray[index].actors;
    document.getElementById('description1').value = myArray[index].plot;


}
function modifierFilm1() {
        var id = document.getElementById('numero1').value;
        var index=myArray.findIndex(f=>f.id==id);
        console.log(id);
        console.log(index);

        myArray[index].id=document.getElementById('numero1').value;
        myArray[index].title=document.getElementById('titre1').value;
        myArray[index].year=document.getElementById('annee1').value;
        myArray[index].runtime=document.getElementById('duree1').value;        
        myArray[index].genres=document.getElementById('categorie1').value;
        myArray[index].director=document.getElementById('directeur1').value;
        myArray[index].actors=document.getElementById('acteur1').value;
        myArray[index].plot=document.getElementById('description1').value ;







        

       // document.getElementById("new_preview_url").value  = document.getElementById("preview_url"+idx).innerHTML;
        
        //document.getElementById("id_modifier").value  = document.getElementById("numero1").innerHTML;
     }
    

     function modifierFilmAndRefreshPage() {
        modifierFilm();
        modifierFilm1();

        buildTable(myArray);
    }