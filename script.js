// VOICEOVER BUTTON

const btn = document.getElementById("playAudio");
const audio = document.getElementById("voiceover");
let isPlaying = false;

btn.addEventListener("click", () => {
    if(!isPlaying){
        audio.play();
        btn.textContent = "Pause Audio";
        isPlaying = true;
    } else {
        audio.pause();
        btn.textContent = "Hear the City";
        isPlaying = false;
    }
});

audio.addEventListener("ended", () => {
    btn.textContent = "Hear the City";
    isPlaying = false;
});

// SCROLL FADE-IN EFFECT

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
        }
    });
});

document.querySelectorAll(".bubble, .story-img").forEach(el=>{
    el.style.opacity = 0;
    el.style.transform = "translateY(60px)";
    el.style.transition = "1s ease";
    observer.observe(el);
});

