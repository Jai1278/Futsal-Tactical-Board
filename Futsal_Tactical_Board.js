// Initialize the canvas
const canvas = document.getElementById('courtCanvas');
const ctx = canvas.getContext('2d');

// Resize the canvas to fit the available space
canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.7;  // Adjust based on your screen size

// Draw the futsal court
function drawCourt() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear any previous drawings

  // Draw the outer border of the court
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 5;
  ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);

  // Draw the center line
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 50);
  ctx.lineTo(canvas.width / 2, canvas.height - 50);
  ctx.stroke();

  // Draw the center circle
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2);
  ctx.stroke();

  // Draw the goals (for simplicity, using rectangles here)
  ctx.strokeRect(50, canvas.height / 2 - 50, 30, 100); // Left goal
  ctx.strokeRect(canvas.width - 80, canvas.height / 2 - 50, 30, 100); // Right goal
}

// Call drawCourt function
drawCourt();

// Player drag logic
let draggedPlayer = null;

// Select all players (the player circles)
const players = document.querySelectorAll('.player');

// Add event listeners for mouse/touch events
players.forEach(player => {
  player.addEventListener('mousedown', dragStart);
  player.addEventListener('touchstart', dragStart);
});

// Track the starting position of the drag
function dragStart(e) {
  e.preventDefault();  // Prevent default behavior (e.g., text selection)

  // Get the mouse/touch position relative to the viewport
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;

  draggedPlayer = e.target;  // Set the current player as the dragged player

  // Bring the player to the front during the drag
  draggedPlayer.style.zIndex = 1000;
  document.body.style.userSelect = 'none'; // Disable text selection during drag

  // Calculate the offset from the player's position to the mouse pointer
  draggedPlayer.offsetX = clientX - draggedPlayer.getBoundingClientRect().left;
  draggedPlayer.offsetY = clientY - draggedPlayer.getBoundingClientRect().top;

  // Attach the mousemove or touchmove event to move the player
  document.addEventListener('mousemove', dragMove);
  document.addEventListener('touchmove', dragMove);

  // On mouseup, stop dragging
  document.addEventListener('mouseup', dragEnd);
  document.addEventListener('touchend', dragEnd);
}

// Move the player based on mouse/touch position
function dragMove(e) {
  e.preventDefault();  // Prevent default behavior (e.g., text selection)

  if (draggedPlayer) {
    // Get the current mouse/touch position
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    // Update the position of the dragged player (circle) to follow the mouse pointer
    draggedPlayer.style.left = `${clientX - draggedPlayer.offsetX}px`;
    draggedPlayer.style.top = `${clientY - draggedPlayer.offsetY}px`;
  }
}

// End the drag and place the player in its new position
function dragEnd(e) {
  if (draggedPlayer) {
    // On release, the player stays where it was dropped
    draggedPlayer.style.zIndex = 1;  // Reset the z-index
    draggedPlayer = null;  // Clear the dragged player reference
    document.body.style.userSelect = ''; // Restore text selection ability

    // Remove the mousemove or touchmove event listener once drag ends
    document.removeEventListener('mousemove', dragMove);
    document.removeEventListener('touchmove', dragMove);

    // Remove the mouseup or touchend event listener
    document.removeEventListener('mouseup', dragEnd);
    document.removeEventListener('touchend', dragEnd);
  }
}
