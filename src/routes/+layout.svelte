<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { SvelteToast } from '@zerodevx/svelte-toast'
	import "../app.css"
	let { children } = $props();
</script>

<SvelteToast />
<Navbar />
{@render children()}
<Footer />
