<script>
	import { sortBy, selectedGenres } from '../stores.js';
	import {DropdownDivider, Chevron, Dropdown, DropdownItem, } from 'flowbite-svelte'
	import sortByDic from "../../util/sortByDic.js"

	const genres = [{id: 28, name: "Action"} , {id: 12, name: "Adventure"}, {id: 16, name: "Animation"}, {id: 35, name: "Comedy"},
{id: 80, name: "Crime"}, {id: 99, name: "Documentary"}, {id: 18, name: "Drama"}, {id: 14, name: "Fantasy"}, {id: 36, name: "History"}, {id: 27, name: "Horror"}
, {id: 9648, name: "Mystery"}, {id: 10749, name: "Romance"}, {id: 878, name: "Science Fiction"}, {id: 53, name: "Thriller"}, {id: 10752, name: "War"}, {id: 37, name: "Western"}]
	
let dropdownOpen = false;

const selectedGenre = (genre) => {
	if ($selectedGenres.includes(genre.id)){

	
		selectedGenres.set($selectedGenres.filter(el => el != genre.id))
		
	}else{


		selectedGenres.set([...$selectedGenres, genre.id])

		
	}

}

</script>


<div class="flex flex-col items-start md:mt-8 mt-0 mb-2 lg:mb-0 w-full lg:w-auto"> 

	<button class="flex flex-row items-center justify-between rounded-xl lg:w-80  md:w-[calc(100%-4rem)] md:mx-8  w-[calc(100%-2rem)]  mx-4 drop-shadow-2xl bg-white"> 

		<div class="px-4 py-3 text-lg font-semibold">
		Sort by
		</div>

		<div class="flex flex-row items-center mr-4"> 
		<div class="text-md font-sans"> 
		{sortByDic[$sortBy]}
		</div> 

		<Chevron/>
		</div> 

		

	

	</button>
	<Dropdown class="lg:w-80  md:w-[calc(100%-4rem)] w-[calc(100%-2rem)]  rounded-xl overflow-hidden" bind:open={dropdownOpen}>
		{#each Object.keys(sortByDic) as sortParam  }
		<button class="text-md font-sans p-2 w-full text-left bg-white hover:bg-gray-100" on:click={() => {
			dropdownOpen = false
			sortBy.set(sortParam) }}>{sortByDic[sortParam]}</button>

	{/each}
	  </Dropdown>


<div class="rounded-xl lg:w-80  md:w-[calc(100%-4rem)] md:mx-8  w-[calc(100%-2rem)]  mx-4  drop-shadow-2xl bg-white mt-6"> 

<div class="px-4 pt-4 text-lg font-semibold">
Filter
</div>
<DropdownDivider/>

<div class="px-4 text-gray-500 my-2"> 
Genres
</div>

<div class="flex flex-row flex-wrap px-4 mb-4"> 

	{#each genres as genre (genre.id)}
		<button on:click = {() => {selectedGenre(genre)}} class= {`px-3 my-1.5 mr-1.5 border hover:border-blue-700 rounded-3xl ${$selectedGenres.includes(genre.id) ? " bg-blue-700 text-white border-blue-700" : " bg-white text-black  border-gray-300"} hover:bg-blue-700 hover:text-white`}> 
			{genre.name}
		</button>

	{/each}

</div>

</div> 



</div>