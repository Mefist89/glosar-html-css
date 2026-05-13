<script>
	import { onMount } from 'svelte';
	import data from '$lib/data.json';

	const challenges = data.challenges;

	let currentIdx = $state(0);
	let showHint = $state(false);
	let showSolution = $state(false);
	/** @type {Set<number>} */
	let completed = $state(new Set());
	let feedbackHtml = $state('');
	let feedbackType = $state('');

	/** @type {HTMLDivElement} */
	let editorContainer;
	/** @type {HTMLIFrameElement} */
	let previewFrame;
	/** @type {any} */
	let editorView;

	let current = $derived(challenges[currentIdx]);

	onMount(async () => {
		// Import everything from the unified 'codemirror' package
		const { EditorView, minimalSetup } = await import('codemirror');
		const { EditorState } = await import('@codemirror/state');
		const { html } = await import('@codemirror/lang-html');
		const { oneDark } = await import('@codemirror/theme-one-dark');

		const updateListener = EditorView.updateListener.of((/** @type {any} */ update) => {
			if (update.docChanged) {
				updatePreview(update.state.doc.toString());
			}
		});

		const state = EditorState.create({
			doc: '',
			extensions: [
				minimalSetup,
				html(),
				oneDark,
				updateListener,
				EditorView.theme({
					'&': { height: '280px', fontSize: '14px' },
					'.cm-scroller': { overflow: 'auto', fontFamily: "'JetBrains Mono', monospace" },
					'.cm-content': { padding: '8px 0' }
				})
			]
		});

		editorView = new EditorView({ state, parent: editorContainer });
	});

	/** @param {string} code */
	function updatePreview(code) {
		if (!previewFrame) return;
		const doc = previewFrame.contentDocument;
		if (!doc) return;
		doc.open();
		doc.write(code);
		doc.close();
	}

	function checkCode() {
		if (!editorView) return;
		const code = editorView.state.doc.toString().trim();

		if (!code) {
			feedbackType = 'error';
			feedbackHtml = '⚠️ Editorul este gol. Scrie cod HTML mai întâi!';
			return;
		}

		const parser = new DOMParser();
		const doc = parser.parseFromString(code, 'text/html');
		const ch = current;

		/** @type {{desc: string, pass: boolean}[]} */
		const results = [];

		for (const check of ch.checks) {
			const el = doc.querySelector(check.selector);
			const els = doc.querySelectorAll(check.selector);
			let pass = false;

			if (check.minCount) {
				pass = els.length >= check.minCount;
			} else if (check.textContains) {
				pass = !!el && el.textContent !== null && el.textContent.toLowerCase().includes(check.textContains.toLowerCase());
			} else if (check.attr && check.value) {
				pass = !!el && el.getAttribute(check.attr) === check.value;
			} else if (check.attr && check.valueContains) {
				pass = !!el && (el.getAttribute(check.attr) || '').includes(check.valueContains);
			} else if (check.styleContains) {
				const style = el ? (el.getAttribute('style') || '').replace(/\s/g, '') : '';
				pass = style.includes(check.styleContains);
			} else {
				pass = !!el;
			}

			results.push({ desc: check.desc, pass });
		}

		const allPass = results.every(r => r.pass);
		const somePass = results.some(r => r.pass);
		const passCount = results.filter(r => r.pass).length;

		const listHtml = '<ul class="mt-2 space-y-1 text-sm">' +
			results.map(r => `<li>${r.pass ? '✅' : '❌'} ${r.desc}</li>`).join('') +
			'</ul>';

		if (allPass) {
			feedbackType = 'success';
			feedbackHtml = `🎉 <strong>Felicitări!</strong> Toate cerințele sunt îndeplinite! (+15 puncte)${listHtml}`;
			completed = new Set([...completed, currentIdx]);
		} else if (somePass) {
			feedbackType = 'partial';
			feedbackHtml = `⚡ <strong>Aproape!</strong> Ai rezolvat ${passCount}/${results.length} cerințe.${listHtml}`;
		} else {
			feedbackType = 'error';
			feedbackHtml = `❌ <strong>Mai încearcă.</strong> Nicio cerință nu este îndeplinită încă.${listHtml}`;
		}
	}

	function selectChallenge(idx) {
		currentIdx = idx;
		showHint = false;
		showSolution = false;
		feedbackHtml = '';
		feedbackType = '';
		if (editorView) {
			editorView.dispatch({
				changes: { from: 0, to: editorView.state.doc.length, insert: '' }
			});
		}
		updatePreview('');
	}

	function resetEditor() {
		if (editorView) {
			editorView.dispatch({
				changes: { from: 0, to: editorView.state.doc.length, insert: '' }
			});
		}
		updatePreview('');
		feedbackHtml = '';
		feedbackType = '';
	}
