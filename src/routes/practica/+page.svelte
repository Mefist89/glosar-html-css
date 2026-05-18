<script>
	let htmlCode = $state('');
	let cssCode = $state('');
	let activeTab = $state('html');
	let feedbackHtml = $state('');
	let feedbackType = $state('');
	let previewFrame; // To bind the iframe

	function checkCode() {
		if (!previewFrame) return;
		const doc = previewFrame.contentDocument;
		if (!doc) return;

		const results = [];

		// Helpers
		const checkColor = (el, colorNames) => {
			if (!el) return false;
			const names = Array.isArray(colorNames) ? colorNames : [colorNames];
			const actual = getComputedStyle(el).color;
			const rawCode = (htmlCode + cssCode).toLowerCase();

			for (const colorName of names) {
				const dummy = document.createElement('div');
				dummy.style.color = colorName;
				dummy.style.display = 'none';
				document.body.appendChild(dummy);
				const expected = getComputedStyle(dummy).color;
				document.body.removeChild(dummy);
				
				if (actual === expected || rawCode.includes(colorName.toLowerCase())) {
					return true;
				}
			}
			return false;
		};

		const checkProp = (el, prop, val) => {
			if (!el) return false;
			const computed = getComputedStyle(el)[prop];
			return computed === val || (htmlCode + cssCode).toLowerCase().includes(val.toLowerCase());
		};

		// 1. Titlu h2 "Lista inventatorilor celebri:", culoare violet/purple
		const h2s = Array.from(doc.querySelectorAll('h2'));
		const h2Inv = h2s.find(h => h.textContent.toLowerCase().includes('inventatori'));
		results.push({
			desc: 'Titlu h2 "Lista inventatorilor celebri", culoare violet',
			pass: !!h2Inv && checkColor(h2Inv, ['violet', 'purple'])
		});

		// 2. Lista ordonată, culoare galben, 22px
		const ol = doc.querySelector('ol');
		results.push({
			desc: 'Listă ordonată (ol) pentru inventatori, culoare galben, 22px',
			pass: !!ol && checkColor(ol, 'yellow') && checkProp(ol, 'fontSize', '22px')
		});

		// 3. Titlu h2 "Lista limbajelor", culoare violet/purple
		const h2Lang = h2s.find(h => h.textContent.toLowerCase().includes('limbaj'));
		results.push({
			desc: 'Titlu h2 "Lista limbajelor de programare", culoare violet',
			pass: !!h2Lang && checkColor(h2Lang, ['violet', 'purple'])
		});

		// 4. Lista neordonată, culoare galben, 22px
		const ul = doc.querySelector('ul');
		results.push({
			desc: 'Listă neordonată (ul) pentru limbaje, culoare galben, 22px',
			pass: !!ul && checkColor(ul, 'yellow') && checkProp(ul, 'fontSize', '22px')
		});

		// 5. Paragraf "Mihai Eminescu...", culoare orange, 24px
		const ps = Array.from(doc.querySelectorAll('p'));
		const pEmi = ps.find(p => p.textContent.toLowerCase().includes('născut în data de 15'));
		results.push({
			desc: 'Paragraf "Mihai Eminescu...", culoare orange, 24px',
			pass: !!pEmi && checkColor(pEmi, 'orange') && checkProp(pEmi, 'fontSize', '24px')
		});

		// 6. "Mihai Eminescu" bold, albastru, 18px
		const bEmi = doc.querySelector('b, strong');
		results.push({
			desc: '"Mihai Eminescu" îngroșat (B), albastru, 18px',
			pass: !!bEmi && bEmi.textContent.toLowerCase().includes('eminescu') && checkColor(bEmi, 'blue') && checkProp(bEmi, 'fontSize', '18px')
		});

		// 7. "Botoșani și Ipotești" cursiv, violet/purple, 20px
		const iBot = doc.querySelector('i, em');
		results.push({
			desc: '"Botoșani și Ipotești" cursiv (I), violet, 20px',
			pass: !!iBot && iBot.textContent.toLowerCase().includes('botoșani') && checkColor(iBot, ['violet', 'purple']) && checkProp(iBot, 'fontSize', '20px')
		});

		// 8. Imagine 100px x 100px, cerc
		const img = doc.querySelector('img');
		const isCircle = img ? (getComputedStyle(img).borderRadius === '50px' || getComputedStyle(img).borderRadius === '50%' || (cssCode+htmlCode).includes('50%')) : false;
		const is100px = img ? (img.getAttribute('width') === '100' || getComputedStyle(img).width === '100px' || (cssCode+htmlCode).includes('100px')) : false;
		results.push({
			desc: 'Imagine 100px lățime/înălțime, formă de cerc (border-radius: 50%)',
			pass: !!img && is100px && isCircle
		});

		// 9. Tabel cu linii 3px
		const table = doc.querySelector('table');
		const has3pxBorder = table ? (table.getAttribute('border') === '3' || getComputedStyle(table).borderTopWidth === '3px' || (cssCode+htmlCode).includes('3px')) : false;
		results.push({
			desc: 'Tabel cu margini (border) de 3px',
			pass: !!table && has3pxBorder
		});

		// 10. Primul rând din tabel: bold, verde, 18px
		const tr1 = doc.querySelector('tr');
		// We just check if it exists and has the styles, it could be a tr or th
		results.push({
			desc: 'Primul rând din tabel (antet): îngroșat, verde, 18px',
			pass: !!tr1 && checkColor(tr1, 'green') && checkProp(tr1, 'fontSize', '18px')
		});

		// 11. Paragraf "Învățătura...", verde, 22px, cursiv
		const pInv = ps.find(p => p.textContent.toLowerCase().includes('învățătura e cea mai bună'));
		const isItalic = pInv ? (getComputedStyle(pInv).fontStyle === 'italic' || (cssCode+htmlCode).toLowerCase().includes('italic') || pInv.querySelector('i') || pInv.querySelector('em')) : false;
		results.push({
			desc: 'Paragraf "Învățătura...", verde, 22px, cursiv',
			pass: !!pInv && checkColor(pInv, 'green') && checkProp(pInv, 'fontSize', '22px') && !!isItalic
		});

		// 12. Link Wikipedia: orange, 18px, filă nouă
		const a = doc.querySelector('a');
		results.push({
			desc: 'Link către Wikipedia, culoare orange, 18px, filă nouă (target="_blank")',
			pass: !!a && a.href.includes('wikipedia') && a.target === '_blank' && checkColor(a, 'orange') && checkProp(a, 'fontSize', '18px')
		});

		const allPass = results.every(r => r.pass);
		const passCount = results.filter(r => r.pass).length;
		const listHtml = '<ul class="mt-2 space-y-1 text-sm text-left">' +
			results.map(r => `<li>${r.pass ? '✅' : '❌'} ${r.desc}</li>`).join('') +
			'</ul>';

		if (allPass) {
			feedbackType = 'success';
			feedbackHtml = `🎉 <strong>Felicitări!</strong> Ai rezolvat totul corect!${listHtml}`;
		} else if (passCount > 0) {
			feedbackType = 'partial';
			feedbackHtml = `⚡ <strong>Aproape!</strong> Ai rezolvat ${passCount}/${results.length} cerințe.${listHtml}`;
		} else {
			feedbackType = 'error';
			feedbackHtml = `❌ <strong>Mai încearcă.</strong> Nicio cerință nu este îndeplinită încă.${listHtml}`;
		}
	}
