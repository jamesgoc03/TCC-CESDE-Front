<script>
	import { goto } from '$app/navigation';
	import { toast } from '@zerodevx/svelte-toast';
	import { onMount } from 'svelte';

	let isLogin = $state(false);
	let clientData;
	let name = $state("");

	onMount(() => {
		const storedValue = localStorage.getItem('is-login');
		isLogin = storedValue === 'true';
		clientData = localStorage.getItem('clientData');
 		name = clientData ? JSON.parse(clientData).name : "User Name";
	});

 	
 	let roll = "admin";
	let showSidebar = $state(false);
	let nameIcon = $derived(
					name !== undefined 
						? name.substring(0, 2).toUpperCase() 
						: "UN"
					);

	function handlerShowSidebar() {
		showSidebar = !showSidebar;
	}

	function logoutHandler() {
		localStorage.setItem("is-login", "false");
		localStorage.setItem("clientData", "");
		showSidebar = false;
		isLogin = false;
		goto("/")
		toast.push("You have logged out successfully")
	}
</script>

<div class="navbar bg-base-100 fixed top-0 left-0 h-20 z-50">
	<div class="navbar-start">
		<a href="/#home">
			<img src="logo/TCC-logo.png" alt="Logo" class="h-20" />
		</a>
	</div>
	<div class="navbar-center hidden lg:flex">
		<ul class="menu menu-horizontal px-1">
			<li><a href="/#home" class="text-lg">Home</a></li>
			<li><a href="/#services" class="text-lg">Services</a></li>
			<li><a href="/#about" class="text-lg">About</a></li>
		</ul>
	</div>

	<div class="navbar-end">
		{#if isLogin}
			<button class="avatar placeholder" onclick={handlerShowSidebar}>
				<div class="bg-neutral text-neutral-content w-12 rounded-full">
					<span>{nameIcon}</span>
				</div>
			</button>
			{@render Sidebar()}
		{:else}
			<a href="/login" class="btn btn-secondary btn-outline">Get Started</a>
		{/if}
	</div>
</div>

{#snippet Sidebar()}
	<nav class="side-bar {showSidebar ? 'side-bar-show' : ''}">
		<ul class="side-bar__close-user">
			<li class="close-user__element">
				<a class="side-bar__link side-bar__link--left" href="/profile">
					{name}
				</a>
			</li>
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div class="close-user__icon-container" onclick={handlerShowSidebar}>
				<img
					id="button-close-menu"
					class="close-user__icon-close"
					src="/icons/close.svg"
					alt="icon for close right drop-down side menu"
				/>
			</div>
			{#if roll !== 'admin'}
				<li class="sections__element">
					<a class="side-bar__link" href="#merchandise"> Merchandise </a>
				</li>
			{/if}
		</ul>

		{#if roll === 'admin'}
			<div class="adaptable-sections">
				<ul class="side-bar__sections">
					<li class="sections__element">
						<a class="side-bar__link" href="/merchandise">Merchandise</a>
					</li>
					<li class="sections__element">
						<a class="side-bar__link" href="/clients"> clients </a>
					</li>
					<li class="sections__element">
						<a class="side-bar__link" href="/zones"> zones </a>
					</li>
					<li class="sections__element">
						<a class="side-bar__link" href="/admins"> admins </a>
					</li>
				</ul>
			</div>
		{/if}

		<ul class="side-bar__sections-dos">
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
			<li class="sections__element cursor-pointer" onclick={logoutHandler}>
				<p class="side-bar__link">logout</p>
			</li>
		</ul>
	</nav>
{/snippet}

<style>
	.side-bar {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 280px;
		height: 100vh;
		max-height: 1500px;
		background-color: black;
		position: fixed;
		top: 0px;
		right: -280px;
		transition: right 0.5s ease;
		z-index: 10000;
		pointer-events: auto;
	}

	.side-bar-show {
		right: 0px;
	}

	.side-bar__close-user {
		padding-top: 15px;
		padding-left: 15px;
		height: 140px;
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}

	.close-user__element {
		list-style: none;
		width: 75%;
		height: 60px;
	}

	.close-user__icon-container {
		width: 55px;
		height: 55px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.close-user__icon-close {
		width: 30px;
		height: 30px;
		transition: filter 0.5s ease;
		cursor: pointer;
	}

	.close-user__icon-close:hover {
		filter: invert(92%) sepia(4%) saturate(0%) hue-rotate(282deg) brightness(100%) contrast(0%);
	}

	.side-bar__sections {
		height: 200px;
		width: 100%;
		margin-top: 30px;
		padding-left: 15px;
		padding-right: 15px;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: end;
	}

	.sections__element {
		width: 100%;
		height: 60px;
		list-style: none;
		justify-self: self-end;
	}

	.adaptable-sections {
		height: 80%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.adaptable-sections::-webkit-scrollbar {
		width: 0px;
	}

	.side-bar__sections-dos {
		height: 130px;
		width: 100%;
		padding-left: 15px;
		padding-right: 15px;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		margin-top: 30px;
		margin-bottom: 20px;
	}

	.side-bar__link {
		display: flex;
		align-items: center;
		justify-content: start;
		padding: 10px 14px;
		width: 100%;
		height: 100%;
		border-radius: 10px;
		border: 1px solid transparent;
		text-decoration: none;
		color: white;
		transition: border-color 0.5s ease;
	}

	.side-bar__link--left {
		justify-content: start;
	}

	.side-bar__link:hover {
		border-color: white;
	}
</style>
