<script>
	// @ts-nocheck

	import { page } from '$app/stores';
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Button,
		Input,
		Avatar,
		Dropdown,
		DropdownItem,
		DropdownHeader,
		DropdownDivider
	} from 'flowbite-svelte';
	import { searchQuery } from './stores.js';
	import { browser } from '$app/environment';
</script>

<!-- <div class="sticky px-8 top-0"> -->
<Navbar
	let:hidden
	let:toggle
	navClass="px-2 sm:px-4 py-2.5 absolute w-full z-20 top-0 left-0 border-b"
>
	<div class="flex flex-row  justify-between w-screen items-center">
		<div class="flex">
			<NavBrand href="/" class="mr-8">
				<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
					SvelteMov
				</span>
			</NavBrand>

			<NavUl {hidden}>
				<NavLi href="/movies" active={$page.url.pathname === '/movies'}>Movies</NavLi>

				<NavLi href="/" active={$page.url.pathname === '/'}>Home</NavLi>
			</NavUl>
		</div>

		<div class="flex flex-row">
			<div class="flex mr-4">
				<div class={`relative block ${$page.url.pathname !== '/movies' ? 'hidden' : ''}`}>
					<div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6 dark:text-white"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
							/></svg
						>
					</div>
					<Input
						id="search-navbar"
						class="pl-10 pr-10"
						placeholder="Search..."
						bind:value={$searchQuery}
					/>

					<button
						on:click={() => searchQuery.set('')}
						class={`flex absolute inset-y-0 right-0 items-center pr-3 ${
							$searchQuery == '' ? 'hidden' : 'block'
						}`}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</button>
				</div>
			</div>

			<Avatar id="avatar-menu" src="/blankProfile.png" class="hidden md:block" />

			<Dropdown placement="bottom" triggeredBy="#avatar-menu">
				<DropdownHeader>
					<span class="block text-sm font-semibold"> Guest user </span>
				</DropdownHeader>
				<DropdownItem>Sign in</DropdownItem>
			</Dropdown>
		</div>
	</div>
</Navbar>

<!-- </div> -->
