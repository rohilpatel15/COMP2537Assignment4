const startGame = () => {
  const $difficulty = $("#difficulty").val();
  hideElements();

  if ($difficulty === "easy") {
    $("#start_button").off("click");
    level1();
    showElements();
    hideStartElements();
  }

  if ($difficulty == "medium") {
    $("#start_button").off("click");
    level2();
    showElements2();
    hideStartElements();
  }

  if ($difficulty == "hard"){
    $("#start_button").off("click");
    level3()
    showElements3();
    hideStartElements();
  }

  $("#start_button").on("click", startGame);
};

const resetGame = () => {
  clearInterval(timerId);
  clearInterval(powerUpInterval);

  $(".card1").off("click");
  $(".card1").removeClass("flip");
  $("#clicks").text(0);
  $("#pairs-left").text(3);
  $("#pairs-matched").text(0);
  $("#timer").text(100);

  $(".card2").off("click");
  $(".card2").removeClass("flip");
  $("#clicks-2").text(0);
  $("#pairs-left2").text(6);
  $("#pairs-matched2").text(0);
  $("#timer2").text(200);

  $(".card3").off("click");
  $(".card3").removeClass("flip");
  $("#clicks-3").text(0);
  $("#pairs-left3").text(12);
  $("#pairs-matched3").text(0);
  $("#timer3").text(300);

  hideElements();
  $("#start_screen").show();
};

const startTimer = () => {
  const $timer = $("#timer");

  timerId = setInterval(() => {
    let timeLeft = parseInt($timer.text());

    if (timeLeft > 0) {
      timeLeft--;
      $timer.text(timeLeft);
    } else {
      clearInterval(timerId);
      alert("You lose! Try Again!");
    }

  }, 1000);
};

const startTimer2 = () => {
  const $timer = $("#timer2");

  timerId = setInterval(() => {
    let timeLeft = parseInt($timer.text());

    if (timeLeft > 0) {
      timeLeft--;
      $timer.text(timeLeft);
    } else {
      clearInterval(timerId);
      alert("You lose! Try Again!");
    }

  }, 1000);
};

const startTimer3 = () => {
  const $timer = $("#timer3");

  timerId = setInterval(() => {
    let timeLeft = parseInt($timer.text());

    if (timeLeft > 0) {
      timeLeft--;
      $timer.text(timeLeft);
    } else {
      clearInterval(timerId);
      alert("You lose! Try Again!");
    }

  }, 1000);
};

let powerUpInterval;

function activatePowerUp() {
  alert("Power Up Activated!");

  const $cardsToFlip = $(".card2").not(".flip");
  $cardsToFlip.addClass("flip");

  setTimeout(() => {
    $cardsToFlip.removeClass("flip");
  }, 2000);
}

function activatePowerUp2() {
  alert("Power Up Activated!");

  const $cardsToFlip = $(".card3").not(".flip");
  $cardsToFlip.addClass("flip");

  setTimeout(() => {
    $cardsToFlip.removeClass("flip");
  }, 2000);
}

function startPowerUpInterval() {
  powerUpInterval = setInterval(() => {
    if (Math.random() < 0.2) {
      activatePowerUp();
    }
  }, 5000);
}

function startPowerUpInterval2() {
  powerUpInterval = setInterval(() => {
    if (Math.random() < 0.2) {
      activatePowerUp2();
    }
  }, 5000);
}

const hideElements = () => {
  $("#header1, #easy-grid").hide();
  $("#header2, #medium-grid").hide();
  $("#header3, #hard-grid").hide();

  $("#darkmode1").hide();
  $("#darkmode2").hide();
  $("#darkmode3").hide();
};

const showElements = () => {
  $("#header1, #easy-grid").show();
  $("#darkmode1").show();
};

const showElements2 = () => {
  $("#header2, #medium-grid").show();
  $("#darkmode2").show();
};

const showElements3 = () => {
  $("#header3, #hard-grid").show();
  $("#darkmode3").show();
};

const hideStartElements = () => {
  $("#start_screen").hide();
};

