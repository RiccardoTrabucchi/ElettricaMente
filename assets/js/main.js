document.addEventListener("DOMContentLoaded", function() {
    
    // ... Qui lascia tutto il tuo codice originale (Cookie, Typewriter, Cube, HMI, Canvas) ...

    /* --- DATABASE PROGETTI (Inserisci qui i tuoi percorsi foto) --- */
    const projectsData = [
        { 
            id: 1, 
            title: "Armadio elettrico Subdued", 
            category: "Elettrico", 
            desc: "Cablaggio del quadro elettrico generale per un negozio di abbigliamento.", 
            specs: ["Schneider Electric", "Modbus", "Distribuzione"], 
            images: ["assets/img/p1.jpg"] // Sostituisci con le tue foto
        },
        { 
            id: 2, 
            title: "Capannone domotico", 
            category: "Domotica", 
            desc: "Integrazione KNX per la gestione delle luci di un'azienda alimentare.", 
            specs: ["KNX", "Ilevia", "Controllo remoto"], 
            images: ["assets/img/p2.jpg"]
        },
        { 
            id: 3, 
            title: "PCB per cilindri pneumatici", 
            category: "PCB", 
            desc: "PCB personalizzato progettato e assemblato internamente.", 
            specs: ["PCB Design", "Altium", "Precisione"], 
            images: ["assets/img/p3.jpg"]
        },
        { 
            id: 4, 
            title: "Automazione per forno", 
            category: "Automazione", 
            desc: "Automazione completa con PLC Schneider e funzione PID.", 
            specs: ["PLC", "HMI", "Termoregolazione"], 
            images: ["assets/img/p4.jpg"]
        }
    ];

    /* --- LOGICA PROGETTI DINAMICA --- */
    const projectsGrid = document.getElementById('projects-grid');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    let currentFilter = 'all';
    let isExpanded = false;
    const LIMIT = 3; // Quanti ne vedi subito

    function renderProjects() {
        if (!projectsGrid) return;
        projectsGrid.innerHTML = '';

        const filtered = projectsData.filter(p => currentFilter === 'all' || p.category === currentFilter);

        filtered.forEach((prj, index) => {
            const isHidden = (!isExpanded && index >= LIMIT) ? 'hidden' : '';
            const card = document.createElement('div');
            card.className = `project-card fade-init visible ${isHidden}`;
            card.setAttribute('data-id', prj.id);
            
            // Struttura con IMG per SEO e loading lazy per velocità
            card.innerHTML = `
                <div class="project-img">
                    <img src="${prj.images[0]}" alt="${prj.title}" loading="lazy">
                    <div class="overlay-scan"></div>
                </div>
                <div class="project-info">
                    <h4>${prj.title}</h4>
                    <span class="category">${prj.category}</span>
                </div>
            `;
            
            card.onclick = () => openModal(prj.id);
            projectsGrid.appendChild(card);
        });

        // Mostra/Nascondi tasto
        if (filtered.length <= LIMIT || isExpanded) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-block';
        }
    }

    // Gestione Filtri
    filterBtns.forEach(btn => {
        btn.onclick = () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            isExpanded = false;
            renderProjects();
        };
    });

    // Gestione Carica Altri
    loadMoreBtn.onclick = () => {
        isExpanded = true;
        renderProjects();
    };

    // Inizializza i progetti al caricamento
    renderProjects();

    /* --- LOGICA MODAL (SISTEMATA) --- */
    const modal = document.getElementById('project-modal');
    const modalMainImg = document.getElementById('modal-main-img');

    function openModal(id) {
        const prj = projectsData.find(p => p.id === id);
        if(prj && modal){
            document.getElementById('modal-title').innerText = prj.title;
            document.getElementById('modal-desc').innerText = prj.desc;
            document.getElementById('modal-tags').innerHTML = `<span class="tag">${prj.category}</span>`;
            document.getElementById('modal-specs').innerHTML = prj.specs.map(s => `<li>${s}</li>`).join('');
            
            modalMainImg.src = prj.images[0];
            modal.classList.add('show');
            document.body.classList.add('modal-open');
        }
    }

    // Chiudi Modal
    window.closeModalFunction = function() {
        modal.classList.remove('show');
        document.body.classList.remove('modal-open');
    };

    document.querySelector('.close-modal').onclick = closeModalFunction;
    document.querySelector('.modal-backdrop').onclick = closeModalFunction;

    // ... Lascia il resto del tuo codice (Observer, Particles, ecc.) ...
});
