import aspectRatio from '@tailwindcss/aspect-ratio';
import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import daisyui from 'daisyui';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			backgroundImage: {
				'basic-gradient':
					'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(24,24,24,1) 55%, rgba(36,36,36,1) 100%)'
			}
		}
	},

	plugins: [typography, forms, containerQueries, aspectRatio, daisyui],

	daisyui: {
		themes: [
			{
				tccDarkMode: {
					primary: '#DA291C',
					'primary-content': '#FFFFFF',
					secondary: '#FF8C00',
					'secondary-content': '#000000',
					accent: '#FFD700',
					'accent-content': '#000000',
					neutral: '#333333',
					'neutral-content': '#FFFFFF',
					'base-100': '#000000',
					'base-200': '#181818',
					'base-300': '#1E1E1E',
					'base-content': '#FFFFFF',
					info: '#3A8EBA',
					'info-content': '#FFFFFF',
					success: '#4CAF50',
					'success-content': '#FFFFFF',
					warning: '#FFC107',
					'warning-content': '#000000',
					error: '#E57373',
					'error-content': '#000000'
				}
			}
		]
	}
};
