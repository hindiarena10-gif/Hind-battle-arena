/* =====================================================
   ⚔️ हिंदी BATTLE ARENA — FINAL SCRIPT
   COMMANDO EDITION
===================================================== */

"use strict";

/* =====================================================
   💾 PLAYER DATA
===================================================== */

const defaultData = {
    coins: 100,
    xp: 0,
    level: 1,

    dailyStreak: 0,
    matchStreak: 0,

    totalMatches: 0,
    totalCorrect: 0,
    totalWins: 0,
    battlesCompleted: 0,
    comboBest: 0,

    questsClaimed: {
        battle: false,
        correct: false,
        combo: false,
        wins: false
    },

    ownedCostumes: ["🧑"],
    equippedCostume: "🧑"
};

let savedData = {};

try {
    savedData =
        JSON.parse(
            localStorage.getItem("hindiBattleData")
        ) || {};
} catch {
    savedData = {};
}

let data = {
    ...defaultData,
    ...savedData,

    questsClaimed: {
        ...defaultData.questsClaimed,
        ...(savedData.questsClaimed || {})
    },

    ownedCostumes:
        savedData.ownedCostumes || ["🧑"]
};


/* =====================================================
   💾 SAVE
===================================================== */

function saveData() {

    localStorage.setItem(
        "hindiBattleData",
        JSON.stringify(data)
    );
}


/* =====================================================
   🔎 ELEMENTS
===================================================== */

const quickBattle =
    document.getElementById("quickBattle");

const battleScreen =
    document.getElementById("battleScreen");

const question =
    document.getElementById("question");

const answers =
    document.getElementById("answers");

const timeDisplay =
    document.getElementById("time");

const playerScoreDisplay =
    document.getElementById("playerScore");

const rivalScoreDisplay =
    document.getElementById("rivalScore");

const comboDisplay =
    document.getElementById("comboCount");

const rewardMessage =
    document.getElementById("rewardMessage");

const playerAvatars =
    document.querySelectorAll(
        "#playerAvatar"
    );


/* =====================================================
   🧠 QUESTION BANK
===================================================== */

