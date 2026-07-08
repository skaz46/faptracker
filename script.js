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

function updateWeekBar() {

    let cleanDays = JSON.parse(
        localStorage.getItem("cleanDays")
    ) || {};

    const today = new Date();

    let monday = new Date(today);

    let day = monday.getDay();

    let offset = (day === 0 ? -6 : 1 - day);

    monday.setDate(monday.getDate() + offset);

    for (let i = 0; i < 7; i++) {

        let current = new Date(monday);

        current.setDate(monday.getDate() + i);

        let dateString =
            current.toISOString().split("T")[0];

        let box =
            document.getElementById("day" + i);

        if (cleanDays[dateString]) {
            box.innerHTML = "🔥";
        } else {
            box.innerHTML = "";
        }
    }
}

document.getElementById("startBtn").addEventListener("click", () => {

    localStorage.setItem(
        "startDate",
        new Date().toISOString()
    );

    updateStreak();

    alert("Journey Started!");
});
/*
document.getElementById("resetBtn").addEventListener("click", () => {

    if (!confirm("Are you sure you want to reset your streak, King?")) {
        return;
    }

    localStorage.removeItem("startDate");

    updateStreak();

    alert("Streak Reset!");
});
*/


document.getElementById("relapseBtn").addEventListener("click", () => {

    if (!confirm("Are you sure you gooned today? This will reset your streak.")) {
        return;
    }

    localStorage.removeItem("startDate");

    updateStreak();

    alert("Streak reset.");
});

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js")
        .then(() => console.log("Service Worker Registered"));
}

updateStreak();
updateWeekBar();
