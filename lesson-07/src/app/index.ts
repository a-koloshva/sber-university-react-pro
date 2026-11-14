import { formatGreeting, formatStatus } from './utils.ts';

const app = document.querySelector<HTMLElement>('#app');

if (!app) {
    throw new Error('App container #app was not found.');
}

const heading = document.createElement('h1');
heading.textContent = formatGreeting('esbuild');

const status = document.createElement('p');
status.textContent = formatStatus('Ready');

const details = document.createElement('p');
const button = document.createElement('button');
button.type = 'button';
button.textContent = 'Load details';
button.addEventListener('click', async () => {
    const { getDetails } = await import('./details.ts');
    details.textContent = getDetails();
    button.disabled = true;
});

app.append(heading, status, button, details);
