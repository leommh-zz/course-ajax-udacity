(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

		fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
		    headers: {
		        Authorization: 'Client-ID bf9d9e58bf91e07848ada8d3243b1e440aea7d6460c7eb57dc7812235ba26e81'
		    }
		})
		.then( data => data.json() )
		.then( addImage );
		.catch(e => requestError(e, 'image'));

		fetch(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=69e76756dc6f47db9004254aad2c7697`)
		.then( data => data.json() )
		.then( addArticles );
		.catch(e => requestError(e, 'article'));



    });

	function addImage(images) {
	    const firstImage = images.results[0];

	    responseContainer.insertAdjacentHTML('afterbegin', `<figure>
	            <img src="${firstImage.urls.small}" alt="${searchedForText}">
	            <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
	        </figure>`
	    );
	}

	

	function addArticles(articles) {
		console.log(articles);
		
	    responseContainer.insertAdjacentHTML('afterbegin', `<ul> 
				${ 
					articles.response.docs.map( article => `
						<li class="article">
							<h2>
								<a href="${ article.web_url }"> ${ article.headline.main } </a>
							</h2>
							<p> ${ article.snippet } </p>
						</li>
					`).join('') 
				} 
			</ul>`
	    );
		
	}

	function requestError(e, part) {
	    console.log(e);
	    responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
	}

})();
