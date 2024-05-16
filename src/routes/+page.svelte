<script lang="ts">
	import { tick } from 'svelte';
	import { scale, slide, fly, fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { options, message, completedCookieKey } from '$lib';
	import retry from '$lib/assets/retry.svg';

	export let data;

	// spinner and button
	let completed = data.completed;
	let rotating = false;
	let final = completed;
	let adjust = false;

	// new addition
	let n = options.length;

	function spinWheel() {
		rotating = true;
		setTimeout(() => {
			adjust = true;
		}, 500);
		setTimeout(() => {
			final = true;
		}, 4000);
		setTimeout(() => {
			completed = true;
			document.cookie = `${completedCookieKey}=true; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
		}, 5000);
	}
</script>

<main
	class="flex min-h-screen flex-col items-center justify-center gap-x-10 gap-y-5 text-slate-800 lg:flex-row"
>
	<!--Spinner-->
	<section class="relative mt-5 grid justify-items-center">
		<ul class:rotate={rotating} class="background-{n}" in:scale|global={{ start: 1.1, opacity: 1 }}>
			<!--Options-->
			{#each options.filter((t) => t.inPlay) as option, i (option.id)}
				<li class="position-{i + 1}-{n}" animate:flip>
					<span title={option.text} class:adjust class="px-5 text-lg font-bold sm:text-3xl">
						{#if option.icon === 'retry'}
							<img src={retry} class="w-5 sm:w-7" alt="retry" />
						{:else}
							{option.icon}
						{/if}
					</span>
				</li>
			{/each}
		</ul>
		<!--Center of wheel-->
		{#if !completed && !rotating}
			<button
				class="spinner-button wheel-center bg-[#e72d3b] text-white hover:bg-[#e72d3b] hover:bg-[#e72d3b]/90 absolute shadow-xl"
				in:scale|global
				out:fade
				on:click={async () => {
					await tick();
					spinWheel();
				}}
			>
				Tirar Rueda
			</button>
		{:else if final}
			<div
				class="wheel-center winner absolute bg-yellow-400 p-2 text-2xl sm:text-5xl"
				transition:scale|global
			>
				25%
			</div>
		{/if}
		<div class="arrow-head absolute" />
	</section>
	<!--Result-->
	<section class="m-4 grid">
		{#if completed}
			<!--Result-->
			<div class="flex justify-center" in:slide|global={{ delay: 400 }} out:slide|global>
				<div
					class="flex flex-col gap-y-5 rounded-xl border border-slate-800 bg-yellow-400 px-5 py-5 font-bold leading-loose shadow-xl sm:px-20"
				>
					<h3 class="text-2xl">¡Felicidades, has ganado!</h3>

					<div class="flex flex-col">
						<div class="text-6xl" in:fade|global={{ delay: 400 }} out:slide|global>25%</div>
						<div
							in:fly|global={{ delay: 800, x: -50 }}
							out:slide|global
							class="text-md leading-normal"
						>
							de descuento con nosotros
						</div>
					</div>

					<div class="font-sans">
						<a
							href="https://wa.me/+523333915701?text={message}"
							target="_blank"
							class="btn border-none bg-[#e72d3b] text-white hover:bg-[#e72d3b] hover:bg-[#e72d3b]/90"
						>
							Reclamar
						</a>
					</div>
				</div>
			</div>
		{:else}
			<div class="flex flex-col items-center sm:items-start gap-y-5">
				<img
					src="https://assets.hotsale.com.mx/public/hotsale-mx/imgs/logo-hot-sale-2024.svg"
					class="-top-20 right-0 w-20"
					alt="HOT SALE 2024"
				/>
				<h3 class="max-w-72 text-center leading-relaxed text-[#00a8e0] md:text-left md:text-xl">
					Prueba tu suerte en este <span class="inline-block font-bold text-[#e72d3b]">
						HOT SALE</span
					>
					y obtén hasta
					<span class="font-bold text-[#e72d3b]">25%</span> de descuento en aparatos auditivos
				</h3>
			</div>
		{/if}
	</section>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
		width: 100vw;
	}

	ul {
		list-style: none;
		position: relative;
		transform-origin: center;
		width: var(--spinner-width);
		aspect-ratio: 1/1;
		display: grid;
		place-items: center;
		box-sizing: border-box;
		border-radius: 50%;
		border: 4px solid slategray;
	}

	.rotate {
		animation: rotate var(--spin-time) ease-in-out forwards;
	}
	.adjust {
		transform: rotate(calc(0turn - 33deg));
	}

	li {
		display: grid;
		place-items: center;
		position: absolute;
		aspect-ratio: 1/1;
		padding: 0.25em;
		box-sizing: border-box;
		border-radius: 50%;
		cursor: pointer;
		color: hsl(0, 0, 0);
	}

	@keyframes rotate {
		100% {
			transform: rotate(calc(6turn + 33deg));
		}
	}

	.wheel-center {
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		transition-property: none;
		transition-duration: 0s;
		transition-timing-function: none;
	}
	.winner {
		animation-name: blinkingBG;
		animation-duration: 1s;
		animation-iteration-count: 10;
		animation-timing-function: ease-in-out;
		border: 1px solid black;
	}

	.arrow-head {
		width: 0;
		height: 0;
		border-left: calc(var(--spinner-radius) / 15) solid transparent;
		border-right: calc(var(--spinner-radius) / 15) solid transparent;
		border-top: calc(var(--spinner-radius) / 7) solid #555;
		top: calc(var(--spinner-radius) / -10 + 0.25rem);
	}

	@keyframes blinkingBG {
		0% {
			background-color: red;
			transform: translate(-50%, -50%) scale(1.05);
		}
		25% {
			background-color: yellow;
			transform: translate(-50%, -50%) scale(0.95) rotate(5deg);
		}
		50% {
			background-color: green;
			transform: translate(-50%, -50%) scale(1.05);
		}
		75% {
			background-color: blue;
			transform: translate(-50%, -50%) scale(0.95) rotate(-5deg);
		}
		100% {
			background-color: violet;
			transform: translate(-50%, -50%) scale(1.05);
		}
	}
</style>
