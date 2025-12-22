document.addEventListener("DOMContentLoaded", function() {
    const typeText = ["Impianti Elettrici", "Automazioni", "Impianti tecnologici"];
    let count=0, index=0, currentText="", letter="";
    (function type(){
        let el = document.getElementById('typing-placeholder');
        if(!el) return;
        if(count===typeText.length)count=0; currentText=typeText[count]; letter=currentText.slice(0,++index);
        el.textContent=letter;
        if(letter.length===currentText.length){count++;index=0;setTimeout(type,2000);}else{setTimeout(type,100);}
    })();

    const heroCube = document.getElementById('hero-cube');
    if(heroCube) {
        let currentIndex = 0;
        const cubeStates = ['show-front', 'show-right', 'show-back', 'show-left', 'show-top', 'show-bottom'];
        setInterval(() => {
            currentIndex = (currentIndex + 1) % cubeStates.length;
            heroCube.className = 'cube ' + cubeStates[currentIndex];
        }, 3000);
    }

    const canvas = document.getElementById('circuit-canvas');
    if(canvas) {
        const ctx = canvas.getContext('2d');
        let w = canvas.width = window.innerWidth, h = canvas.height = window.innerHeight;
        function draw() {
            ctx.clearRect(0,0,w,h);
            ctx.fillStyle = "rgba(0, 242, 255, 0.1)";
            for(let i=0; i<30; i++) ctx.fillRect(Math.random()*w, Math.random()*h, 2, 2);
            requestAnimationFrame(draw);
        }
        draw();
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('visible'); });
    });
    document.querySelectorAll('.fade-init').forEach(el => observer.observe(el));
});
