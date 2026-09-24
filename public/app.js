// ==========================================================================
// MULTI-SENSOR SATELLITE RETRIEVAL - CORE CONTROLLER & HUD SUITE
// ==========================================================================

// --- Multi-Language Localization Dictionaries ---
const LOCALIZATION = {
    en: {
        title: "🛰️ Multi-Sensor Satellite Image Retrieval",
        subtitle: "Cross-Modal Retrieval between Optical, Radar (SAR), and Text using Transformers & GNNs",
        dataset_config: "1. Dataset Configuration",
        num_scenes: "Number of Scenes",
        gen_seed: "Generator Seed",
        regen_btn: "📦 Regenerate Dataset",
        model_select: "2. Model Training & GNN",
        epochs: "Training Epochs",
        lr: "Learning Rate",
        train_btn: "🔥 Train Active Model",
        epochs_trained: "Trained Epochs",
        tab_gis: "GIS Explorer",
        tab_models: "Models & 3D PCA",
        tab_retrieve: "Real-time Retrieval (FAISS)",
        tab_explain: "Explainability (Grad-CAM)",
        tab_cloud: "Docker & Vercel API",
        desc_gis: "Explore geolocated satellite scenes plotted over real-world biome coordinates.",
        desc_models: "Train models and inspect alignment in 3D joint embedding space.",
        desc_retrieve: "Perform fast cross-sensor queries using optimized FAISS indexing.",
        desc_explain: "Inspect neural attention maps highlighting discriminative features.",
        desc_cloud: "Production containerization and deployment instructions.",
        query_mod: "Query Modality",
        db_mod: "Database Modality",
        search_btn: "⚡ Search Modality Database",
        latency_cmp: "Latency",
        gnn_refine: "Enable GNN Neighborhood Refinement"
    },
    es: {
        title: "🛰️ Recuperación de Imágenes Satelitales Multisensoriales",
        subtitle: "Búsqueda transmodal entre imágenes ópticas, radar (SAR) y texto mediante Transformers y GNN",
        dataset_config: "1. Configuración del Conjunto de Datos",
        num_scenes: "Número de Escenas",
        gen_seed: "Semilla del Generador",
        regen_btn: "📦 Regenerar Conjunto de Datos",
        model_select: "2. Entrenamiento de Modelos y GNN",
        epochs: "Épocas de Entrenamiento",
        lr: "Tasa de Aprendizaje",
        train_btn: "🔥 Entrenar Modelo Activo",
        epochs_trained: "Épocas Entrenadas",
        tab_gis: "Explorador GIS",
        tab_models: "Modelos y PCA 3D",
        tab_retrieve: "Búsqueda en Tiempo Real (FAISS)",
        tab_explain: "Explicabilidad (Grad-CAM)",
        tab_cloud: "Docker y API Vercel",
        desc_gis: "Explore escenas satelitales geolocalizadas representadas en coordenadas reales de biomas.",
        desc_models: "Entrene modelos e inspeccione la alineación en el espacio tridimensional de incrustaciones.",
        desc_retrieve: "Realice consultas rápidas entre sensores utilizando indexación optimizada de FAISS.",
        desc_explain: "Inspeccione mapas de atención neuronal que destacan características clave.",
        desc_cloud: "Instrucciones de contenedorización y despliegue para producción.",
        query_mod: "Modalidad de Consulta",
        db_mod: "Modalidad de Base de Datos",
        search_btn: "⚡ Buscar en Base de Datos",
        latency_cmp: "Latencia",
        gnn_refine: "Activar Refinamiento de Vecindario GNN"
    },
    fr: {
        title: "🛰️ Recherche d'Images Satellitaires Multi-Capteurs",
        subtitle: "Recherche transmodale entre images optiques, radar (SAR) et texte à l'aide de Transformers et GNN",
        dataset_config: "1. Configuration du Jeu de Données",
        num_scenes: "Nombre de Scènes",
        gen_seed: "Graine du Générateur",
        regen_btn: "📦 Régénérer le Jeu de Données",
        model_select: "2. Entraînement du Modèle & GNN",
        epochs: "Époques d'Entraînement",
        lr: "Taux d'Apprentissage",
        train_btn: "🔥 Entraîner le Modèle Actif",
        epochs_trained: "Époques Entraînées",
        tab_gis: "Explorateur SIG",
        tab_models: "Modèles & PCA 3D",
        tab_retrieve: "Recherche en Temps Réel (FAISS)",
        tab_explain: "Explicabilité (Grad-CAM)",
        tab_cloud: "Docker & API Vercel",
        desc_gis: "Explorez des scènes satellites géolocalisées tracées sur de vraies coordonnées de biomes.",
        desc_models: "Entraînez des modèles et inspectez l'alignement dans un espace d'intégration 3D.",
        desc_retrieve: "Effectuez des requêtes croisées rapides à l'aide d'une indexation FAISS optimisée.",
        desc_explain: "Inspectez les cartes d'attention neuronale mettant en valeur les caractéristiques clés.",
        desc_cloud: "Instructions de conteneurisation et de déploiement en production.",
        query_mod: "Modalité de Requête",
        db_mod: "Modalité de Base de Données",
        search_btn: "⚡ Rechercher dans la Base de Données",
        latency_cmp: "Latence",
        gnn_refine: "Activer le Raffinement de Voisinage GNN"
    },
    ja: {
        title: "🛰️ マルチセンサー衛星画像検索",
        subtitle: "トランスフォーマーとGNNを用いた光学、レーダー(SAR)、テキスト間のクロスモーダル検索",
        dataset_config: "1. データセット設定",
        num_scenes: "シーン数",
        gen_seed: "ジェネレータ・シード",
        regen_btn: "📦 データセット再生成",
        model_select: "2. 学習モデル & GNN",
        epochs: "学習エポック数",
        lr: "学習率",
        train_btn: "🔥 アクティブモデルの学習",
        epochs_trained: "学習済みエポック",
        tab_gis: "GIS エクスプローラー",
        tab_models: "モデル & 3D PCA",
        tab_retrieve: "リアルタイム検索 (FAISS)",
        tab_explain: "説明可能性 (Grad-CAM)",
        tab_cloud: "Docker & Vercel API",
        desc_gis: "地球上の実際のバイオーム座標上に配置された衛星シーンを探索します。",
        desc_models: "モデルを学習し、3次元潜在空間におけるアラインメントを可視化します。",
        desc_retrieve: "最適化されたFAISSインデックスを使用して高速な異種センサー間検索を実行します。",
        desc_explain: "ニューラル注意マップを分析して重要特徴を特定します。",
        desc_cloud: "本番コンテナ化とデプロイ手順。",
        query_mod: "クエリ・モダリティ",
        db_mod: "ターゲット・データベース",
        search_btn: "⚡ データベース検索実行",
        latency_cmp: "レイテンシ",
        gnn_refine: "GNN近傍平滑化を有効化"
    },
    ru: {
        title: "🛰️ Поиск Мультиспектральных Спутниковых Снимков",
        subtitle: "Кросс-модальный поиск между оптическими, радиолокационными (SAR) данными и текстом",
        dataset_config: "1. Настройка Датасета",
        num_scenes: "Число Сцен",
        gen_seed: "Сид Генератора",
        regen_btn: "📦 Перегенерировать Датасет",
        model_select: "2. Обучение Модели и GNN",
        epochs: "Эпохи Обучения",
        lr: "Скорость Обучения",
        train_btn: "🔥 Обучить Модель",
        epochs_trained: "Обучено Эпох",
        tab_gis: "ГИС Эксплорер",
        tab_models: "Модели и 3D PCA",
        tab_retrieve: "Поиск в Реальном Времени (FAISS)",
        tab_explain: "Интерпретируемость (Grad-CAM)",
        tab_cloud: "Docker и Vercel API",
        desc_gis: "Исследуйте спутниковые снимки на реальных географических координатах биомов.",
        desc_models: "Обучайте модели и анализируйте выравнивание в 3D пространстве эмбеддингов.",
        desc_retrieve: "Быстрый кросс-модальный поиск с использованием FAISS.",
        desc_explain: "Анализируйте карты внимания Grad-CAM.",
        desc_cloud: "Контейнеризация и инструкции по развертыванию.",
        query_mod: "Модальность Запроса",
        db_mod: "Модальность Базы",
        search_btn: "⚡ Найти в Базе Данных",
        latency_cmp: "Задержка",
        gnn_refine: "Включить Сглаживание GNN"
    },
    de: {
        title: "🛰️ Multi-Sensor Satellitenbild-Abruf",
        subtitle: "Cross-Modale Suche zwischen Optik-, Radar- (SAR) und Textdaten mit Transformern & GNN",
        dataset_config: "1. Datensatz-Konfiguration",
        num_scenes: "Anzahl Szenen",
        gen_seed: "Generator-Seed",
        regen_btn: "📦 Datensatz neu generieren",
        model_select: "2. Modelltraining & GNN",
        epochs: "Trainings-Epochen",
        lr: "Lernrate",
        train_btn: "🔥 Aktives Modell trainieren",
        epochs_trained: "Trainierte Epochen",
        tab_gis: "GIS-Explorer",
        tab_models: "Modelle & 3D PCA",
        tab_retrieve: "Echtzeit-Abruf (FAISS)",
        tab_explain: "Erklärbarkeit (Grad-CAM)",
        tab_cloud: "Docker & Vercel API",
        desc_gis: "Erkunden Sie geolokalisierte Satellitenbilder auf realen Biom-Koordinaten.",
        desc_models: "Trainieren Sie Modelle und analysieren Sie die Ausrichtung im gemeinsamen 3D-Raum.",
        desc_retrieve: "Führen Sie schnelle sensorübergreifende Abfragen mit FAISS durch.",
        desc_explain: "Untersuchen Sie neuronale Aufmerksamkeitskarten.",
        desc_cloud: "Produktions-Containerisierung und Bereitstellungsanweisungen.",
        query_mod: "Abfragemodalität",
        db_mod: "Datenbankmodalität",
        search_btn: "⚡ Datenbank durchsuchen",
        latency_cmp: "Latenz",
        gnn_refine: "GNN Nachbarschafts-Refinement aktivieren"
    },
    zh: {
        title: "🛰️ 多传感器卫星图像检索系统",
        subtitle: "利用 Transformer 与图神经网络（GNN）实现光学、雷达（SAR）和文本跨模态检索",
        dataset_config: "1. 数据集配置",
        num_scenes: "场景数量",
        gen_seed: "生成器随机种子",
        regen_btn: "📦 重新生成数据集",
        model_select: "2. 模型训练与 GNN",
        epochs: "训练轮数 (Epochs)",
        lr: "学习率",
        train_btn: "🔥 训练当前模型",
        epochs_trained: "已训练轮数",
        tab_gis: "GIS 地理探索器",
        tab_models: "模型与 3D PCA",
        tab_retrieve: "实时检索 (FAISS)",
        tab_explain: "可解释性 (Grad-CAM)",
        tab_cloud: "Docker 与 Vercel API",
        desc_gis: "在真实世界生物群落坐标上探索带地理位置标记的卫星图像。",
        desc_models: "训练模型并在 3D 联合嵌入空间中查看对齐效果。",
        desc_retrieve: "利用优化后的 FAISS 索引执行快速跨传感器查询。",
        desc_explain: "查看突出显示判别性特征的神经网络注意力热力图。",
        desc_cloud: "生产环境容器化与云端部署指南。",
        query_mod: "查询模态",
        db_mod: "数据库模态",
        search_btn: "⚡ 搜索模态数据库",
        latency_cmp: "延迟",
        gnn_refine: "启用 GNN 邻域优化"
    },
    hi: {
        title: "🛰️ मल्टी-सेंसर सैटेलाइट इमेज रिट्रीवल",
        subtitle: "ट्रांसफॉर्मर्स और GNN का उपयोग करके ऑप्टिकल, रडार (SAR) और टेक्स्ट के बीच क्रॉस-मोडल खोज",
        dataset_config: "1. डेटासेट कॉन्फ़िगरेशन",
        num_scenes: "दृश्यों की संख्या",
        gen_seed: "जेनरेटर सीड",
        regen_btn: "📦 डेटासेट फिर से बनाएं",
        model_select: "2. मॉडल ट्रेनिंग और GNN",
        epochs: "ट्रेनिंग एपॉक्स",
        lr: "लर्निंग रेट",
        train_btn: "🔥 मॉडल को प्रशिक्षित करें",
        epochs_trained: "प्रशिक्षित एपॉक्स",
        tab_gis: "GIS एक्सप्लोरर",
        tab_models: "मॉडल और 3D PCA",
        tab_retrieve: "रीयल-टाइम खोज (FAISS)",
        tab_explain: "स्पष्टीकरण (Grad-CAM)",
        tab_cloud: "डॉकर और Vercel API",
        desc_gis: "वास्तविक बायोम निर्देशांकों पर आधारित जियोलोकेटेड सैटेलाइट पैच का पता लगाएं।",
        desc_models: "मॉडल को प्रशिक्षित करें और 3D एम्बेडिंग स्पेस में संरेखण का निरीक्षण करें।",
        desc_retrieve: "FAISS इंडेक्सिंग का उपयोग करके त्वरित क्रॉस-सेंसर क्वेरी चलाएं।",
        desc_explain: "न्यूरल अटेंशन मैप्स का निरीक्षण करें।",
        desc_cloud: "कंटेनराइजेशन और Vercel पर डिप्लॉयमेंट के निर्देश।",
        query_mod: "क्वेरी मोडलिटी",
        db_mod: "डेटाबेस मोडलिटी",
        search_btn: "⚡ डेटाबेस में खोजें",
        latency_cmp: "लेटेंसी",
        gnn_refine: "GNN नेबरहुड रिफाइनमेंट सक्षम करें"
    }
};

