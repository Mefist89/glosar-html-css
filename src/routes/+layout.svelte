<script>
	import './layout.css';
	import { page } from '$app/state';

	let { children } = $props();
	let currentTheme = $state('night');

	function toggleTheme() {
		currentTheme = currentTheme === 'night' ? 'warmlight' : 'night';
		document.documentElement.setAttribute('data-theme', currentTheme);
	}

	/**
	 * @param {string} path
	 * @returns {boolean}
	 */
	function isActive(path) {
		if (path === '/') return page.url.pathname === '/';
		return page.url.pathname.startsWith(path);
	}
</script>

<svelte:head>
	<title>HTML/CSS Trainer | Pregătire Teză</title>
</svelte:head>

<div class="min-h-screen flex flex-col">
	<!-- Header -->
	<header class="py-6 text-center border-b border-base-content/10 relative">
		<div class="absolute right-4 top-4">
			<button class="btn btn-sm btn-ghost" onclick={toggleTheme} title="Schimbă tema">
				{#if currentTheme === 'night'}
					☀️
				{:else}
					🌙
				{/if}
			</button>
		</div>
		<div class="flex items-center justify-center gap-3">
			<span class="font-mono text-2xl text-primary drop-shadow-[0_0_12px_var(--color-primary)]
				bg-primary/10 px-3 py-1 rounded-lg border border-primary/20">&lt;/&gt;</span>
			<h1 class="text-3xl font-bold tracking-tight">
				HTML<span class="text-secondary drop-shadow-[0_0_10px_var(--color-secondary)]">/CSS</span> Trainer
			</h1>
		</div>
		<p class="text-base-content/80 mt-2 text-sm">Pregătire interactivă pentru teză • Clasa a 11-a</p>
	</header>

	<!-- Navigation -->
	<nav class="sticky top-0 z-50 backdrop-blur-xl bg-base-100/80 border-b border-base-content/10">
		<div class="flex justify-center gap-2 p-3 max-w-lg mx-auto">
			<a href="/" class="btn btn-sm flex-1 gap-2"
				class:btn-primary={isActive('/')}
				class:btn-ghost={!isActive('/')}>
				<span>📖</span> Glosar
			</a>
			<a href="/quiz" class="btn btn-sm flex-1 gap-2"
				class:btn-primary={isActive('/quiz')}
				class:btn-ghost={!isActive('/quiz')}>
				<span>🧠</span> Quiz
			</a>
			<a href="/sandbox" class="btn btn-sm flex-1 gap-2"
				class:btn-primary={isActive('/sandbox')}
				class:btn-ghost={!isActive('/sandbox')}>
				<span>💻</span> Sandbox
			</a>
		</div>
	</nav>

	<!-- Main Content -->
	<main class="flex-1 max-w-5xl w-full mx-auto px-4 py-8">
		{@render children()}
	</main>

	<!-- Footer -->
	<footer class="text-center py-6 text-base-content/40 text-xs border-t border-base-content/10">
		<p>&copy; 2026 HTML/CSS Trainer • Pregătire Teză Informatică</p>
	</footer>
</div>
