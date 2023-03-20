<script>
	/** @type {import('./$types').PageData} */

	import { onMount } from 'svelte';
	import { Rating } from 'flowbite-svelte';
	import { page } from '$app/stores';
	export let data;


	let movieID = $page.params.id

	let casts = []

	let crew = []

	let directors = []

	let movie

	const languageNames = new Intl.DisplayNames(['en'], {
  	type: 'language'
	});

	const fetchMovie = async () => {
	

	try{
	const res = await fetch(
		`https://api.themoviedb.org/3/movie/${movieID}?api_key=7edefdf731502b6398dd9b4d2c622614`
	);

	let response = await res.json();
	movie = response
	}catch(error){

		console.log("error fetching movie details")
	}


	}

	const fetchCasts = async () => {

	try{
	const res = await fetch(
		`https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=7edefdf731502b6398dd9b4d2c622614`
	);

	let response = await res.json();

	// get top 5 cast members
	casts = response.cast.slice(0, 5)

	crew = response.crew


	// searching crew to find all directors
	crew.forEach(el => {
		if (el.job == "Director"){

			directors = [...directors, el]
		}
	})
	
	
	}catch(error){

		console.log("error fetching movie details")
	}
		
	}


	onMount(() => {
		fetchMovie()
		fetchCasts()
	});

  </script>


{#if movie}

<div class="flex flex-col items-center w-full"> 

<img class="lg:mt-16 mt-8 h-[500px] object-cover w-full" alt={`${movie.title} background`} src={movie.backdrop_path ? `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${movie.backdrop_path}` : '/blankBackground.png'}/> 
 

<div class="bg-white lg:w-7/10 w-full -mt-32 drop-shadow-2xl rounded pb-12 mb-14"> 

	<div class="flex lg:flex-row justify-between flex-col"> 

	<div class="flex flex-col lg:w-7/10 w-full"> 
	<div class="text-5xl px-6  pt-9 font-bold"> 
		{movie.title}
	</div> 
	<div class="flex flex-row items-center flex-wrap px-6 pt-3"> 

		<div class="bg-yellow-100 p-1 rounded-lg border-2 border-yellow-200 w-20 mt-4 mr-2"> 
			<Rating count rating={Number(movie.vote_average).toFixed(1)} />
		</div>
	{#each movie.genres as genre (genre.id) }

	<button class="bg-gray-100 py-1  px-2 rounded-lg border-2 border-gray-200 hover:bg-gray-200 mt-4 text-gray-500 mr-2"> 
		{genre.name}
	</button>

	{/each}


	</div>



	{#if movie.tagline}

	<div class="px-6 italic pt-6"> 
		{movie.tagline}
	</div>
	{/if}

	<div class="pl-6 text-2xl pt-6 font-medium text-gray-500"> 
		Overview
	</div>
	<div class="text-lg px-6 pt-2"> 
		{movie.overview}
	</div> 

	<div class="pl-6 text-2xl pt-6 font-medium text-gray-500"> 
		Cast
	</div>

	<div class="flex flex-row items-center pl-6 pt-2 flex-wrap">

		{#each casts as cast (cast.id) }
		

		<div class="flex flex-col items-center justify-start pr-4 py-2 w-28 h-24"> 

		<img class="h-16 w-16 object-cover rounded-full" alt={cast.name} src={ cast.profile_path ? `https://www.themoviedb.org/t/p/w276_and_h350_face/${cast.profile_path}` : '/blankProfile.png'}/>

		<div class="text-sm mt-1 w-28 whitespace-pre-line text-center"> 
			{cast.name}
		</div>
		</div>

	{/each}

	</div>

	<div class="pl-6 text-2xl pt-6 font-medium text-gray-500"> 
		Director
	</div>


	<div class="flex flex-row items-center pl-6 pt-2 flex-wrap">

		{#each directors as director (director.id) }
		

		<div class="flex flex-col items-center justify-start pr-4 py-2 w-28 h-24"> 

			<img class="h-16 w-16 object-cover rounded-full" alt={director.name} src={ director.profile_path ? `https://www.themoviedb.org/t/p/w276_and_h350_face/${director.profile_path}` : '/blankProfile.png'}/>
	
			<div class="text-sm mt-1 w-28 whitespace-pre-line text-center"> 
				{director.name}
			</div>
			</div>

	{/each}

	</div>

	</div> 

	<div class="flex flex-col lg:-mt-60 mt-2 px-6 lg:px-0 lg:mr-4"> 

	<img  key={movie.id} alt={movie.name} id={movie.id} class="rounded object-cover w-64 h-96 mb-2 lg:block hidden" src= {movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/fallbackMoviePoster.png"  }/>
	

	<div class="flex flex-row justify-between mt-5 mr-8">

		<div class="font-semibold text-lg text-gray-500" >
			Release date
		</div>

		<div class="text-lg" >
			{(new Date(movie.release_date)).toLocaleDateString("en-US")}
		</div>
		

	</div>


	<div class="flex flex-row justify-between mt-5 mr-8">

		<div class="font-semibold text-lg text-gray-500" >
			Runtime
		</div>

		<div class="text-lg" >
			{movie.runtime} minutes
		</div>
		

	</div>


	{#if movie.original_language}
	<div class="flex flex-row justify-between mt-5 mr-8">

		<div class="font-semibold text-lg text-gray-500" >
			Original Language
		</div>

		<div class="text-lg" >
			{languageNames.of(movie.original_language == "cn" ? "zh" : movie.original_language)}
		</div>
		

	</div>
	{/if}

	{#if movie.budget}
	<div class="flex flex-row justify-between mt-5 mr-8">

		<div class="font-semibold text-lg text-gray-500" >
			Budget
		</div>

		<div class="text-lg" >
			${Number(movie.budget).toLocaleString() }
		</div>
		

	</div>
	{/if}


	{#if movie.revenue}
	<div class="flex flex-row justify-between mt-5 mr-8">

		<div class="font-semibold text-lg text-gray-500"  >
			Revenue
		</div>

		<div class="text-lg" >
			${Number(movie.revenue).toLocaleString() }
		</div>
		

	</div>
	{/if}
	

	

	</div> 

	</div>


	

</div> 
</div> 

		
{:else}
		
{/if}