<script lang="ts">
	import { onMount } from 'svelte';

	let isLogin: boolean = $state(false);
	onMount(() => {
		const storedValue = localStorage.getItem('is-login');
		isLogin = storedValue === 'true';
	});
</script>

<main class="w-full flex flex-col gap-8 min-w-96 bg-basic-gradient pb-14">
	<div id="home"></div>
	<section class="flex flex-row mt-40 flex-wrap justify-evenly">
		<div class="flex-1 flex items-center justify-center flex-col p-4 w-80 min-w-72 max-w-96">
			<h1
				class="text-9xl pb-2 font-bold text-center bg-gradient-to-b from-red-500 via-yellow-500 to-yellow-300 bg-clip-text text-transparent"
			>
				TCC
			</h1>
			<h2 class="text-2xl pt-8 text-center">WE ARE EXPERTS</h2>
			<h2 class="text-2xl text-center">ON LOGISTICS SERVICES</h2>
			{#if isLogin}
				<a href="/merchandise" class="btn btn-primary mt-10 btn-wide"> Get Started </a>
			{:else}
				<a href="/login" class="btn btn-primary mt-10 btn-wide"> Get Started </a>
			{/if}
		</div>

		<div class="flex-1 flex items-center justify-center p-4 w-auto min-w-96 max-w-[500px]">
			<video class="w-auto h-auto object-cover pointer-events-none" autoplay loop muted playsinline>
				<source src="/video/delivery-car.webm" type="video/mp4" />
				Your browser not supported this video
			</video>
		</div>
	</section>

	<div id="services"></div>
	<section class="flex flex-col mt-40 justify-center px-10">
		<h2 class="text-4xl font-bold text-center mb-20">Our Services</h2>
		<div class="flex flex-row flex-wrap gap-6 w-full justify-center min-w-80">
			<div
				class="flex-1 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow bg-neutral max-w-80 min-w-72"
			>
				<h3 class="text-xl font-semibold mb-2 text-neutral-content">Storing</h3>
				<p class="text-neutral-content">
					We have the most suitable places for you to store the merchandise you need, with the best
					care
				</p>
			</div>

			<div
				class="flex-1 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow bg-neutral max-w-80 min-w-72"
			>
				<h3 class="text-xl font-semibold mb-2 text-neutral-content">24-hour customer service</h3>
				<p class="text-neutral-content">
					The best customer service available whenever you need it so you don't have to worry
				</p>
			</div>

			<div
				class="flex-1 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow bg-neutral max-w-80 min-w-72"
			>
				<h3 class="text-xl font-semibold mb-2 text-neutral-content">The best dashboard</h3>
				<p class="text-neutral-content">
					the best dashboard for you to manage your products and not miss a thing
				</p>
			</div>
		</div>

		<div class=" mt-20 text-center">
			{#if isLogin}
				<a href="/merchandise" class="btn btn-secondary btn-wide"> Get Started </a>
			{:else}
				<a href="/login" class="btn btn-secondary btn-wide"> Get Started </a>
			{/if}
		</div>
	</section>

	<div id="about"></div>
	<section class="flex flex-row mt-40 flex-wrap justify-evenly">
		<div class="flex-1 flex justify-center flex-col p-4 w-80 min-w-72 max-w-96">
			<h2 class="text-4xl font-bold text-left mb-8">Our Mission</h2>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas nisi earum blanditiis
				corporis, perferendis, consequuntur fugit expedita illum quae a eligendi nobis, et omnis
				repellat eius. In ipsam deserunt aliquam nam! In, dolores sed veritatis incidunt earum quos
				culpa, ea iure aut, modi aliquid fugiat? Atque excepturi totam quam amet.
			</p>
		</div>

		<div class="flex-1 flex items-center justify-center p-4 w-auto min-w-96 max-w-[500px]">
			<img src="/images/mission.png" alt="Mission" />
		</div>
	</section>
	<section class="flex flex-row mt-40 flex-wrap justify-evenly">
		<div class="flex-1 flex items-center justify-center p-4 w-auto min-w-96 max-w-[500px]">
			<img src="/images/vision.png" alt="vision" />
		</div>

		<div class="flex-1 flex justify-center flex-col p-4 w-80 min-w-72 max-w-96">
			<h2 class="text-4xl font-bold text-left mb-8">Our Vision</h2>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas nisi earum blanditiis
				corporis, perferendis, consequuntur fugit expedita illum quae a eligendi nobis, et omnis
				repellat eius. In ipsam deserunt aliquam nam! In, dolores sed veritatis incidunt earum quos
				culpa, ea iure aut, modi aliquid fugiat? Atque excepturi totam quam amet.
			</p>
		</div>
	</section>
</main>
