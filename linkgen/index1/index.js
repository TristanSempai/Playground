//when i click btn make link that go`s to index 2 
document.getElementById('genbtn').addEventListener('click', function() {

    const randomPath = Math.random().toString(36).substring(2, 15);

    const randomLink = `http://localhost:3000/${randomPath}`;
    
    //display the link below btn
    const linkElement = document.getElementById('link');
    linkElement.textContent = randomLink;
})