</script>

<div class="space-y-5 animate-in">
	<div class="text-center">
		<h2 class="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
			Sandbox – Verificator de Cod
		</h2>
		<p class="text-base-content/80 mt-1">Scrie cod HTML și verifică-l în timp real</p>
	</div>

	<!-- Challenge Selector -->
	<div class="flex flex-wrap justify-center gap-2">
		{#each challenges as ch, i}
			<button class="btn btn-xs"
				class:btn-primary={i === currentIdx && !completed.has(i)}
				class:btn-success={completed.has(i)}
				class:btn-ghost={i !== currentIdx && !completed.has(i)}
				onclick={() => selectChallenge(i)}>
				{completed.has(i) ? '✅' : `#${ch.id}`} {ch.title}
			</button>
		{/each}
	</div>

	<!-- Challenge Description -->
	<div class="card bg-base-200/50 border border-base-content/5">
		<div class="card-body p-4">
			<p class="text-sm leading-relaxed">
				<strong class="text-primary">Provocarea #{current.id}:</strong>
				{@html current.task}
			</p>

			<div class="flex flex-wrap gap-2 mt-3">
				{#if current.hint}
					<button class="btn btn-xs btn-info btn-outline" onclick={() => showHint = !showHint}>
						{showHint ? 'Ascunde Indiciul' : '💡 Arată Indiciul'}
					</button>
				{/if}
				{#if current.solution}
					<button class="btn btn-xs btn-warning btn-outline" onclick={() => showSolution = !showSolution}>
						{showSolution ? 'Ascunde Soluția' : '👀 Arată Soluția'}
					</button>
				{/if}
			</div>

			{#if showHint && current.hint}
				<div class="mt-2 p-3 bg-base-300/80 text-base-content rounded-box border-l-4 border-l-info border-y border-r border-base-content/10 text-sm animate-in shadow-sm">
					<strong class="text-info">💡 Indiciu:</strong> {current.hint}
				</div>
			{/if}

			{#if showSolution && current.solution}
				<div class="mt-2 p-3 bg-base-300/80 text-base-content rounded-box border-l-4 border-l-warning border-y border-r border-base-content/10 text-sm animate-in shadow-sm">
					<strong class="text-warning">👀 Soluție completă:</strong>
					<pre class="mt-2 p-2 bg-base-100 rounded overflow-x-auto text-xs font-mono border border-base-content/5"><code>{current.solution}</code></pre>
				</div>
			{/if}
		</div>
	</div>

	<!-- Editor + Preview -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
		<!-- Editor -->
		<div class="rounded-xl overflow-hidden border border-base-content/10 bg-base-300">
			<div class="flex items-center gap-2 px-3 py-2 bg-base-300 border-b border-base-content/10">
				<span class="w-3 h-3 rounded-full bg-error"></span>
				<span class="w-3 h-3 rounded-full bg-warning"></span>
				<span class="w-3 h-3 rounded-full bg-success"></span>
				<span class="text-xs text-base-content/40 ml-2">index.html</span>
			</div>
			<div bind:this={editorContainer}></div>
		</div>

		<!-- Preview -->
		<div class="rounded-xl overflow-hidden border border-base-content/10">
			<div class="flex items-center gap-2 px-3 py-2 bg-base-300 border-b border-base-content/10">
				<span class="w-3 h-3 rounded-full bg-error"></span>
				<span class="w-3 h-3 rounded-full bg-warning"></span>
				<span class="w-3 h-3 rounded-full bg-success"></span>
				<span class="text-xs text-base-content/40 ml-2">Preview</span>
			</div>
			<iframe bind:this={previewFrame}
				class="w-full bg-white"
				style="height: 280px; border: none;"
				sandbox="allow-same-origin"
				title="Preview"></iframe>
		</div>
	</div>

	<!-- Actions -->
	<div class="flex justify-center gap-3">
		<button class="btn btn-primary" onclick={checkCode}>🔍 Verifică Codul</button>
		<button class="btn btn-ghost" onclick={resetEditor}>🗑️ Resetează</button>
	</div>

	<!-- Feedback -->
	{#if feedbackHtml}
		<div class="alert max-w-2xl mx-auto"
			class:alert-success={feedbackType === 'success'}
			class:alert-error={feedbackType === 'error'}
			class:alert-warning={feedbackType === 'partial'}>
			<div>
				{@html feedbackHtml}
			</div>
		</div>
	{/if}
</div>

<style>
	.animate-in {
		animation: fadeSlideIn 0.4s ease-out;
	}
	@keyframes fadeSlideIn {
		from { opacity: 0; transform: translateY(12px); }
		to { opacity: 1; transform: translateY(0); }
	}
</style>
