<script>
	import data from '$lib/data.json';

	const catLabels = {
		structure: '🏗️ Structură',
		text: '✍️ Text',
		list: '📋 Liste',
		table: '📊 Tabele',
		media: '🔗 Legături & Media'
	};

	const catColors = {
		structure: 'badge-primary',
		text: 'badge-info',
		list: 'badge-success',
		table: 'badge-warning',
		media: 'badge-secondary'
	};

	let activeFilter = $state('all');
	let searchQuery = $state('');

	let filteredGlossary = $derived(() => {
		return data.glossary.filter(item => {
			const matchCat = activeFilter === 'all' || item.cat === activeFilter;
			const q = searchQuery.toLowerCase();
			const matchSearch = !q || item.tag.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q);
			return matchCat && matchSearch;
		});
	});

	let filteredAttributes = $derived(() => {
		const q = searchQuery.toLowerCase();
		return data.attributes.filter(item => {
			return !q || item.tag.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q);
		});
	});

	let selectedItem = $state(null);
	let isModalOpen = $state(false);

	function openModal(item) {
		selectedItem = item;
		isModalOpen = true;
	}

	function closeModal() {
		isModalOpen = false;
		selectedItem = null;
	}
</script>

<div class="space-y-6 animate-in">
	<!-- Page header -->
	<div class="text-center">
		<h2 class="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
			Glosar Interactiv
		</h2>
		<p class="text-base-content/80 mt-1">Explorează tag-urile HTML și atributele lor</p>
	</div>

	<!-- Filters -->
	<div class="flex flex-wrap justify-center gap-2">
		<button class="btn btn-xs" class:btn-primary={activeFilter === 'all'}
			class:btn-ghost={activeFilter !== 'all'} onclick={() => activeFilter = 'all'}>
			Toate
		</button>
		{#each Object.entries(catLabels) as [key, label]}
			<button class="btn btn-xs" class:btn-primary={activeFilter === key}
				class:btn-ghost={activeFilter !== key} onclick={() => activeFilter = key}>
				{label}
			</button>
		{/each}
		<button class="btn btn-xs" class:btn-warning={activeFilter === 'attributes'}
			class:btn-ghost={activeFilter !== 'attributes'} onclick={() => activeFilter = 'attributes'}>
			⚙️ Atribute importante
		</button>
	</div>

	<!-- Search -->
	<div class="max-w-md mx-auto">
		<input type="text" bind:value={searchQuery}
			placeholder="🔍 Caută un tag sau atribut..."
			class="input input-bordered input-sm w-full bg-base-200/50 focus:input-primary" />
	</div>

	<!-- Tags Grid (hidden when "Atribute importante" filter is active) -->
	{#if activeFilter !== 'attributes'}
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
			{#each filteredGlossary() as item (item.tag)}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div class="card bg-base-200/50 border border-base-content/5 hover:border-primary/30
					hover:shadow-[0_0_20px_rgba(var(--color-primary-raw),0.15)]
					transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
					onclick={() => openModal(item)}>
					<div class="card-body p-4 gap-2">
						<h3 class="font-mono text-lg font-semibold text-primary group-hover:drop-shadow-[0_0_8px_var(--color-primary)]
							transition-all duration-300">
							{item.tag}
						</h3>
						<p class="text-sm text-base-content/90 leading-relaxed line-clamp-3">{item.desc}</p>
						<span class="badge {catColors[item.cat]} badge-xs badge-outline mt-1">{catLabels[item.cat]}</span>
					</div>
				</div>
			{/each}
		</div>
	{/if}

	<!-- Divider + Attributes Grid (always shown for 'all', or when 'attributes' filter is active) -->
	{#if activeFilter === 'all' || activeFilter === 'attributes'}
		<div class="divider text-secondary font-semibold text-sm">Atribute Importante</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
			{#each filteredAttributes() as item (item.tag)}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div class="card bg-base-200/50 border border-base-content/5 hover:border-warning/30
					hover:shadow-[0_0_20px_rgba(var(--color-warning-raw),0.15)]
					transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
					onclick={() => openModal(item)}>
					<div class="card-body p-4 gap-2">
						<h3 class="font-mono text-lg font-semibold text-warning group-hover:drop-shadow-[0_0_8px_var(--color-warning)]
							transition-all duration-300">
							{item.tag}
						</h3>
						<p class="text-sm text-base-content/90 leading-relaxed line-clamp-3">{item.desc}</p>
						<span class="badge {catColors[item.cat]} badge-xs badge-outline mt-1">{catLabels[item.cat]}</span>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<!-- Modal pentru detalii tag/atribut -->
{#if isModalOpen && selectedItem}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<dialog class="modal modal-bottom sm:modal-middle modal-open" open>
		<div class="modal-box border-2 border-primary/20 shadow-[0_0_30px_rgba(var(--color-primary-raw),0.1)]">
			<form method="dialog">
				<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onclick={closeModal}>✕</button>
			</form>
			<div class="flex items-center gap-3 mb-4">
				<h3 class="font-mono text-2xl font-bold text-primary">{selectedItem.tag}</h3>
				<span class="badge {catColors[selectedItem.cat]} badge-sm">{catLabels[selectedItem.cat]}</span>
			</div>
			
			<p class="text-base-content/90 text-lg mb-6 leading-relaxed">{selectedItem.desc}</p>

			{#if selectedItem.details}
				<div class="mb-6">
					<h4 class="text-sm font-semibold text-secondary uppercase tracking-wider mb-2">Utilizare</h4>
					<p class="text-base text-base-content/80 leading-relaxed bg-base-200/50 p-4 rounded-xl border border-base-content/5">{selectedItem.details}</p>
				</div>
			{/if}

			{#if selectedItem.example}
				<div class="relative group mt-4">
					<h4 class="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Exemplu de cod</h4>
					<div class="bg-neutral text-neutral-content rounded-xl p-4 overflow-x-auto shadow-inner">
						<pre class="font-mono text-sm leading-relaxed whitespace-pre-wrap"><code>{selectedItem.example}</code></pre>
					</div>
				</div>
			{/if}
			
			<div class="modal-action">
				<button class="btn" onclick={closeModal}>Închide</button>
			</div>
		</div>
		<form method="dialog" class="modal-backdrop" onclick={closeModal}>
			<button>close</button>
		</form>
	</dialog>
{/if}

<style>
	.animate-in {
		animation: fadeSlideIn 0.4s ease-out;
	}
	@keyframes fadeSlideIn {
		from { opacity: 0; transform: translateY(12px); }
		to { opacity: 1; transform: translateY(0); }
	}
</style>
