const numberInput = document.querySelector(".number-input");
const buttons = document.getElementsByClassName("btn");
const container = document.querySelector("#container");
const imageContainer = document.querySelector("#image-container");
const toolbar = document.querySelector("#toolbar");

let count = numberInput.value;
const IMG_SRC = "https://source.unsplash.com/random/";
let img_width = "300";
let img_height = "300";

for (let i = 0; i < buttons.length - 1; i++) {
  buttons[i].addEventListener("click", handleButtonSelect);
}

toolbar.onsubmit = handleFilter;
createImages(count);

// Functions
function createImages(count) {
  handleContainerProps();
  clearPreviousImages();
  for (let i = 0; i < count; i++) {
    createImage();
  }
}

function createImage() {
  const wrapper = document.createElement("div");
  wrapper.style.maxWidth = `${img_width}px`;
  wrapper.style.height = `${img_height}px`;
  wrapper.className = "wrapper";
  imageContainer.appendChild(wrapper);

  const img = document.createElement("img");
  img.className = "image";
  img.style.width = `${img_width}px`;
  img.alt = "image";
  wrapper.appendChild(img);

  const qStr = `?random=${Math.random()}`;
  img.src = IMG_SRC + img_width + "x" + img_height + qStr;

  img.onload = () => {
    let multiplier = () => {
      if (Math.random() > 0.5) return 1;
      else return -1;
    };
    const X = multiplier() * Math.floor(Math.random() * (500 - 100 + 1) + 10);
    const Y = multiplier() * Math.floor(Math.random() * (500 - 100 + 1) + 10);

    const imgKeyframe = [
      {
        transform: `translate(${X}%,${Y}%)`,
        opacity: 0,
        scale: 0,
      },
      {
        transform: "translate(0,0)",
        opacity: 1,
        scale: 1,
      },
    ];

    const imgTiming = {
      duration: 1200,
      iterations: 1,
      fill: "forwards",
    };

    img.animate(imgKeyframe, imgTiming);
  };
}

function handleContainerProps() {
  const maxWidth = img_width * 3 + 20;
  container.style.maxWidth = `${maxWidth}px`;
}

function handleButtonSelect(e) {
  let btn = e.target;
  if (btn.classList.contains("selected")) return;
  let selected = document.querySelector(".selected");
  selected.classList.remove("selected");
  btn.classList.add("selected");
}

function handleFilter(e) {
  e.preventDefault();
  // buttons
  const selected = document.querySelector(".selected");
  const buttonText = selected.innerHTML;
  img_width = buttonText.split("x")[0];
  img_height = buttonText.split("x")[1];
  // count
  count = numberInput.value;
  createImages(count);
}

function clearPreviousImages() {
  document.querySelectorAll("img").forEach((img) => img.parentElement.remove());
}
