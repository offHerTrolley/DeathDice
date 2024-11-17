const webhookURL = "https://discord.com/api/webhooks/1307694339111260180/7LW13Uc4eiyEqWT_dD47uInWX6lzPv9jrvldprUb8lYslKavUyRWJ1Do_d9IqsHhbvqP";

function rollDice() {
    const diceResult = Math.floor(Math.random() * 100) + 1;

    const resultElement = document.getElementById("result");
    const messageElement = document.getElementById("message");

    let message = "";
    if (diceResult === 13) {
        resultElement.textContent = "あなたは死にました...!!";
        resultElement.style.color = "red";
        message = "お前の命はここで終わりだ...運命に逆らえなかったな。";
    } else if (diceResult <= 10) {
        resultElement.textContent = `ダイスの目: ${diceResult} — 不運の兆し...`;
        resultElement.style.color = "darkred";
        message = "まだお前は死ぬには早い。";
    } else if (diceResult <= 50) {
        resultElement.textContent = `ダイスの目: ${diceResult} — あなたはギリギリ生き残った。`;
        resultElement.style.color = "orange";
        message = "生き残るのは幸運か、それともただの偶然か...。";
    } else if (diceResult <= 80) {
        resultElement.textContent = `ダイスの目: ${diceResult} — まずまずの結果。`;
        resultElement.style.color = "green";
        message = "運が味方している...。";
    } else {
        resultElement.textContent = `ダイスの目: ${diceResult} — 幸運が味方した...しかし`;
        resultElement.style.color = "limegreen";
        message = "お前に微かな希望が与えられた。しかし、幸運は一時的だ。次はどうなるか分からない。";
    }

    messageElement.textContent = message;

    sendToDiscord(diceResult, message);
}

// Discord
function sendToDiscord(diceResult, message) {
    const data = {
        content: `ダイスの結果: ${diceResult} — ${message}`,
    };

    // Webhook
    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (response.ok) {
            console.log("メッセージがDiscordに送信されました");
        } else {
            console.error("メッセージ送信に失敗しました", response);
        }
    })
    .catch(error => {
        console.error("送信中にエラーが発生しました", error);
    });
}