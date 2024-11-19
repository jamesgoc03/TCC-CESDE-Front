<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { toast } from '@zerodevx/svelte-toast';

	let isLogin = writable(false);
	let email = $state('');
	let password = $state('');
	let errorMessage = writable<string | null>(null);

	onMount(() => {
		const storedValue = localStorage.getItem('is-login');
		isLogin.set(storedValue === 'true');
		if (storedValue === 'true') {
			goto('/merchandise');
		}
	});

	const handleLogin = async (event: Event) => {
		event.preventDefault();

		const loginData = { 
			email, 
			password 
		};

		try {

			const response = await fetch('http://localhost:8080/clients/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(loginData)
			});

			if (!response.ok) {
				const data = await response.json();
				throw new Error(data.error || 'Error when we try to login');
			}

			const responseData = await response.json();
			localStorage.setItem('clientData', JSON.stringify(responseData));
			localStorage.setItem('is-login', 'true');
			isLogin = writable(true);
			toast.push('✔️ Your login was successful!');
			setTimeout(() => {
				goto('/merchandise');
			}, 1000);
		} catch (error: any) {
			errorMessage.set(
				error.message || 'We had an error when we tried to connect to your account.'
			);
			toast.push('❌ Login failed: ' + (error.message || 'Unexpected error'));
		}
	};
</script>




<main
	class="w-full h-screen flex flex-col gap-8 min-w-96 bg-basic-gradient pb-14 justify-center items-center"
>
	<div
		class="max-w-96 w-72 h-[320px] rounded-xl bg-base-100 flex justify-center items-center flex-col px-4 mt-12"
	>
		<form onsubmit={handleLogin}>
			<h1 class="text-center mb-4 mt-4">Login</h1>

			<label>
				<input
					required
					type="email"
					placeholder="Type here"
					class="input input-bordered w-full max-w-xs"
					bind:value={email}
				/>
			</label>
			<label>
				<input
					required
					type="password"
					placeholder="Write your password"
					class="input input-bordered w-full max-w-xs mt-2"
					bind:value={password}
				/>
			</label>

			<div class="flex items-center justify-center mt-4">
				<button class="btn btn-primary btn-outline" type="submit"> Submit </button>
			</div>
		</form>

		<p class=" w-52 text-center mt-2 text-sm">
			Don't you have acount? Click
			<a class="text-secondary" href="/register">Here</a>
			coming soon
		</p>
	</div>
</main>




