/**
 * ElettricaMente S.R.L. - Core JavaScript
 * Gestione animazioni, Simulatore HMI e Portfolio Dinamico
 */

document.addEventListener("DOMContentLoaded", function() {

    /* --- DATABASE PROGETTI --- */
    // Qui puoi aggiungere infiniti progetti. 
    // Ricordati di mettere i nomi corretti delle tue immagini nella cartella assets/img/
    const projectsData = [
        { 
            id: 1, 
            title: "Armadio Elettrico Industriale", 
            category: "Elettrico", 
            desc: "Progettazione e cablaggio di un quadro generale di distribuzione per stabilimento tessile.", 
            specs: ["Potenza: 400kVA", "Componenti: Schneider", "Normativa: CEI EN 61439"], 
            images: ["assets/img/progetto1_1.jpg", "assets/img/progetto1_2.jpg"] 
        },
        { 
            id: 2, 
            title: "Automazione Forno Vapore", 
            category: "Automazione", 
            desc: "Sistema di controllo basato su PLC con gestione PID per la regolazione precisa della temperatura.", 
            specs: ["PLC: Schneider M241", "HMI: Magelis 7\"", "Protocollo: Modbus TCP"], 
            images: ["assets/img/progetto2_1.jpg", "assets/img/progetto2_2.jpg"] 
        },
        { 
            id: 3, 
            title: "PCB Controllo Pneumatico", 
            category: "PCB", 
            desc: "Sviluppo scheda elettronica custom per l'interfacciamento di valvole pneumatiche ad alta velocità.", 
            specs: ["Software: Altium", "Layer: 4", "MCU: STM32"], 
            images: ["assets/img/progetto3_1.jpg", "assets/img/progetto3_2.jpg"] 
        },
        { 
            id: 4, 
            title: "Smart Building KNX", 
            category: "Domotica", 
            desc: "Integrazione completa di luci, termoregolazione e scenari per uffici direzionali.", 
            specs: ["Standard: KNX", "Supervisione: Ilevia", "Dispositivi: Ekinex"], 
            images: ["assets/img/progetto4_1.jpg", "assets/img/progetto4_2.jpg"] 
        },
        { 
            id: 5, 
            title: "Quadro Automazione PLC", 
            category: "Automazione", 
            desc: "Cablaggio bordo macchina per linea di produzione automatizzata.", 
            specs: ["PLC: Siemens S7-1200", "Safety: Pilz", "IO-Link"], 
            images: ["assets/img/progetto5_1.jpg"] 
        }
    ];

    /* --- GESTIONE PORTFOLIO DINAMICO --- */
    const projectsGrid = document.getElementById('projects-grid');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    let activeFilter = 'all';
    let showAll = false;
    const VISIBLE_LIMIT = 3; // Quanti progetti mostrare inizialmente

    function renderProjects() {
        if (!projectsGrid) return;
        projectsGrid.innerHTML = '';

        // Filtra i dati
        const filtered = projectsData.filter(p => activeFilter === 'all' || p.category === activeFilter);

        filtered.forEach((prj, index) => {
            const isHidden = (!showAll && index >= VISIBLE_LIMIT) ? 'hidden' : '';
            
            const card = document.createElement('div');
            card.className = `project-card ${isHidden}`;
            card.innerHTML = `
                <div class="project-img">
                    <div class="img-placeholder" style="background-image: url('${prj.images[0]}')"></div>
                </div>
                <div class="project-info">
                    <span class="category">${prj.category}</span>
                    <h4>${prj.title}</h4>
                </div>
            `;
            
            card.onclick = () => openModal(prj.id);
            projectsGrid.appendChild(card);
        });

        // Gestione visibilità tasto "Mostra Altri"
        if (filtered.length <= VISIBLE_LIMIT || showAll) {
            loadMoreBtn.parentElement.style.display = 'none';
        } else {
            loadMoreBtn.parentElement.style.display = 'block';
        }
    }

    // Listener Filtri
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeFilter = btn.dataset.filter;
            showAll = false; // Reset visualizzazione
            renderProjects();
        });
    });

    // Listener Load More
    loadMoreBtn.onclick = () => {
        showAll = true;
        renderProjects();
    };

    /* --- MODAL LOGIC --- */
    const modal = document.getElementById('project-modal');
    
    function openModal(id) {
        const prj = projectsData.find(p => p.id === id);
        if(!prj) return;

        document.getElementById('modal-title').innerText = prj.title;
        document.getElementById('modal-desc').innerText = prj.desc;
        document.getElementById('modal-tags').innerHTML = `<span class="tag">${prj.category}</span>`;
        document.getElementById('modal-specs').innerHTML = prj.specs.map(s => `<li>${s}</li>`).join('');
        
        const mainImg = document.getElementById('modal-main-img');
        mainImg.src = prj.images[0];

        const thumbContainer = document.getElementById('modal-thumbnails');
        thumbContainer.innerHTML = '';
        prj.images.forEach(imgSrc => {
            const img = document.createElement('img');
            img.src = imgSrc;
            img.className = 'thumb';
            img.onclick = () => mainImg.src = imgSrc;
            thumbContainer.appendChild(img);
        });

        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    document.querySelector('.close-modal').onclick = () => {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    };

    /* --- ANIMAZIONE TYPEWRITER --- */
    const typeText = ["Automazione Industriale", "Sistemi KNX", "Progettazione PCB", "Quadri Elettrici"];
    let charIdx = 0, textIdx = 0;
    function type() {
        const target = document.getElementById('typing-placeholder');
        if(!target) return;
        const current = typeText[textIdx];
        target.innerText = current.substring(0, charIdx++);
        if(charIdx > current.length) {
            charIdx = 0; textIdx = (textIdx + 1) % typeText.length;
            setTimeout(type, 2000);
        } else {
            setTimeout(type, 100);
        }
    }

    /* --- CUBE CONTROL --- */
    const cube = document.getElementById('hero-cube');
    const cubeStates = ['show-front', 'show-right', 'show-back', 'show-left', 'show-top', 'show-bottom'];
    let cubeIdx = 0;
    setInterval(() => {
        if(!cube) return;
        cube.className = 'cube ' + cubeStates[cubeIdx];
        cubeIdx = (cubeIdx + 1) % cubeStates.length;
    }, 3000);

    /* --- MOBILE MENU --- */
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.mobile-menu');
    burger.onclick = () => {
        nav.classList.toggle('active');
        burger.classList.toggle('toggle');
    };

    // Inizializzazione Generale
    renderProjects();
    type();
});
