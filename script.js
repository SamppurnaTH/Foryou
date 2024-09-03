document.addEventListener("DOMContentLoaded", function () {
    const loader = document.querySelector(".loader");
    const loveBalloon = document.getElementById("loveBalloon");
    const countdownSection = document.querySelector(".countdown-section");
    const countdownElement = document.getElementById("countdown");
    const message = document.getElementById("message");
    const greetingSection = document.querySelector(".greeting-section");
    const apologySection = document.querySelector(".apology-section");
    const memoriesSection = document.querySelector(".memories-section");
    const scrollingBalloons = document.querySelector(".scrolling-balloons");
    const callToAction = document.querySelector(".call-to-action");
    const musicControl = document.querySelector(".music-control");
    const backgroundMusic = document.getElementById("background-music");
    const musicFileInput = document.getElementById("musicFile");
    const balloonContainer = document.getElementById("balloon-container");
    const crackerContainer = document.querySelector(".cracker-container");
  
    let audio = backgroundMusic;
    let isSharingInProgress = false;
  
    window.onload = function () {
      if (loader) {
        loader.classList.add("hidden");
      }
    };
  
    if (countdownSection) {
      countdownSection.classList.add("hidden");
    }
  
    if (loveBalloon) {
      loveBalloon.addEventListener("click", function () {
        const heroSection = document.querySelector(".hero-section");
        if (heroSection) {
          heroSection.classList.add("hidden");
        }
  
        if (countdownSection) {
          countdownSection.classList.remove("hidden");
          countdownSection.scrollIntoView({ behavior: "smooth" });
        }
  
        if (audio) {
          audio.play().catch((error) => {});
          if (musicControl) {
            musicControl.textContent = "🔊";
          }
        }
  
        let count = 3;
        if (countdownElement) {
          countdownElement.textContent = count;
        }
        const countdownInterval = setInterval(() => {
          count--;
          if (countdownElement && count > 0) {
            countdownElement.textContent = count;
          } else {
            clearInterval(countdownInterval);
            if (countdownElement) {
              countdownElement.classList.add("hidden");
            }
            if (message) {
              message.classList.remove("hidden");
            }
  
            triggerCrackers();
  
            setTimeout(() => {
              if (countdownSection) {
                countdownSection.classList.add("hidden");
              }
              if (greetingSection) {
                greetingSection.classList.remove("hidden");
              }
              if (apologySection) {
                apologySection.classList.remove("hidden");
              }
              if (memoriesSection) {
                memoriesSection.classList.remove("hidden");
              }
              if (scrollingBalloons) {
                scrollingBalloons.classList.remove("hidden");
              }
              if (callToAction) {
                callToAction.classList.remove("hidden");
              }
            }, 2000);
          }
        }, 1000);
      });
    }
  
    function triggerCrackers() {
      if (crackerContainer) {
        crackerContainer.classList.remove("hidden");
        const crackers = crackerContainer.querySelectorAll(".cracker");
        crackers.forEach((cracker, index) => {
          setTimeout(() => {
            cracker.style.opacity = "1";
            cracker.style.animation = `flyUp ${1 + index * 0.2}s ease-out, blast ${1 + index * 0.2}s ease-out`;
          }, index * 200);
        });
      }
    }
  
    window.toggleMusic = function () {
      if (audio) {
        if (audio.paused) {
          audio.play().catch((error) => {});
          if (musicControl) {
            musicControl.textContent = "🔊";
          }
        } else {
          audio.pause();
          if (musicControl) {
            musicControl.textContent = "🔇";
          }
        }
      }
    };
  
    if (musicFileInput) {
      musicFileInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
          const fileURL = URL.createObjectURL(file);
          if (audio) {
            audio.src = fileURL;
            audio.play().catch((error) => {});
            if (musicControl) {
              musicControl.textContent = "🔊";
            }
          }
        }
      });
    }
  
    function createBalloons() {
      if (balloonContainer) {
        for (let i = 0; i < 20; i++) {
          const balloon = document.createElement("div");
          balloon.classList.add("balloon");
          balloon.style.left = `${Math.random() * 100}vw`;
          balloon.style.animationDuration = `${Math.random() * 5 + 5}s`;
          balloon.style.animationDelay = `${Math.random() * 5}s`;
          balloon.style.opacity = Math.random() * 0.5 + 0.5;
          balloonContainer.appendChild(balloon);
        }
      }
    }
  
    createBalloons();
  
    window.leaveReply = function () {
      const reply = prompt("Leave your heartfelt message:");
      if (reply) {
        alert("Thank you for your message!");
        const encodedReply = encodeURIComponent(reply);
        const instagramMessageUrl = `https://www.instagram.com/hello_mr_failure03?igsh=MW5tZzczODBmbjg4aw==${encodedReply}`;
        window.open(instagramMessageUrl, "_blank");
      }
    };
  
    window.shareCard = function () {
      if (isSharingInProgress) {
        return;
      }
  
      isSharingInProgress = true;
  
      const cardUrl = window.location.href;
      if (navigator.share) {
        navigator
          .share({
            title: "Check out this Greeting Card!",
            text: "Here’s a special greeting card I found. Hope you like it!",
            url: cardUrl,
          })
          .then(() => {
            isSharingInProgress = false;
          })
          .catch((error) => {
            alert("Sharing failed. Please try again.");
            isSharingInProgress = false;
          });
      } else {
        const dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = cardUrl;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        alert("URL copied to clipboard! You can now share it manually.");
        isSharingInProgress = false;
      }
    };
  
    window.sendPersonalMessage = function () {
      const personalMessage = prompt("Enter your personal message:");
      if (personalMessage) {
        alert("Your personal message has been sent!");
      } else {
        alert("Message sending canceled.");
      }
    };
  });
  