document.addEventListener("DOMContentLoaded", function() {

    /* --- DATABASE PROGETTI (Simil-JSON) --- */
    const projectsData = [
        { id: 1, title: "Armadio Elettrico", category: "Distribuzione", desc: "Distribuzione retail Subdued.", img: "https://picsum.photos/id/1/800/600" },
        { id: 2, title: "Automazione Villa", category: "Domotica", desc: "Integrazione KNX residenziale.", img: "https://picsum.photos/id/2/800/600" },
        { id: 3, title: "PCB Pneumatico", category: "Elettronica", desc: "Scheda controllo cilindri.", img: "https://picsum.photos/id/3/800/600" },
        { id: 4, title: "Quadro Pompe", category: "Distribuzione", desc: "Distribuzione industriale acque.", img: "https://picsum.photos/id/4/800/600" },
        { id: 5, title: "Smart Office", category: "Domotica", desc: "Gestione uffici intelligenti.", img: "https://picsum.photos/id/5/800/600" },
        { id: 6, title: "Scheda Driver PLC", category: "Elettronica", desc: "Progettazione Altium custom.", img: "https://picsum.photos/id/6/800/600" }
    ];

    /* --- GESTIONE GALLERIA DINAMICA --- */
    let filter = "all";
    let isExpanded = false;

    function renderProjects() {
        const grid = document.getElementById('projects-grid');
        if(!grid) return;
        grid.innerHTML = "";

        const filtered = filter === "all" ? projectsData : projectsData.filter(p => p.category === filter);
        const toDisplay = isExpanded ? filtered : filtered.slice(0, 3);

        toDisplay.forEach(p => {
            const card = document.createElement('div');
            card.className = "project-card fade-init visible";
            // Aggiungiamo Lazy Loading e Alt Tag
            card.innerHTML = `
                <img src="${p.img}" alt="${p.title}" loading="lazy">
                <div class="project-info">
                    <h4>${p.title}</h4>
                    <span class="category">${p.category}</span>
                </div>
            `;
            card.onclick = () => {
                document.getElementById('modal-main-img').src = p.img;
                document.getElementById('modal-title').innerText = p.title;
                document.getElementById('modal-desc').innerText = p.desc;
                document.getElementById('project-modal').classList.add('show');
            };
            grid.appendChild(card);
        });

        const btnContainer = document.getElementById('load-more-container');
        if(btnContainer) btnContainer.style.display = (filtered.length > 3 && !isExpanded) ? "block" : "none";
    }

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filter = btn.dataset.filter;
            isExpanded = false;
            renderProjects();
        };
    });

    const loadBtn = document.getElementById('load-more-btn');
    if(loadBtn) loadBtn.onclick = () => { isExpanded = true; renderProjects(); };

    document.querySelector('.close-modal').onclick = () => document.getElementById('project-modal').classList.remove('show');

    /* --- ANIMAZIONI HERO (Cubo & Typewriter) --- */
    const words = ["Impianti Industriali", "Automazione PLC", "Engineering Elettronico"];
    let i=0, j=0, deleting=false;
    function typeEffect() {
        const current = words[i];
        const el = document.getElementById('typing-placeholder');
        if(!el) return;
        el.textContent = deleting ? current.substring(0, j--) : current.substring(0, j++);
        if(!deleting && j > current.length) { deleting = true; setTimeout(typeEffect, 2000); }
        else if(deleting && j < 0) { deleting = false; i = (i + 1) % words.length; setTimeout(typeEffect, 500); }
        else { setTimeout(typeEffect, deleting ? 50 : 100); }
    }

    const cube = document.getElementById('hero-cube');
    const states = ['show-front', 'show-right', 'show-back', 'show-left', 'show-top', 'show-bottom'];
    let stateIdx = 0;
    setInterval(() => {
        if(cube) {
            stateIdx = (stateIdx + 1) % states.length;
            cube.className = 'cube ' + states[stateIdx];
        }
    }, 3000);

    /* --- SIMULAZIONE HMI --- */
    let tankLvl = 10;
    setInterval(() => {
        tankLvl = (tankLvl + 1) % 100;
        const liq = document.getElementById('hmi-liquid');
        if(liq) liq.style.height = tankLvl + "%";
        if(document.getElementById('hmi-level')) document.getElementById('hmi-level').innerText = tankLvl + "%";
        if(document.getElementById('sys-led')) document.getElementById('sys-led').classList.add('active');
        const cog = document.getElementById('hmi-motor-icon');
        if(cog) cog.style.animation = "spin 2s linear infinite";
    }, 500);

    /* --- CANVAS SFONDO (CIRCUITO) --- */
    const canvas = document.getElementById('circuit-canvas');
    if(canvas) {
        const ctx = canvas.getContext('2d');
        let w, h;
        function resize() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
        window.onresize = resize; resize();
        function draw() {
            ctx.clearRect(0, 0, w, h);
            ctx.fillStyle = "rgba(0, 242, 255, 0.1)";
            for(let k=0; k<40; k++) ctx.fillRect(Math.random()*w, Math.random()*h, 2, 2);
            requestAnimationFrame(draw);
        }
        draw();
    }

    /* --- INIZIALIZZAZIONE FINALE --- */
    typeEffect();
    renderProjects();
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
    });
    document.querySelectorAll('.fade-init').forEach(el => observer.observe(el));
});