const questions = [

    {
        q: "‘सुंदर’ का विलोम शब्द क्या है?",
        options: ["कुरूप", "अच्छा", "साफ", "मीठा"],
        answer: 0
    },

    {
        q: "‘जल’ का पर्यायवाची क्या है?",
        options: ["अग्नि", "पानी", "वायु", "धरती"],
        answer: 1
    },

    {
        q: "‘मैं स्कूल जाता हूँ।’ इसमें सर्वनाम कौन सा है?",
        options: ["स्कूल", "जाता", "मैं", "हूँ"],
        answer: 2
    },

    {
        q: "‘लड़का’ का स्त्रीलिंग क्या है?",
        options: ["लड़की", "बच्चा", "महिला", "नारी"],
        answer: 0
    },

    {
        q: "‘दिन’ का विलोम शब्द क्या है?",
        options: ["सुबह", "शाम", "रात", "दोपहर"],
        answer: 2
    },

    {
        q: "‘आकाश’ का पर्यायवाची क्या है?",
        options: ["नभ", "सागर", "वन", "पर्वत"],
        answer: 0
    },

    {
        q: "‘राम ने खाना खाया।’ इसमें क्रिया कौन सी है?",
        options: ["राम", "खाना", "ने", "खाया"],
        answer: 3
    },

    {
        q: "‘मीठा’ का विलोम क्या है?",
        options: ["खट्टा", "कड़वा", "नमकीन", "तीखा"],
        answer: 1
    },

    {
        q: "‘पृथ्वी’ का पर्यायवाची क्या है?",
        options: ["धरती", "आकाश", "जल", "अग्नि"],
        answer: 0
    },

    {
        q: "‘बच्चे खेल रहे हैं।’ यह कौन सा काल है?",
        options: [
            "भूतकाल",
            "भविष्यत् काल",
            "वर्तमान काल",
            "कोई नहीं"
        ],
        answer: 2
    },

    {
        q: "‘सूर्य’ का पर्यायवाची क्या है?",
        options: ["चंद्र", "रवि", "बादल", "तारा"],
        answer: 1
    },

    {
        q: "‘अंधकार’ का विलोम क्या है?",
        options: ["रात्रि", "प्रकाश", "काला", "छाया"],
        answer: 1
    },

    {
        q: "‘वन’ का पर्यायवाची क्या है?",
        options: ["जंगल", "घर", "नगर", "पर्वत"],
        answer: 0
    },

    {
        q: "‘सत्य’ का विलोम क्या है?",
        options: ["सही", "असत्य", "धर्म", "न्याय"],
        answer: 1
    },

    {
        q: "‘नदी’ का पर्यायवाची क्या है?",
        options: ["सरिता", "पर्वत", "सागर", "बादल"],
        answer: 0
    },

    {
        q: "‘आलसी’ का विलोम क्या है?",
        options: ["सुस्त", "मेहनती", "कमजोर", "धीमा"],
        answer: 1
    },

    {
        q: "‘पुस्तक’ का पर्यायवाची क्या है?",
        options: ["किताब", "कलम", "कागज", "विद्यालय"],
        answer: 0
    },

    {
        q: "‘ऊँचा’ का विलोम क्या है?",
        options: ["लंबा", "नीचा", "बड़ा", "छोटा"],
        answer: 1
    },

    {
        q: "‘गाय घास खाती है।’ इसमें संज्ञा कौन सी है?",
        options: ["गाय", "खाती", "है", "घास"],
        answer: 0
    },

    {
        q: "‘वह बाजार गया।’ इसमें सर्वनाम कौन सा है?",
        options: ["बाजार", "गया", "वह", "कोई नहीं"],
        answer: 2
    },

    {
        q: "‘सीता सुंदर है।’ इसमें विशेषण कौन सा है?",
        options: ["सीता", "सुंदर", "है", "कोई नहीं"],
        answer: 1
    },

    {
        q: "‘मोहन दौड़ रहा है।’ इसमें क्रिया कौन सी है?",
        options: ["मोहन", "दौड़ रहा है", "है", "कोई नहीं"],
        answer: 1
    },

    {
        q: "‘कल मैं दिल्ली जाऊँगा।’ यह कौन सा काल है?",
        options: [
            "वर्तमान काल",
            "भूतकाल",
            "भविष्यत् काल",
            "कोई नहीं"
        ],
        answer: 2
    },

    {
        q: "‘राम कल स्कूल गया।’ यह कौन सा काल है?",
        options: [
            "भूतकाल",
            "वर्तमान काल",
            "भविष्यत् काल",
            "कोई नहीं"
        ],
        answer: 0
    },

    {
        q: "‘लड़का’ का बहुवचन क्या है?",
        options: ["लड़के", "लड़कियाँ", "लड़का", "लड़कों"],
        answer: 0
    },

    {
        q: "‘किताब’ का बहुवचन क्या है?",
        options: ["किताबी", "किताबें", "किताबों", "किताबा"],
        answer: 1
    },

    {
        q: "‘राजा’ का स्त्रीलिंग क्या है?",
        options: ["रानी", "राजकुमारी", "महिला", "स्त्री"],
        answer: 0
    },

    {
        q: "‘पुत्र’ का स्त्रीलिंग क्या है?",
        options: ["बेटा", "पुत्री", "बहन", "माता"],
        answer: 1
    },

    {
        q: "‘नया’ का विलोम क्या है?",
        options: ["अच्छा", "पुराना", "सुंदर", "बड़ा"],
        answer: 1
    },

    {
        q: "‘प्रकाश’ का विलोम क्या है?",
        options: ["रोशनी", "अंधकार", "सूर्य", "दीपक"],
        answer: 1
    },

    {
        q: "‘वायु’ का पर्यायवाची क्या है?",
        options: ["हवा", "जल", "आकाश", "धरती"],
        answer: 0
    },

    {
        q: "‘समुद्र’ का पर्यायवाची क्या है?",
        options: ["नदी", "सागर", "तालाब", "झील"],
        answer: 1
    },

    {
        q: "‘कमल’ किसका उदाहरण है?",
        options: ["संज्ञा", "सर्वनाम", "क्रिया", "विशेषण"],
        answer: 0
    },

    {
        q: "‘वह बहुत तेज दौड़ता है।’ इसमें ‘तेज’ क्या है?",
        options: ["संज्ञा", "सर्वनाम", "विशेषण", "क्रिया"],
        answer: 2
    },

    {
        q: "‘हम खेल रहे हैं।’ इसमें सर्वनाम कौन सा है?",
        options: ["खेल", "रहे", "हम", "हैं"],
        answer: 2
    },

    {
        q: "‘बच्चा हँस रहा है।’ इसमें क्रिया कौन सी है?",
        options: ["बच्चा", "हँस रहा है", "है", "कोई नहीं"],
        answer: 1
    },

    {
        q: "‘माता’ का पुल्लिंग क्या है?",
        options: ["बहन", "पिता", "बेटी", "स्त्री"],
        answer: 1
    },

    {
        q: "‘भाई’ का स्त्रीलिंग क्या है?",
        options: ["बहन", "माता", "बेटी", "चाची"],
        answer: 0
    },

    {
        q: "‘काला’ का विलोम क्या है?",
        options: ["नीला", "सफेद", "हरा", "पीला"],
        answer: 1
    },

    {
        q: "‘पास’ का विलोम क्या है?",
        options: ["साथ", "दूर", "ऊपर", "नीचे"],
        answer: 1
    },

    {
        q: "‘आरंभ’ का विलोम क्या है?",
        options: ["शुरुआत", "अंत", "प्रारंभ", "पहला"],
        answer: 1
    },

    {
        q: "‘खुश’ का पर्यायवाची क्या है?",
        options: ["प्रसन्न", "दुखी", "क्रोधित", "थका"],
        answer: 0
    },

    {
        q: "‘दुखी’ का विलोम क्या है?",
        options: ["उदास", "प्रसन्न", "कमजोर", "चुप"],
        answer: 1
    },

    {
        q: "‘अग्नि’ का पर्यायवाची क्या है?",
        options: ["जल", "आग", "वायु", "धुआँ"],
        answer: 1
    },

    {
        q: "‘घर’ का पर्यायवाची क्या है?",
        options: ["गृह", "नगर", "वन", "मार्ग"],
        answer: 0
    },

    {
        q: "‘शत्रु’ का विलोम क्या है?",
        options: ["सैनिक", "मित्र", "राजा", "योद्धा"],
        answer: 1
    },

    {
        q: "‘जीत’ का विलोम क्या है?",
        options: ["हार", "खेल", "युद्ध", "विजय"],
        answer: 0
    },

    {
        q: "‘सुबह’ का विलोम क्या है?",
        options: ["दोपहर", "शाम", "रात", "दिन"],
        answer: 2
    },

    {
        q: "‘निडर’ का विलोम क्या है?",
        options: ["बहादुर", "डरपोक", "साहसी", "मजबूत"],
        answer: 1
    },

    {
        q: "‘मेहनत’ का पर्यायवाची क्या है?",
        options: ["परिश्रम", "आराम", "नींद", "खेल"],
        answer: 0
    },

    {
        q: "‘आँखों का तारा’ मुहावरे का अर्थ क्या है?",
        options: [
            "बहुत प्रिय होना",
            "बहुत दूर होना",
            "बहुत तेज होना",
            "बहुत गुस्सा होना"
        ],
        answer: 0
    },

    {
        q: "‘नाक में दम करना’ का अर्थ क्या है?",
        options: [
            "आराम करना",
            "बहुत परेशान करना",
            "सो जाना",
            "खुश होना"
        ],
        answer: 1
    }
];


