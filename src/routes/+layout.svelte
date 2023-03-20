<script>
	import Header from './Header.svelte';
	import '../app.css';
	import BottomNav from './BottomNav.svelte';
</script>

<Header />

<main>
	<slot />
</main>

<BottomNav />
