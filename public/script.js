const quoteContainer = document.getElementById("quote-container")
const quoteText = document.getElementById("quote")
const authorText = document.getElementById("author")
const btnTwitter = document.getElementById("twitter")
const btnNewQuote = document.getElementById("new-quote")
const loader = document.getElementById("loader")

function showLoadingSpinner() {
  loader.hidden = false
  quoteContainer.hidden = true
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false
    loader.hidden = true
  }
}

async function getQuote() {
  try {
    showLoadingSpinner()
    const response = await fetch("/quote")
    const data = await response.json()
    if (data.quoteAuthor === "") {
      authorText.innerText = "Unknown"
    } else {
      authorText.innerText = data.quoteAuthor
    }
    if (data.quoteText.length > 120) {
      quoteText.classList.add("long-quote")
    } else {
      quoteText.classList.remove("long-quote")
    }
    quoteText.innerText = data.quoteText
    removeLoadingSpinner()
  } catch (e) {
    console.error("Failed to get quote", e)
  }
}

// tweet quote

function tweetQuote() {
  const quote = quoteText.innerText
  const author = authorText.innerText
  window.open(
    `https://twitter.com/intent/tweet?text=${quote} - ${author}`,
    "_blank"
  )
}

// event listeners

btnNewQuote.addEventListener("click", getQuote)
btnTwitter.addEventListener("click", tweetQuote)

// on load

getQuote()