/* =====================================================
   ⚔️ BATTLE STATE
===================================================== */

let currentQuestion = null;

let playerScore = 0;
let rivalScore = 0;
let combo = 0;

let timeLeft = 30;

let battleTimer = null;
let nextQuestionTimer = null;

let battleRunning = false;
let selectedMode = "easy";

let bossHP = 10;
const maxBossHP = 10;


/* =====================================================
   🎮 DIFFICULTY
===================================================== */

const difficultySettings = {

    easy: {
        time: 30,
        rewardMultiplier: 1,
        rivalChance: 0.08
    },

    medium: {
        time: 45,
        rewardMultiplier: 1.5,
        rivalChance: 0.12
    },

    hard: {
        time: 60,
        rewardMultiplier: 2,
        rivalChance: 0.17
    },

    boss: {
        time: 90,
        rewardMultiplier: 3,
        rivalChance: 0
    }
};


/* =====================================================
   📊 UPDATE UI
===================================================== */

function updateUI() {

    const values = {

        coinCount: data.coins,
        coins: data.coins,
        coinsRecord: data.coins,

        levelCount: data.level,
        level: data.level,
        levelRecord: data.level,

        xp: data.xp,

        dailyStreak: data.dailyStreak,

        matchStreak: data.matchStreak,
        matchStreakRecord: data.matchStreak,

        totalCorrect: data.totalCorrect,
        correctRecord: data.totalCorrect
    };


    Object.entries(values).forEach(
        ([id, value]) => {

            const element =
                document.getElementById(id);

            if (element) {
                element.textContent = value;
            }
        }
    );


    /* XP BAR */

    const xpFill =
        document.getElementById("xpFill");

    if (xpFill) {

        const requiredXP =
            data.level * 100;

        const percentage =
            Math.min(
                data.xp / requiredXP * 100,
                100
            );

        xpFill.style.width =
            percentage + "%";
    }


    /* PLAYER COSTUME */

    playerAvatars.forEach(
        avatar => {
            avatar.textContent =
                data.equippedCostume;
        }
    );


    updateQuests();
    updateAchievements();
    updateCostumeButtons();

    saveData();
}


