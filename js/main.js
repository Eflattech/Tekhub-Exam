(() => {
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");
const callButtons = document.querySelectorAll(".toggle-control");
const endCallButton = document.querySelector(".end-call");
const liveBadge = document.querySelector(".live-badge");
const chatForm = document.querySelector(".chat-form");
const chatInput = document.querySelector("#chat-input");
const chatPanel = document.querySelector(".chat-panel");
const chatStatus = document.querySelector(".chat-status");
const signupDialog = document.querySelector(".signup-dialog");
const signupForm = document.querySelector(".signup-form");
const signupEmail = document.querySelector("#signup-email");
const signupStatus = document.querySelector(".signup-status");

function closeMenu() {
  navigation.classList.remove("is-open");
  menuButton.querySelector(".visually-hidden").textContent = "Open navigation";
  menuButton.lastElementChild.textContent = "☰";
}

menuButton.addEventListener("click", function () {
  const isOpen = navigation.classList.toggle("is-open");
  menuButton.querySelector(".visually-hidden").textContent = isOpen
    ? "Close navigation"
    : "Open navigation";
  menuButton.lastElementChild.textContent = isOpen ? "×" : "☰";
});

navigation.addEventListener("click", function (event) {
  if (event.target.closest("a")) closeMenu();
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") closeMenu();
});

window.addEventListener("resize", function () {
  if (window.innerWidth > 800) closeMenu();
});

document.querySelectorAll(".faq-item").forEach(function (item) {
  item.addEventListener("toggle", function () {
    if (item.open) {
      document.querySelectorAll(".faq-item").forEach(function (otherItem) {
        if (otherItem !== item) otherItem.open = false;
      });
    }
  });
});

callButtons.forEach(function (button) {
  const control = button.dataset.control;
  const buttons = document.querySelectorAll('[data-control="' + control + '"]');

  button.classList.toggle("is-on", button.dataset.state === "on");
  button.classList.toggle("is-off", button.dataset.state !== "on");

  button.addEventListener("click", function () {
    const isOn = button.dataset.state !== "on";

    buttons.forEach(function (sameButton) {
      sameButton.dataset.state = isOn ? "on" : "off";
      sameButton.classList.toggle("is-on", isOn);
      sameButton.classList.toggle("is-off", !isOn);
      sameButton.title = controlLabel(control, isOn);
    });
  });
});

function controlLabel(control, isOn) {
  if (control === "microphone") return isOn ? "Mute microphone" : "Unmute microphone";
  if (control === "camera") return isOn ? "Turn camera off" : "Turn camera on";
  return isOn ? "Stop screen sharing" : "Start screen sharing";
}

endCallButton.addEventListener("click", function () {
  const ended = endCallButton.classList.toggle("is-ended");
  endCallButton.title = ended ? "Restart call" : "End call";
  liveBadge.innerHTML = ended ? "<i></i> Call ended" : "<i></i> Live";
  liveBadge.classList.toggle("call-ended", ended);
});

chatForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const text = chatInput.value.trim();

  if (!text) {
    chatStatus.textContent = "Type a message first.";
    chatInput.focus();
    return;
  }

  addMessage(text, "sent-message");
  chatStatus.textContent = "";
  chatInput.value = "";

  setTimeout(function () {
    addMessage("Got it. Tell me a little more and I'll help you work through it.", "reply");
  }, 350);
});

function addMessage(text, style) {
  const message = document.createElement("p");
  message.className = "message " + style;
  message.textContent = text;
  chatPanel.insertBefore(message, chatForm);
}

document.querySelectorAll(".signup-open").forEach(function (button) {
  button.addEventListener("click", function () {
    signupForm.reset();
    signupEmail.classList.remove("is-invalid");
    signupStatus.className = "signup-status";
    signupStatus.textContent = "This demo form does not save your email.";
    signupDialog.showModal();
    signupEmail.focus();
  });
});

document.querySelector(".signup-close").addEventListener("click", function () {
  signupDialog.close();
});

signupDialog.addEventListener("click", function (event) {
  if (event.target === signupDialog) signupDialog.close();
});

signupForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const email = signupEmail.value.trim();
  signupEmail.value = email;

  if (!email || !signupEmail.checkValidity()) {
    signupEmail.classList.add("is-invalid");
    signupStatus.textContent = email ? "Enter a valid email address." : "Please enter your email address.";
    signupStatus.className = "signup-status error";
    signupEmail.focus();
    return;
  }

  signupEmail.classList.remove("is-invalid");
  signupStatus.textContent = "Thanks! Your email passed validation. This demo does not save it.";
  signupStatus.className = "signup-status success";
});
})();
