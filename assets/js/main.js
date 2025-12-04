/* --- DATABASE PROGETTI --- */
const projectsData = [
    { 
        id: 1, 
        title: "Revamping Linea", 
        category: "Automation", 
        desc: "Sostituzione PLC obsoleto con S7-1500.", 
        specs: ["Siemens S7", "Profinet", "Safety"], 
        images: [
            "assets/img/progetti/industria_1.jpg", 
            "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80", 
            "https://images.unsplash.com/photo-1537462713505-a112611454c1?auto=format&fit=crop&w=800&q=80"
        ] 
    },
    { 
        id: 2, 
        title: "Villa Smart", 
        category: "Domotica", 
        desc: "Integrazione KNX totale.", 
        specs: ["KNX", "DALI", "Voice Control"], 
        images: [
            "assets/img/progetti/villa_1.jpg", 
            "https://images.unsplash.com/photo-1558002038-1091a1661116?auto=format&fit=crop&w=800&q=80", 
            "https://images.unsplash.com/photo-1560518883-ce09059ee971?auto=format&fit=crop&w=800&q=80"
        ] 
    },
    { 
        id: 3, 
        title: "Scheda IOT", 
        category: "R&D", 
        desc: "PCB custom per telemetria.", 
        specs: ["ESP32", "LoRa", "Altium"], 
        images: [
            "assets/img/progetti/pcb_1.jpg", 
            "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80", 
            "https://images.unsplash.com/photo-1555664424-778a69022365?auto=format&fit=crop&w=800&q=80"
        ] 
    }
];

/* --- TYPEWRITER --- */
const typeText = ["Impianti Elettrici", "Automazione PLC", "Domotica KNX", "Robotica"];
let count=0, index=0, currentText="", letter="";
(function type(){
    if(count===typeText.length)count=0; currentText=typeText[count]; letter=currentText.slice(0,++index);
    let el = document.getElementById('typing-placeholder');
    if(el) el.textContent=letter;
    if(letter.length===currentText.length){count++;index=0;setTimeout(type,2000);}else{setTimeout(type,100);}
})();

/* --- CUBE SYNC --- */
const cubeStates = [
    {t:"Progettazione HW", d:"Sviluppo Schemi Elettrici"}, {t:"Networking", d:"Reti Profinet & Ethernet"},
    {t:"Automazione", d:"Logica PLC Avanzata"}, {t:"Prototipazione", d:"Stampa 3D e PCB"},
    {t:"Sicurezza", d:"Safety Interlock"}, {t:"Power", d:"Quadri Distribuzione"}
];
const cubeTitle = document.getElementById('cube-title');
const cubeDesc = document.getElementById('cube-desc');
const progressFill = document.querySelector('.progress-fill');

if(cubeTitle && cubeDesc && progressFill) {
    function syncCube(){
        let start=Date.now();
        setInterval(()=>{
            let el=(Date.now()-start)%12000; let idx=Math.floor(el/2000);
            progressFill.style.width=`${(el%2000)/20}%`;
            if(cubeTitle.innerText!==cubeStates[idx].t){
                cubeTitle.innerText=cubeStates[idx].t; cubeDesc.innerText=cubeStates[idx].d;
            }
        },50);
    }
    syncCube();
}

/* --- HMI SIMULATION --- */
const sysLed = document.getElementById('sys-led');
const sysText = document.getElementById('sys-text');
const hmiMotorIcon = document.getElementById('hmi-motor-icon');
const motorLed = document.getElementById('motor-status-led');
const valveLed = document.getElementById('valve-status-led');
const hmiFreq = document.getElementById('hmi-freq');
const hmiCurr = document.getElementById('hmi-curr');
const hmiLevel = document.getElementById('hmi-level');
const hmiLiquid = document.getElementById('hmi-liquid');
const hmiValveText = document.getElementById('hmi-valve-text');
const hmiAlarms = document.getElementById('hmi-alarm-list');

