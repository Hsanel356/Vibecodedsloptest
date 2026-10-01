const ADMIN_CODE = "1310";
const STORAGE_KEY = "code-drop/messages";

const views = {
  entry: document.querySelector("#entry-view"),
  send: document.querySelector("#send-view"),
  receive: document.querySelector("#receive-view"),
};

const entryCode = document.querySelector("#entry-code");
const messageForm = document.querySelector("#message-form");
const messageInput = document.querySelector("#message");
const recipientCode = document.querySelector("#recipient-code");
const sendStatus = document.querySelector("#send-status");
const receivedMessage = document.querySelector("#received-message");
const againButton = document.querySelector("#again-button");

const digitsOnly = (value) => value.replace(/\D/g, "").slice(0, 4);

const loadMessages = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
};

const saveMessages = (messages) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
};

const showView = (name) => {
  Object.values(views).forEach((view) => view.classList.remove("is-active"));
  views[name].classList.add("is-active");
};

const resetEntry = () => {
  entryCode.value = "";
  showView("entry");
  requestAnimationFrame(() => entryCode.focus());
};

const openSendView = () => {
  messageInput.value = "";
  recipientCode.value = "";
  sendStatus.textContent = "";
  showView("send");
  requestAnimationFrame(() => messageInput.focus());
};

const openReceiveView = (code) => {
  const messages = loadMessages();
  receivedMessage.textContent = messages[code] || "No message found.";
  showView("receive");
  requestAnimationFrame(() => againButton.focus());
};

entryCode.addEventListener("input", () => {
  entryCode.value = digitsOnly(entryCode.value);

  if (entryCode.value.length !== 4) {
    return;
  }

  if (entryCode.value === ADMIN_CODE) {
    openSendView();
    return;
  }

  openReceiveView(entryCode.value);
});

recipientCode.addEventListener("input", () => {
  recipientCode.value = digitsOnly(recipientCode.value);
});

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const code = recipientCode.value;
  const text = messageInput.value.trim();

  if (code.length !== 4) {
    sendStatus.textContent = "Use 4 digits.";
    recipientCode.focus();
    return;
  }

  if (code === ADMIN_CODE) {
    sendStatus.textContent = "Pick another code.";
    recipientCode.focus();
    return;
  }

  if (!text) {
    sendStatus.textContent = "Write a message.";
    messageInput.focus();
    return;
  }

  const messages = loadMessages();
  messages[code] = text;
  saveMessages(messages);

  sendStatus.textContent = "Saved.";
  messageInput.value = "";
  recipientCode.value = "";
  recipientCode.focus();
});

againButton.addEventListener("click", resetEntry);
