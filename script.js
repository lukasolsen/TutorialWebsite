// Generating sidebar items
function makeSidebar() {
  const steps = document.querySelectorAll(".step");
  const sidebars = document.getElementById("sidebars");
  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    const title = step.querySelector("h1");
    var li = document.createElement("li");
    li.setAttribute("id", "sidebar-Stage");
    li.innerHTML = title.innerText;
    sidebars.appendChild(li);
  }
}

window.onload = () => {
  makeSidebar();

  // Get all the stages and store them in an array
  const stages = Array.from(document.querySelectorAll(".stages section"));
  const stagesSidebar = Array.from(document.querySelectorAll("#sidebar-Stage"));
  const finishedStages = new Array();

  // Keep track of the currently displayed stage
  let currentStageIndex = 0;

  // Set the minimum and maximum stages
  const minStageIndex = 0;
  const finishedIndex = 0;
  const maxStageIndex = stages.length;

  // Hide all the stages except the first one
  stages.forEach((stage, index) => {
    if (index !== currentStageIndex) {
      stage.style.display = "none";
    }
  });

  // Get the next and previous buttons
  const nextButton = document.getElementById("next");
  const previousButton = document.getElementById("previous");
  const finishedButton = document.getElementById("finish");

  // Add click event listeners to the buttons
  nextButton.addEventListener("click", showNextStage);
  previousButton.addEventListener("click", showPreviousStage);

  function showNextStage() {
    // Check if the current stage is the maximum stage
    if (currentStageIndex === maxStageIndex) {
      return;
    }
    previousButton.removeAttribute("disabled");

    stages[currentStageIndex].style.display = "none";
    if (finishedStages.includes(stagesSidebar[currentStageIndex])) {
      currentStageIndex++;
      stages[currentStageIndex].style.display = "block";
    } else {
      completeStage(currentStageIndex);
      finishedStages.push(stagesSidebar[currentStageIndex]);
      console.log(currentStageIndex + "/" + maxStageIndex);
      if (currentStageIndex + 1 === maxStageIndex) {
        nextButton.disabled = true;
        return;
      } else {
        currentStageIndex++;
        stages[currentStageIndex].style.display = "block";
        check();
      }
    }
  }

  function showPreviousStage() {
    // Check if the current stage is the minimum stage
    if (currentStageIndex === minStageIndex) {
      previousButton.disabled = true;
      return;
    }
    nextButton.removeAttribute("disabled");

    // Hide the current stage
    stages[currentStageIndex].style.display = "none";

    // Decrement the current stage index
    currentStageIndex--;

    // Show the new current stage
    stages[currentStageIndex].style.display = "block";
    check();
  }

  function check() {
    console.log(currentStageIndex);
    console.log(maxStageIndex);

    if (currentStageIndex == maxStageIndex) {
      nextButton.disabled = true;
      previousButton.removeAttribute("disabled");
    } else if (currentStageIndex == minStageIndex) {
      previousButton.disabled = true;
      nextButton.removeAttribute("disabled");
    }
  }

  function completeStage(currentIndex) {
    let stage = stagesSidebar[currentIndex];
    if (stage === null || stage === undefined) {
      console.log(stage);
      return;
    }

    if (currentIndex === maxStageIndex) {
      var icon = document.createElement("i");
      icon.classList.add("icon", "done", "fa-solid", "fa-check");
      lastStage = stagesSidebar[currentIndex + 1];
      lastStage.appendChild(icon);
    }
    var icon = document.createElement("i");
    icon.classList.add("icon", "done", "fa-solid", "fa-check");

    stage.appendChild(icon);
  }

  check();
};
