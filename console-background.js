// Left and Right Code Display
// This script creates a layout with source code on the left side and console output on the right side
// Features:
// - Typewriter effect for function code display (300ms delay between lines)
// - Docstring at the top of each function explaining what it does
// - Console output starts only after the function code is fully displayed
// - Error handling demonstration for the debugMeIfYouCan function

// Create the layout when the DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Wait for a short delay to ensure the page is fully loaded
    setTimeout(() => {
        // Create container for left side function code display
        const topContainer = document.createElement('div');
        topContainer.className = 'top-code-container';

        // Create code text element for function display
        const topCodeText = document.createElement('div');
        topCodeText.className = 'top-code-text';
        topContainer.appendChild(topCodeText);

        // Create container for right side console output
        const bottomContainer = document.createElement('div');
        bottomContainer.className = 'bottom-console-container';

        // Create console text element for output display
        const bottomConsoleText = document.createElement('div');
        bottomConsoleText.className = 'bottom-console-text';
        bottomContainer.appendChild(bottomConsoleText);

        // Create a wrapper div for mobile layout
        const mobileWrapper = document.createElement('div');
        mobileWrapper.className = 'mobile-code-wrapper';
        mobileWrapper.style.display = 'none'; // Hidden by default, shown in mobile view

        // Add containers to the appropriate parent
        if (window.innerWidth <= 768) {
            // Mobile layout: add to wrapper and append to body
            mobileWrapper.appendChild(topContainer);
            mobileWrapper.appendChild(bottomContainer);
            mobileWrapper.style.display = 'block';
            document.body.appendChild(mobileWrapper);
        } else {
            // Desktop layout: add directly to body
            document.body.appendChild(topContainer);
            document.body.appendChild(bottomContainer);
        }

        // Handle window resize
        window.addEventListener('resize', function () {
            if (window.innerWidth <= 768) {
                // Switch to mobile layout
                if (topContainer.parentNode === document.body) {
                    document.body.removeChild(topContainer);
                    document.body.removeChild(bottomContainer);
                    mobileWrapper.appendChild(topContainer);
                    mobileWrapper.appendChild(bottomContainer);
                    mobileWrapper.style.display = 'block';
                    if (!document.body.contains(mobileWrapper)) {
                        document.body.appendChild(mobileWrapper);
                    }
                }
            } else {
                // Switch to desktop layout
                if (topContainer.parentNode === mobileWrapper) {
                    mobileWrapper.removeChild(topContainer);
                    mobileWrapper.removeChild(bottomContainer);
                    mobileWrapper.style.display = 'none';
                    document.body.appendChild(topContainer);
                    document.body.appendChild(bottomContainer);
                }
            }
        });

        // Get a random function from funny.js
        const randomFunction = getRandomFunction();

        // Display the function code on the left with typewriter effect
        displayFunctionCode(topCodeText, randomFunction);

        // Display the function execution on the right
        // The execution will start only after the function code is fully displayed
        displayFunctionExecution(bottomConsoleText, randomFunction);

    }, 500); // 500ms delay to ensure page is loaded
});