/* =====================================================
   ⭐ XP SYSTEM
===================================================== */

function addXP(amount) {

    data.xp += amount;


    while (
        data.xp >= data.level * 100
    ) {

        data.xp -=
            data.level * 100;

        data.level++;


        showReward(
            `🎉 LEVEL UP! LEVEL ${data.level}`
        );
    }
}


/* =====================================================
   🎲 RANDOM QUESTION
===================================================== */

function getRandomQuestion() {

    return questions[
        Math.floor(
            Math.random() *
            questions.length
        )
    ];
}


/* =====================================================
   👹 RESET BOSS
===================================================== */

function resetBoss() {

    bossHP = maxBossHP;


    const hp =
        document.getElementById("bossHP");

    const fill =
        document.getElementById("bossHPFill");

    const attack =
        document.getElementById("bossAttack");


    if (hp) {
        hp.textContent = bossHP;
    }

    if (fill) {
        fill.style.width = "100%";
    }

    if (attack) {
        attack.textContent =
            "⚔️ BOSS READY";
    }
}


/* =====================================================
   💥 BOSS HIT ANIMATION
===================================================== */

function bossHitAnimation() {

    const bossArea =
        document.getElementById("bossArea");

    const hpFill =
        document.getElementById("bossHPFill");


    if (bossArea) {

        bossArea.classList.remove(
            "boss-hit",
            "attack-flash"
        );

        void bossArea.offsetWidth;

        bossArea.classList.add(
            "boss-hit",
            "attack-flash"
        );
    }


    if (hpFill) {

        hpFill.classList.remove(
            "hp-hit"
        );

        void hpFill.offsetWidth;

        hpFill.classList.add(
            "hp-hit"
        );
    }
}


/* =====================================================
   ⚔️ START BATTLE
===================================================== */

function startBattle() {

    if (battleRunning) return;


    const mode =
        difficultySettings[selectedMode];


    if (!mode) return;


    battleRunning = true;

    playerScore = 0;
    rivalScore = 0;
    combo = 0;

    timeLeft = mode.time;


    playerScoreDisplay.textContent = "0";
    rivalScoreDisplay.textContent = "0";
    comboDisplay.textContent = "0";
    timeDisplay.textContent = timeLeft;


    resetBoss();


    const bossArea =
        document.getElementById("bossArea");


    if (bossArea) {

        bossArea.style.display =
            selectedMode === "boss"
                ? "block"
                : "none";
    }


    if (battleScreen) {

        battleScreen.style.display =
            "block";

        battleScreen.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }


    clearInterval(battleTimer);
    clearTimeout(nextQuestionTimer);


    nextQuestion();


    battleTimer =
        setInterval(() => {

            if (!battleRunning) return;


            timeLeft--;


            timeDisplay.textContent =
                timeLeft;


            if (
                selectedMode !== "boss" &&
                Math.random() <
                mode.rivalChance
            ) {

                rivalScore++;

                rivalScoreDisplay.textContent =
                    rivalScore;
            }


            if (timeLeft <= 0) {

                endBattle();
            }

        }, 1000);
}


