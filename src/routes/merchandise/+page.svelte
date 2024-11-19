<script lang="ts">
	import { toast } from '@zerodevx/svelte-toast';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	async function fetchMerchandiseList() {
		try {
			const response = await fetch('http://localhost:8080/merchandises', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (!response.ok) {
				throw new Error(
					`Failed to fetch merchandise list: ${response.status} ${response.statusText}`
				);
			}
			return await response.json();
		} catch (error) {
			toast.push('Error fetching merchandise');
			throw error;
		}
	}

	type merchandise = {
		id: number;
		volumeOccupies: number;
		weightOccupies: number;
		description: string;
		dateEntry: string;
		dateExit: string;
		warehouseId: number;
		clientId: number;
	};

	let merchandiseList: merchandise[] = $state([]);
	let merchandiseFilterList: merchandise[] = $state([]);
	let clientToFilter = $state(null);
	let warehouseToFilter = $state(null);
	let isNotLogin = $state(false);
	let isFormVisible = $state(false);

	onMount(async () => {
		const storedValue = localStorage.getItem('is-login');
		isNotLogin = storedValue === 'false';
		if (isNotLogin) {
			goto('/login');
		}

		try {
			merchandiseList = await fetchMerchandiseList();
			merchandiseFilterList = merchandiseList;
			toast.push('✔️ Data fetched successfully!');
		} catch (error) {
			toast.push('❌ An error occurred while fetching the merchandise list.');
		}
	});

	function reloadPage() {
		location.reload();
	}

	function filterByClientId() {
		if (clientToFilter === 0 || clientToFilter === null) {
			merchandiseFilterList = merchandiseList;
		} else {
			merchandiseFilterList = merchandiseList.filter((item) => item.clientId === clientToFilter);
		}
	}

	function filterByWarehouseId() {
		if (warehouseToFilter === 0 || warehouseToFilter === null) {
			merchandiseFilterList = merchandiseList;
		} else {
			merchandiseFilterList = merchandiseList.filter(
				(item) => item.warehouseId === warehouseToFilter
			);
		}
	}

	let volumeOccupies = $state('');
	let weightOccupies = $state('');
	let name = $state('');
	let description = $state('');
	let dateEntry = $state('');
	let dateExit = $state('');
	let warehouseId = $state('');
	let clientId = $state('');

	async function submitMerchandise() {
		if (
			!volumeOccupies ||
			!weightOccupies ||
			!name ||
			!description ||
			!dateEntry ||
			!dateExit ||
			!warehouseId ||
			!clientId
		) {
			toast.push('All fields must be filled out correctly.');
			return;
		}

		const merchandiseData = {
			volumeOccupies: parseFloat(volumeOccupies),
			weightOccupies: parseFloat(weightOccupies),
			name,
			description,
			dateEntry,
			dateExit,
			warehouseId: parseInt(warehouseId, 10),
			clientId: parseInt(clientId, 10)
		};

		try {
			const response = await fetch('http://localhost:8080/merchandises', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(merchandiseData)
			});

			if (!response.ok) {
                throw new Error("Failed to save merchandise")
			}
			toast.push('✔️ Merchandise save successfully');
			setTimeout(() => {
				reloadPage();
			}, 1500);
		} catch (error) {
			toast.push('❌ Failed to submit the data');
		}
	}
</script>

<main
	class="w-full h-screen flex flex-col gap-8 min-w-96 bg-basic-gradient pb-14 justify-center items-center overflow-y-scroll mt-12"
>
	<div class="options flex flex-row gap-4 flex-wrap w-full justify-center">
		<input
			type="number"
			placeholder="Filter by client Id"
			class="input input-bordered w-full max-w-xs"
			bind:value={clientToFilter}
			onkeyup={filterByClientId}
		/>
		<input
			type="number"
			placeholder="Filter by warehouse Id"
			class="input input-bordered w-full max-w-xs"
			bind:value={warehouseToFilter}
			onkeyup={filterByWarehouseId}
		/>
		<button class="btn btn-success" onclick={() => (isFormVisible = true)}>Save New</button>
	</div>
	{#if merchandiseFilterList}
		<div class="overflow-x-scroll min-w-72 w-screen max-w-[1000px]">
			<table class="table">
				<thead>
					<tr>
						<th>Id</th>
						<th>Volume Occupies</th>
						<th>Weight Occupies</th>
						<th>Description</th>
						<th>Date Entry</th>
						<th>Date Exit</th>
						<th>Warehouse Id</th>
						<th>client Id</th>
					</tr>
				</thead>
				<tbody>
					{#each merchandiseFilterList as merchandise}
						<tr>
							<th>{merchandise.id}</th>
							<td>{merchandise.volumeOccupies}</td>
							<td>{merchandise.weightOccupies}</td>
							<td>{merchandise.description}</td>
							<td>{merchandise.dateEntry}</td>
							<td>{merchandise.dateExit}</td>
							<td>{merchandise.warehouseId}</td>
							<td>{merchandise.clientId}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{:else}
		<h1>No merchandise data found.</h1>
	{/if}

	<div
		class="max-w-96 w-72 h-[530px] rounded-xl bg-base-300 flex justify-center items-center flex-col px-4 mt-12 z-[100000] fixed {isFormVisible
			? 'top-0'
			: 'top-[-800px]'} transition-all duration-500 ease-in-out"
	>
		<form class="flex flex-col justify-center gap-1" onsubmit={submitMerchandise}>
			<input
				class="input input-bordered w-full max-w-xs"
				type="number"
				id="volumeOccupies"
				placeholder="Volume occupies"
				bind:value={volumeOccupies}
				required
			/>

			<input
				class="input input-bordered w-full max-w-xs"
				type="number"
				id="weightOccupies"
				placeholder="Weight occupies"
				bind:value={weightOccupies}
				required
			/>

			<input
				class="input input-bordered w-full max-w-xs"
				type="text"
				id="name"
				placeholder="Merchandise Name"
				bind:value={name}
				required
			/>

			<input
				class="input input-bordered w-full max-w-xs"
				type="text"
				id="description"
				placeholder="Description"
				bind:value={description}
				required
			/>

			<input
				class="input input-bordered w-full max-w-xs"
				type="date"
				id="dateEntry"
				placeholder="Date Entry"
				bind:value={dateEntry}
				required
			/>

			<input
				class="input input-bordered w-full max-w-xs"
				type="date"
				id="dateExit"
				placeholder="Date Exit"
				bind:value={dateExit}
				required
			/>

			<input
				class="input input-bordered w-full max-w-xs"
				type="number"
				id="warehouseId"
				placeholder="Warehouse Id"
				bind:value={warehouseId}
				required
			/>

			<input
				class="input input-bordered w-full max-w-xs"
				type="number"
				id="clientId"
				placeholder="Client Id"
				bind:value={clientId}
				required
			/>

			<div class="flex flex-row justify-center mt-2 gap-2">
                <button class="btn btn-neutral" onclick={() => (isFormVisible = false)}> Cancel </button>
				<button class="btn btn-success" type="submit">Submit</button>
			</div>
		</form>
	</div>
</main>
