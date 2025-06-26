// ===============================
// Animaciones de entrada al hacer scroll
// ===============================
function revealOnScroll() {
  // Selecciona los elementos que deben animarse al entrar en pantalla
  const reveals = document.querySelectorAll('.about-section, .projects-section, .technologies-section, .contact-section, .project-card, .tool');
  const windowHeight = window.innerHeight;
  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    // Si el elemento está visible, añade la clase 'visible'
    if (elementTop < windowHeight - 80) {
      el.classList.add('visible');
    } else {
      el.classList.remove('visible');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);

// ===============================
// Transiciones tipo aceleración/deslizamiento para tarjetas y secciones
// ===============================
const animatedEls = document.querySelectorAll('.project-card, .tool, .pit-stop');
animatedEls.forEach((el, i) => {
  // Aplica transición y estado inicial a cada elemento
  el.style.transition = `transform 0.7s cubic-bezier(.4,2,.6,1) ${(i*0.1).toFixed(2)}s, opacity 0.7s ${(i*0.1).toFixed(2)}s`;
  el.style.opacity = 0;
  el.style.transform = 'translateY(40px) scale(0.98)';
});
function animateVisible() {
  // Si el elemento es visible, lo muestra con animación
  animatedEls.forEach(el => {
    if (el.classList.contains('visible')) {
      el.style.opacity = 1;
      el.style.transform = 'translateY(0) scale(1)';
    } else {
      el.style.opacity = 0;
      el.style.transform = 'translateY(40px) scale(0.98)';
    }
  });
}
window.addEventListener('scroll', animateVisible);
window.addEventListener('DOMContentLoaded', animateVisible);

// ===============================
// Efecto racing en botones (skew y sombra al pasar el mouse)
// ===============================
const speedButtons = document.querySelectorAll('a, button');
speedButtons.forEach(btn => {
  btn.addEventListener('mousemove', e => {
    btn.style.transform = 'skewX(-8deg) scale(1.05)';
    btn.style.boxShadow = '0 4px 24px #6C0BA9';
  });
  btn.addEventListener('mouseleave', e => {
    btn.style.transform = '';
    btn.style.boxShadow = '';
  });
});

// ===============================
// Formulario contacto: animación botón semáforo
// ===============================
const trafficBtn = document.querySelector('.traffic-light-btn');
if (trafficBtn) {
  trafficBtn.addEventListener('mousedown', () => {
    trafficBtn.style.transform = 'scale(0.95)';
    trafficBtn.style.boxShadow = '0 2px 8px #00ff00';
  });
  trafficBtn.addEventListener('mouseup', () => {
    trafficBtn.style.transform = '';
    trafficBtn.style.boxShadow = '';
  });
}

// ===============================
// Jueguito de carrera (index): mini juego tipo runner
// ===============================
window.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('raceGame');
  if (!canvas) return; // Solo ejecuta si existe el canvas
  const ctx = canvas.getContext('2d');
  // Imagen SVG de una persona con traje de carrera y casco morado (como DataURL)
  const racerImg = new Image();
  racerImg.src = 'data:image/svg+xml;utf8,<svg width="48" height="32" viewBox="0 0 48 32" xmlns="http://www.w3.org/2000/svg"><g><ellipse cx="24" cy="28" rx="12" ry="4" fill="%23232323" opacity="0.25"/><g><circle cx="24" cy="16" r="10" fill="%236C0BA9" stroke="%23000" stroke-width="2"/><ellipse cx="24" cy="13" rx="6" ry="4" fill="%23fff" stroke="%23000" stroke-width="1.5"/><ellipse cx="24" cy="13" rx="4" ry="2.5" fill="%234e2a7f" opacity="0.7"/><rect x="18" y="20" width="12" height="7" rx="4" fill="%236C0BA9" stroke="%23000" stroke-width="2"/><rect x="21" y="23" width="6" height="3" rx="1.5" fill="%23fff" opacity="0.7"/><rect x="13" y="18" width="4" height="10" rx="2" fill="%236C0BA9" stroke="%23000" stroke-width="1.5"/><rect x="31" y="18" width="4" height="10" rx="2" fill="%236C0BA9" stroke="%23000" stroke-width="1.5"/></g></g></svg>';
  let carY = 70, carVY = 0, gravity = 0.7, jump = -10;
  let obstacles = [], frame = 0, score = 0, gameOver = false;

  // Dibuja la personita con casco morado en el canvas
  function drawCar() {
    ctx.save();
    ctx.drawImage(racerImg, 30, carY, 48, 32);
    ctx.restore();
  }
  // Dibuja los obstáculos (barreras moradas)
  function drawObstacle(obs) {
    ctx.save();
    ctx.fillStyle = '#6C0BA9';
    ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
    ctx.restore();
  }
  // Reinicia el juego
  function resetGame() {
    carY = 70; carVY = 0; frame = 0; score = 0; gameOver = false;
    obstacles = [];
    loop();
  }
  // Bucle principal del juego
  function loop() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    // Dibuja la pista
    ctx.fillStyle = '#bfc0c0';
    ctx.fillRect(0, 100, canvas.width, 20);
    ctx.fillStyle = '#232323';
    ctx.fillRect(0, 110, canvas.width, 10);
    // Líneas blancas de la pista
    for(let i=0;i<canvas.width;i+=40){
      ctx.fillStyle = '#fff';
      ctx.fillRect(i, 115, 20, 3);
    }
    // Dibuja el carro
    drawCar();
    // Dibuja los obstáculos
    for (let obs of obstacles) drawObstacle(obs);
    // Muestra el puntaje
    ctx.fillStyle = '#6C0BA9';
    ctx.font = 'bold 18px Rajdhani';
    ctx.fillText('Puntos: '+score, 220, 30);
    // Lógica del juego
    if (!gameOver) {
      carVY += gravity; // Aplica gravedad
      carY += carVY; // Actualiza posición vertical
      if (carY > 70) { carY = 70; carVY = 0; } // Limita el suelo
      if (frame % 70 === 0) {
        obstacles.push({x:340, y:90, w:18, h:28}); // Añade obstáculos periódicamente
      }
      for (let obs of obstacles) {
        obs.x -= 4; // Mueve obstáculos a la izquierda
        // Colisión entre carro y obstáculo
        if (obs.x < 60 && obs.x+obs.w > 30 && carY+32 > obs.y) {
          gameOver = true;
        }
      }
      obstacles = obstacles.filter(obs => obs.x+obs.w>0); // Elimina obstáculos fuera de pantalla
      if (frame % 70 === 0) score++; // Suma puntos
      frame++;
      if (!gameOver) requestAnimationFrame(loop); // Sigue el juego
      else {
        // Muestra mensaje de Game Over
        ctx.fillStyle = '#ff0000';
        ctx.font = 'bold 22px Rajdhani';
        ctx.fillText('¡Game Over!', 110, 60);
        ctx.font = '16px Rajdhani';
        ctx.fillText('Presiona R para reiniciar', 100, 85);
      }
    }
  }
  // Inicia el juego cuando la imagen del carro está cargada
  racerImg.onload = () => loop();
  // Control de salto y reinicio
  document.addEventListener('keydown', function(e) {
    if (e.code === 'Space' && carY >= 70 && !gameOver) {
      carVY = jump; // Salta
    }
    if (e.code === 'KeyR' && gameOver) {
      resetGame(); // Reinicia
    }
  });
});
