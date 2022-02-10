$(document).ready(function(){
    let item, title, author, publisher, bookLink, bookImg;
    let outputList = document.getElementById("list-output");
    let dataValue = document.getElementById('data');
    let bookurl = "https://www.googleapis.com/books/v1/volumes?q=";
    let placeHolder = '<img src="https://via.placeholder.com/150">';
    let  searchData;
        
    // search btn listener
    $("#search").click(function(){
        outputList.innerHTML= "";
        // document.body.style.backgroundImage = "url('')";
        searchData = $("#data").val();
        console.log(searchData);

        //handing empty search input field
        if(searchData === ""|| searchData=== null){
            displayError();

        }
        // else{
        //    
        // }
        
        else{
            
            $.ajax({
                url: bookurl + searchData,
                dataType:"json",
                success: function(response){
                    console.log(response)
                    if(response.totalItem === 0){
                        alert("no results! try again")
                    }else{
                      
                        $(".title").animate({"margin-top":'10px'},1000);
                        $(".book-list").css('visibility', 'visible');
                        displayResults(response);
                    }
                },
                // error: function(){
                //     alert("something went wrong!..." +"Try again!");
                // }
            });
        }
        $("#search-box").val(""); //cleaning the search input
    } );

        // function to display the reslts
        function displayResults(res){
            for(let i = 0; i<res.items.length; i+=2){
                console.log(res.items)
        item = res.items[i];
        title1 = item.volumeInfo.title;
        author1 = item.volumeInfo.author;
        publisher1 = item.volumeInfo.publisher;
        // bookLink1 = item.volumeInfo.previewLink;
        bookIsbn = item.volumeInfo.industryIdentifiers[1].identifier;
        bookImg1 = (item.volumeInfo.imageLinks ) ? item.volumeInfo.imageLinks.thumbnail : placeHolder;
            
        
        item2 = res.items[i+1];
        title2 = item2.volumeInfo.title;
        author2 = item2.volumeInfo.author;
        publisher2 = item2.volumeInfo.publisher;
        // bookLink2 = item2.volumeInfo.previewLink;
        bookIsbn2 = item2.volumeInfo.industryIdentifiers[1].identifier;
        bookImg2 = (item2.volumeInfo.imageLinks ) ? item2.volumeInfo.imageLinks.thumbnail : placeHolder;
            
        //output to output list
        outputList.innerHTML += 
                                formatOutput(bookImg1, title1,author1, publisher1,  bookIsbn)
                                formatOutput(bookImg2, title2,author2, publisher2,  bookIsbn2)
                              
    
                            }
        }
// bootstrap cards
function formatOutput(bookImg, title, author, publisher, bookLink,bookIsbn){
    let viewUrl = 'book.html?isbn='+bookIsbn;
    console.log(bookImg);
    let htmlCard = `<div class="col-md-6 mb-5">
    <div class="row bg-white no-gutters">
        <div class="col-md-4">
    <img src = ${bookImg} class ="card-img"> 
        </div> 
        
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">Author:${author}</p>
                <p class="card-text">Publisher:${publisher}</p>
                
                <a target="_blank" href="${viewUrl}" class="btn btn-info btn-block">Read</a>
            
            </div>
        </div>
    </div>
</div>


    `
    return htmlCard;
}//handling error display empty search
function displayError(){
    alert("search book can not be empty");
}

    })
        