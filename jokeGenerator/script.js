const studentJokes = [
    "Why did the student bring a ladder to school? Because they were going to high school!",
    "Student: I lost my pen. Teacher: That's a bad sign. Student: No sir, it's a pen.",
    "Why did the student eat his homework? Because the teacher said it was a piece of cake!",
    "Every student has a motto: If you can't convince the teacher, confuse the teacher."
    ];

async function fetchFromJokeAPI(category) {
    const cat = (category === "Any" ? "Any" : category);
    const url = `https://sv443.net/jokeapi/v2/joke/${cat}?blacklistFlags=nsfw,racist,sexist`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        if (data.type === "single") {
            return data.joke;
        } else if (data.type === "twopart") {
            return data.setup + " — " + data.delivery;
        } else {
            return "Oops! No joke found.";
        }
    } catch (err) {
        console.error("Error fetching joke:", err);
        return "Oops! Something went wrong 😢";
    }
}
async function generateJoke() {
    const sel = document.getElementById("category").value;
    const display = document.getElementById("joke");

    if (sel === "Student") {
        const rnd = Math.floor(Math.random() * studentJokes.length);
        display.textContent = studentJokes[rnd];
    } else {
        display.textContent = "Loading joke...";
        const joke = await fetchFromJokeAPI(sel);
        display.textContent = joke;
    }
}

document.getElementById("getJokeBtn").addEventListener("click", generateJoke);