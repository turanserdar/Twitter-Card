//console.log('Connection check')

const placeholder = document.querySelector(".placeholder");
//console.log(placeholder)
const editableInput = document.querySelector(".editable");
//console.log(editableInput)
const tweetButton = document.querySelector(".button");
//console.log(tweetButton)
const counter = document.getElementById("counter");
//console.log(counter)
const readonly = document.querySelector(".readonly");
//console.log(readonly)

// Listening for click events
editableInput.addEventListener("click", () => {
  // Changes the color of the placeholder (span)
  placeholder.style.color = "#98a5b1";
});

// Removes focus when clicking outside the input
editableInput.onblur = () => {
  placeholder.style.color = "#333";
};

// Listens for keypress events
editableInput.onkeypress = (e) => {
  placeholder.style.display = "none";
  //console.log(e)
  inputValidate(e.target.innerText);
};

// Listens for keyup events
editableInput.onkeyup = (e) => {
  placeholder.style.display = "none";
  inputValidate(e.target.innerText);
};

// Character validation for the entered tweet
const inputValidate = (tweet) => {
  //console.log(tweet)
  // Gets the length of the input text
  const tweetLength = tweet.length;

  const tweetLimit = 5;

  // Remaining character limit
  const currentLimit = tweetLimit - tweetLength;
  //console.log(tweetLength)
  //console.log(counter);

  // Is there any character?
  if (tweetLength <= 0) {
    // NO CHARACTERS
    // Displays the placeholder
    placeholder.style.display = "block";
    // Disables the tweet button
    tweetButton.classList.remove("active");
    // Hides the counter
    counter.style.display = "none";
  } else {
    // CHARACTERS ARE PRESENT

    // Enables the tweet button
    tweetButton.classList.add("active");
    // Shows the counter
    counter.style.display = "block";

    // Updates the counter with the remaining limit
    counter.innerText = currentLimit;
  }
  let newTweet;

  // HAS CHARACTER LIMIT BEEN EXCEEDED?
  if (tweetLength > tweetLimit) {
    // IF CHARACTER LIMIT IS EXCEEDED
    // Finds the excess characters using `substr` with the start (tweet limit) and end (total characters entered)
    let overTweet = tweet.substr(tweetLimit, tweetLength);
    //console.log(overTweet)
    // Creates a span to highlight the overflowed characters in red
    let overTweetElement = `<span class='overTweet'>${overTweet}</span>`;
    //console.log(overTweetElement)
    // Combines the normal and overflowed characters to create a new tweet
    newTweet = tweet.substr(0, tweetLimit) + overTweetElement;
    // Shows the readonly display with zIndex
    readonly.style.zIndex = "1";
    // Turns the counter red when limit is exceeded
    counter.style.color = "red";

    // Disables the button if limit is exceeded
    tweetButton.classList.remove("active");
  } else {
    // IF CHARACTER LIMIT IS NOT EXCEEDED

    // Resets the counter color
    counter.style.color = "#333";
    // Hides the overflow display when limit is not exceeded
    readonly.style.zIndex = "-5";
  }

  // Sends the newly created tweet to display in HTML
  readonly.innerHTML = newTweet;
};
