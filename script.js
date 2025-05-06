const cardsWrapper = document.querySelector(".cards-wrapper");

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
}

fetchData();

