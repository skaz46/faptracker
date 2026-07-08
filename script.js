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

    const firstStartDate =
        localStorage.getItem("firstStartDate");

    const goonedDays =
        JSON.parse(localStorage.getItem("goonedDays")) || {};

    // Clear all boxes first
    for (let i = 0; i < 7; i++) {

        const box =
            document.getElementById("day" + i);

        if (box) {
            box.innerHTML = "";
        }
    }

    // If journey not started yet
    if (!firstStartDate) {
        return;
    }

    const startDay =
        firstStartDate.split("T")[0];

    const today = new Date();

    let monday = new Date(today);

    const dayOfWeek = monday.getDay();

    const offset =
        (dayOfWeek === 0) ? -6 : 1 - dayOfWeek;

    monday.setDate(monday.getDate() + offset);

    for (let i = 0; i < 7; i++) {

        const current = new Date(monday);

        current.setDate(monday.getDate() + i);

        const dateString =
            current.toISOString().split("T")[0];

        const box =
            document.getElementById("day" + i);

        if (!box) continue;

        // Future days stay blank
        if (dateString >
            today.toISOString().split("T")[0]) {

            box.innerHTML = "";
        }

        // Relapse overrides everything
        else if (goonedDays[dateString]) {

            box.innerHTML = "❌";
        }

        // Clean day
        else if (dateString >= startDay) {

            box.innerHTML = "🔥";
        }

        // Before journey started
        else {

            box.innerHTML = "";
        }
    }
}

document.getElementById("startBtn").addEventListener("click", () => {

    if (!localStorage.getItem("firstStartDate")) {

        localStorage.setItem(
            "firstStartDate",
            new Date().toISOString()
        );
    }

    updateStreak();
    updateWeekBar();

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
    console.log(goonedDays);
    
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
