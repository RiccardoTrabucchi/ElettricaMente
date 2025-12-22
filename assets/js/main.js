document.addEventListener("DOMContentLoaded", function() {

    /* --- DATABASE PROGETTI (JSON-LIKE) --- */
    const projectsData = [
        { id: 1, title: "Quadro Subdued", category: "Distribuzione", desc: "Distribuzione elettrica retail.", img: "https://picsum.photos/id/1/800/600" },
        { id: 2, title: "Capannone KNX", category: "Domotica", desc: "Automazione industriale KNX.", img: "https://picsum.photos/id/2/800/600" },
        { id: 3, title: "PCB Cilindri", category: "PCB", desc: "Design driver personalizzati.", img: "https://picsum.photos/id/3/800/600" },
        { id: 4, title: "Automazione Linea 1", category: "Distribuzione", desc: "Revamping PLC Siemens.", img: "https://picsum.photos/id/4/800/600" },
        { id: 5, title: "Smart Office", category: "Domotica", desc: "Uffici intelligenti integrati.", img: "https://picsum.photos/id/5/800/600" }
    ];

    let filter = "all";
    let isExpanded = false;

    /* --- FUNZIONE RENDER GALLERIA --- */
    function renderProjects() {
        const grid = document.getElementById('projects-grid');
        if(!grid) return;
        grid.innerHTML = "";

        const filtered = filter === "all" ? projectsData : projectsData.filter(p => p.category === filter);
        const toShow = isExpanded ? filtered : filtered.slice(0, 3);

        toShow.forEach(p => {
            const card = document.createElement('div');
            card.className = "project-card fade-init visible";
            card.innerHTML = `
                <img src="${p.img}" alt="${p.title} - ElettricaMente Lavori" loading="lazy">
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

        const btnContainer = document.getElementById('load-more-container');
        if(btnContainer) btnContainer.style.display = (filtered.length > 3 && !isExpanded) ? "block" : "none";
    }

    /* --- GESTIONE BOTTONI --- */
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

    /* --- TUTTO IL TUO CODICE ORIGINALE SOTTO (IDENTICO) --- */

    // Typewriter Originale
    const typeStrings = ["Impianti Elettrici", "Automazioni PLC", "Engineering"];
    let wordI = 0, charI = 0, del = false;
    function typeEffect() {
        const curr = typeStrings[wordI];
        const el = document.getElementById('typing-placeholder');
        if(!el) return;
        el.textContent = del ? curr.substring(0, charI--) : curr.substring(0, charI++);
        if(!del && charI > curr.length) { del = true; setTimeout(typeEffect, 2000); }
        else if(del && charI < 0) { del = false; wordI = (wordI + 1) % typeStrings.length; setTimeout(typeEffect, 500); }
        else { setTimeout(typeEffect, del ? 50 : 100); }
    }

    // Cubo Originale
    const cube = document.getElementById('hero-cube');
    const states = ['show-front', 'show-right', 'show-back', 'show-left', 'show-top', 'show-bottom'];
    let sI = 0;
    setInterval(() => {
        if(cube) {
            sI = (sI + 1) % states.length;
            cube.className = 'cube ' + states[sI];
        }
    }, 3000);

    // HMI Originale
    let tank = 10;
    setInterval(() => {
        tank = (tank + 1) % 100;
        const liq = document.getElementById('hmi-liquid');
        if(liq) liq.style.height = tank + "%";
        if(document.getElementById('hmi-level')) document.getElementById('hmi-level').innerText = tank + "%";
        if(document.getElementById('sys-led')) document.getElementById('sys-led').classList.add('active');
        const cog = document.getElementById('hmi-motor-icon');
        if(cog) cog.style.animation = "spin 2s linear infinite";
    }, 500);

    // Canvas Background Originale
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

    // Init Finale
    typeEffect();
    renderProjects();
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
    });
    document.querySelectorAll('.fade-init').forEach(el => observer.observe(el));
});