// Global App State
let state = {
    currentLang: 'en',
    dataset: [],
    filteredDataset: [],
    activeFilter: 'all',
    selectedSceneId: 0,
    map: null,
    markers: [],
    highlightCircle: null,
    pcaLoaded: false,
    soundEnabled: true,
    audioCtx: null
};

// ==========================================================================
// INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    initBootSequence();
    initSpaceCanvas();
    initAudio();
    initTabs();
    initLanguage();
    initSliders();
    initMap();
    initSwipeCompare();
    initBiomeFilters();
    fetchDataset();
    checkHealth();
    bindEvents();
});

// ==========================================================================
// 1. FUTURISTIC OPENING BOOT SEQUENCE ANIMATION & SOUNDTRACK ENGINE
// ==========================================================================
let droneGain = null;

function getAudioContext() {
    if (!state.audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) state.audioCtx = new AudioContext();
    }
    if (state.audioCtx && state.audioCtx.state === 'suspended') {
        state.audioCtx.resume();
    }
    return state.audioCtx;
}

function startCinematicDrone() {
    if (!state.soundEnabled) return;
    try {
        const ctx = getAudioContext();
        if (!ctx) return;

        // Sub Oscillator 1 (55Hz / A1 Space Bass)
        const osc1 = ctx.createOscillator();
        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(55, ctx.currentTime);

        // Sub Oscillator 2 (55.4Hz Detuned for organic phase warmth)
        const osc2 = ctx.createOscillator();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(55.4, ctx.currentTime);

        // Warm Lowpass Resonant Filter
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(140, ctx.currentTime);
        filter.Q.setValueAtTime(3.5, ctx.currentTime);

        droneGain = ctx.createGain();
        droneGain.gain.setValueAtTime(0.001, ctx.currentTime);
        droneGain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.6);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(droneGain);
        droneGain.connect(ctx.destination);

        osc1.start();
        osc2.start();
    } catch (e) {}
}

