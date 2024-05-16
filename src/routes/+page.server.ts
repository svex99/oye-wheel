import { completedCookieKey } from '$lib';

export const load = async ({ cookies }) => {
	const completed = cookies.get(completedCookieKey);

	return {
		completed: completed === 'true'
	};
};