const level1 = () => {
  $("#reset_button").on("click", resetGame);
  let firstCard = undefined;
  let secondCard = undefined;
  let isFlipping = false;
  let matches = 0;
  let clicks = 0;
  const totalMatches = 3;
  const $clicks = $("#clicks");
  const $pairsLeft = $("#pairs-left");
  const $pairsMatched = $("#pairs-matched");
  const $totalPairs = $("#total-pairs");

  $pairsLeft.text(totalMatches);
  $totalPairs.text(totalMatches);

  startTimer();

  $.ajax({
    url: "https://pokeapi.co/api/v2/pokemon?limit=151",
    success: (response) => {
      const pokemon = response.results;
      const cardImgs = [];

      const randomPokemon = [];
      while (randomPokemon.length < totalMatches) {
        const index = Math.floor(Math.random() * pokemon.length);
        const poke = pokemon[index];
        if (!randomPokemon.includes(poke)) {
          randomPokemon.push(poke);
        }
      }

      for (let i = 0; i < randomPokemon.length; i++) {
        const name = randomPokemon[i].name;
        const id = randomPokemon[i].url.split("/")[6];
        const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

        cardImgs.push(imgUrl);
        cardImgs.push(imgUrl);
      }

      shuffle(cardImgs);

      $(".front-1").each(function (i) {
        $(this).attr("src", cardImgs[i]);
      });
    },
    error: (xhr, status, error) => {
      console.log(error);
    },
  });

  $(".card1").on("click", function () {
    if ($(this).hasClass("flip") || isFlipping) {
      return;
    }

    $(this).toggleClass("flip");

    if (!firstCard) {
      firstCard = $(this);

    } else {
      isFlipping = true;
      secondCard = $(this);

      if (
        firstCard.find(".front-1")[0].src ==
        secondCard.find(".front-1")[0].src
      ) {
        console.log("match");
        firstCard.off("click");
        secondCard.off("click");
        firstCard = undefined;
        secondCard = undefined;
        isFlipping = false;
        matches++;
        clicks = clicks + 2;
        $clicks.text(clicks);
        $pairsLeft.text(totalMatches - matches);
        $pairsMatched.text(matches);

        if (matches === totalMatches) {
          clearInterval(timerId);
          setTimeout(() => {
            alert("Congratulations! You win!");
          }, 1000);
        }

      } else {
        console.log("no match");
        clicks = clicks + 2;
        $clicks.text(clicks);
        setTimeout(() => {
          firstCard.toggleClass("flip");
          secondCard.toggleClass("flip");
          firstCard = undefined;
          secondCard = undefined;
          isFlipping = false;
        }, 1000);
      }
    }
  });
};

const level2 = () => {
  $("#reset_button").on("click", resetGame);
  let firstCard = undefined;
  let secondCard = undefined;
  let isFlipping = false;
  let matches = 0;
  let clicks = 0;
  const totalMatches = 6;
  const $clicks = $("#clicks-2");
  const $pairsLeft = $("#pairs-left2");
  const $pairsMatched = $("#pairs-matched2");
  const $totalPairs = $("#total-pairs2");

  $pairsLeft.text(totalMatches);
  $totalPairs.text(totalMatches);

  startTimer2();
  startPowerUpInterval();

  $.ajax({
    url: "https://pokeapi.co/api/v2/pokemon?limit=151",
    success: (response) => {
      const pokemon = response.results;
      const cardImgs = [];

      const randomPokemon = [];
      while (randomPokemon.length < totalMatches) {
        const index = Math.floor(Math.random() * pokemon.length);
        const poke = pokemon[index];
        if (!randomPokemon.includes(poke)) {
          randomPokemon.push(poke);
        }
      }
      console.log(randomPokemon);

      for (let i = 0; i < randomPokemon.length; i++) {
        const name = randomPokemon[i].name;
        const id = randomPokemon[i].url.split("/")[6];
        const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

        cardImgs.push(imgUrl);
        cardImgs.push(imgUrl);
      }

      shuffle(cardImgs);
      console.log(cardImgs);

      $(".front-2").each(function (i) {
        $(this).attr("src", cardImgs[i]);
        console.log("i: " + i);
      });
    },

    error: (xhr, status, error) => {
      console.log(error);
    },
  });

  $(".card2").on("click", function () {
    if ($(this).hasClass("flip") || isFlipping) {
      return;
    }

    $(this).toggleClass("flip");

    if (!firstCard) {

      firstCard = $(this);
    } else {
      isFlipping = true;
      secondCard = $(this);

      if (
        firstCard.find(".front-2")[0].src ==
        secondCard.find(".front-2")[0].src
      ) {
        console.log("match");
        firstCard.off("click");
        secondCard.off("click");
        firstCard.addClass("match");
        secondCard.addClass("match")
        firstCard = undefined;
        secondCard = undefined;
        isFlipping = false;
        matches++;
        clicks = clicks + 2;
        $clicks.text(clicks);
        $pairsLeft.text(totalMatches - matches);
        $pairsMatched.text(matches);

        if (matches === totalMatches) {
          clearInterval(timerId);
          setTimeout(() => {
            alert("Congratulations! You win!");
          }, 1000);
        }

      } else {
        console.log("no match");
        clicks = clicks + 2;
        $clicks.text(clicks);
        setTimeout(() => {
          firstCard.toggleClass("flip");
          secondCard.toggleClass("flip");
          firstCard = undefined;
          secondCard = undefined;
          isFlipping = false;
        }, 1000);
      }
    }
  });

};

