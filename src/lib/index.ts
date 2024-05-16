let uid = 1;

export const options = [
	{ id: uid++, inPlay: true, icon: '5%', text: 'text' },
	{ id: uid++, inPlay: true, icon: '10%', text: 'text' },
	{ id: uid++, inPlay: true, icon: 'retry', text: 'text' },
	{ id: uid++, inPlay: true, icon: '15%', text: 'text' },
	{ id: uid++, inPlay: true, icon: '5%', text: 'text' },
	{ id: uid++, inPlay: true, icon: '20%', text: 'text' },
	{ id: uid++, inPlay: true, icon: 'retry', text: 'text' },
	{ id: uid++, inPlay: true, icon: '25%', text: 'text' }
];

export const completedCookieKey = 'wheel-may-2024-completed';

export const message =
	'Hola! He ganado un descuento del 25% en la compra de mis aparatos y una cita gratis, ¿me comparte los horarios para agendarla, por favor?';

export function padTimeNumber(num: number) {
	return num.toString().padStart(2, '0');
}
