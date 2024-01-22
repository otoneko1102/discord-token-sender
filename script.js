function sendMessage() {
  const token = document.getElementById("token").value;
  const channelId = document.getElementById("channelId").value;
  const interval = document.getElementById("interval").value;
  const sendCount = document.getElementById("sendCount").value;
  const content = document.getElementById("content").value;

  for (let i = 0; i < sendCount; i++) {
    setTimeout(() => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", `https://discord.com/api/v9/channels/${channelId}/messages`);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("Authorization", `${token}`);
      xhr.send(JSON.stringify({ content }));
    }, i * interval);
  }
}