const level3 = () => {
  $("#reset_button").on("click", resetGame);
  let firstCard = undefined;
  let secondCard = undefined;
  let isFlipping = false;
  let matches = 0;
  let clicks = 0;
  const totalMatches = 12;
  const $clicks = $("#clicks-3");
  const $pairsLeft = $("#pairs-left3");
  const $pairsMatched = $("#pairs-matched3");
  const $totalPairs = $("#total-pairs3");

  $pairsLeft.text(totalMatches);
  $totalPairs.text(totalMatches);

  startTimer3();
  startPowerUpInterval2();

  $.ajax({
    url: "https://pokeapi.co/api/v2/pokemon?limit=151",
    success: (response) => {
      const pokemon = response.results;
      const cardImgs = [];

      const randomPokemon = [];
      while (randomPokemon.length < totalMatches) {
        const index = Math.floor(Math.random() * pokemon.length);
        const poke = pokemon[index];
        if (!randomPokemon.includes(poke)) {
          randomPokemon.push(poke);
        }
      }
      console.log(randomPokemon);

      for (let i = 0; i < randomPokemon.length; i++) {
        const name = randomPokemon[i].name;
        const id = randomPokemon[i].url.split("/")[6];
        const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

        cardImgs.push(imgUrl);
        cardImgs.push(imgUrl);
      }

      shuffle(cardImgs);
      console.log(cardImgs);

      $(".front-3").each(function (i) {
        $(this).attr("src", cardImgs[i]);
        console.log("i: " + i);
      });
    },
    
    error: (xhr, status, error) => {
      console.log(error);
    },
  });

  $(".card3").on("click", function () {
    if ($(this).hasClass("flip") || isFlipping) {
      return;
    }

    $(this).toggleClass("flip");

    if (!firstCard) {
      firstCard = $(this);

    } else {
      isFlipping = true;
      secondCard = $(this);

      if (
        firstCard.find(".front-3")[0].src ==
        secondCard.find(".front-3")[0].src
      ) {
        console.log("match");
        firstCard.off("click");
        secondCard.off("click");
        firstCard.addClass("match");
        secondCard.addClass("match")
        firstCard = undefined;
        secondCard = undefined;
        isFlipping = false;
        matches++;
        clicks = clicks + 2;
        $clicks.text(clicks);
        $pairsLeft.text(totalMatches - matches);
        $pairsMatched.text(matches);

        if (matches === totalMatches) {
          clearInterval(timerId);
          setTimeout(() => {
            alert("Congratulations! You win!");
          }, 1000);
        }

      } else {
        console.log("no match");
        clicks = clicks + 2;
        $clicks.text(clicks);
        setTimeout(() => {
          firstCard.toggleClass("flip");
          secondCard.toggleClass("flip");
          firstCard = undefined;
          secondCard = undefined;
          isFlipping = false;
        }, 1000);
      }
    }
  });
};

let dark = false;
let timerId;

function dark1() {
  const bodyElement = document.getElementById("easy-grid");
  dark = !dark;
  bodyElement.style.backgroundColor = dark ? "#000000" : "#FFFFFF";
}

function dark2() {
  const bodyElement = document.getElementById("medium-grid");
  dark = !dark;
  bodyElement.style.backgroundColor = dark ? "#000000" : "#FFFFFF";
}

function dark3() {
  const bodyElement = document.getElementById("hard-grid");
  dark = !dark;
  bodyElement.style.backgroundColor = dark ? "#000000" : "#FFFFFF";
}

$(document).ready(startGame);

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};