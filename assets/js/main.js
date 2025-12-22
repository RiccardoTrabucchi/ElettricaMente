document.addEventListener("DOMContentLoaded", function() {
    
    const projectsData = [
        { 
            id: 1, 
            title: "Armadio elettrico Subdued", 
            category: "Distribuzione elettrica", 
            desc: "Cablaggio del quadro elettrico generale per un negozio di abbigliamento. Si occupa della distribuzione della linea elettrica a tutte le utenze.", 
            specs: ["Schneider Electric", "Modbus", "Sicurezza elettrica", "Monitoraggio dell'energia"], 
            images: [
                "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
            ] 
        },
        { 
            id: 2, 
            title: "Capannone domotico", 
            category: "Domotica", 
            desc: "Integrazione KNX per la gestione delle luci di un intero capannone di un'azienda alimentare.", 
            specs: ["KNX", "Ilevia", "Controllo remoto"], 
            images: [
                "https://images.unsplash.com/photo-1558002038-1091a1661116?auto=format&fit=crop&w=800&q=80"
            ] 
        },
        { 
            id: 3, 
            title: "PCB personalizzati per cilindri pneumatici", 
            category: "PCB", 
            desc: "PCB personalizzato per dei cilindri pneumatici controllati da elettrovalvole. Progettato e assemblato da noi.", 
            specs: ["PCB", "Altium"], 
            images: [
                "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
            ] 
        }
    ];

    /* --- COOKIE --- */
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    if (cookieBanner && acceptBtn) {
        const consent = localStorage.getItem('elettricamente_consent');
        if (!consent) setTimeout(() => { cookieBanner.classList.add('show'); }, 1000);
        acceptBtn.onclick = () => { localStorage.setItem('elettricamente_consent', 'true'); cookieBanner.classList.remove('show'); };
    }

    /* --- TYPEWRITER --- */
    const typeStrings = ["Impianti Elettrici", "Automazioni", "Ingegneria"];
    let count=0, index=0, isDeleting=false;
    (function type(){
        let el = document.getElementById('typing-placeholder');
        if(!el) return;
        let current = typeStrings[count];
        el.textContent = isDeleting ? current.substring(0, --index) : current.substring(0, ++index);
        if(!isDeleting && index === current.length){ isDeleting=true; setTimeout(type, 2000); }
        else if(isDeleting && index === 0){ isDeleting=false; count=(count+1)%typeStrings.length; setTimeout(type, 500); }
        else setTimeout(type, isDeleting ? 50 : 100);
    })();

    /* --- CUBO --- */
    const cubeStates = ['show-front', 'show-right', 'show-back', 'show-left', 'show-top', 'show-bottom'];
    let stateIdx = 0;
    setInterval(() => {
        const cube = document.getElementById('hero-cube');
        if(cube) {
            stateIdx = (stateIdx + 1) % cubeStates.length;
            cube.className = 'cube ' + cubeStates[stateIdx];
        }
    }, 3000);

    /* --- HMI --- */
    let tankLvl = 10;
    setInterval(() => {
        tankLvl = (tankLvl + 1) % 100;
        const liq = document.getElementById('hmi-liquid');
        if(liq) liq.style.height = tankLvl + "%";
        if(document.getElementById('hmi-level')) document.getElementById('hmi-level').innerText = tankLvl + "%";
        if(document.getElementById('sys-led')) document.getElementById('sys-led').classList.add('active');
        if(document.getElementById('hmi-motor-icon')) document.getElementById('hmi-motor-icon').style.animation = "spin 2s linear infinite";
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

    /* --- BURGER --- */
    const burger = document.querySelector('.burger');
    if(burger) burger.onclick = () => document.querySelector('.mobile-menu').classList.toggle('active');
});
