function sendMessage() {
  const token = document.getElementById("token").value;
  const channelId = document.getElementById("channelId").value;
  const interval = document.getElementById("interval").value;
  const sendCount = document.getElementById("sendCount").value;
  const content = document.getElementById("content").value;
  const fileInput = document.getElementById("fileInput");
  const option = document.getElementById("option").value;

  if (!token || !interval || !sendCount) {
    alert("Missing parameters.");
    return;
  }

  if (!content && fileInput.files.length == 0) {
    alert("Missing parameters.");
    return;
  }
  
  for (let i = 0; i < sendCount; i++) {
    setTimeout(() => {
      const xhr = new XMLHttpRequest();
      const formData = new FormData();

      let modifiedContent = applyOption(content, option);

      formData.append("content", modifiedContent);
      formData.append("file", fileInput.files[0]);

      xhr.open("POST", `https://discord.com/api/v9/channels/${channelId}/messages`);
      xhr.setRequestHeader("Authorization", `${token}`);
      xhr.send(formData);
    }, i * interval);
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
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }
  return randomString;
}

function clearFileInput() {
  const fileInput = document.getElementById("fileInput");
  fileInput.value = null;
}
