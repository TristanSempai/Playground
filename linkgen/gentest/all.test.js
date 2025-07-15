// import jest from 'jest';
// import { describe } from 'node:test';

// describe("randomGenerator", () => {
// let randomStringArray = []
//     beforeEach(() => {
//         for (let i = 0; i < 100; i++) {
//             randomStringArray.push()
//         }
//     })

//     it('generates unique string', () => {

//     });

//     it('generates a string that is exactly 32 characters long', () => {

//     })
// })

/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");
const { generateRandomLocalhostLink, savedLinks } = require("./index.test.js");

// Load the HTML file
const html = fs.readFileSync(
  path.resolve(__dirname, "index.test.html"),
  "utf8"
);

// Set up the DOM environment before each test
beforeEach(() => {
  document.documentElement.innerHTML = html.toString();
  require("./index.test.js"); // This loads your script and resets the savedLinks array
});

// Test the generateRandomLocalhostLink function
describe("generateRandomLocalhostLink", () => {
  test("generates a valid localhost URL", () => {
    const link = generateRandomLocalhostLink();
    expect(link).toMatch(/^http:\/\/localhost:3000\/[a-z0-9]{6}$/);
  });

  test("generates random strings each time", () => {
    const link1 = generateRandomLocalhostLink();
    const link2 = generateRandomLocalhostLink();
    expect(link1).not.toBe(link2);
  });
});

// Test the generate button functionality
describe("Generate Button", () => {
  test("clicking generate button creates 10 links", () => {
    const generateBtn = document.getElementById("generateBtn");
    generateBtn.click();

    const links = document.querySelectorAll("#linksContainer .link");
    expect(links.length).toBe(10);
  });

  test("generated links are added to savedLinks array", () => {
    const generateBtn = document.getElementById("generateBtn");
    generateBtn.click();

    expect(savedLinks.length).toBe(10);
    savedLinks.forEach((link) => {
      expect(link).toMatch(/^http:\/\/localhost:3000\/[a-z0-9]{6}$/);
    });
  });
});

// Test the show saved links functionality
describe("Show Saved Links Button", () => {
  test("clicking show saved with empty array shows message", () => {
    const showBtn = document.getElementById("showSavedBtn");
    showBtn.click();

    const message = document.querySelector("#savedLinksContainer .link");
    expect(message.textContent).toBe("No links saved yet");
  });

  test("clicking show saved with links displays them", () => {
    // First generate some links
    const generateBtn = document.getElementById("generateBtn");
    generateBtn.click();

    const showBtn = document.getElementById("showSavedBtn");
    showBtn.click();

    const savedLinksDisplayed = document.querySelectorAll(
      "#savedLinksContainer .link"
    );
    expect(savedLinksDisplayed.length).toBe(savedLinks.length);

    savedLinksDisplayed.forEach((linkElement, index) => {
      expect(linkElement.textContent).toBe(
        `${index + 1}. ${savedLinks[index]}`
      );
    });
  });
});

// Test the clear saved links functionality
describe("Clear Saved Links Button", () => {
  test("clicking clear saved empties the array and hides the section", () => {
    // First generate some links
    const generateBtn = document.getElementById("generateBtn");
    generateBtn.click();

    const clearBtn = document.getElementById("clearSavedBtn");
    clearBtn.click();

    expect(savedLinks.length).toBe(0);
    expect(document.getElementById("savedLinksContainer").innerHTML).toBe("");
    expect(document.getElementById("savedLinksHeader").style.display).toBe(
      "none"
    );
  });
});
