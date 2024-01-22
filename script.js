function sendMessage() {
  const token = document.getElementById("token").value;
  const channelId = document.getElementById("channelId").value;
  const interval = document.getElementById("interval").value;
  const sendCount = document.getElementById("sendCount").value;
  const content = document.getElementById("content").value;
  const fileInput = document.getElementById("fileInput");

  for (let i = 0; i < sendCount; i++) {
    setTimeout(() => {
      const xhr = new XMLHttpRequest();
      const formData = new FormData();

      formData.append("content", content);
      formData.append("file", fileInput.files[0]);

      xhr.open("POST", `https://discord.com/api/v9/channels/${channelId}/messages`);
      xhr.setRequestHeader("Authorization", `${token}`);
      xhr.send(formData);
    }, i * interval);
  }
}

function clearFileInput() {
  const fileInput = document.getElementById("fileInput");
  fileInput.value = '';
}
