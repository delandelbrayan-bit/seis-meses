const backgroundMusic = document.getElementById("backgroundMusic");
const backgroundToggle = document.getElementById("backgroundToggle");

const audio = document.getElementById("karaokeAudio");
const playButton = document.getElementById("playKaraoke");
const progress = document.getElementById("progress");
const currentTimeLabel = document.getElementById("currentTime");
const durationLabel = document.getElementById("duration");

const previousLine = document.getElementById("previousLine");
const currentLine = document.getElementById("currentLine");
const nextLine = document.getElementById("nextLine");

const karaokeSection = document.getElementById("karaoke");
const showKaraoke = document.getElementById("showKaraoke");

// Fecha en la que comenzó la relación.
const startDate = new Date(2026, 3, 19);
const daysTogether = Math.max(
  0,
  Math.floor((new Date() - startDate) / 86400000)
);

document.getElementById("days").textContent = daysTogether;

/*
  KARAOKE:
  Cambia cada texto por una línea de la letra que tengas derecho
  a utilizar y ajusta "time" al segundo en que debe aparecer.

  Los tiempos están expresados en segundos.
  Ejemplo: 1:15 = 75 segundos.

  Los textos incluidos son marcadores de posición, no la letra real.
*/
const lyrics = [
  { time: 0, text: "Nuestra canción comienza, Nadia ♥" },
  { time: 8, text: "Tan pronto yo te vi" },
  { time: 14, text: "No pude descubrir" },
  { time: 17, text: "El amor a primera vista no funciona en mí" },
  { time: 24, text: "Después de amarte, comprendí" },
  { time: 28, text: "Que no estaría tan mal" },
  { time: 34, text: "Probar tu otra mitad" },
  { time: 37, text: "No me importó si arruinaríamos nuestra amistad" },
  { time: 44, text: "No me importó, ya que más da" },
  { time: 48, text: "Éramos tan buenos amigos hasta hoy" },
  { time: 50, text: "Que yo probé tu desempeño en el amor" },
  { time: 53, text: "Me aproveché de que habíamos tomado tanto te fuiste dejando y te agarré" },
  { time: 58, text: "A pesar de saber que estaba todo mal Lo continuamos hasta juntos terminar" },
  { time: 64, text: "Cuando caímos en lo que estaba pasando Te seguí besando y fue" },
  { time: 70, text: "Solo tú, no necesito más te adoraría lo que dura la eternidad" },
  { time: 74, text: "Debes ser perfecta para Perfecto para Perfecta para mí, mi amor" },
  { time: 81, text: "¿Cómo fue que de papel cambié? Eras mi amiga y ahora eres mi mujer" },
  { time: 86, text: "Debe ser perfectamente, exactamente Lo que yo siempre soñé" },
  { time: 92, text: "El tiempo que pasó" },
  { time: 100, text: "Resultó aún mejor Nos conocíamos de antes y sabíamos Lo que queríamos los dos" },
  { time: 116, text: "Entonces el amor nos tiene de rehén" },
  { time: 125, text: "Seré tu eterna enamorada Y te aseguro que Todas las noches te amaré" },
  { time: 134, text: "Éramos tan buenos amigos hasta hoy Que yo probé tu desempeño en el amor Me aproveché de que habíamos tomado tanto Te fuiste dejando y te agarré" },
  { time: 146, text: "A pesar de saber que estaba todo mal Lo continuamos hasta juntos terminar Cuando caímos en lo que estaba pasando Te seguí besando y fue" },
  { time: 157, text: "Solo tú, no necesito más Te adoraría lo que dura la eternidad Debes ser perfecta para Perfecto para Perfecta para mí, mi amor" },
  { time: 168, text: "¿Cómo fue que de papel cambie? Eras mi amiga y ahora eres mi mujer Debe ser perfectamente, exactamente Lo que yo siempre soñé" },
  { time: 180, text: "Solo tú, no necesito más Te adoraría lo que dura la eternidad Debes ser perfecta para Perfecto para Perfecta para mí, mi amor" },
  { time: 191, text: "¿¿Cómo fue que de papel cambié? (¿cómo fue?) Eras mi amiga y ahora eres mi mujer Debe ser perfectamente, exactamente Lo que yo siempre soñé" },
  { time: 202, text: "Solo tú, no necesito más Te adoraría lo que dura la eternidad Debes ser perfecta para Perfecto para mí, mi amor" },
  { time: 213, text: "¿¿Cómo fue que de papel cambié? Eras mi amiga y ahora eres mi mujer Debe ser perfectamente, exactamente Lo que yo siempre soñé" }
];

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