if(sysLed) { // Check if HMI exists
    let state = "FILL"; let level = 10; let freq = 0; let alarmActive = false;

    function addLog(msg, type) {
        const time = new Date().toLocaleTimeString('it-IT', { hour12: false });
        const row = document.createElement('div');
        row.classList.add('alarm-item');
        let css = type === "ERR" ? "alarm-state-err" : (type === "INF" ? "alarm-state-inf" : "alarm-state-ok");
        row.innerHTML = `<span>${time}</span><span>${msg}</span><span class="${css}">${type}</span>`;
        if(hmiAlarms) {
            hmiAlarms.prepend(row);
            if(hmiAlarms.children.length > 5) hmiAlarms.removeChild(hmiAlarms.lastChild);
        }
    }

    function automationCycle() {
        if(alarmActive) return;

        if (state === "FILL") {
            sysText.innerText = "FILLING"; sysLed.className = "status-indicator active";
            if(level === 10) { addLog("Valve V1 Opened", "INF"); valveLed.classList.add('active'); hmiValveText.innerText = "OPN"; }
            level += 1.5;
            if (level >= 90) {
                state = "RUN"; addLog("Tank Full", "OK"); addLog("Valve V1 Closed", "INF");
                valveLed.classList.remove('active'); hmiValveText.innerText = "CLS";
            }
        } else if (state === "RUN") {
            sysText.innerText = "RUNNING";
            if(freq === 0) { addLog("Motor M1 Start", "OK"); motorLed.classList.add('active'); }
            if (freq < 50) freq += 1;
            level -= 0.2;
            if (Math.random() > 0.99) { triggerAlarm(); return; }
            if (level <= 70) {
                state = "DRAIN"; addLog("Process Done", "OK"); addLog("Motor M1 Stop", "INF"); motorLed.classList.remove('active');
            }
        } else if (state === "DRAIN") {
            sysText.innerText = "DRAINING";
            freq = Math.max(0, freq - 5);
            if(level === 70) { addLog("Drain Valve Open", "INF"); valveLed.classList.add('active'); hmiValveText.innerText = "OPN"; }
            level -= 2;
            if (level <= 10) {
                state = "FILL"; addLog("Cycle Complete", "OK"); valveLed.classList.remove('active'); hmiValveText.innerText = "CLS";
            }
        }

        hmiLevel.innerText = Math.round(level) + " %"; hmiLiquid.style.height = level + "%";
        hmiFreq.innerText = freq.toFixed(1) + " Hz";
        let amps = freq > 0 ? (freq * 0.24) + (Math.random() * 0.5) : 0;
        hmiCurr.innerText = amps.toFixed(1) + " A";

        if (freq > 0) {
            hmiMotorIcon.style.animation = `spin ${2000 - (freq * 30)}ms linear infinite`;
            hmiMotorIcon.style.color = "#00ffaa";
        } else {
            hmiMotorIcon.style.animation = "none"; hmiMotorIcon.style.color = "#555";
        }
    }

    function triggerAlarm() {
        alarmActive = true;
        sysText.innerText = "ALARM"; sysLed.className = "status-indicator alarm";
        hmiCurr.classList.add('text-alarm'); hmiCurr.innerText = "24.5 A";
        addLog("OVERCURRENT M1", "ERR"); addLog("Emergency Stop", "ERR");
        motorLed.classList.remove('active'); motorLed.classList.add('alarm');
        setTimeout(() => {
            alarmActive = false; sysLed.className = "status-indicator active";
            hmiCurr.classList.remove('text-alarm'); motorLed.classList.remove('alarm');
            addLog("Alarm Reset", "INF"); state = "FILL"; level = 10; freq = 0;
        }, 4000);
    }
    setInterval(automationCycle, 100);
}

