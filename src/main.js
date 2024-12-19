import { createElement } from 'lwc';
import Navigo from 'navigo';
//import App from 'x/app';
import landingPage from 'x/landingPage';

// Import other components for additional routes as needed
// import aboutPage from 'x/aboutPage';

const router = new Navigo('/', { hash: true }); // Initialize router with hash-based navigation

// Create a container in the body for routed components
const container = document.createElement('div');
container.id = 'main'; // Assign an ID for easier reference
document.body.appendChild(container);

// Function to render components dynamically
function renderComponent(component) {
    // Clear previous content
    container.innerHTML = '';

    // Create and append the new component
    const element = createElement('x-' + component.name.toLowerCase(), { is: component });
    container.appendChild(element);
}

// Define routes
router
    .on('/', () => renderComponent(landingPage)) // Default route
    /* Uncomment and define additional routes
    .on('/about', () => renderComponent(aboutPage))
    */
    .notFound(() => renderComponent(landingPage)) // Fallback route
    .resolve(); // Resolve the current route




//const elm = createElement('x-app', { is: App });
//document.body.appendChild(elm);
