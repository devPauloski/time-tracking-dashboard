const cardsWrapper = document.querySelector(".cards-wrapper");
const timeFrameControls = document.querySelectorAll(".timeframe-controls button")

const appendCard = (item) => {
  const card = document.createElement("section");
  const cardClassName = `${item.title.toLowerCase().replace(' ', '-')}`;
  card.classList.add("card", cardClassName) ;
  card.innerHTML = `
    <div class="card-info">
      <div class="activity-name">
        <h2>${item.title}</h2>
        <button class="more-info-btn" aria-label="More info">
          <img src="./images/icon-ellipsis.svg" alt="">
        </button>
      </div>
      <div class="activity-time">
        <P class="current-time">${item.timeframes.weekly.current}hrs</P>
        <p class="previous-time">Last Week - ${item.timeframes.weekly.previous}hrs</p>
      </div>
    </div>
  `;

  cardsWrapper.appendChild(card);
};

const populate = (data) => {
  data.forEach((item) => {
    appendCard(item);
  });
}

async function fetchData() {
  const response = await fetch("./data.json");
  const data = await response.json();
  populate(data); 
  
  // Timeframe controls
  timeFrameControls.forEach((button) => {
    button.addEventListener('click', (event) => {
      const currentTimeFrames = document.querySelectorAll(".current-time");
      const previousTimeFrames = document.querySelectorAll(".previous-time");

      data.forEach((item, index) => {
        if (button.dataset.control === "daily") {
          currentTimeFrames[index].textContent = `${item.timeframes.daily.current}hrs`;
          previousTimeFrames[index].textContent = `Last Week - ${item.timeframes.daily.previous}hrs`;
        } else if (button.dataset.control === "weekly") {
          currentTimeFrames[index].textContent = `${item.timeframes.weekly.current}hrs`;
          previousTimeFrames[index].textContent = `Last Week - ${item.timeframes.weekly.previous}hrs`;
        } else {
          currentTimeFrames[index].textContent = `${item.timeframes.monthly.current}hrs`;
          previousTimeFrames[index].textContent = `Last Week - ${item.timeframes.monthly.previous}hrs`;
        }
      });

      timeFrameControls.forEach((button) => button.classList.remove("active"));
      event.target.classList.add("active");
    });
  });
}

fetchData();

