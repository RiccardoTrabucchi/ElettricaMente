document.addEventListener("DOMContentLoaded", function() {
    
    const projectsData = [
        { id: 1, title: "Armadio elettrico Subdued", category: "Distribuzione elettrica", desc: "Cablaggio del quadro elettrico generale.", specs: ["Schneider Electric", "Modbus"], images: ["https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"] },
        { id: 2, title: "Capannone domotico", category: "Domotica", desc: "Integrazione KNX industriale.", specs: ["KNX", "Ilevia"], images: ["https://images.unsplash.com/photo-1558002038-1091a1661116?auto=format&fit=crop&w=800&q=80"] },
        { id: 3, title: "PCB personalizzati", category: "PCB", desc: "Design schede custom cilindri pneumatici.", specs: ["PCB", "Altium"], images: ["https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"] }
    ];

    /* --- TYPEWRITER --- */
    const typeText = ["Impianti Elettrici civili e industriali", "Automazioni", "Impianti tecnologici"];
    let count=0, index=0, currentText="", letter="";
    (function type(){
        let el = document.getElementById('typing-placeholder');
        if(!el) return;
        if(count===typeText.length)count=0; currentText=typeText[count]; letter=currentText.slice(0,++index);
        el.textContent=letter;
        if(letter.length===currentText.length){count++;index=0;setTimeout(type,2000);}else{setTimeout(type,100);}
    })();

    /* --- CUBO SYNC --- */
    const heroCube = document.getElementById('hero-cube');
    const cubeStates = ['show-front', 'show-right', 'show-back', 'show-left', 'show-top', 'show-bottom'];
    let cubeIdx = 0;
    setInterval(() => {
        if(heroCube) {
            cubeIdx = (cubeIdx + 1) % cubeStates.length;
            heroCube.className = 'cube ' + cubeStates[cubeIdx];
        }
    }, 3000);

    /* --- HMI SIMULATION --- */
    let level = 10;
    setInterval(() => {
        const liq = document.getElementById('hmi-liquid');
        const txt = document.getElementById('hmi-level');
        if(liq) {
            level = (level + 1) % 100;
            liq.style.height = level + "%";
            if(txt) txt.innerText = level + "%";
            document.getElementById('sys-led').classList.add('active');
            document.getElementById('hmi-motor-icon').style.animation = "spin 2s linear infinite";
        }
    }, 500);

    /* --- CANVAS --- */
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

    /* --- MODAL --- */
    const modal = document.getElementById('project-modal');
    document.querySelectorAll('.project-card').forEach(c => {
        c.onclick = () => {
            const p = projectsData.find(prj => prj.id == c.dataset.id);
            if(p && modal) {
                document.getElementById('modal-title').innerText = p.title;
                document.getElementById('modal-main-img').src = p.images[0];
                modal.classList.add('show');
            }
        };
    });
    document.querySelector('.close-modal').onclick = () => modal.classList.remove('show');

    /* --- MENU MOBILE --- */
    const burger = document.querySelector('.burger');
    if(burger) burger.onclick = () => document.querySelector('.mobile-menu').classList.toggle('active');

    /* --- FADE OBSERVER --- */
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
    });
    document.querySelectorAll('.fade-init').forEach(el => obs.observe(el));
});
