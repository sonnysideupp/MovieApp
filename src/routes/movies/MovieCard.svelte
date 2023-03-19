<script>
	export let movie;

	import { Rating } from 'flowbite-svelte';
	import genresDict from "../../util/genresDic.js"

	let rating = Number(movie.vote_average).toFixed(1)
</script>


<a href={`/movies/${movie.id}`} class="flip-card rounded-xl md:h-[415px]  h-80 w-full md:mt-0 mt-4 drop-shadow-2xl bg-white hover:-translate-y-2">
	<div class="flip-card-inner "> 
		<div class="flip-card-front overflow-hidden">

	<img  key={movie.id}  alt={movie.title} id={movie.id} loading="lazy" class="rounded-xl object-cover w-[calc(100%-16px)] aspect-4/5 m-2" src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/fallbackMoviePoster.png"}  />

	<div class="flex flex-col items-start m-2 w-full"> 

		<div class="flex flex-row items-center mt-2"> 
			<div class="bg-yellow-100 p-1 rounded-lg border-2 border-yellow-200"> 
				<Rating count rating={rating} />
			</div>

			<div class="text-gray-400 ml-2 text-sm"> 
				&#x2022 {(new Date(movie.release_date)).toLocaleDateString("en-US")}
			</div>
		</div>


		<div class="font-bold mt-2 text-lg inline-block overflow-hidden rounded-xl text-ellipsis w-full h-14"> 
			{movie.title}
		</div>


	</div>
	</div>

	<div class="flip-card-back">

		<div class="flex flex-row flex-wrap px-4 pt-2"> 
			{#each movie.genre_ids as genre, index (index)}

			<div class="rounded-lg border px-2 py-1 mr-1 mt-1 border-gray-200"> 
				{genresDict[genre]}
			</div>

			{/each}
			

		</div>

		<div class="px-4 pt-2 font-medium"> 
		Overview
		</div>
		<div class="px-4 py-1"> 
			{movie.overview}
		</div>
		
	  </div>


	</div>

	
</a>


<style>

.flip-card {
  background-color: transparent;
  border-radius: 0.75rem;
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
}
.flip-card-back {
  background-color: gray;
  color: white;
  border-radius: 0.75rem;
  transform: rotateY(180deg);
  height: "100%";
  overflow: hidden;

}

/* This container is needed to position the front and back side */
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 0.75rem;
  transition: transform 0.5s;
  transform-style: preserve-3d;
}

/* Do an horizontal flip when you move the mouse over the flip box container */
.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

/* Position the front and back side */
.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
}

/* Style the front side (fallback if image is missing) */
.flip-card-front {
  background-color: white;
  color: black;
  width: 100%;
  border-radius: 0.75rem;
}
</style>