/* =====================================================
   🧠 NEXT QUESTION
===================================================== */

function nextQuestion() {

    if (!battleRunning) return;


    currentQuestion =
        getRandomQuestion();


    question.textContent =
        currentQuestion.q;


    answers.innerHTML = "";


    currentQuestion.options.forEach(
        (option, index) => {

            const button =
                document.createElement("button");


            button.className =
                "answer-button";


            button.textContent =
                option;


            button.addEventListener(
                "click",
                () => {

                    checkAnswer(
                        index,
                        button
                    );

                }
            );


            answers.appendChild(button);
        }
    );
}


/* =====================================================
   💥 DAMAGE BOSS
===================================================== */

function damageBoss() {

    let damage = 1;


    if (combo >= 3) {
        damage = 2;
    }


    bossHP -= damage;


    bossHP =
        Math.max(0, bossHP);


    bossHitAnimation();


    const hp =
        document.getElementById("bossHP");

    const fill =
        document.getElementById("bossHPFill");

    const attack =
        document.getElementById("bossAttack");


    if (hp) {
        hp.textContent = bossHP;
    }


    if (fill) {

        fill.style.width =
            (
                bossHP /
                maxBossHP *
                100
            ) + "%";
    }


    if (attack) {

        attack.textContent =
            `💥 BOSS HIT! -${damage} HP`;
    }


    showReward(
        `💥 BOSS HIT! -${damage} HP`
    );


    if (bossHP <= 0) {

        bossDefeated();

        return true;
    }


    return false;
}


/* =====================================================
   ✅ CHECK ANSWER
===================================================== */

function checkAnswer(
    selectedIndex,
    clickedButton
) {

    if (!battleRunning) return;


    const buttons =
        answers.querySelectorAll("button");


    buttons.forEach(
        button => {
            button.disabled = true;
        }
    );


    const correct =
        selectedIndex ===
        currentQuestion.answer;


    if (correct) {

        clickedButton.classList.add(
            "correct"
        );


        playerScore++;
        combo++;


        data.totalCorrect++;


        data.comboBest =
            Math.max(
                data.comboBest,
                combo
            );


        const coinReward =
            5 + Math.min(combo, 5);


        data.coins += coinReward;


        addXP(10);


        playerScoreDisplay.textContent =
            playerScore;


        comboDisplay.textContent =
            combo;


        if (selectedMode === "boss") {

            const defeated =
                damageBoss();


            if (defeated) {
                return;
            }

        } else {

            showReward(
                `✅ CORRECT! +${coinReward} 🪙`
            );
        }


    } else {

        clickedButton.classList.add(
            "wrong"
        );


        const correctButton =
            buttons[
                currentQuestion.answer
            ];


        if (correctButton) {

            correctButton.classList.add(
                "correct"
            );
        }


        combo = 0;


        comboDisplay.textContent =
            "0";


        showReward(
            "❌ WRONG ANSWER!"
        );


        if (selectedMode === "boss") {

            const attack =
                document.getElementById(
                    "bossAttack"
                );


            if (attack) {

                attack.textContent =
                    "👹 BOSS BLOCKED YOUR ATTACK!";
            }
        }
    }


    updateUI();


    nextQuestionTimer =
        setTimeout(() => {

            if (battleRunning) {
                nextQuestion();
            }

        }, 450);
}


/* =====================================================
   👑 VICTORY SCREEN
===================================================== */

