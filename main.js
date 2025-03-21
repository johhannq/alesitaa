// Flower images with more variety
const flowerImages = ["./img/flower.png", "./img/flower1.png", "./img/flower.png", "./img/flower1.png",]

// Confetti colors - updated to yellow theme
const confettiColors = ["#FFD166", "#FFB800", "#FFCC33", "#FFF3D0", "#8B5A00"]

// DOM elements
const flowerContainer = document.getElementById("flower-container")
const confettiContainer = document.getElementById("confetti-container")
const message1 = document.getElementById("message1")
const message2 = document.getElementById("message2")
const acceptButton = document.querySelector(".accept-button")

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  console.log("Script loaded")
  startTypingEffect()
  startFlowerGeneration()

  // Add an initial burst of flowers
  for (let i = 0; i < 20; i++) {
    createFlower()
  }
})

// Typing effect for messages
function startTypingEffect() {
  setTimeout(() => {
    message1.classList.add("visible")

    setTimeout(() => {
      message2.classList.add("visible")
    }, 2000)
  }, 500)
}

// Check if device is mobile
function isMobile() {
  return window.innerWidth <= 768
}

// Create and animate flowers
function createFlower() {
  const flower = document.createElement("div")
  flower.classList.add("flower")

  // Random position
  const xPos = Math.random() * (window.innerWidth - 60)
  const yPos = Math.random() * (window.innerHeight - 60)

  flower.style.left = `${xPos}px`
  flower.style.top = `${yPos}px`

  // Random image
  const randomImageIndex = Math.floor(Math.random() * flowerImages.length)
  flower.style.backgroundImage = `url(${flowerImages[randomImageIndex]})`

  flower.style.width = `30px`
  flower.style.height = `30px`

  // Random animation duration and delay
  const animationDuration = 15 + Math.random() * 15
  flower.style.animationDuration = `${animationDuration}s`
  flower.style.animationDelay = `${Math.random() * 2}s`

  flowerContainer.appendChild(flower)

  // Remove flower after animation completes
  setTimeout(
    () => {
      if (flower.parentNode === flowerContainer) {
        flowerContainer.removeChild(flower)
      }
    },
    animationDuration * 1000 + 5000,
  )
}

function startFlowerGeneration() {
  // Create initial flowers - fewer on mobile
  const initialFlowers = isMobile() ? 20 : 40

  for (let i = 0; i < initialFlowers; i++) {
    setTimeout(createFlower, i * 50)
  }

  // Add new flowers - less frequently on mobile
  const interval = isMobile() ? 300 : 150
  setInterval(createFlower, interval)
}

// Create confetti
function createConfetti() {
  // Fewer confetti pieces on mobile
  const confettiCount = isMobile() ? 50 : 100

  for (let i = 0; i < confettiCount; i++) {
    setTimeout(() => {
      const confetti = document.createElement("div")
      confetti.classList.add("confetti")

      // Random position, size, color and rotation
      const size = Math.random() * 10 + 5
      const xPos = Math.random() * window.innerWidth
      const color = confettiColors[Math.floor(Math.random() * confettiColors.length)]
      const duration = Math.random() * 3 + 2
      const delay = Math.random() * 2

      confetti.style.width = `${size}px`
      confetti.style.height = `${size}px`
      confetti.style.left = `${xPos}px`
      confetti.style.backgroundColor = color
      confetti.style.animation = `confettiFall ${duration}s ease-in ${delay}s forwards`

      // Random shape
      if (Math.random() > 0.5) {
        confetti.style.borderRadius = "50%"
      }

      confettiContainer.appendChild(confetti)

      // Remove confetti after animation
      setTimeout(
        () => {
          if (confetti.parentNode === confettiContainer) {
            confettiContainer.removeChild(confetti)
          }
        },
        (duration + delay) * 1000 + 500,
      )
    }, i * 20)
  }
}

// Add event listeners
acceptButton.addEventListener("click", () => {
  createConfetti()

  // Add a fun alert
  setTimeout(() => {
    alert("¡Invitación aceptada! Nos vemos mi amoooor 😊")
  }, 500)
})

// Add 3D effect to ticket on mouse move
const ticket = document.querySelector(".ticket")
document.addEventListener("mousemove", (e) => {
  if (window.innerWidth > 768) {
    // Only on desktop
    const xAxis = (window.innerWidth / 2 - e.pageX) / 25
    const yAxis = (window.innerHeight / 2 - e.pageY) / 25
    ticket.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg) scale(1.05)`
  }
})

// Reset ticket position when mouse leaves
ticket.addEventListener("mouseleave", () => {
  ticket.style.transform = "perspective(1000px) rotateX(0) rotateY(0)"
})

// Add touch events for mobile
let touchStartX, touchStartY

document.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX
  touchStartY = e.touches[0].clientY
})

document.addEventListener("touchmove", (e) => {
  if (!touchStartX || !touchStartY) return

  const touchX = e.touches[0].clientX
  const touchY = e.touches[0].clientY

  const xDiff = touchStartX - touchX
  const yDiff = touchStartY - touchY

  if (Math.abs(xDiff) > 10 || Math.abs(yDiff) > 10) {
    createFlower()
  }
})

// Add click event to create flowers on click
document.addEventListener("click", (e) => {
  // Create a flower at the click position
  const flower = document.createElement("div")
  flower.classList.add("flower")

  // Adjust position based on flower size
  const size = isMobile()
    ? 30 + Math.random() * 20
    : // Mobile size
      60 + Math.random() * 40 // Desktop size

  const offsetX = size / 2
  const offsetY = size / 2

  flower.style.left = `${e.pageX - offsetX}px`
  flower.style.top = `${e.pageY - offsetY}px`

  const randomImageIndex = Math.floor(Math.random() * flowerImages.length)
  flower.style.backgroundImage = `url(${flowerImages[randomImageIndex]})`

  flower.style.width = `${size}px`
  flower.style.height = `${size}px`

  const animationDuration = 15 + Math.random() * 15
  flower.style.animationDuration = `${animationDuration}s`

  flowerContainer.appendChild(flower)

  setTimeout(
    () => {
      if (flower.parentNode === flowerContainer) {
        flowerContainer.removeChild(flower)
      }
    },
    animationDuration * 1000 + 5000,
  )
})

// Handle window resize
window.addEventListener("resize", () => {
  // Clear existing flowers
  flowerContainer.innerHTML = ""

  // Add new appropriately sized flowers
  for (let i = 0; i < (isMobile() ? 10 : 20); i++) {
    createFlower()
  }
})