function stopCinematicDrone() {
    if (droneGain && state.audioCtx) {
        try {
            droneGain.gain.exponentialRampToValueAtTime(0.0001, state.audioCtx.currentTime + 0.6);
        } catch (e) {}
    }
}

function playTelemetryChirp(freq, startTimeOffset = 0) {
    if (!state.soundEnabled) return;
    try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const now = ctx.currentTime + startTimeOffset;
        
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.4, now + 0.04);
        
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(now);
        osc.stop(now + 0.08);
    } catch (e) {}
}

function playCalibrationRiser() {
    if (!state.soundEnabled) return;
    try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const now = ctx.currentTime;
        
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.exponentialRampToValueAtTime(640, now + 1.8);
        
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(200, now);
        filter.frequency.exponentialRampToValueAtTime(1200, now + 1.8);
        filter.Q.setValueAtTime(4.0, now);
        
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.07, now + 1.2);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.85);
        
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(now);
        osc.stop(now + 1.9);
    } catch (e) {}
}

function playMissionUnlockChime() {
    if (!state.soundEnabled) return;
    try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const now = ctx.currentTime;
        
        // Sparkling Sci-Fi Major 9th Chord: D4, A4, F#5, C#6, E6
        const chordFrequencies = [293.66, 440.00, 739.99, 1108.73, 1318.51];
        
        chordFrequencies.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
            osc.frequency.setValueAtTime(freq, now + idx * 0.035);
            
            gain.gain.setValueAtTime(0.001, now);
            gain.gain.linearRampToValueAtTime(0.06, now + 0.06 + idx * 0.03);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.start(now + idx * 0.035);
            osc.stop(now + 1.5);
        });
    } catch (e) {}
}

