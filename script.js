const streakElement = document.getElementById("streak");
const startDateElement = document.getElementById("startDate");
const streakSinceElement =
    document.getElementById("streakSince");

function updateStreak() {

    const firstStartDate =
        localStorage.getItem("firstStartDate");

    if (!firstStartDate) {

        streakElement.innerText = "0 Days";

        startDateElement.innerText = "Not Set";

        streakSinceElement.innerText = "Not Set";

        return;
    }

    let goonedDays =
        JSON.parse(localStorage.getItem("goonedDays")) || {};

    let relapseDates =
        Object.keys(goonedDays).sort();

    let streakStartDate;

    if (relapseDates.length > 0) {

        streakStartDate =
            relapseDates[relapseDates.length - 1];

    } else {

        streakStartDate =
            firstStartDate.split("T")[0];
    }

    const today = new Date();

    const diffDays = Math.floor(
        (today - new Date(streakStartDate)) /
        (1000 * 60 * 60 * 24)
    );

    streakElement.innerText =
        diffDays + " Days";

    startDateElement.innerText =
        new Date(firstStartDate).toDateString();

    streakSinceElement.innerText =
        new Date(streakStartDate).toDateString();
}

function updateWeekBar() {

    const startDate = localStorage.getItem("startDate");

    let goonedDays =
        JSON.parse(localStorage.getItem("goonedDays")) || {};

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

        if (!box) continue;

        if (current > today) {

            box.innerHTML = "";

        } else if (goonedDays[dateString]) {

            box.innerHTML = "❌";

        } else if (
            startDate &&
            current >= new Date(startDate)
        ) {

            box.innerHTML = "🔥";

        } else {

            box.innerHTML = "";

        }
    }
}

document.getElementById("startBtn").addEventListener("click", () => {

    console.log("START BUTTON CLICKED");

    if (!localStorage.getItem("firstStartDate")) {

        localStorage.setItem(
            "firstStartDate",
            new Date().toISOString()
        );
    }

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

    const today = new Date().toISOString().split("T")[0];

    let goonedDays =
        JSON.parse(localStorage.getItem("goonedDays")) || {};

    goonedDays[today] = true;

    localStorage.setItem(
        "goonedDays",
        JSON.stringify(goonedDays)
    );

    //localStorage.removeItem("startDate");

    updateStreak();
    updateWeekBar();
    alert("Streak reset.");
});

updateStreak();
updateWeekBar();