// Encuentra la línea correspondiente al segundo actual.
function updateLyrics() {
  const time = audio.currentTime;
  let index = -1;

  for (let i = 0; i < lyrics.length; i++) {
    if (time >= lyrics[i].time) {
      index = i;
    } else {
      break;
    }
  }

  previousLine.textContent =
    index > 0 ? lyrics[index - 1].text : "";

  currentLine.textContent =
    index >= 0 ? lyrics[index].text : "Prepárate, mi amor ♥";

  nextLine.textContent =
    index < lyrics.length - 1
      ? lyrics[index + 1].text
      : "Fin de nuestra canción ♥";
}

// Abrir la sorpresa.
showKaraoke.addEventListener("click", () => {
  backgroundMusic.pause();
  backgroundToggle.textContent = "♫ Música de fondo";

  karaokeSection.classList.add("visible");
  karaokeSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});

// Reproducir y pausar el karaoke.
playButton.addEventListener("click", async () => {
  if (audio.paused) {
    backgroundMusic.pause();
    backgroundToggle.textContent = "♫ Música de fondo";

    try {
      await audio.play();
    } catch (error) {
      currentLine.textContent = "No se pudo reproducir el audio.";
      nextLine.textContent =
        "Comprueba que perfecta.mp3 esté junto a index.html.";
    }
  } else {
    audio.pause();
  }
});

// Actualización continua mientras suena la canción.
audio.addEventListener("timeupdate", () => {
  currentTimeLabel.textContent = formatTime(audio.currentTime);
  progress.value = audio.currentTime;
  updateLyrics();
});

audio.addEventListener("loadedmetadata", () => {
  progress.max = audio.duration;
  durationLabel.textContent = formatTime(audio.duration);
});

audio.addEventListener("play", () => {
  playButton.textContent = "Ⅱ";
});

audio.addEventListener("pause", () => {
  playButton.textContent = "▶";
});

audio.addEventListener("ended", () => {
  playButton.textContent = "▶";
  currentLine.textContent = "Gracias por estos seis meses, Nadia ♥";
  previousLine.textContent = "";
  nextLine.textContent = "Te quiero muchísimo.";
  progress.value = 0;
});

// Saltar a cualquier parte de la canción.
progress.addEventListener("input", () => {
  audio.currentTime = Number(progress.value);
  updateLyrics();
});

// Música de fondo original: requiere que el usuario pulse el botón.
backgroundToggle.addEventListener("click", async () => {
  if (backgroundMusic.paused) {
    audio.pause();

    try {
      await backgroundMusic.play();
      backgroundToggle.textContent = "♫ Pausar música";
    } catch (error) {
      backgroundToggle.textContent = "No se pudo reproducir";
    }
  } else {
    backgroundMusic.pause();
    backgroundToggle.textContent = "♫ Música de fondo";
  }
});

// Crear estrellas decorativas.
const stars = document.getElementById("stars");

for (let i = 0; i < 55; i++) {
  const star = document.createElement("span");
  star.className = "star";
  star.textContent = "✦";
  star.style.left = Math.random() * 100 + "%";
  star.style.top = Math.random() * 100 + "%";
  star.style.fontSize = `${Math.random() * 9 + 5}px`;
  star.style.animationDelay = `${Math.random() * 3}s`;
  stars.appendChild(star);
}

// Corazones flotantes.
const hearts = document.getElementById("hearts");

function createHeart() {
  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent = Math.random() > 0.5 ? "♥" : "♡";
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${Math.random() * 18 + 12}px`;
  heart.style.animationDuration = `${Math.random() * 5 + 7}s`;

  hearts.appendChild(heart);

  setTimeout(() => heart.remove(), 13000);
}

setInterval(createHeart, 1200);