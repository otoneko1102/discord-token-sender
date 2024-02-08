function sendMessage() {
  const token = document.getElementById("token").value;
  const channelId = document.getElementById("channelId").value;
  const interval = document.getElementById("interval").value;
  const sendCount = document.getElementById("sendCount").value;
  const content = document.getElementById("content").value || '';
  const fileInput = document.getElementById("fileInput");
  const option = document.getElementById("option").value;
  const mention = document.getElementById("option").value === "On";
  const guildId = document.getElementById("guildId").value;
  const mentionCount = document.getElementById("mentionCount").value;

  if (!token || !interval || !sendCount) {
    alert("Missing parameters.");
    return;
  }

  if (!content && fileInput.files.length == 0 && option === "None" && !mention) {
    alert("Missing parameters.");
    return;
  }

  if (mention === true && mentionCount > 0 && !guildId) {
    alert("Missing parameters.");
    return;
  }

  let mentions = [];
  if (mention === true && mentionCount > 0) {
    const requestOption = {
      method: 'GET',
      body: {
        token: token,
        guild_id: guildId
      }
    }
    fetch("https://otonecord.glitch.me/api/discordGuildMembers", requestOption)
      .then(res => {
        if (!res.ok || res.status == 400 || res.status == 500) {
          alert("Random Mention cannot be used.");
          return;
        }
        const data = res.json();
        mentions = data.members;
      });
  }
  
  for (let i = 0; i < sendCount; i++) {
    setTimeout(() => {
      const xhr = new XMLHttpRequest();
      const formData = new FormData();

      const users = [];
      if (mentions.length > 0) {
        for (let i = 0; i < mentionCount; i++) {
          users.push(`<@${mentions[Math.floor(Math.random() * mentions.length)]}>`);
        }
      }

      let modifiedContent = users.length > 0 ? applyOption(`${users.join(' ')}\n\n${content}`, option) : applyOption(content, option);
     
      formData.append("content", modifiedContent);
      formData.append("file", fileInput.files[0]);

      xhr.open("POST", `https://discord.com/api/v9/channels/${channelId}/messages`);
      xhr.setRequestHeader("Authorization", `${token}`);
      xhr.send(formData);
    }, interval);
  }
  alert(`Sent ${sendCount} messages to ${channelId}!`);
}

function applyOption(content, option) {
  switch (option) {
    case "Add random string at the top":
      return addRandomStringAtTop(content);
    case "Add random string at the end":
      return addRandomStringAtEnd(content);
    default:
      return content;
  }
}

function addRandomStringAtTop(content) {
  const randomString = generateRandomString();
  return `${randomString}\n\n${content}`;
}

function addRandomStringAtEnd(content) {
  const randomString = generateRandomString();
  return `${content}\n\n${randomString}`;
}

function generateRandomString() {
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomString = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }
  return randomString;
}

function clearFileInput() {
  const fileInput = document.getElementById("fileInput");
  fileInput.value = null;
}
