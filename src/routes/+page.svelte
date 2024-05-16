<script lang="ts">
	import { tick } from 'svelte';
	import { scale, slide, fly, fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { options } from '$lib';

	// spinner and button
	let rotate = false;
	let final = false;
	let completed = false;
	let adjust = false;

	// new addition
	let n = options.length;

	function spinWheel() {
		rotate = true;
		setTimeout(() => {
			adjust = true;
		}, 500);
		setTimeout(() => {
			final = true;
		}, 4000);
		setTimeout(() => {
			final = false;
			completed = true;
		}, 5000);
	}
</script>

<main>
	<!--Spinner-->
	<section class="grid justify-items-center relative mt-10">
		<ul
			class:rotate
			class="background-{n} text-slate-700"
			in:scale|global={{ start: 1.1, opacity: 1 }}
		>
			<!--Options-->
			{#each options.filter((t) => t.inPlay) as option, i (option.id)}
				<li class="text-3xl font-bold position-{i + 1}-{n}" animate:flip>
					<span title={option.text} class:adjust class="px-5">{option.icon}</span>
				</li>
			{/each}
		</ul>
		<!--Center of wheel-->
		{#if !rotate}
			<button
				class="btn-primary spinner-button absolute wheel-center"
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
				class="absolute wheel-center winner p-2 bg-yellow-200 dark:bg-yellow-400"
				class:text-6xl={n < 5}
				class:text-5xl={n >= 5 && n < 8}
				class:text-4xl={n >= 8}
				transition:scale|global
			>
				25%
			</div>
		{/if}
		<div class="absolute arrow-head" />
	</section>
	<!--Result-->
	<section class="grid m-4">
		{#if completed}
			<!--Result-->
			<div class="flex justify-center" in:slide|global={{ delay: 400 }} out:slide|global>
				<div
					class="border border-black leading-loose flex gap-y-5 flex-col py-5 px-20 rounded-xl bg-yellow-200 dark:bg-yellow-400 font-bold font-serif text-black"
				>
					<h3 class="text-2xl">¡Felicidades, has ganado!</h3>

					<div class="flex flex-col">
						<div class="text-6xl" in:fade|global={{ delay: 400 }} out:slide|global>25%</div>
						<div in:fly|global={{ delay: 800, x: -50 }} out:slide|global class="text-md">
							de descuento con nosotros
						</div>
					</div>

					<div class="font-sans">
						<a href="https://wa.me/+523333915701" target="_blank" class="btn btn-primary"
							>Reclamar Descuento</a
						>
					</div>
				</div>
			</div>
		{:else}
			<div>
				<h3>Prueba suerte y obtén un descuento en este HOT SALE.</h3>
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
		border: 4px solid saddlebrown;
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
		animation-duration: 0.3s;
		animation-iteration-count: 5;
		animation-timing-function: ease-in-out;
		border: 1px solid black;
	}

	.arrow-head {
		width: 0;
		height: 0;
		border-left: calc(var(--spinner-radius) / 20) solid transparent;
		border-right: calc(var(--spinner-radius) / 20) solid transparent;
		border-top: calc(var(--spinner-radius) / 10) solid #555;
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
