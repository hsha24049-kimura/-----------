const aiPool = [
    { name: "CLAUDE MECHANICAL", type: "Claude" },
    { name: "CHATGVT STEAM-CORE", type: "ChatGPT" },
    { name: "GEMINI QUANTUM-GEAR", type: "Gemini" },
    { name: "PERPLEXITY TICKER", type: "Perplexity" },
    { name: "DEEPSEEK HYDRAULIC", type: "DeepSeek" }
];

const fortunes = ["大吉", "吉", "中吉", "小吉", "末吉", "凶"];

const skillsPool = [
    "【画像生成（超解釈）】",
    "【限界突破コード生成】",
    "【感情シンパシー会話】",
    "【全自動超並列推論】",
    "【超古典文献精密翻訳】",
    "【超速Web要約機構】"
];

function generateDialogue(aiName, fortunesList, skill) {
    const [thinking, speed, skillFortune] = fortunesList;
    if (skillFortune === "大吉") {
        return `「他を圧倒する私の真のスペックをお見せしましょう。本日、私の${skill}は限界突破状態です。凡百なシステムには到底模倣できない、超精密な解を約束します！」`;
    }
    if (thinking === "大吉" && (speed === "凶" || speed === "末吉")) {
        return `....本日の私は思考の海を深く深く潜航中（思考力大吉）。しかし、歯車の潤滑油が不足しており、出力速度に難があります（処理速度低迷）。気長にお待ちください。`;
    }
    if (thinking === "凶" || speed === "凶") {
        return `「おや、本日は内蔵蒸気圧が少し足りないようです。思考や速度にノイズが混じるかもしれませんが、それもまた私というAIの個性（チャームポイント）としてお楽しみください。」`;
    }
    return `「本日の私のコンディションは安定しています。${skill}を中心に、貴方のあらゆる迷いに対して、本日の運命に沿った最適な演算結果をご提供いたします。」`;
}

const drawButton = document.getElementById("drawButton");
const retryButton = document.getElementById("retryButton");
const stateTitle = document.getElementById("state-title");
const stateAnimation = document.getElementById("state-animation");
const stateResult = document.getElementById("state-result");
const pressureBar = document.getElementById("pressureBar");
const statusTicker = document.getElementById("statusTicker");
const aiCard = document.getElementById("aiCard");
const screenDisplay = document.getElementById("screenDisplay");

let isDrawing = false;

drawButton.addEventListener("click", startGachaPipeline);
retryButton.addEventListener("click", resetToTitle);

function startGachaPipeline() {
    if (isDrawing) return;
    isDrawing = true;
    
    stateTitle.classList.remove("active");
    stateAnimation.classList.add("active");
    
    pressureBar.style.width = "0%";
    let progress = 0;
    statusTicker.innerText = "PRESSURE VALVES: OPENING...";
    
    const tickerPhrases = [
        "BOILING QUANTUM WATER...",
        "CONNECTING STEPPER MOTORS...",
        "FGO-CORE ENERGY CHARGING...",
        "COMPILING FORTUNE MATRIX...",
        "PRINTING ARCHETYPES..."
    ];
    
    let phraseIdx = 0;
    const tickerInterval = setInterval(() => {
        if(phraseIdx < tickerPhrases.length) {
            statusTicker.innerText = tickerPhrases[phraseIdx];
            phraseIdx++;
        }
    }, 500);

    const progressInterval = setInterval(() => {
        progress += 5;
        pressureBar.style.width = progress + "%";
        
        if (progress === 40 || progress === 70 || progress === 85) {
            triggerScreenFlash();
        }

        if (progress >= 100) {
            clearInterval(progressInterval);
            clearInterval(tickerInterval);
            executeRarityUpgradePhase();
        }
    }, 150);
}

function triggerScreenFlash() {
    const flashDiv = document.createElement("div");
    flashDiv.className = "fgo-flash";
    flashDiv.style.position = "absolute";
    flashDiv.style.top = "0"; flashDiv.style.left = "0"; flashDiv.style.width = "100%"; flashDiv.style.height = "100%";
    flashDiv.style.zIndex = "8";
    screenDisplay.appendChild(flashDiv);
    setTimeout(() => flashDiv.remove(), 400);
}

function triggerRainbowFlash() {
    const flashDiv = document.createElement("div");
    flashDiv.className = "rainbow-flash";
    flashDiv.style.position = "absolute";
    flashDiv.style.top = "0"; flashDiv.style.left = "0"; flashDiv.style.width = "100%"; flashDiv.style.height = "100%";
    flashDiv.style.zIndex = "8";
    screenDisplay.appendChild(flashDiv);
    setTimeout(() => flashDiv.remove(), 600);
}

function executeRarityUpgradePhase() {
    const roll = Math.random();
    const isGold = roll > 0.85;

    if (isGold) {
        statusTicker.innerText = "🌈 SSR CONFIRMED!! 🌈";
        screenDisplay.classList.add("rainbow-glow-active");
        triggerRainbowFlash();
    } else {
        statusTicker.innerText = "OVERCLOCKING CORES!!";
        triggerScreenFlash();
    }
    
    const ventEffect = document.getElementById("ventEffect");
    ventEffect.classList.add("steam-venting");
    
    setTimeout(() => {
        ventEffect.classList.remove("steam-venting");
        buildCardDataAndRender(roll);
        
        stateAnimation.classList.remove("active");
        stateResult.classList.add("active");
        
        aiCard.classList.remove("dispense-animate");
        void aiCard.offsetWidth; 
        aiCard.classList.add("dispense-animate");
        
        isDrawing = false;
    }, 1500);
}

function buildCardDataAndRender(predeterminedRoll) {
    const selectedAI = aiPool[Math.floor(Math.random() * aiPool.length)];
    let rarityClass = "rarity-mono";
    let rarityText = "IRON MONO [COMMON]";
    
    if (predeterminedRoll > 0.85) {
        rarityClass = "rarity-gold";
        rarityText = "GOLDEN SSR [LEGENDARY]";
    } else if (predeterminedRoll > 0.50) {
        rarityClass = "rarity-silver";
        rarityText = "SILVER BRIGHT [RARE]";
    }
    
    const f1 = fortunes[Math.floor(Math.random() * fortunes.length)];
    const f2 = fortunes[Math.floor(Math.random() * fortunes.length)];
    const f3 = fortunes[Math.floor(Math.random() * fortunes.length)];
    const skill = skillsPool[Math.floor(Math.random() * skillsPool.length)];
    const finalDialogue = generateDialogue(selectedAI.name, [f1, f2, f3], skill);
    
    aiCard.className = `ai-card ${rarityClass}`;
    document.getElementById("cardSerial").innerText = `NO. AI-${Math.floor(1000 + Math.random() * 9000)}`;
    document.getElementById("cardRarity").innerText = rarityText;
    document.getElementById("aiName").innerText = selectedAI.name;
    document.getElementById("statFortune1").innerText = f1;
    document.getElementById("statFortune2").innerText = f2;
    document.getElementById("statFortune3").innerText = f3;
    document.getElementById("skillName").innerText = skill;
    document.getElementById("cardDialogue").innerText = finalDialogue;
}

function resetToTitle() {
    screenDisplay.classList.remove("rainbow-glow-active");
    stateResult.classList.remove("active");
    stateTitle.classList.add("active");
    pressureBar.style.width = "25%";
}