function showVictoryScreen(
    coins,
    xp
) {

    const oldScreen =
        document.querySelector(
            ".victory-overlay"
        );


    if (oldScreen) {
        oldScreen.remove();
    }


    const overlay =
        document.createElement("div");


    overlay.className =
        "victory-overlay";


    overlay.innerHTML = `

        <div class="victory-card">

            <div class="victory-icon">
                👑
            </div>

            <h1>
                BOSS DEFEATED!
            </h1>

            <p class="victory-subtitle">
                You conquered the
                हिंदी Battle Arena!
            </p>

            <div class="victory-rewards">

                <div class="victory-reward">
                    🪙
                    <strong>
                        +${coins}
                    </strong>
                    Coins
                </div>

                <div class="victory-reward">
                    ⭐
                    <strong>
                        +${xp}
                    </strong>
                    XP
                </div>

            </div>

            <button
                class="victory-button"
                id="victoryAgain">

                👹 FIGHT AGAIN

            </button>

        </div>

    `;


    document.body.appendChild(overlay);


    document
        .getElementById("victoryAgain")
        ?.addEventListener(
            "click",
            () => {

                overlay.remove();

                selectedMode = "boss";

                startBattle();
            }
        );
}


/* =====================================================
   👑 BOSS DEFEATED
===================================================== */

function bossDefeated() {

    if (!battleRunning) return;


    battleRunning = false;


    clearInterval(battleTimer);
    clearTimeout(nextQuestionTimer);


    data.totalMatches++;
    data.totalWins++;
    data.battlesCompleted++;
    data.matchStreak++;


    const bossCoins = 250;
    const bossXP = 100;


    data.coins += bossCoins;

    addXP(bossXP);


    updateUI();


    const attack =
        document.getElementById(
            "bossAttack"
        );


    if (attack) {

        attack.textContent =
            "👑 BOSS DEFEATED!";
    }


    showVictoryScreen(
        bossCoins,
        bossXP
    );
}


/* =====================================================
   🏁 END NORMAL BATTLE
===================================================== */

function endBattle() {

    if (!battleRunning) return;


    battleRunning = false;


    clearInterval(battleTimer);
    clearTimeout(nextQuestionTimer);


    data.totalMatches++;
    data.battlesCompleted++;


    /* BOSS */

    if (selectedMode === "boss") {

        data.matchStreak = 0;

        data.coins += 25;

        addXP(20);


        question.textContent =
            "⏰ TIME UP! BOSS ESCAPED!";


        showReward(
            "👹 THE BOSS SURVIVED!"
        );
    }


    /* VICTORY */

    else if (
        playerScore >
        rivalScore
    ) {

        data.totalWins++;
        data.matchStreak++;


        const mode =
            difficultySettings[
                selectedMode
            ];


        const coins =
            Math.floor(
                (
                    25 +
                    playerScore * 5
                ) *
                mode.rewardMultiplier
            );


        const xp =
            Math.floor(
                (
                    30 +
                    playerScore * 5
                ) *
                mode.rewardMultiplier
            );


        data.coins += coins;

        addXP(xp);


        question.textContent =
            "🏆 VICTORY!";


        showReward(
            `🏆 VICTORY! +${coins} 🪙`
        );
    }


    /* DRAW */

    else if (
        playerScore === rivalScore
    ) {

        data.matchStreak = 0;

        data.coins += 15;

        addXP(15);


        question.textContent =
            "🤝 DRAW!";


        showReward(
            "🤝 DRAW! +15 🪙"
        );
    }


    /* DEFEAT */

    else {

        data.matchStreak = 0;

        data.coins += 10;

        addXP(10);


        question.textContent =
            "⚔️ BATTLE COMPLETE!";


        showReward(
            "⚔️ BATTLE COMPLETE! +10 🪙"
        );
    }


    answers.innerHTML = `

        <button
            class="answer-button"
            id="againButton">

            ⚔️ PLAY AGAIN

        </button>

    `;


    document
        .getElementById("againButton")
        ?.addEventListener(
            "click",
            startBattle
        );


    updateUI();
}


/* =====================================================
   🎁 REWARD POPUP
===================================================== */

let rewardTimeout = null;

function showReward(message) {

    if (!rewardMessage) return;


    clearTimeout(rewardTimeout);


    rewardMessage.textContent =
        message;


    rewardMessage.classList.add(
        "show"
    );


    rewardTimeout =
        setTimeout(() => {

            rewardMessage.classList.remove(
                "show"
            );

        }, 1500);
}


