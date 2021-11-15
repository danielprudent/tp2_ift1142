


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
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop2" onclick="supprimerFilm(${i});">Supprimer film</button>
           
              
              
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

function searchTable1(value, data) { // afficher film selon la recherche voulu ( titre,acteur, plot)
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

function rechercher() { // fonction poour rechercher un film 
    var search = document.getElementById("form1").value;
    selection = searchTable1(search, myArray)

    buildTable(selection) // retourne le tableau avec les card des film selection/ dans la categ
}



function addFilm() { // fonction pour ajouter un nouveau film 
 
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
    buildTable(myArray);

}







function modifierFilm(index) { // pour prendre l index du film cliquer
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
function modifierFilm1() { // modifier le film numero1 = nouveau film 
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
        buildTable(myArray);

     }
    

     
    //let listeFilmsDisponible = false;

    let listerTousLesFilms = (duree,titre, annee,ordeDeTri) => { // filtrer les film sort par runtime, year and name
      //  if (listeFilmsDisponible){
            let contenu = `<div class="row row-cols-4">`;
            if (annee >= 0){
                 if (ordeDeTri == 'D'){
                    myArray.sort((a,b) => parseInt(b.year)-parseInt(a.year));//ordre décroissant
                 }else { 
                    myArray.sort((a,b) => parseInt(a.year)-parseInt(b.year));// cas ordreDeTri == 'C' ordre croissant
                 }
                    // Par année
                    for (unFilm of myArray){
                        if (parseInt(unFilm.year) > annee){
                            contenu+=buildTable(data(unFilm));
                        }else if (annee == 0) {
                            contenu+=buildTable(data(unFilm));
                        }
                    }   
            }else if(titre != null){// if (titre == true)
                if (ordeDeTri == 'D'){
                    myArray.sort((a,b) => (b.title > a.title)?1:-1);//ordre décroissant
                 }else { 
                    myArray.sort((a,b) => (b.title < a.title)?1:-1);// cas ordreDeTri == 'C' ordre croissant
                 }
                // Par titre
                for (unFilm of myArray){
                        contenu+=buildTable(data(unFilm));
                }
               
            } else if(duree >= 0){
                if (ordeDeTri == 'D'){
                    myArray.sort((a,b) => parseInt(b.runtime)-parseInt(a.runtime));//ordre décroissant
                 }else { 
                    myArray.sort((a,b) => parseInt(a.runtime)-parseInt(b.runtime));// cas ordreDeTri == 'C' ordre croissant
                 }
                    // Par année
                    for (unFilm of myArray){
                        if (parseInt(unFilm.runtime) > duree){
                            contenu+=buildTable(data(unFilm));
                        }else if (duree == 0) {
                            contenu+=buildTable(data(unFilm));
                        }
                    }   
               
            }
            contenu+= `</div>`;
    
            $('#contenu').html(contenu);//document.getElementById('contenu').innerHTML=contenu;
        }
      //  else { alert("SVP vous devez charger la liste des films en premier"); }
   // }
    
    let listerLesPlusRecents = (annee) => {

    }

    
    /*
    function supprimerFilm(id) {
        var id = document.getElementById("id");
        
        if (myArray.hasChildNodes(id)) {
          myArray.removeChild(myArray.childNodes[1]);
        }
      }
*/
    function supprimerFilm  (index)  {   // supprimer le film
        document.getElementById('numero2').value = myArray[index].id;
        console.log(index)
    }
    function supprimerFilm1 (){        
        id=document.getElementById('numero2').value;
        console.log(id)
        var index=myArray.findIndex(f=>f.id==id);
        console.log(index)
        myArray.splice(index, 1);
        buildTable(myArray);
    }
    
    
    /*
    function showList(){
        let tableList = "";
        for(let i = 0; i < myArray.lenght();i++){
          console.log(i);
          if(i<myArray.length){
            tableList += `
            <tr>
              <td>${myArray[i]}</td>
            </tr>
          `  
          }
        }
        document.getElementById('myArray').innerHTML=tableList;
        showPageInfo();
      }

//creating an array for adding numbers in a page
var countList = new Array();
//creating an array for adding number of pagess
var addPageList = new Array();
var presentPage = 1;
var countPerEachPage = 10;
var countOfPages = 0;
//function for adding how many numbers in total
function prepareList() {
for (count = 0;counti< 100; count++)
countList.push(count);
countOfPages = getCountOfPages();
}
//function for creating how many how many number per each page
function getCountOfPages() {
return Math.ceil(countList.length / countPerEachPage);
}
//function for moving to next page
function getNextPage() {
presentPage += 1;
loadMyPaginationList();
}
//function for moving previous page
function getPreviousPage() {
presentPage -= 1;
loadMyPaginationList();
}
//function for moving to first page
function getFirstPage() {
presentPage = 1;
loadMyPaginationList();
}
//function for moving last page
function getLastPage() {
presentPage = countOfPages;
loadMyPaginationList();
}
//function for creating how to move between the pages
function loadMyPaginationList() {
var start = ((presentPage - 1) * countPerEachPage);
var end = start + countPerEachPage;
addPageList = countList.slice(start, end);
createPageList();
validatePageCount();
}
//function for adding numbers to each page
function createPageList() {
document.getElementById("countList").innerHTML = "";
for (p = 0; p< addPageList.length; p++) {
document.getElementById("countList").innerHTML = document.getElementById("countList").innerHTML+ addPageList[p] + "<br/>";
}
}
//function for validating real time condition like if move to last page, last page disabled etc
function validatePageCount() {
document.getElementById("next").disabled = presentPage == countOfPages ? true : false;
document.getElementById("previous").disabled = presentPage == 1 ? true : false;
document.getElementById("first").disabled = presentPage == 1 ? true : false;
document.getElementById("last").disabled = presentPage == countOfPages ? true : false;
}
//function for loading pagination functionality
function loadMyPagination() {
prepareList();
loadMyPaginationList();
}
window.onload = loadMyPagination;
*/