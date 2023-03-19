import { writable } from 'svelte/store';

export const searchQuery = writable("");


export const sortBy = writable("popularity.desc")


export const selectedGenres = writable([])