/* =====================================================
   🎯 QUEST SYSTEM
===================================================== */

function updateQuests() {

    setQuest(
        "battleQuestProgress",
        "battleQuestText",
        "battleQuestButton",
        Math.min(
            data.battlesCompleted,
            1
        ),
        1,
        "battle"
    );


    setQuest(
        "correctQuestProgress",
        "correctQuestText",
        "correctQuestButton",
        Math.min(
            data.totalCorrect,
            5
        ),
        5,
        "correct"
    );


    setQuest(
        "comboQuestProgress",
        "comboQuestText",
        "comboQuestButton",
        Math.min(
            data.comboBest,
            3
        ),
        3,
        "combo"
    );


    setQuest(
        "winQuestProgress",
        "winQuestText",
        "winQuestButton",
        Math.min(
            data.totalWins,
            3
        ),
        3,
        "wins"
    );
}


function setQuest(
    progressId,
    textId,
    buttonId,
    progress,
    target,
    name
) {

    const bar =
        document.getElementById(progressId);

    const text =
        document.getElementById(textId);

    const button =
        document.getElementById(buttonId);


    if (!bar || !text || !button) {
        return;
    }


    bar.style.width =
        Math.min(
            progress / target * 100,
            100
        ) + "%";


    text.textContent =
        `${progress} / ${target}`;


    if (
        progress >= target &&
        !data.questsClaimed[name]
    ) {

        button.disabled = false;

        button.textContent =
            "🎁 CLAIM";

        button.classList.add(
            "ready"
        );

    } else if (
        data.questsClaimed[name]
    ) {

        button.disabled = true;

        button.textContent =
            "✅ CLAIMED";

        button.classList.remove(
            "ready"
        );

    } else {

        button.disabled = true;

        button.textContent =
            "🔒";

        button.classList.remove(
            "ready"
        );
    }
}


/* =====================================================
   🎁 CLAIM QUEST
===================================================== */

document
    .querySelectorAll(".claim-button")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                let name = null;


                if (
                    button.id ===
                    "battleQuestButton"
                ) {
                    name = "battle";
                }

                else if (
                    button.id ===
                    "correctQuestButton"
                ) {
                    name = "correct";
                }

                else if (
                    button.id ===
                    "comboQuestButton"
                ) {
                    name = "combo";
                }

                else if (
                    button.id ===
                    "winQuestButton"
                ) {
                    name = "wins";
                }


                if (
                    !name ||
                    data.questsClaimed[name]
                ) {
                    return;
                }


                const reward =
                    Number(
                        button.dataset.reward
                    );


                data.questsClaimed[name] =
                    true;


                data.coins += reward;

                addXP(20);


                showReward(
                    `🎁 QUEST COMPLETE! +${reward} 🪙`
                );


                updateUI();
            }
        );
    });


/* =====================================================
   🏆 ACHIEVEMENTS
===================================================== */

function updateAchievements() {

    const achievements = [

        [
            "achievementBattle",
            data.battlesCompleted >= 1
        ],

        [
            "achievementCorrect",
            data.totalCorrect >= 10
        ],

        [
            "achievementCombo",
            data.comboBest >= 5
        ],

        [
            "achievementWins",
            data.totalWins >= 5
        ]

    ];


    achievements.forEach(
        ([id, unlocked]) => {

            const element =
                document.getElementById(id);


            if (!element) return;


            element.textContent =
                unlocked
                    ? "🏆 UNLOCKED"
                    : "🔒 LOCKED";


            element.classList.toggle(
                "unlocked",
                unlocked
            );
        }
    );
}


/* =====================================================
   👕 COSTUME SYSTEM
===================================================== */

function updateCostumeButtons() {

    document
        .querySelectorAll(".costume-buy")
        .forEach(button => {

            const costume =
                button.dataset.costume;


            if (
                data.equippedCostume ===
                costume
            ) {

                button.textContent =
                    "✅ EQUIPPED";

                return;
            }


            if (
                data.ownedCostumes.includes(
                    costume
                )
            ) {

                button.textContent =
                    "EQUIP";

            } else {

                const price =
                    Number(
                        button.dataset.price
                    );

                button.textContent =
                    price === 0
                        ? "EQUIP"
                        : `BUY • ${price} 🪙`;
            }

        });
}