function initBootSequence() {
    const overlay = document.getElementById('boot-overlay');
    const logsContainer = document.getElementById('boot-terminal-logs');
    const progressBar = document.getElementById('boot-progress-bar');
    const progressText = document.getElementById('boot-progress-text');
    const progressPercent = document.getElementById('boot-progress-percent');
    const skipBtn = document.getElementById('btn-skip-boot');
    const soundtrackTrigger = document.getElementById('btn-soundtrack-trigger');

    const bootLogs = [
        { text: "> [SYS_BOOT] Multi-Modal Neural Core Initialized", time: 200, progress: 20, pitch: 880 },
        { text: "> [ORBIT_LINK] Connecting to Sentinel-1 (SAR) & Sentinel-2 (RGB)...", time: 600, progress: 45, pitch: 1108 },
        { text: "> [VECTOR_INDEX] Building 64-Dim Isomorphic FAISS Cosine Index...", time: 1000, progress: 70, pitch: 1320 },
        { text: "> [GIS_ENGINE] Calibrating High-Res Esri Satellite Coordinates...", time: 1400, progress: 90, pitch: 1760 },
        { text: "> [STATUS] ALL MISSION SYSTEMS OPTIMAL & ONLINE (100%)", time: 1800, progress: 100, pitch: 2200 }
    ];

    let dismissed = false;

    // Start ambient space station soundtrack
    startCinematicDrone();
    playCalibrationRiser();

    // Enable on any interaction
    function triggerAudioOnInteraction() {
        getAudioContext();
        startCinematicDrone();
    }
    overlay.addEventListener('click', triggerAudioOnInteraction, { once: true });
    if (soundtrackTrigger) soundtrackTrigger.addEventListener('click', triggerAudioOnInteraction);

    function dismissBoot() {
        if (dismissed) return;
        dismissed = true;
        stopCinematicDrone();
        playMissionUnlockChime();
        overlay.classList.add('boot-dismissed');
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 800);
    }

    skipBtn.addEventListener('click', dismissBoot);

    bootLogs.forEach((item, idx) => {
        setTimeout(() => {
            if (dismissed) return;
            const line = document.createElement('div');
            line.className = `log-line ${idx === bootLogs.length - 1 ? 'success' : 'active'}`;
            line.textContent = item.text;
            logsContainer.appendChild(line);
            
            progressBar.style.width = `${item.progress}%`;
            progressPercent.textContent = `${item.progress}%`;
            progressText.textContent = item.text.replace('> ', '');
            
            // Play rhythmic telemetry chirp arpeggio
            playTelemetryChirp(item.pitch);

            if (idx === bootLogs.length - 1) {
                setTimeout(dismissBoot, 700);
            }
        }, item.time);
    });
}

