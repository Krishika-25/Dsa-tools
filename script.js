let nums = [];
let target = 0;
let l = 0, r = 0;
let stepCount = 0;
let intervalId = null;

const container = document.getElementById("array");
const info = document.getElementById("info");

function displayArray() {
    container.innerHTML = "";
    for (let i = 0; i < nums.length; i++) {
        let elem = document.createElement("span");
        elem.innerText = nums[i];
        elem.classList.add("element");

        if (i === l && i === r) elem.classList.add("both");
        else if (i === l) elem.classList.add("left");
        else if (i === r) elem.classList.add("right");

        container.appendChild(elem);
    }

    info.innerText = `Step: ${stepCount} | Left: ${l} (${nums[l]}) | Right: ${r} (${nums[r]}) | Sum: ${nums[l] + nums[r]}`;
}

function nextStep() {
    if (l >= r) {
        clearInterval(intervalId);
        alert("Finished — no more steps!");
        return;
    }
    stepCount++;
    let sum = nums[l] + nums[r];

    if (sum === target) {
        clearInterval(intervalId);
        alert(`✅ Found! nums[${l}] + nums[${r}] = ${target}`);
    } else if (sum < target) l++;
    else r--;

    displayArray();
}

document.getElementById("startBtn").addEventListener("click", () => {
    const arrStr = document.getElementById("arrayInput").value;
    nums = arrStr.split(",").map(Number);
    target = Number(document.getElementById("targetInput").value);
    l = 0;
    r = nums.length - 1;
    stepCount = 0;
    displayArray();
    clearInterval(intervalId); 
});

document.getElementById("nextBtn").addEventListener("click", () => {
    clearInterval(intervalId); 
    nextStep();
});

document.getElementById("playBtn").addEventListener("click", () => {
    clearInterval(intervalId); 
    intervalId = setInterval(nextStep, 800); 
});