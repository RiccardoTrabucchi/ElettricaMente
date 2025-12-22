document.addEventListener("DOMContentLoaded", function() {

    /* --- DATABASE PROGETTI (JSON-LIKE) --- */
    const projectsData = [
        { id: 1, title: "Armadio Elettrico", category: "Distribuzione", desc: "Cablaggio retail Subdued.", img: "https://picsum.photos/id/1/800/600" },
        { id: 2, title: "Villa Automata", category: "Domotica", desc: "Sistema KNX residenziale.", img: "https://picsum.photos/id/2/800/600" },
        { id: 3, title: "PCB Custom", category: "PCB", desc: "Design driver elettrovalvole.", img: "https://picsum.photos/id/3/800/600" },
        { id: 4, title: "Quadro Pompe", category: "Distribuzione", desc: "Automazione acque industriali.", img: "https://picsum.photos/id/4/800/600" },
        { id: 5, title: "Smart Office", category: "Domotica", desc: "Gestione uffici intelligenti.", img: "https://picsum.photos/id/5/800/600" }
    ];

    let currentFilter = "all";
    let showAll = false;

    /* --- FUNZIONE RENDER PROGETTI (Evita incolonnamento) --- */
    function renderProjects() {
        const grid = document.getElementById('projects-grid');
        if(!grid) return;
        grid.innerHTML = "";

        const filtered = currentFilter === "all" ? projectsData : projectsData.filter(p => p.category === currentFilter);
        const toDisplay = showAll ? filtered : filtered.slice(0, 3);

        toDisplay.forEach(p => {
            const card = document.createElement('div');
            card.className = "project-card fade-init visible";
            card.innerHTML = `
                <img src="${p.img}" alt="${p.title}" loading="lazy">
                <div class="project-info"><h4>${p.title}</h4><span>${p.category}</span></div>
            `;
            card.onclick = () => {
                document.getElementById('modal-main-img').src = p.img;
                document.getElementById('modal-title').innerText = p.title;
                document.getElementById('modal-desc').innerText = p.desc;
                document.getElementById('project-modal').classList.add('show');
            };
            grid.appendChild(card);
        });

        document.getElementById('load-more-container').style.display = (filtered.length > 3 && !showAll) ? "block" : "none";
    }

    /* --- FILTRI E CARICA ALTRI --- */
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            showAll = false;
            renderProjects();
        };
    });

    document.getElementById('load-more-btn').onclick = () => { showAll = true; renderProjects(); };
    document.querySelector('.close-modal').onclick = () => document.getElementById('project-modal').classList.remove('show');

    /* --- ANIMAZIONI ORIGINALI (TYPEWRITER) --- */
    const typeWords = ["Automazione PLC", "Impianti KNX", "Engineering Elettronico"];
    let i=0, j=0, del=false;
    function type() {
        const curr = typeWords[i];
        const el = document.getElementById('typing-placeholder');
        if(!el) return;
        el.textContent = del ? curr.substring(0, j--) : curr.substring(0, j++);
        if(!del && j > curr.length) { del=true; setTimeout(type, 2000); }
        else if(del && j < 0) { del=false; i=(i+1)%typeWords.length; setTimeout(type, 500); }
        else { setTimeout(type, del ? 50 : 100); }
    }

    /* --- ANIMAZIONE CUBO ORIGINALE --- */
    const cube = document.getElementById('hero-cube');
    const states = ['show-front', 'show-right', 'show-back', 'show-left', 'show-top', 'show-bottom'];
    let stateI = 0;
    setInterval(() => {
        if(cube) {
            stateI = (stateI + 1) % states.length;
            cube.className = 'cube ' + states[stateI];
        }
    }, 3000);

    /* --- SIMULAZIONE HMI ORIGINALE --- */
    let tank = 10;
    setInterval(() => {
        tank = (tank + 1) % 100;
        const liq = document.getElementById('hmi-liquid');
        if(liq) liq.style.height = tank + "%";
        if(document.getElementById('hmi-level')) document.getElementById('hmi-level').innerText = tank + "%";
        if(document.getElementById('sys-led')) document.getElementById('sys-led').classList.add('active');
        if(document.getElementById('hmi-motor-icon')) document.getElementById('hmi-motor-icon').style.animation = "spin 2s linear infinite";
    }, 500);

    /* --- CANVAS BACKGROUND ORIGINALE --- */
    const canvas = document.getElementById('circuit-canvas');
    if(canvas) {
        const ctx = canvas.getContext('2d');
        let w = canvas.width = window.innerWidth;
        let h = canvas.height = window.innerHeight;
        function draw() {
            ctx.clearRect(0, 0, w, h);
            ctx.fillStyle = "rgba(0, 242, 255, 0.1)";
            for(let k=0; k<40; k++) ctx.fillRect(Math.random()*w, Math.random()*h, 2, 2);
            requestAnimationFrame(draw);
        }
        draw();
    }

    /* --- INIZIALIZZAZIONE --- */
    type();
    renderProjects();
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
    });
    document.querySelectorAll('.fade-init').forEach(el => obs.observe(el));
});
