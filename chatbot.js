var flag = 0;
var time = 0;
var risk = 0;
var budget = 0;

let results = {
  1: {
    1: {
      1: "You can try investing in Treasury Bills, Savings Accounts. ",
      2: "You can try investing in Savings Accounts, Certificates of Deposit. ",
    },
    2: {
      1: "You can try investing in Investment-Grade Corporate Bonds. ",
      2: "You can try investing in Dividend. ",
    },
    3: {
      1: "You can try investing in Options, Futures. ",
      2: "You can try investing in Options, Derivatives, Futures. ",
    },
  },
  2: {
    1: {
      1: "You can try investing in Large Cap Mutual Funds. ",
      2: "You can try investing in Large Cap Mutual Funds, Government Securities. ",
    },
    2: {
      1: "You can try investing in Stocks. ",
      2: "You can try investing in Stocks, Mid Cap Mutual Funds. ",
    },
    3: {
      1: "You can try investing in IPOs. ",
      2: "You can try investing in IPOs, Venture Capital, Small Cap Companies, Micro Cap Companies, ETFs. ",
    },
  },
  3: {
    1: {
      1: "You can try investing in Gold, Sovereign Gold Bonds. ",
      2: "You can try investing in Gold, Sovereign Gold Bonds, Real Estate Investment Trusts. ",
    },
    2: {
      1: "You can try investing in Mid Cap Companies. ",
      2: "You can try investing in Mid Cap Companies, Emerging Market Funds. ",
    },
    3: {
      1: "You can try investing in Small Cap Companies. ",
      2: "You can try investing in Small Cap Companies, Micro Cap Companies, Art and Collectibles. ",
    },
  },
};

window.onload = function () {
  addMessage("Hello! How can I assist you today?");
};

function sendMessage() {
  var messageInput = document.getElementById("messageInput");
  var message = messageInput.value.trim();

  if (message !== "") {
    addMessage(message, true);
    var msg = message
      .toLowerCase()
      .split(" ")
      .filter((word) => word.length > 0);
    var botReply;
    console.log(flag);

    if (flag === 1) {
      flag = 0;
      botReply = "Please wait.";
      const apiKey = "HLTEF2UWTZLB4ZL3";
      const symbol = msg[0].toUpperCase();

      const apiUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          const price = data["Global Quote"]["05. price"];
          if (price !== undefined) {
            botReply = `Current price of ${symbol} is $${price}.`;
          } else {
            botReply = "Could not find that stock.";
          }
          addMessage(botReply, false);
          scrollToBottom();
        })
        .catch((error) => {
          botReply = "Could not find that stock.";
          addMessage(botReply, false);
          scrollToBottom();
        });
    } else if (msg.includes("help")) {
      botReply =
        "Hello! How can I assist you today?";
    } else if (msg.includes("advice")) {
      botReply = "How long would you like to invest for?";
      flag = 2;
    } else if (flag === 2) {
      if (msg.includes("long")) {
        botReply = "What is your budget?";
        time = 3;
        flag = 3;
      } else if (msg.includes("mid")) {
        botReply = "What is your budget?";
        time = 2;
        flag = 3;
      } else if (msg.includes("short")) {
        botReply = "What is your budget?";
        time = 1;
        flag = 3;
      } else {
        botReply = "Sorry, I could not understand that.";
      }
    } else if (flag === 3) {
      const budgetVal = Number(msg[0]);
      if (isNaN(budgetVal)) {
        botReply = "Sorry, I could not understand that.";
      } else {
        if (budgetVal >= 100000) {
          budget = 2;
        } else {
          budget = 1;
        }
        flag = 4;
        botReply = "How much risk can you afford";
      }
    } else if (flag === 4) {
      if (msg.includes("low")) {
        risk = 1;
        flag = 0;
        botReply = results[time][risk][budget];
      } else if (msg.includes("medium")) {
        risk = 2;
        flag = 0;
        botReply = results[time][risk][budget];
      } else if (msg.includes("high")) {
        risk = 3;
        flag = 0;
        botReply = results[time][risk][budget];
      } else {
        botReply = "Sorry, I could not understand that.";
      }
    } else if (msg.includes("stockprice")) {
      botReply =
        "Enter the stock symbol for the stock that you want to look up.";
      flag = 1;
    } else if (
      msg.includes("hi") ||
      msg.includes("hello") ||
      msg.includes("hey")
    ) {
      botReply =
        "Hello! How can I assist you today?";
    } else {
      botReply =
        "Sorry, I could not understand that.";
    }

    messageInput.value = "";
    addMessage(botReply, false);
    scrollToBottom();
  }
}

function addMessage(message, isSender) {
  var chatBox = document.getElementById("chatBox");
  var messageElement = document.createElement("div");
  messageElement.classList.add("message");
  if (isSender) {
    messageElement.classList.add("sender");
  } else {
    messageElement.classList.add("receiver");
  }
  messageElement.innerHTML = `${message}`;
  chatBox.appendChild(messageElement);
}

function scrollToBottom() {
  var chatBox = document.getElementById("chatBox");
  chatBox.scrollTop = chatBox.scrollHeight;
}

document.getElementById("messageInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});