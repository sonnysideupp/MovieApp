<script>
// @ts-nocheck

	import { onMount } from 'svelte';
	import MovieCard from './MovieCard.svelte';
	import Filter from './Filter.svelte';
	import MovieCardLoader from './MovieCardLoader.svelte';
	import { browser } from '$app/environment';
	import { searchQuery, sortBy, selectedGenres } from '../stores.js';
	import { onDestroy } from 'svelte';

	// for original movies without filters
	let ogMovies = [];

	// movies shown to user
	let movies = [];

	// store the new batch of data here.
	let newBatch = [];

	let timer;

	let endPoint = 'https://api.themoviedb.org/3/discover/movie?';

	let currentPage = 1;

	let totalResults = 0;

	let totalPages = 0;

	let isFetching = true;

	let isSearch = false;

	let searchParams = new URLSearchParams({
		api_key: '7edefdf731502b6398dd9b4d2c622614',
		include_adult: false,
		primary_release_year: 1995,
		sort_by: $sortBy,
		page: 1
	});

	$: movies = [...movies, ...newBatch];

	$: ogMovies = [...ogMovies, ...newBatch];

	$: if ($searchQuery != '') {
		if (browser) {
			// debounce for searching with a query
			clearTimeout(timer);
			timer = setTimeout(() => {
				isSearch = true;
				searchMovie($searchQuery);
			}, 500);
		}
	} else {
		// resetting search to discover

		setTimeout(() => {
			isSearch = false;
			endPoint = 'https://api.themoviedb.org/3/discover/movie?';
			fetchMovies('popularity.desc', []);
		}, 500);
	}

	// make it react to changes (in the parent)
	$: if (browser) {
		if (isSearch) {
			// filtering current movies if movies are from user search
			sortMovies($sortBy);
		} else {
			fetchMovies();
		}
	}
	$: if ($selectedGenres.length >= 0) {
		if (browser) {
			if (isSearch) {
				// filtering current movies if movies are from user search
				filterMoviesInPlace($selectedGenres);
			} else {
				fetchMovies();
			}
		}
	}

	// sorting movies by field
	const sortMovies = (sort_option) => {
		switch (sort_option) {
			case 'popularity.desc':
				movies = movies.sort((a, b) => b.popularity - a.popularity);
				break;
			case 'popularity.asc':
				movies = movies.sort((a, b) => a.popularity - b.popularity);
				break;
			case 'vote_average.asc':
				movies = movies.sort((a, b) => a.vote_average - b.vote_average);
				break;
			case 'vote_average.desc':
				movies = movies.sort((a, b) => b.vote_average - a.vote_average);
				break;
			case 'primary_release_date.asc':
				movies = movies.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
				break;
			case 'primary_release_date.desc':
				movies = movies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
				break;
		}
	};

	// filtering and sorting movies by genres in place
	const filterMoviesInPlace = (generes) => {
		if (generes.length > 0) {
			movies = ogMovies.filter((el) => generes.every((r) => el.genre_ids.includes(r)));
		} else {
			// resetting movies to original movies
			movies = ogMovies;
		}
		sortMovies($sortBy);
	};

	// filtering movies by genres
	const filterMovies = (array, generes) => {
		if (generes.length > 0) {
			return array.filter((el) => generes.every((r) => el.genre_ids.includes(r)));
		} else {
			return array;
		}
	};

	const searchMovie = async (query) => {
		try {
			movies = [];
			isFetching = true;
			currentPage = 1;
			endPoint = 'https://api.themoviedb.org/3/search/movie?';

			searchParams = new URLSearchParams({
				api_key: '7edefdf731502b6398dd9b4d2c622614',
				include_adult: false,
				query: query,
				page: 1
			});
			const res = await fetch(endPoint + searchParams);
			let response = await res.json();

			isFetching = false;
			ogMovies = response.results;
			movies = filterMovies(response.results, $selectedGenres);
			sortMovies($sortBy);
			totalResults = response.total_results;
			totalPages = response.total_pages;
		} catch (error) {
			isFetching = false;
			console.log('fetch movies error');
			console.log(error);
		}
	};

	const fetchMoreMovies = async (params, page) => {
		try {
			if (page > totalPages) return;

			params.set('page', page);

			isFetching = true;
			const res = await fetch(endPoint + params);
			let response = await res.json();

			totalResults = response.total_results;
			totalPages = response.total_pages;
			if (response.results) {
				newBatch = filterMovies(response.results, $selectedGenres);
			}
		} catch (error) {
			console.log('fetching more movies error');
			console.log(error);
		}
	};

	const onScroll = async (e) => {
		if (!isFetching && window.innerHeight + window.scrollY >= document.body.offsetHeight) {
			if ($selectedGenres.length > 0) {
				searchParams.set('with_genres', $selectedGenres.join(','));
			}
			await fetchMoreMovies(searchParams, ++currentPage);
			isFetching = false;
		}
	};

	const fetchMovies = async () => {
		try {
			let sort = $sortBy;
			let genres = $selectedGenres;
			if (isSearch) return;
			movies = [];

			// resetting search params to original
			searchParams = new URLSearchParams({
				api_key: '7edefdf731502b6398dd9b4d2c622614',
				include_adult: false,
				primary_release_year: 1995,
				sort_by: sort,
				page: 1
			});
			if (genres.length > 0) {
				searchParams.set('with_genres', genres.join(','));
			}

			endPoint = 'https://api.themoviedb.org/3/discover/movie?';
			isFetching = true;
			currentPage = 1;
			const res = await fetch(endPoint + searchParams);
			let response = await res.json();

			isFetching = false;
			movies = response.results;
			ogMovies = response.results;
			totalResults = response.total_results;
			totalPages = response.total_pages;
		} catch (error) {
			isFetching = false;
			console.log('fetch movies error');
			console.log(error);
		}
	};

	onMount(() => fetchMovies('popularity.desc', []));
</script>

<svelte:window on:scroll={onScroll} />

<div class="flex lg:flex-row  mt-24 flex-col">
	<Filter />

	<div class="flex flex-col w-full lg:w-4/5">
		<div class="flex flex-row justify-end w-full mb-0 md:mb-2">
			<div class="mr-8">
				{totalResults}
				{totalResults > 1 ? 'movies' : 'movie'}
			</div>
		</div>
		<div class="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-6 mb-8">
			{#each movies as movie, index (`${movie.id}${index}`)}
				<MovieCard {movie} />
			{:else}
				<!-- this block renders when photos.length === 0 -->

				{#if isFetching}
					{#each [1, 2, 3, 4, 5, 6, 7, 8] as loader, index (index)}
						<MovieCardLoader />
					{/each}
				{:else}
					<div class="flex flex-col items-center w-full ml-4 lg:ml-0">
						<p class="text-gray-400 text-2xl">No movies found</p>
					</div>
				{/if}
			{/each}
		</div>
	</div>
</div>