</script>

<div class="space-y-5 animate-in pb-10">
	<div class="text-center">
		<h2 class="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
			Practica – Exerciții
		</h2>
		<p class="text-base-content/80 mt-1 mb-4">Urmărește fișierul PDF și rezolvă exercițiile în editoarele de mai jos</p>
		<button class="btn btn-primary px-8 shadow-lg shadow-primary/20" onclick={checkCode}>🔍 Verifică Codul</button>
	</div>

	{#if feedbackHtml}
		<div class="alert max-w-4xl mx-auto mt-4"
			class:alert-success={feedbackType === 'success'}
			class:alert-error={feedbackType === 'error'}
			class:alert-warning={feedbackType === 'partial'}>
			<div>
				{@html feedbackHtml}
			</div>
		</div>
	{/if}

	<div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
		<!-- Left side: Tabs with Editors & Preview -->
		<div class="rounded-xl overflow-hidden border border-base-content/10 bg-base-300 flex flex-col min-h-[500px] lg:min-h-[700px]">
			<!-- Tabs Header -->
			<div class="flex items-center gap-2 bg-base-300 border-b border-base-content/10">
				<div class="flex items-center gap-2 px-3 py-2 border-r border-base-content/10">
					<span class="w-3 h-3 rounded-full bg-error"></span>
					<span class="w-3 h-3 rounded-full bg-warning"></span>
					<span class="w-3 h-3 rounded-full bg-success"></span>
				</div>
				<div class="flex-1 flex" role="tablist">
					<button 
						role="tab"
						class="flex-1 py-2.5 text-sm font-mono transition-colors {activeTab === 'html' ? 'bg-base-100 text-primary border-b-2 border-primary' : 'text-base-content/60 hover:bg-base-200'}"
						onclick={() => activeTab = 'html'}
					>
						index.html
					</button>
					<button 
						role="tab"
						class="flex-1 py-2.5 text-sm font-mono transition-colors {activeTab === 'css' ? 'bg-base-100 text-secondary border-b-2 border-secondary' : 'text-base-content/60 hover:bg-base-200'}"
						onclick={() => activeTab = 'css'}
					>
						style.css
					</button>
					<button 
						role="tab"
						class="flex-1 py-2.5 text-sm font-mono transition-colors {activeTab === 'preview' ? 'bg-base-100 text-success border-b-2 border-success' : 'text-base-content/60 hover:bg-base-200'}"
						onclick={() => activeTab = 'preview'}
					>
						Preview
					</button>
				</div>
			</div>

			<!-- Tab Content -->
			<div class="flex-1 flex flex-col bg-base-100 relative min-h-[450px]">
				<!-- HTML Editor -->
				<textarea
					bind:value={htmlCode}
					class="w-full flex-1 p-4 bg-transparent font-mono text-sm resize-none focus:outline-none absolute inset-0 transition-opacity duration-200 {activeTab === 'html' ? 'z-10 opacity-100' : 'z-0 opacity-0 pointer-events-none'}"
					placeholder="<!-- Scrie codul HTML aici -->"
					spellcheck="false"
				></textarea>

				<!-- CSS Editor -->
				<textarea
					bind:value={cssCode}
					class="w-full flex-1 p-4 bg-transparent font-mono text-sm resize-none focus:outline-none absolute inset-0 transition-opacity duration-200 {activeTab === 'css' ? 'z-10 opacity-100' : 'z-0 opacity-0 pointer-events-none'}"
					placeholder="/* Scrie codul CSS aici */"
					spellcheck="false"
				></textarea>

				<!-- Preview -->
				<div class="absolute inset-0 transition-opacity duration-200 {activeTab === 'preview' ? 'z-10 opacity-100' : 'z-0 opacity-0 pointer-events-none'} bg-white">
					<iframe
						bind:this={previewFrame}
						srcdoc={`<!DOCTYPE html><html><head><style>${cssCode}</style></head><body>${htmlCode}</body></html>`}
						class="w-full h-full border-none"
						sandbox="allow-same-origin allow-scripts"
						title="Preview"
					></iframe>
				</div>
			</div>
		</div>

		<!-- Right side: PDF Viewer -->
		<div class="rounded-xl overflow-hidden border border-base-content/10 bg-base-300 min-h-[500px] lg:min-h-[700px]">
			<iframe src="/resources/Html_Css.pdf" title="PDF Document" class="w-full h-full border-none"></iframe>
		</div>
	</div>
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
