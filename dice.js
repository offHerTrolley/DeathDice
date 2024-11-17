const webhookURL = "https://discord.com/api/webhooks/1307694339111260180/7LW13Uc4eiyEqWT_dD47uInWX6lzPv9jrvldprUb8lYslKavUyRWJ1Do_d9IqsHhbvqP";

function rollDice() {
    const playerName = document.getElementById("playerName").value.trim();
    if (!playerName) {
        alert("名前を入力しろ");
        return;
    }

    const diceResult = Math.floor(Math.random() * 100) + 1;

    const resultElement = document.getElementById("result");
    const messageElement = document.getElementById("message");

    let message = "";
    if (diceResult === 13) {
        resultElement.textContent = "あなたは死にました...!!";
        resultElement.style.color = "red";
        message = "あなたは運命に抗うことはできなかった...。あなたは運命に抗うことはできなかった...。あなたは運命に抗うことはできなかった...。あなたは運命に抗うことはできなかった...。あなたは運命に抗うことはできなかった...。あなたは運命に抗うことはできなかった...。あなたは運命に抗うことはできなかった...。あなたは運命に抗うことはできなかった...。";
    } else if (diceResult <= 10) {
        resultElement.textContent = `ダイスの目: ${diceResult} — 不運の兆し...`;
        resultElement.style.color = "darkred";
        message = "まだお前は死ぬには早い。";
    } else if (diceResult <= 50) {
        resultElement.textContent = `ダイスの目: ${diceResult} — 生き延びた...`;
        resultElement.style.color = "orange";
        message = "生き残るのは幸運か、それともただの偶然か...。";
    } else if (diceResult <= 80) {
        resultElement.textContent = `ダイスの目: ${diceResult} — 幸運が味方した...`;
        resultElement.style.color = "yellowgreen";
        message = "お前に微かな希望が与えられた。";
    } else {
        resultElement.textContent = `ダイスの目: ${diceResult} — あなたは生き残った。`;
        resultElement.style.color = "limegreen";
        message = "運が味方している...。";
    }

    messageElement.textContent = message;
    sendToDiscord(playerName, diceResult, message);
}

function sendToDiscord(playerName, diceResult, message) {
    const data = {
        username: playerName,
        avatar_url: "https://your-avatar-url.com/avatar.png",
        content: `ダイスの結果: ${diceResult} — ${message}`,
    };

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