document
    .querySelectorAll(".costume-buy")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const price =
                    Number(
                        button.dataset.price
                    );


                const costume =
                    button.dataset.costume;


                /* ALREADY OWNED */

                if (
                    data.ownedCostumes.includes(
                        costume
                    )
                ) {

                    data.equippedCostume =
                        costume;


                    updateUI();


                    showReward(
                        `👕 ${costume} EQUIPPED!`
                    );


                    return;
                }


                /* NOT ENOUGH COINS */

                if (
                    data.coins < price
                ) {

                    showReward(
                        `❌ NEED ${
                            price -
                            data.coins
                        } MORE COINS!`
                    );

                    return;
                }


                /* BUY */

                data.coins -= price;


                data.ownedCostumes.push(
                    costume
                );


                data.equippedCostume =
                    costume;


                updateUI();


                showReward(
                    `👕 ${costume} UNLOCKED!`
                );
            }
        );
    });


/* =====================================================
   📅 DAILY STREAK
===================================================== */

function updateDailyStreak() {

    const today =
        new Date()
            .toISOString()
            .split("T")[0];


    const lastLogin =
        localStorage.getItem(
            "hindiBattleLastLogin"
        );


    if (!lastLogin) {

        data.dailyStreak = 1;

    }

    else if (
        lastLogin !== today
    ) {

        const previous =
            new Date(lastLogin);

        const current =
            new Date(today);


        const difference =
            Math.floor(
                (
                    current -
                    previous
                ) /
                86400000
            );


        if (difference === 1) {

            data.dailyStreak++;

        } else {

            data.dailyStreak = 1;
        }
    }


    localStorage.setItem(
        "hindiBattleLastLogin",
        today
    );
}


/* =====================================================
   ⚔️ QUICK BATTLE
===================================================== */

if (quickBattle) {

    quickBattle.addEventListener(
        "click",
        () => {

            selectedMode = "easy";

            startBattle();
        }
    );
}


/* =====================================================
   🎮 MENU BUTTONS
===================================================== */

document
    .querySelectorAll(".menu-button")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const text =
                    button.textContent
                        .toUpperCase();


                if (
                    text.includes(
                        "QUICK BATTLE"
                    )
                ) {

                    selectedMode = "easy";

                    startBattle();

                    return;
                }


                if (
                    text.includes("QUESTS")
                ) {

                    document
                        .getElementById(
                            "questsSection"
                        )
                        ?.scrollIntoView({
                            behavior: "smooth"
                        });

                    return;
                }


                if (
                    text.includes("COSTUMES")
                ) {

                    document
                        .getElementById(
                            "costumesSection"
                        )
                        ?.scrollIntoView({
                            behavior: "smooth"
                        });

                    return;
                }


                if (
                    text.includes(
                        "ACHIEVEMENTS"
                    )
                ) {

                    document
                        .getElementById(
                            "achievementsSection"
                        )
                        ?.scrollIntoView({
                            behavior: "smooth"
                        });
                }

            }
        );
    });


/* =====================================================
   ⚔️ DIFFICULTY BUTTONS
===================================================== */

document
    .querySelectorAll(
        ".difficulty-button"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                if (battleRunning) {
                    return;
                }


                selectedMode =
                    button.dataset.mode;


                showReward(
                    `⚔️ ${
                        selectedMode
                            .toUpperCase()
                    } BATTLE READY!`
                );


                startBattle();
            }
        );
    });


/* =====================================================
   🧹 CLOSE BATTLE WHEN LEAVING
===================================================== */

window.addEventListener(
    "beforeunload",
    () => {

        clearInterval(battleTimer);
        clearTimeout(nextQuestionTimer);

        saveData();
    }
);


/* =====================================================
   🚀 INITIALIZE GAME
===================================================== */

updateDailyStreak();

updateUI();

saveData();

console.log(
    "⚔️ हिंदी BATTLE ARENA"
    );
