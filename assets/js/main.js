/**
 * ElettricaMente S.R.L. - Core System JS
 * Gestione animazioni, Simulazione HMI e Portfolio Dinamico
 */

document.addEventListener("DOMContentLoaded", function() {

    /* --- DATA: DATABASE PROGETTI --- */
    // Qui puoi aggiungere infiniti progetti senza rompere il layout
    const projectsData = [
        { 
            id: 1, 
            title: "Armadio Elettrico Subdued", 
            category: "Elettrico", 
            desc: "Cablaggio quadro generale di distribuzione per settore retail.", 
            specs: ["Schneider Electric", "Modbus", "Sicurezza CEI"], 
            images: ["assets/img/p1.jpg"] 
        },
        { 
            id: 2, 
            title: "Capannone Domotico Alimentare", 
            category: "Domotica", 
            desc: "Integrazione KNX per gestione illuminazione intelligente.", 
            specs: ["KNX Standard", "Ilevia Server", "Energy Saving"], 
            images: ["assets/img/p2.jpg"] 
        },
        { 
            id: 3, 
            title: "PCB Cilindri Pneumatici", 
            category: "PCB", 
            desc: "Progettazione scheda custom per controllo elettrovalvole.", 
            specs: ["Altium Designer", "Assemblaggio SMT", "Custom Logics"], 
            images: ["assets/img/p3.jpg"] 
        },
        { 
            id: 4, 
            title: "Automazione Forno Industriale", 
            category: "Automazione", 
            desc: "Controllo temperatura PID e gestione ricette tramite HMI.", 
            specs: ["PLC Schneider", "Magelis HMI", "Controllo PID"], 
            images: ["assets/img/p4.jpg"] 
        }
    ];

    /* --- LOGICA PORTFOLIO DINAMICO --- */
    const projectsGrid = document.getElementById('projects-grid');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    let activeFilter = 'all';
    let isExpanded = false;
    const LIMIT = 3; // Quanti progetti mostrare inizialmente

    function renderProjects() {
        if (!projectsGrid) return;
        projectsGrid.innerHTML = '';

        // Filtriamo i dati in base al tag selezionato
        const filtered = projectsData.filter(p => activeFilter === 'all' || p.category === activeFilter);

        filtered.forEach((prj, index) => {
            // Nascondi se superano il limite e non è cliccato "espandi"
            const isHidden = (!isExpanded && index >= LIMIT) ? 'hidden' : '';
            
            const card = document.createElement('div');
            card.className = `project-card ${isHidden}`;
            
            // SEO: alt tag dinamico e loading lazy per performance
            card.innerHTML = `
                <div class="project-img">
                    <img src="${prj.images[0]}" alt="ElettricaMente Progetto ${prj.title}" loading="lazy">
                </div>
                <div class="project-info">
                    <span class="category text-teal">${prj.category}</span>
                    <h4>${prj.title}</h4>
                </div>
            `;
            
            card.onclick = () => openModal(prj.id);
            projectsGrid.appendChild(card);
        });

        // Mostra/Nascondi tasto "Vedi Altri"
        if (filtered.length <= LIMIT || isExpanded) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-block';
        }
    }

    // Listener per i Filtri
    filterBtns.forEach(btn => {
        btn.onclick = () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeFilter = btn.dataset.filter;
            isExpanded = false; // Resettiamo l'espansione al cambio filtro
            renderProjects();
        };
    });

    // Listener per Carica Altri
    loadMoreBtn.onclick = () => {
        isExpanded = true;
        renderProjects();
    };

    /* --- MODAL LOGIC --- */
    const modal = document.getElementById('project-modal');
    const modalMainImg = document.getElementById('modal-main-img');

    function openModal(id) {
        const prj = projectsData.find(p => p.id === id);
        if(!prj) return;

        document.getElementById('modal-title').innerText = prj.title;
        document.getElementById('modal-desc').innerText = prj.desc;
        document.getElementById('modal-tags').innerHTML = `<span class="tech-badge">${prj.category}</span>`;
        document.getElementById('modal-specs').innerHTML = prj.specs.map(s => `<li>${s}</li>`).join('');
        
        modalMainImg.src = prj.images[0];
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    const closeModal = () => {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    };

    document.querySelector('.close-modal').onclick = closeModal;
    document.querySelector('.modal-backdrop').onclick = closeModal;

    /* --- ANIMAZIONE TYPEWRITER --- */
    const typeStrings = ["Automazioni Industriali", "Building Automation KNX", "Progettazione Elettronica", "Impianti Tecnologici"];
    let stringIdx = 0, charIdx = 0;
    function type() {
        const target = document.getElementById('typing-placeholder');
        if(!target) return;
        target.innerText = typeStrings[stringIdx].substring(0, charIdx++);
        if(charIdx > typeStrings[stringIdx].length) {
            charIdx = 0; stringIdx = (stringIdx + 1) % typeStrings.length;
            setTimeout(type, 2000);
        } else {
            setTimeout(type, 100);
        }
    }

    /* --- CUBO SYNC --- */
    const cube = document.getElementById('hero-cube');
    const cubeData = [
        { class: 'show-front', t: 'Electronics', d: 'PCB Design' },
        { class: 'show-right', t: 'Networking', d: 'Fiber & Copper' },
        { class: 'show-back', t: 'Automation', d: 'PLC Logic' },
        { class: 'show-left', t: '3D Printing', d: 'Prototyping' },
        { class: 'show-top', t: 'Security', d: 'CCTV & Fire' },
        { class: 'show-bottom', t: 'Power', d: 'LV/MV Systems' }
    ];
    let cubeIdx = 0;
    setInterval(() => {
        if(!cube) return;
        cube.className = 'cube ' + cubeData[cubeIdx].class;
        document.getElementById('cube-title').innerText = cubeData[cubeIdx].t;
        document.getElementById('cube-desc').innerText = cubeData[cubeIdx].d;
        cubeIdx = (cubeIdx + 1) % cubeData.length;
    }, 3000);

    /* --- HMI SIMULATION --- */
    let level = 10, freq = 0;
    setInterval(() => {
        const sysLed = document.getElementById('sys-led');
        const hmiLiquid = document.getElementById('hmi-liquid');
        if(!sysLed || !hmiLiquid) return;

        sysLed.classList.add('active');
        level = level > 90 ? 10 : level + 0.5;
        freq = Math.random() * 50;
        
        hmiLiquid.style.height = level + '%';
        document.getElementById('hmi-level').innerText = Math.round(level) + '%';
        document.getElementById('hmi-freq').innerText = freq.toFixed(1) + ' Hz';
        document.getElementById('hmi-motor-icon').style.transform = `rotate(${Date.now()/5}deg)`;
    }, 200);

    /* --- CANVAS BACKGROUND --- */
    const canvas = document.getElementById('circuit-canvas');
    if(canvas) {
        const ctx = canvas.getContext('2d');
        let w = canvas.width = window.innerWidth, h = canvas.height = window.innerHeight;
        let pts = Array.from({length: 50}, () => ({x: Math.random()*w, y: Math.random()*h, vx: Math.random()-0.5, vy: Math.random()-0.5}));
        function draw() {
            ctx.clearRect(0,0,w,h);
            ctx.fillStyle = "rgba(0, 242, 255, 0.5)";
            pts.forEach(p => {
                p.x += p.vx; p.y += p.vy;
                if(p.x<0||p.x>w) p.vx*=-1; if(p.y<0||p.y>h) p.vy*=-1;
                ctx.beginPath(); ctx.arc(p.x, p.y, 1.5, 0, Math.PI*2); ctx.fill();
            });
            requestAnimationFrame(draw);
        }
        draw();
    }

    /* --- OBSERVER PER FADE-IN --- */
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-init').forEach(el => observer.observe(el));

    // Inizializzazione
    renderProjects();
    type();
});
