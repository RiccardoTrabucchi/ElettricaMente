document.addEventListener("DOMContentLoaded", function() {

    /* --- DATABASE PROGETTI --- */
    const PROJECTS_DB = [
        { id: 1, title: "Armadio Elettrico", category: "Distribuzione", desc: "Cablaggio power center Subdued.", img: "https://picsum.photos/id/101/800/600", specs: ["Schneider", "Monitoraggio Energia"] },
        { id: 2, title: "Stabilimento KNX", category: "Domotica", desc: "Integrazione domotica industriale.", img: "https://picsum.photos/id/102/800/600", specs: ["KNX", "DALI Control"] },
        { id: 3, title: "Schede PCB Cilindri", category: "PCB", desc: "Progetto custom cilindri pneumatici.", img: "https://picsum.photos/id/103/800/600", specs: ["Altium", "Assemblaggio SMD"] },
        { id: 4, title: "Automazione PLC", category: "Distribuzione", desc: "Revamping logica linea 1.", img: "https://picsum.photos/id/104/800/600", specs: ["Siemens S7-1200"] },
        { id: 5, title: "Villa Intelligente", category: "Domotica", desc: "Gestione residenziale completa.", img: "https://picsum.photos/id/106/800/600", specs: ["KNX", "Sicurezza"] },
        { id: 6, title: "Driver Elettronico", category: "PCB", desc: "Design driver alta potenza.", img: "https://picsum.photos/id/107/800/600", specs: ["Altium Designer"] }
    ];

    /* --- LOGICA PROGETTI DINAMICI --- */
    let filter = "all";
    let showAll = false;

    function renderProjects() {
        const grid = document.getElementById('projects-grid');
        const loadMoreContainer = document.getElementById('load-more-container');
        if(!grid) return;

        grid.innerHTML = "";

        const filtered = filter === "all" ? PROJECTS_DB : PROJECTS_DB.filter(p => p.category === filter);
        const toShow = showAll ? filtered : filtered.slice(0, 3);

        toShow.forEach(prj => {
            const card = document.createElement('div');
            card.className = "project-card fade-init visible";
            card.innerHTML = `
                <img src="${prj.img}" alt="${prj.title} - ElettricaMente" loading="lazy">
                <div class="project-info">
                    <h4>${prj.title}</h4>
                    <span class="category">${prj.category}</span>
                </div>
            `;
            card.onclick = () => openModal(prj.id);
            grid.appendChild(card);
        });

        if (loadMoreContainer) {
            loadMoreContainer.style.display = (filtered.length > 3 && !showAll) ? "block" : "none";
        }
    }

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filter = btn.dataset.filter;
            showAll = false;
            renderProjects();
        };
    });

    const loadBtn = document.getElementById('load-more-btn');
    if(loadBtn) loadBtn.onclick = () => { showAll = true; renderProjects(); };

    /* --- MODAL --- */
    function openModal(id) {
        const p = PROJECTS_DB.find(prj => prj.id === id);
        const modal = document.getElementById('project-modal');
        if(p && modal) {
            document.getElementById('modal-main-img').src = p.img;
            document.getElementById('modal-title').innerText = p.title;
            document.getElementById('modal-desc').innerText = p.desc;
            document.getElementById('modal-specs').innerHTML = p.specs.map(s => `<li>${s}</li>`).join('');
            modal.style.display = "flex";
            document.body.classList.add('modal-open');
        }
    }
    document.querySelector('.close-modal').onclick = () => {
        document.getElementById('project-modal').style.display = "none";
        document.body.classList.remove('modal-open');
    };

    /* --- ANIMAZIONI ORIGINALI (Sfondo, Cubo, Typewriter, HMI) --- */
    
    // Typewriter
    const typeWords = ["Automazione PLC", "Impianti KNX", "Engineering Elettronico"];
    let wordI = 0, charI = 0, isDeleting = false;
    (function type() {
        const current = typeWords[wordI];
        const el = document.getElementById('typing-placeholder');
        if(!el) return;
        el.textContent = isDeleting ? current.substring(0, charI--) : current.substring(0, charI++);
        if(!isDeleting && charI > current.length) { isDeleting = true; setTimeout(type, 2000); }
        else if(isDeleting && charI < 0) { isDeleting = false; wordI = (wordI + 1) % typeWords.length; setTimeout(type, 500); }
        else { setTimeout(type, isDeleting ? 50 : 100); }
    })();

    // Cube
    const cubeStates = ['show-front', 'show-right', 'show-back', 'show-left', 'show-top', 'show-bottom'];
    let stateI = 0;
    setInterval(() => {
        const c = document.getElementById('hero-cube');
        if(c) {
            stateI = (stateI + 1) % cubeStates.length;
            c.className = 'cube ' + cubeStates[stateI];
        }
    }, 3000);

    // HMI
    let lvl = 10;
    setInterval(() => {
        lvl = (lvl + 1) % 100;
        const liq = document.getElementById('hmi-liquid');
        if(liq) liq.style.height = lvl + "%";
        if(document.getElementById('hmi-level')) document.getElementById('hmi-level').innerText = lvl + "%";
        if(document.getElementById('sys-led')) document.getElementById('sys-led').classList.add('active');
        if(document.getElementById('hmi-motor-icon')) document.getElementById('hmi-motor-icon').style.animation = "spin 2s linear infinite";
    }, 500);

    // Canvas Background
    const canvas = document.getElementById('circuit-canvas');
    if(canvas) {
        const ctx = canvas.getContext('2d');
        let w = canvas.width = window.innerWidth, h = canvas.height = window.innerHeight;
        function draw() {
            ctx.clearRect(0, 0, w, h);
            ctx.fillStyle = "rgba(0, 242, 255, 0.05)";
            for(let k=0; k<40; k++) ctx.fillRect(Math.random()*w, Math.random()*h, 2, 2);
            requestAnimationFrame(draw);
        }
        draw();
    }

    // Burger
    const burger = document.querySelector('.burger');
    if(burger) burger.onclick = () => document.querySelector('.mobile-menu').classList.toggle('active');

    // Init
    renderProjects();
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
    });
    document.querySelectorAll('.fade-init').forEach(el => obs.observe(el));
});