// ==========================================================================
// 2. DYNAMIC SPACE PARTICLES & ORBIT GRID CANVAS
// ==========================================================================
function initSpaceCanvas() {
    const canvas = document.getElementById('space-bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width, height;
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Create Star Particles
    const numStars = 60;
    const stars = [];
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.5 + 0.5,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            alpha: Math.random() * 0.6 + 0.2
        });
    }

    // Create Orbiting Satellite Tracks
    const satellites = [
        { x: -50, y: 150, vx: 1.2, vy: 0.35, color: '#10b981', label: 'SENTINEL-2A' },
        { x: width + 50, y: height * 0.65, vx: -0.9, vy: -0.25, color: '#38bdf8', label: 'SENTINEL-1B' }
    ];

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Draw Subtle Grid
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.03)';
        ctx.lineWidth = 1;
        const gridSize = 80;
        for (let x = 0; x < width; x += gridSize) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
        }
        for (let y = 0; y < height; y += gridSize) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
        }

        // Draw and update stars
        for (let i = 0; i < stars.length; i++) {
            const s = stars[i];
            s.x += s.vx;
            s.y += s.vy;
            if (s.x < 0) s.x = width;
            if (s.x > width) s.x = 0;
            if (s.y < 0) s.y = height;
            if (s.y > height) s.y = 0;

            ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
            ctx.fill();

            // Draw constellation lines
            for (let j = i + 1; j < stars.length; j++) {
                const s2 = stars[j];
                const dx = s.x - s2.x;
                const dy = s.y - s2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 110) {
                    ctx.strokeStyle = `rgba(59, 130, 246, ${(1 - dist / 110) * 0.15})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(s.x, s.y);
                    ctx.lineTo(s2.x, s2.y);
                    ctx.stroke();
                }
            }
        }

        // Draw Satellites with trajectory laser trails
        satellites.forEach(sat => {
            sat.x += sat.vx;
            sat.y += sat.vy;
            if (sat.vx > 0 && sat.x > width + 100) sat.x = -100;
            if (sat.vx < 0 && sat.x < -100) sat.x = width + 100;

            // Trail
            ctx.strokeStyle = sat.color;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(sat.x - sat.vx * 35, sat.y - sat.vy * 35);
            ctx.lineTo(sat.x, sat.y);
            ctx.stroke();

            // Satellite Dot & Radar Pulse
            ctx.fillStyle = sat.color;
            ctx.beginPath();
            ctx.arc(sat.x, sat.y, 3, 0, Math.PI * 2);
            ctx.fill();

            // Label
            ctx.font = '9px "JetBrains Mono"';
            ctx.fillStyle = sat.color;
            ctx.fillText(sat.label, sat.x + 8, sat.y - 4);
        });

        requestAnimationFrame(animate);
    }
    animate();
}

// ==========================================================================
// 3. PURE WEB AUDIO SYNTHESIZER (NO EXTERNAL FILES REQUIRED)
// ==========================================================================
function initAudio() {
    const btn = document.getElementById('btn-audio-toggle');
    btn.addEventListener('click', () => {
        state.soundEnabled = !state.soundEnabled;
        document.getElementById('audio-icon').textContent = state.soundEnabled ? '🔊' : '🔇';
        document.getElementById('audio-label').textContent = state.soundEnabled ? 'FX: ON' : 'FX: OFF';
        if (state.soundEnabled) playSynthBeep(600, 'sine', 0.08);
    });
}

function playSynthBeep(freq = 520, type = 'sine', duration = 0.06) {
    if (!state.soundEnabled) return;
    try {
        const ctx = getAudioContext();
        if (!ctx) return;
        
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
    } catch (e) {}
}

// ==========================================================================
// 4. NAVIGATION & TABS
// ==========================================================================
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            playSynthBeep(680, 'sine', 0.05);
            tabButtons.forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
            
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-tab');
            const targetPane = document.getElementById(targetId);
            if (targetPane) targetPane.classList.add('active');

            if (targetId === 'tab-gis' && state.map) {
                setTimeout(() => state.map.invalidateSize(), 150);
            }
            if (targetId === 'tab-models' && !state.pcaLoaded) {
                fetchPCA();
            }
        });
    });
}

// ==========================================================================
// 5. LANGUAGE LOCALIZATION
// ==========================================================================
function initLanguage() {
    const langSelect = document.getElementById('lang-select');
    langSelect.addEventListener('change', (e) => {
        setLanguage(e.target.value);
    });
}

function setLanguage(lang) {
    state.currentLang = lang;
    const dict = LOCALIZATION[lang] || LOCALIZATION['en'];
    document.querySelectorAll('[data-i18n]').forEach(elem => {
        const key = elem.getAttribute('data-i18n');
        if (dict[key]) {
            elem.textContent = dict[key];
        }
    });
}

// ==========================================================================
// 6. SLIDERS & CONTROLS SYNC
// ==========================================================================
function initSliders() {
    const numScenesInput = document.getElementById('num-scenes-input');
    const numScenesVal = document.getElementById('num-scenes-val');
    numScenesInput.addEventListener('input', () => numScenesVal.textContent = numScenesInput.value);

    const epochsInput = document.getElementById('epochs-input');
    const epochsVal = document.getElementById('epochs-val');
    epochsInput.addEventListener('input', () => epochsVal.textContent = epochsInput.value);

    const lrInput = document.getElementById('lr-input');
    const lrVal = document.getElementById('lr-val');
    lrInput.addEventListener('input', () => lrVal.textContent = lrInput.value);
}

// ==========================================================================
// 7. API HEALTH & DATASET FETCHING
// ==========================================================================
async function checkHealth() {
    const statusText = document.getElementById('status-text');
    try {
        const res = await fetch('/api/health');
        if (res.ok) {
            const data = await res.json();
            statusText.textContent = `Online (${data.device.toUpperCase()})`;
            document.getElementById('stat-trained-epochs').textContent = data.trained_epochs;
        }
    } catch (e) {
        statusText.textContent = "Telemetry Link Active";
    }
}

async function fetchDataset() {
    try {
        const res = await fetch('/api/dataset');
        const data = await res.json();
        state.dataset = data.samples;
        state.filteredDataset = [...state.dataset];
        
        const maxIdx = state.dataset.length - 1;
        document.getElementById('scene-slider').max = maxIdx;
        document.getElementById('query-scene-slider').max = maxIdx;
        document.getElementById('explain-scene-slider').max = maxIdx;

        populateMapMarkers();
        selectScene(0);
    } catch (e) {
        console.error("Error fetching dataset:", e);
    }
}

// ==========================================================================
// 8. LEAFLET GIS MAP & SATELLITE MARKERS
// ==========================================================================
function initMap() {
    state.map = L.map('leaflet-map').setView([35.6762, 139.6503], 4);
    
    // High-Resolution Esri World Imagery
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Earthstar Geographics',
        maxZoom: 18
    }).addTo(state.map);
}

function populateMapMarkers() {
    // Clear existing markers
    state.markers.forEach(m => state.map.removeLayer(m));
    state.markers = [];
    if (state.highlightCircle) state.map.removeLayer(state.highlightCircle);

    const colors = {
        urban: '#ef4444',
        forest: '#10b981',
        water: '#3b82f6',
        farmland: '#a855f7',
        desert: '#f97316'
    };

    state.dataset.forEach((item, idx) => {
        const isVisible = state.activeFilter === 'all' || item.class === state.activeFilter;
        const color = colors[item.class] || '#ffffff';
        
        const marker = L.circleMarker([item.lat, item.lon], {
            radius: 7,
            color: color,
            fillColor: color,
            fillOpacity: isVisible ? 0.85 : 0.1,
            opacity: isVisible ? 1.0 : 0.15,
            weight: 2
        }).addTo(state.map);

        marker.bindTooltip(`ID ${idx}: ${item.class.toUpperCase()}`, { direction: 'top' });
        
        marker.on('click', () => {
            playSynthBeep(750, 'sine', 0.05);
            selectScene(idx);
        });

        state.markers.push(marker);
    });

    // Add Pulsing Green Highlight Ring
    state.highlightCircle = L.circleMarker([0, 0], {
        radius: 16,
        color: '#10b981',
        fillColor: '#10b981',
        fillOpacity: 0.35,
        weight: 3
    }).addTo(state.map);
}

function selectScene(idx) {
    if (!state.dataset[idx]) return;
    state.selectedSceneId = idx;
    const item = state.dataset[idx];

    // Update Slider & Number
    document.getElementById('scene-slider').value = idx;
    document.getElementById('selected-scene-id').textContent = idx;

    // Update Metadata Details
    document.getElementById('meta-class').textContent = item.class.toUpperCase();
    document.getElementById('meta-coords').textContent = `${item.lat.toFixed(4)}°, ${item.lon.toFixed(4)}°`;
    document.getElementById('meta-features').textContent = `Road: ${item.has_road ? "Yes" : "No"}, River: ${item.has_river ? "Yes" : "No"}`;
    document.getElementById('meta-desc').textContent = `"${item.description}"`;
    document.getElementById('telemetry-coords').textContent = `${item.lat.toFixed(2)}° N, ${item.lon.toFixed(2)}° E • ALT 705 KM`;

    // Update Previews
    document.getElementById('img-optical-preview').src = item.optical_base64;
    document.getElementById('img-sar-preview').src = item.sar_base64;

    // Update Swipe Comparison
    document.getElementById('swipe-img-opt').src = item.optical_base64;
    document.getElementById('swipe-img-sar').src = item.sar_base64;

    // Sync Leaflet Map Highlight
    if (state.highlightCircle) {
        state.highlightCircle.setLatLng([item.lat, item.lon]);
        state.map.panTo([item.lat, item.lon], { animate: true, duration: 0.6 });
    }

    // Update Retrieval Tab preview
    updateQueryPreview(idx);
}

// ==========================================================================
// 9. BIOME FILTER CHIPS & MAP SYNC
// ==========================================================================
function initBiomeFilters() {
    const chips = document.querySelectorAll('.biome-chip');
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            playSynthBeep(560, 'sine', 0.04);
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            
            const filter = chip.getAttribute('data-filter');
            state.activeFilter = filter;
            populateMapMarkers();

            // Find first matching scene and pan to it
            const matchedIdx = state.dataset.findIndex(item => filter === 'all' || item.class === filter);
            if (matchedIdx !== -1) {
                selectScene(matchedIdx);
            }
        });
    });
}

// ==========================================================================
// 10. INTERACTIVE SWIPE COMPARISON SLIDER
// ==========================================================================
function initSwipeCompare() {
    const dualBtn = document.getElementById('btn-view-mode-dual');
    const swipeBtn = document.getElementById('btn-view-mode-swipe');
    const dualContainer = document.getElementById('dual-preview-container');
    const swipeContainer = document.getElementById('swipe-compare-container');
    const swipeBox = document.getElementById('swipe-compare-box');
    const swipeOverlay = document.getElementById('swipe-overlay');
    const swipeHandle = document.getElementById('swipe-handle');

    dualBtn.addEventListener('click', () => {
        dualBtn.classList.add('active');
        swipeBtn.classList.remove('active');
        dualContainer.classList.remove('hidden');
        swipeContainer.classList.add('hidden');
    });

    swipeBtn.addEventListener('click', () => {
        swipeBtn.classList.add('active');
        dualBtn.classList.remove('active');
        swipeContainer.classList.remove('hidden');
        dualContainer.classList.add('hidden');
    });

    let isSliding = false;
    function setSplitPosition(xPos) {
        const rect = swipeBox.getBoundingClientRect();
        let offset = Math.max(0, Math.min(xPos - rect.left, rect.width));
        let percentage = (offset / rect.width) * 100;
        swipeOverlay.style.width = `${percentage}%`;
        swipeHandle.style.left = `${percentage}%`;
    }

    swipeBox.addEventListener('mousedown', (e) => {
        isSliding = true;
        setSplitPosition(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
        if (!isSliding) return;
        setSplitPosition(e.clientX);
    });

    window.addEventListener('mouseup', () => isSliding = false);
    
    // Touch support
    swipeBox.addEventListener('touchstart', (e) => {
        isSliding = true;
        setSplitPosition(e.touches[0].clientX);
    });
    window.addEventListener('touchmove', (e) => {
        if (!isSliding) return;
        setSplitPosition(e.touches[0].clientX);
    });
    window.addEventListener('touchend', () => isSliding = false);
}

// ==========================================================================
// 11. 3D LATENT PCA EMBEDDINGS (PLOTLY)
// ==========================================================================
async function fetchPCA() {
    try {
        const res = await fetch('/api/embeddings/pca');
        const data = await res.json();
        
        const colorMap = {
            urban: '#ef4444',
            forest: '#10b981',
            water: '#3b82f6',
            farmland: '#a855f7',
            desert: '#f97316'
        };

        const trace = {
            x: data.points.map(p => p.x),
            y: data.points.map(p => p.y),
            z: data.points.map(p => p.z),
            mode: 'markers',
            marker: {
                size: 6,
                color: data.points.map(p => colorMap[p.class] || '#60a5fa'),
                opacity: 0.9,
                line: { width: 1, color: '#ffffff' }
            },
            type: 'scatter3d',
            text: data.points.map(p => `ID ${p.id}: ${p.class.toUpperCase()}<br>${p.description}`),
            hoverinfo: 'text'
        };

        const layout = {
            margin: { l: 0, r: 0, b: 0, t: 0 },
            paper_bgcolor: 'rgba(6, 9, 19, 0.9)',
            plot_bgcolor: 'rgba(6, 9, 19, 0.9)',
            scene: {
                xaxis: { title: 'PC1', backgroundcolor: '#0a0f1d', gridcolor: '#1e293b', color: '#94a3b8' },
                yaxis: { title: 'PC2', backgroundcolor: '#0a0f1d', gridcolor: '#1e293b', color: '#94a3b8' },
                zaxis: { title: 'PC3', backgroundcolor: '#0a0f1d', gridcolor: '#1e293b', color: '#94a3b8' }
            }
        };

        Plotly.newPlot('plotly-3d-scatter', [trace], layout, { responsive: true });
        state.pcaLoaded = true;
    } catch (e) {
        console.error("Error loading PCA:", e);
    }
}

// ==========================================================================
// 12. REAL-TIME RETRIEVAL (FAISS)
// ==========================================================================
function updateQueryPreview(idx) {
    if (!state.dataset[idx]) return;
    const item = state.dataset[idx];
    const qMod = document.getElementById('query-modality-select').value;
    
    document.getElementById('query-scene-id-val').textContent = idx;
    document.getElementById('query-preview-img').src = qMod === 'sar' ? item.sar_base64 : item.optical_base64;
    document.getElementById('query-preview-text').textContent = `Scene #${idx} (${item.class.toUpperCase()})`;
}

async function executeRetrieval() {
    playSynthBeep(920, 'sine', 0.1);
    const qMod = document.getElementById('query-modality-select').value;
    const tMod = document.getElementById('target-modality-select').value;
    const queryIdx = parseInt(document.getElementById('query-scene-slider').value);
    const queryText = document.getElementById('query-text-input').value;
    const useGNN = document.getElementById('check-use-gnn').checked;

    const payload = {
        query_modality: qMod,
        target_modality: tMod,
        query_idx: queryIdx,
        query_text: qMod === 'text' ? queryText : null,
        use_gnn: useGNN,
        top_k: 6
    };

    try {
        const res = await fetch('/api/retrieve', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        
        document.getElementById('retrieval-latency').textContent = `${data.latency_ms} ms`;
        renderRetrievalResults(data.results, tMod);
    } catch (e) {
        console.error("Retrieval failed:", e);
    }
}

function renderRetrievalResults(results, targetModality) {
    const grid = document.getElementById('retrieval-results-grid');
    grid.innerHTML = '';

    results.forEach(res => {
        const card = document.createElement('div');
        card.className = 'match-card';
        
        const imgSrc = targetModality === 'sar' ? res.sar_base64 : res.optical_base64;
        card.innerHTML = `
            <div class="match-rank">#${res.rank} Match (ID: ${res.id})</div>
            <img src="${imgSrc}" alt="Result Match">
            <div class="match-score">Similarity: ${(res.score * 100).toFixed(1)}%</div>
            <div style="font-size: 0.8rem; color: #9ca3af; margin-top: 4px;">${res.class.toUpperCase()}</div>
        `;
        grid.appendChild(card);
    });
}

// ==========================================================================
// 13. GRAD-CAM EXPLAINABILITY
// ==========================================================================
async function generateGradCAM() {
    playSynthBeep(840, 'triangle', 0.08);
    const sceneIdx = parseInt(document.getElementById('explain-scene-slider').value);
    const encoder = document.getElementById('explain-encoder-select').value;

    try {
        const res = await fetch('/api/explain', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ scene_idx: sceneIdx, encoder: encoder })
        });
        const data = await res.json();

        document.getElementById('cam-img-orig').src = data.original_base64;
        document.getElementById('cam-img-heatmap').src = data.heatmap_base64;
        document.getElementById('cam-img-blended').src = data.blended_base64;
    } catch (e) {
        console.error("Grad-CAM generation failed:", e);
    }
}