// Function to get a random function from funny.js
function getRandomFunction() {
    // Define all functions with their code and execution output
    const functions = [
        {
            name: "simulateLongProcess",
            // Add a docstring for the function
            docstring: "// This function shows a progress bar that takes forever to complete, just like real loading screens",
            // Break the code into lines for better readability
            code: [
                "function simulateLongProcess() {",
                "    let progress = 0;",
                "    const progressBar = \"[----------]\";",
                "    let timer = setInterval(() => {",
                "        if (progress < 10) {",
                "            process.stdout.write(`\\rProcessing: ${progressBar.substring(0, progress)}█${progressBar.substring(progress + 1)}  ${progress * 10}%`); // Classic progress bar",
                "            progress++;",
                "        } else {",
                "            clearInterval(timer);",
                "            console.log(\"\\nDone... eventually. Go grab coffee.\"); // Relatable to the \"almost done\" phase",
                "        }",
                "    }, 500); // Slower than a real progress bar for comedic timing",
                "}",
                "",
                "simulateLongProcess(); // Run it and watch the... anticipation"
            ],
            // Break the execution into lines for better readability
            execution: [
                "Starting a long process...",
                "Processing: [█---------]  10%",
                "Processing: [██--------]  20%",
                "Processing: [███-------]  30%",
                "Processing: [████------]  40%",
                "Processing: [█████-----]  50%",
                "Processing: [██████----]  60%",
                "Processing: [███████---]  70%",
                "Processing: [████████--]  80%",
                "Processing: [█████████-]  90%",
                "Processing: [██████████] 100%",
                "Done... eventually. Go grab coffee."
            ]
        },
        {
            name: "solveAllYourProblems",
            // Add a docstring for the function
            docstring: "// The ultimate IT support function that provides all the classic unhelpful advice",
            code: [
                "function solveAllYourProblems() {",
                "    console.log(\"Have you tried turning it off and on again?\"); // Classic IT support",
                "    console.log(\"Also, check if it's plugged in.\");       // Even more basic IT support",
                "    console.log(\"Maybe Google it?\");                       // The go-to developer solution",
                "    return \"Probably something simple you're overlooking.\";  // A little condescending, a little true",
                "}",
                "",
                "console.log(solveAllYourProblems()); // Run it for instant problem-solving advice (not)"
            ],
            execution: [
                "Have you tried turning it off and on again?",
                "Also, check if it's plugged in.",
                "Maybe Google it?",
                "Probably something simple you're overlooking."
            ]
        },
        {
            name: "isThisReallyTrue",
            // Add a docstring for the function
            docstring: "// A function that demonstrates JavaScript's weird type coercion and truthiness rules",
            code: [
                "function isThisReallyTrue(value) {",
                "    if (value == true) { // Intentional == for \"funny\" type coercion humor",
                "        console.log(\"Well, according to JavaScript, maybe?\"); // Undermining JavaScript's truthiness",
                "        return true;",
                "    } else {",
                "        console.log(\"Technically, no, but JavaScript might think so later...\"); // Hinting at JS quirks",
                "        return false; // Even if JS *might* coerce it later",
                "    }",
                "}",
                "",
                "console.log(isThisReallyTrue(1));    // True (in JS-land...sort of)",
                "console.log(isThisReallyTrue(\"true\")); // True-ish (again, JS-land...)",
                "console.log(isThisReallyTrue(0));    // False (obviously, but we had to check)",
                "console.log(isThisReallyTrue(\"false\")); // False (in this function's wacky logic)"
            ],
            execution: [
                "Well, according to JavaScript, maybe?",
                "true",
                "Well, according to JavaScript, maybe?",
                "true",
                "Technically, no, but JavaScript might think so later...",
                "false",
                "Technically, no, but JavaScript might think so later...",
                "false"
            ]
        },
        {
            name: "debugMeIfYouCan",
            // Add a docstring for the function
            docstring: "// A very angry function that throws a tantrum if you don't give it a number",
            code: [
                "function debugMeIfYouCan(input) {",
                "    if (typeof input !== 'number') {",
                "        throw new Error(\"😡  EXPECTED A NUMBER! I'M DONE! 💥💥💥 (Type Error, probably. I'm too angry to be precise.)\");",
                "    }",
                "    // ... some actual, less angry code would go here if you hadn't made me MAD",
                "    return input + 42; // Happy path... if you can even reach it!",
                "}",
                "",
                "try {",
                "    debugMeIfYouCan(\"oops\"); // First try with a string to see the tantrum",
                "} catch (error) {",
                "    console.error(error.message); // Log the error message",
                "}",
                "",
                "// Now try with a number",
                "console.log(debugMeIfYouCan(10)); // Runs smoothly when you behave!"
            ],
            execution: [
                "Error: 😡  EXPECTED A NUMBER! I'M DONE! 💥💥💥 (Type Error, probably. I'm too angry to be precise.)",
                "",
                "52"
            ]
        }
    ];

    // Return a random function
    return functions[Math.floor(Math.random() * functions.length)];
}

// Function to display function code with syntax highlighting, docstring, and typewriter effect
function displayFunctionCode(element, functionObj) {
    // Clear the element
    element.innerHTML = '';

    // Add the informal docstring at the top in green text
    const docstringElement = document.createElement('div');
    docstringElement.innerHTML = `<span class="code-comment">${functionObj.docstring}</span>`;
    element.appendChild(docstringElement);

    // Add each line with syntax highlighting and a typewriter effect delay
    let delay = 300; // Start after the docstring is displayed (300ms)
    functionObj.code.forEach((line, index) => {
        setTimeout(() => {
            const lineElement = document.createElement('div');

            // Apply syntax highlighting
            const highlightedLine = line
                .replace(/\b(function|let|const|if|else|return|typeof)\b/g, '<span class="code-keyword">$1</span>')
                .replace(/\b(simulateLongProcess|solveAllYourProblems|isThisReallyTrue|debugMeIfYouCan|console\.log|setInterval|clearInterval|setTimeout|process\.stdout\.write)\b/g, '<span class="code-function">$1</span>')
                .replace(/(["'`].*?["'`])/g, '<span class="code-string">$1</span>')
                .replace(/\/\/ .*$/g, '<span class="code-comment">$&</span>');

            // Add the highlighted line to the element
            lineElement.innerHTML = highlightedLine;
            element.appendChild(lineElement);

            // Only resize the container's height, not width (to prevent horizontal expansion)
            const container = element.parentElement;
            if (container) {
                container.style.height = 'auto';
            }
        }, delay);

        delay += 300; // 300ms delay between lines for slower typing effect
    });

    // Return the total delay so we know when the function display is complete
    return delay;
}

// Function to display function execution
function displayFunctionExecution(element, functionObj) {
    // Clear the element
    element.innerHTML = '';

    // Calculate the total delay for the function code display
    // This ensures the console output starts only after the function code is fully displayed
    // Add 300ms for the docstring plus 300ms for each line of code
    const functionDisplayDelay = 300 + (functionObj.code.length * 300);

    // Add each line with a delay, starting after the function is fully displayed
    let delay = functionDisplayDelay;
    functionObj.execution.forEach((line, index) => {
        setTimeout(() => {
            const lineElement = document.createElement('div');
            lineElement.textContent = line; // Use textContent for plain text
            element.appendChild(lineElement);
        }, delay);

        delay += 1000; // 1 second delay between lines
    });

    // Restart after all lines are displayed
    setTimeout(() => {
        // Get a new random function
        const newRandomFunction = getRandomFunction();

        // Update the top code
        const topCodeText = document.querySelector('.top-code-text');
        if (topCodeText) {
            displayFunctionCode(topCodeText, newRandomFunction);
        }

        // Update the bottom console
        displayFunctionExecution(element, newRandomFunction);
    }, delay + 5000); // 5 seconds after the last line
}
