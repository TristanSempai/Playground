//1 run the gen function 100x
//2 each gened string gets added to an array
//3 each string must be unique
//4 each string must be 32 char long
//5 array length must be 100
// Array to store all generated links
const savedLinks = [];

// Generate 10 random links when button is clicked
document.getElementById('generateBtn').addEventListener('click', function() {
    const linksContainer = document.getElementById('linksContainer');
    linksContainer.innerHTML = '<h2>Generated Links</h2>';
    
    for (let i = 0; i < 10; i++) {
        const link = generateRandomLocalhostLink();
        
        // Log to console
        console.log(link);
        
        // Add to savedLinks array
        savedLinks.push(link);
        
        // Display in HTML
        const linkElement = document.createElement('div');
        linkElement.className = 'link';
        linkElement.textContent = link;
        linksContainer.appendChild(linkElement);
    }
});

// Show all saved links
document.getElementById('showSavedBtn').addEventListener('click', function() {
    const container = document.getElementById('savedLinksContainer');
    const header = document.getElementById('savedLinksHeader');
    
    container.innerHTML = '';
    header.style.display = 'block';
    
    if (savedLinks.length === 0) {
        container.innerHTML = '<div class="link">No links saved yet</div>';
        return;
    }
    
    savedLinks.forEach((link, index) => {
        const linkElement = document.createElement('div');
        linkElement.className = 'link';
        linkElement.textContent = `${index + 1}. ${link}`;
        container.appendChild(linkElement);
    });
});

// Clear all saved links
document.getElementById('clearSavedBtn').addEventListener('click', function() {
    savedLinks.length = 0;
    document.getElementById('savedLinksContainer').innerHTML = '';
    document.getElementById('savedLinksHeader').style.display = 'none';
    alert('All saved links have been cleared!');
});

/**
 * Generates a random link to localhost:3000
 * @returns {string} Randomly generated localhost URL
 */
function generateRandomLocalhostLink() {
    const baseUrl = 'http://localhost:3000';
    const randomString = Math.random().toString(36).substring(2, 8);
        return `${baseUrl}/${randomString}`;
  }

      module.exports = {
        generateRandomLocalhostLink,
        savedLinks
    };