// ==========================================================================
// 14. MODEL TRAINING
// ==========================================================================
async function trainModel() {
    const btn = document.getElementById('btn-train-model');
    const epochs = parseInt(document.getElementById('epochs-input').value);
    const lr = parseFloat(document.getElementById('lr-input').value);

    btn.textContent = "⏳ Training...";
    btn.disabled = true;

    try {
        const res = await fetch('/api/train', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ epochs: epochs, lr: lr })
        });
        const data = await res.json();
        
        document.getElementById('stat-trained-epochs').textContent = data.total_trained_epochs;
        btn.textContent = "🔥 Train Active Model";
        btn.disabled = false;
        playSynthBeep(1040, 'sine', 0.2);
        
        // Refresh PCA after training
        fetchPCA();
    } catch (e) {
        console.error("Training failed:", e);
        btn.textContent = "🔥 Train Active Model";
        btn.disabled = false;
    }
}

// ==========================================================================
// 15. EVENT BINDINGS
// ==========================================================================
function bindEvents() {
    // Scene Sliders
    document.getElementById('scene-slider').addEventListener('input', (e) => {
        selectScene(parseInt(e.target.value));
    });

    document.getElementById('query-modality-select').addEventListener('change', (e) => {
        const isText = e.target.value === 'text';
        document.getElementById('query-scene-box').classList.toggle('hidden', isText);
        document.getElementById('query-text-box').classList.toggle('hidden', !isText);
        updateQueryPreview(state.selectedSceneId);
    });

    document.getElementById('query-scene-slider').addEventListener('input', (e) => {
        updateQueryPreview(parseInt(e.target.value));
    });

    document.getElementById('explain-scene-slider').addEventListener('input', (e) => {
        document.getElementById('explain-scene-id-val').textContent = e.target.value;
    });

    // Action Buttons
    document.getElementById('btn-execute-search').addEventListener('click', executeRetrieval);
    document.getElementById('btn-generate-cam').addEventListener('click', generateGradCAM);
    document.getElementById('btn-train-model').addEventListener('click', trainModel);
    document.getElementById('btn-refresh-pca').addEventListener('click', fetchPCA);

    // Regenerate Dataset
    document.getElementById('btn-regen-dataset').addEventListener('click', async () => {
        const numSamples = parseInt(document.getElementById('num-scenes-input').value);
        const seed = parseInt(document.getElementById('gen-seed-input').value);
        try {
            await fetch('/api/dataset/regenerate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ num_samples: numSamples, seed: seed })
            });
            await fetchDataset();
        } catch (e) {
            console.error("Dataset regeneration failed:", e);
        }
    });
}
