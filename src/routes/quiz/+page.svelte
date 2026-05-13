<script>
	import data from '$lib/data.json';

	const POINTS = 20;
	const questions = data.quiz;
	const total = questions.length;

	let idx = $state(0);
	let score = $state(0);
	let answered = $state(false);
	let isCorrect = $state(false);
	let feedbackMsg = $state('');
	let showResults = $state(false);
	let fillAnswer = $state('');

	/** @type {string[]} */
	let matchAnswers = $state([]);

	let current = $derived(questions[idx]);
	let progressPct = $derived(((idx) / total) * 100);
	let resultPct = $derived(Math.round((score / (total * POINTS)) * 100));

	$effect(() => {
		// Reset match answers when question changes
		const q = questions[idx];
		if (q.type === 'match' && q.pairs) {
			matchAnswers = q.pairs.map(() => '');
		}
	});

	/**
	 * @param {string[]} arr
	 * @returns {string[]}
	 */
	function shuffle(arr) {
		const a = [...arr];
		for (let i = a.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[a[i], a[j]] = [a[j], a[i]];
		}
		return a;
	}

	/** @param {number} qIdx */
	function getShuffledOptions(qIdx) {
		const q = questions[qIdx];
		if (q.type === 'match' && q.pairs) {
			return shuffle(q.pairs.map((/** @type {{ right: string }} */ p) => p.right));
		}
		return [];
	}

	let shuffledOptions = $state(getShuffledOptions(0));

	function check() {
		if (answered) return;
		answered = true;
		const q = current;

		if (q.type === 'fill') {
			const ans = fillAnswer.trim().toLowerCase().replace(/[<>]/g, '');
			isCorrect = ans === q.a?.toLowerCase();
			if (isCorrect) {
				feedbackMsg = `✅ Corect! Răspunsul este „${q.a}". +${POINTS} puncte`;
				score += POINTS;
			} else {
				feedbackMsg = `❌ Greșit! Răspunsul corect era „${q.a}".`;
			}
		} else if (q.type === 'match' && q.pairs) {
			let allOk = true;
			for (let i = 0; i < q.pairs.length; i++) {
				if (matchAnswers[i] !== q.pairs[i].right) allOk = false;
			}
			isCorrect = allOk;
			if (isCorrect) {
				feedbackMsg = `✅ Toate potrivirile sunt corecte! +${POINTS} puncte`;
				score += POINTS;
			} else {
				feedbackMsg = `❌ Unele potriviri sunt greșite. Verifică selecțiile.`;
			}
		}
	}

	function next() {
		idx++;
		if (idx >= total) {
			showResults = true;
		} else {
			answered = false;
			isCorrect = false;
			feedbackMsg = '';
			fillAnswer = '';
			shuffledOptions = getShuffledOptions(idx);
		}
	}

	function restart() {
		idx = 0;
		score = 0;
		answered = false;
		isCorrect = false;
		feedbackMsg = '';
		fillAnswer = '';
		showResults = false;
		shuffledOptions = getShuffledOptions(0);
	}
</script>



<div class="space-y-6 animate-in">
	<div class="text-center">
		<h2 class="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
			Quiz – Testează-ți Cunoștințele
		</h2>
		<p class="text-base-content/80 mt-1">Răspunde la întrebări și obține punctaj maxim!</p>
	</div>

	{#if !showResults}
		<!-- Progress -->
		<div class="max-w-2xl mx-auto">
			<progress class="progress progress-primary w-full" value={progressPct} max="100"></progress>
			<p class="text-center text-sm text-base-content/50 mt-1">Întrebarea {idx + 1} / {total}</p>
		</div>

		<!-- Question Card -->
		<div class="card bg-base-200/50 border border-base-content/5 max-w-2xl mx-auto">
			<div class="card-body gap-4">
				<p class="text-lg font-medium leading-relaxed">{current.q}</p>

				{#if current.type === 'fill'}
					<div>
						<input type="text" bind:value={fillAnswer}
							placeholder="Scrie răspunsul..."
							class="input input-bordered w-full font-mono focus:input-primary"
							disabled={answered}
							onkeydown={(e) => { if (e.key === 'Enter' && !answered) check(); }} />
						{#if current.hint}
							<p class="text-xs text-base-content/50 mt-2">💡 Hint: {current.hint}</p>
						{/if}
					</div>
				{:else if current.type === 'match' && current.pairs}
					<div class="space-y-2">
						{#each current.pairs as pair, i}
							<div class="flex items-center gap-3 p-3 rounded-lg bg-base-300/50 border border-base-content/5"
								class:border-success={answered && matchAnswers[i] === pair.right}
								class:border-error={answered && matchAnswers[i] !== pair.right}>
								<span class="font-mono font-medium text-primary min-w-[100px] text-sm">{pair.left}</span>
								<span class="text-base-content/50">→</span>
								<select class="select select-bordered select-sm flex-1"
									bind:value={matchAnswers[i]} disabled={answered}>
									<option value="">— alege —</option>
									{#each shuffledOptions as opt}
										<option value={opt}>{opt}</option>
									{/each}
								</select>
							</div>
						{/each}
					</div>
				{/if}

				<!-- Feedback -->
				{#if feedbackMsg}
					<div class="alert" class:alert-success={isCorrect} class:alert-error={!isCorrect}>
						<span>{feedbackMsg}</span>
					</div>
				{/if}

				<!-- Actions -->
				<div class="flex gap-3">
					{#if !answered}
						<button class="btn btn-primary" onclick={check}>Verifică</button>
					{:else}
						<button class="btn btn-secondary" onclick={next}>
							{idx + 1 >= total ? 'Vezi Rezultatele' : 'Următoarea →'}
						</button>
					{/if}
				</div>
			</div>
		</div>
	{:else}
		<!-- Results -->
		<div class="card bg-base-200/50 border border-base-content/5 max-w-md mx-auto">
			<div class="card-body items-center text-center gap-4">
				<div class="text-5xl">
					{#if resultPct >= 80}🏆{:else if resultPct >= 50}👍{:else}📚{/if}
				</div>
				<h3 class="text-xl font-bold">
					{#if resultPct >= 80}Excelent! Ești pregătit pentru teză!
					{:else if resultPct >= 50}Bine! Mai exersează puțin.
					{:else}Mai ai de lucru. Revizuiește glosarul!{/if}
				</h3>
				<div class="my-2">
					<span class="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
						{score}
					</span>
					<span class="block text-base-content/50 text-sm">puncte din {total * POINTS}</span>
				</div>
				<p class="text-base-content/80 text-sm">
					Răspunsuri corecte: <strong>{score / POINTS}</strong> din <strong>{total}</strong> ({resultPct}%)
				</p>
				<button class="btn btn-primary mt-2" onclick={restart}>🔄 Reia Quiz-ul</button>
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