/* --- PARTICLES CANVAS --- */
const canvas = document.getElementById('circuit-canvas');
if(canvas) {
    const ctx = canvas.getContext('2d');
    let w, h, p = [];
    function resize(){ w=canvas.width=window.innerWidth; h=canvas.height=window.innerHeight; }
    function init(){ 
        p=[]; 
        // Su mobile riduciamo le particelle per performance
        let count = window.innerWidth < 768 ? 25 : 60; 
        for(let i=0;i<count;i++) p.push({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5),vy:(Math.random()-.5)}); 
    }
    function draw(){
        ctx.clearRect(0,0,w,h);
        p.forEach(pt=>{
            pt.x+=pt.vx; pt.y+=pt.vy;
            if(pt.x<0||pt.x>w)pt.vx*=-1; if(pt.y<0||pt.y>h)pt.vy*=-1;
            ctx.beginPath(); ctx.arc(pt.x,pt.y,1.5,0,Math.PI*2); ctx.fillStyle="rgba(0,242,255,0.4)"; ctx.fill();
        });
        // Distanza connessioni aumentata su desktop, ridotta su mobile
        let connDist = window.innerWidth < 768 ? 80 : 120;
        for(let i=0;i<p.length;i++)for(let j=i+1;j<p.length;j++){
            let d=Math.hypot(p[i].x-p[j].x, p[i].y-p[j].y);
            if(d<connDist){ ctx.beginPath(); ctx.moveTo(p[i].x,p[i].y); ctx.lineTo(p[j].x,p[j].y); ctx.strokeStyle=`rgba(0,242,255,${1-d/connDist})`; ctx.stroke(); }
        }
        requestAnimationFrame(draw);
    }
    window.addEventListener('resize',()=>{resize();init();}); resize(); init(); draw();
}

/* --- MODAL LOGIC & MOBILE MENU --- */
const burger=document.querySelector('.burger');
const mobileMenu=document.querySelector('.mobile-menu');

if(burger && mobileMenu) {
    burger.onclick = () => {
        mobileMenu.classList.toggle('active');
        // Trasforma il burger in X (opzionale CSS animation future)
    };
    
    document.querySelectorAll('.mobile-link').forEach(l => {
        l.onclick = () => mobileMenu.classList.remove('active');
    });
}

const modal = document.getElementById('project-modal');
const modalMainImg = document.getElementById('modal-main-img');

function setImage(imgElement, src) {
    let img = new Image();
    img.onload = () => { imgElement.src = src; };
    img.onerror = () => { 
        imgElement.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22600%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20600%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1%20text%20%7B%20fill%3A%2300f2ff%3Bfont-weight%3Abold%3Bfont-family%3Amonospace%3Bfont-size%3A24pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1%22%3E%3Crect%20width%3D%22800%22%20height%3D%22600%22%20fill%3D%22%23111%22%3E%3C%2Frect%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%3EIMAGE%20NOT%20FOUND%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fsvg%3E';
    };
    img.src = src;
}

function openModal(id) {
    let prj = projectsData.find(p => p.id === id);
    if(prj && modal){
        document.getElementById('modal-title').innerText = prj.title;
        document.getElementById('modal-desc').innerText = prj.desc;
        document.getElementById('modal-tags').innerHTML = `<span class="tag">${prj.category}</span>`;
        document.getElementById('modal-specs').innerHTML = prj.specs.map(s => `<li>${s}</li>`).join('');
        
        if(prj.images && prj.images.length > 0) {
            setImage(modalMainImg, prj.images[0]);
            const thumbsContainer = document.getElementById('modal-thumbnails');
            thumbsContainer.innerHTML = '';
            prj.images.forEach((src, idx) => {
                let thumb = document.createElement('img');
                thumb.classList.add('thumb');
                if(idx===0) thumb.classList.add('active');
                setImage(thumb, src);
                thumb.onclick = () => {
                    setImage(modalMainImg, src);
                    document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
                    thumb.classList.add('active');
                };
                thumbsContainer.appendChild(thumb);
            });
        }
        
        modal.classList.add('show');
        document.body.classList.add('modal-open');
    }
}

function closeModalFunction() {
    if(modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            document.body.classList.remove('modal-open');
        }, 300);
    }
}

document.querySelectorAll('.project-card').forEach(c => {
    c.onclick = () => openModal(parseInt(c.dataset.id));
});

const closeModalBtn = document.querySelector('.close-modal');
if(closeModalBtn) closeModalBtn.onclick = closeModalFunction;
const modalBackdrop = document.querySelector('.modal-backdrop');
if(modalBackdrop) modalBackdrop.onclick = closeModalFunction;

/* --- FADE IN SCROLL --- */
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.service-card, .project-card, .timeline-item, .contact-node, .hmi-panel').forEach(el => {
    el.classList.add('fade-init'); observer.observe(el);
});
const style = document.createElement("style");
style.innerText = `.fade-init { opacity: 0; transform: translateY(30px); transition: all 0.6s ease-out; } .visible { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);
