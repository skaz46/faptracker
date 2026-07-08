const streakElement = document.getElementById("streak");
const startDateElement = document.getElementById("startDate");

function updateStreak() {

    const startDate = localStorage.getItem("startDate");

    console.log("Stored date:", startDate);

    if (!startDate) {
        streakElement.innerText = "0 Days";
        startDateElement.innerText = "Not Set";
        return;
    }

    const start = new Date(startDate);
    const today = new Date();

    const diffTime = today - start;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    streakElement.innerText = diffDays + " Days";
    startDateElement.innerText = start.toDateString();
}

document.getElementById("startBtn").addEventListener("click", () => {

    localStorage.setItem(
        "startDate",
        new Date().toISOString()
    );

    updateStreak();

    alert("Journey Started!");
});

document.getElementById("resetBtn").addEventListener("click", () => {

    if (!confirm("Are you sure you want to reset your streak, King?")) {
        return;
    }

    localStorage.removeItem("startDate");

    updateStreak();

    alert("Streak Reset!");
});

updateStreak();

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js")
        .then(() => console.log("Service Worker Registered"));
}
