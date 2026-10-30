(function () {
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");
  const faqItems = document.querySelectorAll(".faq-item");
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
  const signupClose = document.querySelector(".signup-close");
  let signupOpener;

  function closeMenu() {
    menuButton.querySelector(".visually-hidden").textContent = "Open navigation";
    menuButton.lastElementChild.textContent = "☰";
    navigation.classList.remove("is-open");
  }

  menuButton.addEventListener("click", function () {
    const isOpen = navigation.classList.contains("is-open");
    menuButton.querySelector(".visually-hidden").textContent = isOpen
      ? "Open navigation"
      : "Close navigation";
    menuButton.lastElementChild.textContent = isOpen ? "☰" : "×";
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.addEventListener("click", function (event) {
    if (event.target.closest("a")) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 800) {
      closeMenu();
    }
  });

  faqItems.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (item.open) {
        faqItems.forEach(function (otherItem) {
          if (otherItem !== item) {
            otherItem.open = false;
          }
        });
      }
    });
  });

  callButtons.forEach(function (button) {
    const isOn = button.dataset.state === "on";
    button.classList.add(isOn ? "is-on" : "is-off");
    button.addEventListener("click", function () {
      const isOn = button.dataset.state !== "on";
      const control = button.dataset.control;

      document.querySelectorAll('[data-control="' + control + '"]').forEach(function (sameControl) {
        sameControl.dataset.state = isOn ? "on" : "off";
        sameControl.classList.toggle("is-on", isOn);
        sameControl.classList.toggle("is-off", !isOn);
        sameControl.title = getControlLabel(control, isOn);
      });
    });
  });

  function getControlLabel(control, isOn) {
    if (control === "microphone") {
      return isOn ? "Mute microphone" : "Unmute microphone";
    }
    if (control === "camera") {
      return isOn ? "Turn camera off" : "Turn camera on";
    }
    return isOn ? "Stop screen sharing" : "Start screen sharing";
  }

  endCallButton.addEventListener("click", function () {
    const isEnded = !endCallButton.classList.contains("is-ended");
    endCallButton.classList.toggle("is-ended", isEnded);
    endCallButton.title = isEnded ? "Restart call" : "End call";
    liveBadge.innerHTML = isEnded ? "<i></i> Call ended" : "<i></i> Live";
    liveBadge.classList.toggle("call-ended", isEnded);
  });

  chatForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const message = chatInput.value.trim();

    if (!message) {
      chatStatus.textContent = "Type a message first.";
      chatInput.focus();
      return;
    }

    chatStatus.textContent = "";
    addMessage(message, "sent-message");
    chatInput.value = "";

    window.setTimeout(function () {
      addMessage("Got it. Tell me a little more and I'll help you work through it.", "reply");
    }, 350);
  });

  function addMessage(text, className) {
    const message = document.createElement("p");
    message.className = "message " + className;
    message.textContent = text;
    chatPanel.insertBefore(message, chatForm);
  }

  document.querySelectorAll(".signup-open").forEach(function (button) {
    button.addEventListener("click", function () {
      signupOpener = button;
      signupStatus.textContent = "This demo form does not save your email.";
      signupStatus.className = "signup-status";
      signupEmail.value = "";
      signupEmail.classList.remove("is-invalid");
      signupDialog.showModal();
      signupEmail.focus();
    });
  });

  signupClose.addEventListener("click", function () {
    signupDialog.close();
  });

  signupDialog.addEventListener("click", function (event) {
    if (event.target === signupDialog) {
      signupDialog.close();
    }
  });

  signupDialog.addEventListener("close", function () {
    if (signupOpener) {
      signupOpener.focus();
    }
  });

  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = signupEmail.value.trim();

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
