/* ==================================================
   KNOCK KNOCK
   MAIN SCRIPT
================================================== */


/* ==================================================
   ELEMENTS
================================================== */

const door =
    document.getElementById("door");

const doorScene =
    document.getElementById("doorScene");

const mainContent =
    document.getElementById("mainContent");

const musicPage =
    document.getElementById("musicPage");

const bgMusic =
    document.getElementById("bgMusic");

const attachedMusic =
    document.getElementById("attachedMusic");

const messageButtons =
    document.getElementById("messageButtons");

const typedLines =
    document.querySelectorAll(".typed-line");

const yesBtn =
    document.getElementById("yesBtn");

const noBtn =
    document.getElementById("noBtn");

const musicToggle =
    document.getElementById("musicToggle");

const progressBar =
    document.getElementById("progressBar");

const currentTime =
    document.getElementById("currentTime");

const duration =
    document.getElementById("duration");

const playBtn =
    document.getElementById("playBtn");

const playIcon =
    document.getElementById("playIcon");

const backBtn =
    document.getElementById("backBtn");

const forwardBtn =
    document.getElementById("forwardBtn");

const prevBtn =
    document.getElementById("prevBtn");

const nextBtn =
    document.getElementById("nextBtn");

const repeatBtn =
    document.getElementById("repeatBtn");

const shuffleBtn =
    document.getElementById("shuffleBtn");

const likeBtn =
    document.getElementById("likeBtn");

const celebration =
    document.getElementById("celebration");


/* ==================================================
   STATE
================================================== */

let knocks = 0;

let doorOpening = false;

let typingStarted = false;

let noButtonX = 0;

let noButtonY = 0;


/* ==================================================
   MESSAGE
================================================== */

const messageText = [
    "คุณหน้าเหมือนแมวเลยอะ",
    "ดูน่ารัก นุ่มฟู",
    "แล้วก็ชวนให้เอ็นดูมากๆ",
    "น่ารักจัง",
    "ผมว่าผมรักแมว"
];


/* ==================================================
   HELPER
================================================== */

function wait(ms) {

    return new Promise(
        (resolve) => {

            window.setTimeout(
                resolve,
                ms
            );

        }
    );

}


function formatTime(seconds) {

    if (
        !Number.isFinite(seconds) ||
        seconds < 0
    ) {

        return "0:00";

    }


    const minutes =
        Math.floor(
            seconds / 60
        );


    const secondsPart =
        Math.floor(
            seconds % 60
        )
        .toString()
        .padStart(2, "0");


    return `${minutes}:${secondsPart}`;

}


/* ==================================================
   HEART BURST
================================================== */

function playHeartBurst() {

    if (
        !celebration ||
        !mainContent
    ) {

        return;

    }


    celebration.innerHTML = "";


    const image =
        mainContent.querySelector("img");


    let originX =
        window.innerWidth / 2;

    let originY =
        window.innerHeight / 2;


    if (image) {

        const rect =
            image.getBoundingClientRect();


        originX =
            rect.left +
            rect.width / 2;


        originY =
            rect.top +
            rect.height / 2;

    }


    const effects = [

        {
            emoji: "💗",
            x: -115,
            y: -90,
            size: 20,
            rotate: -18
        },

        {
            emoji: "😼",
            x: -155,
            y: -25,
            size: 22,
            rotate: -25
        },

        {
            emoji: "✨",
            x: -95,
            y: -145,
            size: 18,
            rotate: 15
        },

        {
            emoji: "💕",
            x: 105,
            y: -105,
            size: 21,
            rotate: 18
        },

        {
            emoji: "🌸",
            x: 150,
            y: -30,
            size: 21,
            rotate: 25
        },

        {
            emoji: "✦",
            x: 100,
            y: -150,
            size: 17,
            rotate: -15
        },

        {
            emoji: "💖",
            x: 145,
            y: 65,
            size: 20,
            rotate: 20
        },

        {
            emoji: "🌷",
            x: 85,
            y: 125,
            size: 21,
            rotate: 15
        },

        {
            emoji: "♡",
            x: -95,
            y: 125,
            size: 20,
            rotate: -15
        },

        {
            emoji: "🌸",
            x: -150,
            y: 65,
            size: 21,
            rotate: -25
        },

        {
            emoji: "✨",
            x: -55,
            y: 145,
            size: 17,
            rotate: 20
        },

        {
            emoji: "💗",
            x: 50,
            y: 145,
            size: 19,
            rotate: -18
        }

    ];


    effects.forEach(
        (effect, index) => {

            const particle =
                document.createElement(
                    "span"
                );


            particle.className =
                "heart-burst";


            particle.textContent =
                effect.emoji;


            particle.style.left =
                `${originX}px`;


            particle.style.top =
                `${originY}px`;


            particle.style.fontSize =
                `${effect.size}px`;


            particle.style.setProperty(
                "--x",
                `${effect.x}px`
            );


            particle.style.setProperty(
                "--y",
                `${effect.y}px`
            );


            particle.style.setProperty(
                "--rotate",
                `${effect.rotate}deg`
            );


            particle.style.animationDelay =
                `${index * 0.025}s`;


            celebration.appendChild(
                particle
            );

        }
    );


    setTimeout(
        () => {

            celebration.innerHTML = "";

        },
        1200
    );

}


/* ==================================================
   TYPING
================================================== */

async function typeOneLine(
    element,
    text
) {

    if (!element) {

        return;

    }


    const cursor =
        document.createElement(
            "span"
        );


    cursor.className =
        "typing-cursor";


    element.appendChild(
        cursor
    );


    for (
        let i = 0;
        i < text.length;
        i++
    ) {

        cursor.before(
            document.createTextNode(
                text[i]
            )
        );


        await wait(68);

    }


    cursor.remove();

}


async function startTyping() {

    if (typingStarted) {

        return;

    }


    typingStarted = true;


    await wait(700);


    for (
        let i = 0;
        i < messageText.length;
        i++
    ) {

        await typeOneLine(
            typedLines[i],
            messageText[i]
        );


        if (
            i <
            messageText.length - 1
        ) {

            await wait(220);

        }

    }


    await wait(500);


    if (messageButtons) {

        messageButtons.classList.add(
            "buttons-show"
        );

    }

}


/* ==================================================
   HOME MUSIC
================================================== */

function startHomeMusic() {

    if (!bgMusic) {

        return;

    }


    bgMusic.volume =
        0.5;


    bgMusic.loop =
        true;


    const promise =
        bgMusic.play();


    if (promise) {

        promise.catch(
            () => {}
        );

    }

}


/* ==================================================
   DOOR
================================================== */

if (door) {

    door.addEventListener(
        "click",
        async () => {

            if (doorOpening) {

                return;

            }


            door.classList.remove(
                "knock"
            );


            void door.offsetWidth;


            door.classList.add(
                "knock"
            );


            knocks++;


            if (knocks < 2) {

                return;

            }


            doorOpening =
                true;


            door.style.pointerEvents =
                "none";


            door.classList.add(
                "open"
            );


            await wait(1000);


            if (doorScene) {

                doorScene.classList.add(
                    "hidden"
                );

            }


            if (mainContent) {

                mainContent.classList.remove(
                    "hidden"
                );

            }


            playHeartBurst();


            startHomeMusic();


            await wait(950);


            startTyping();

        }
    );

}


/* ==================================================
   NO BUTTON
================================================== */

const noButtonMoves = [

    {
        x: -120,
        y: -65
    },

    {
        x: 120,
        y: -65
    },

    {
        x: -135,
        y: 55
    },

    {
        x: 135,
        y: 55
    },

    {
        x: -90,
        y: 95
    },

    {
        x: 90,
        y: 95
    },

    {
        x: -145,
        y: 0
    },

    {
        x: 145,
        y: 0
    }

];


function moveNoButton() {

    if (!noBtn) {

        return;

    }


    let move;


    do {

        move =
            noButtonMoves[
                Math.floor(
                    Math.random() *
                    noButtonMoves.length
                )
            ];

    } while (
        move.x === noButtonX &&
        move.y === noButtonY
    );


    noButtonX =
        move.x;


    noButtonY =
        move.y;


    noBtn.classList.add(
        "is-running"
    );


    noBtn.style.transform =
        `translate(
            ${noButtonX}px,
            ${noButtonY}px
        )`;

}


if (noBtn) {

    noBtn.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            moveNoButton();

        }
    );


    noBtn.addEventListener(
        "touchstart",
        (event) => {

            event.preventDefault();

            moveNoButton();

        },
        {
            passive: false
        }
    );

}


/* ==================================================
   YES BUTTON
================================================== */

if (yesBtn) {

    yesBtn.addEventListener(
        "click",
        () => {

            if (bgMusic) {

                bgMusic.pause();

            }


            if (mainContent) {

                mainContent.classList.add(
                    "hidden"
                );

            }


            if (musicPage) {

                musicPage.classList.remove(
                    "hidden"
                );

            }


            if (attachedMusic) {

                attachedMusic.currentTime =
                    0;


                attachedMusic.volume =
                    0.55;


                attachedMusic.loop =
                    false;


                const promise =
                    attachedMusic.play();


                if (promise) {

                    promise.catch(
                        () => {}
                    );

                }

            }


            updateMusicUI();

        }
    );

}


/* ==================================================
   PLAY / PAUSE
================================================== */

function updatePlayIcon() {

    if (
        !playIcon ||
        !attachedMusic
    ) {

        return;

    }


    if (
        attachedMusic.paused
    ) {

        playIcon.innerHTML = `
            <path d="M8 5v14l11-7Z"></path>
        `;

    } else {

        playIcon.innerHTML = `
            <path d="M7 5h3v14H7Z"></path>
            <path d="M14 5h3v14h-3Z"></path>
        `;

    }

}


if (playBtn) {

    playBtn.addEventListener(
        "click",
        () => {

            if (!attachedMusic) {

                return;

            }


            if (
                attachedMusic.paused
            ) {

                const promise =
                    attachedMusic.play();


                if (promise) {

                    promise.catch(
                        () => {}
                    );

                }

            } else {

                attachedMusic.pause();

            }

        }
    );

}


/* ==================================================
   MUSIC UI
================================================== */

function updateMusicUI() {

    if (!attachedMusic) {

        return;

    }


    if (currentTime) {

        currentTime.textContent =
            formatTime(
                attachedMusic.currentTime
            );

    }


    if (duration) {

        duration.textContent =
            formatTime(
                attachedMusic.duration
            );

    }


    /*
       Progress
       0 - 100
    */

    if (
        progressBar &&
        Number.isFinite(
            attachedMusic.duration
        ) &&
        attachedMusic.duration > 0
    ) {

        const progress =
            (
                attachedMusic.currentTime /
                attachedMusic.duration
            ) * 100;


        progressBar.value =
            progress;


        progressBar.style.setProperty(
            "--progress",
            `${progress}%`
        );

    }

}


/* ==================================================
   AUDIO EVENTS
================================================== */

if (attachedMusic) {

    attachedMusic.addEventListener(
        "loadedmetadata",
        updateMusicUI
    );


    attachedMusic.addEventListener(
        "timeupdate",
        updateMusicUI
    );


    attachedMusic.addEventListener(
        "play",
        updatePlayIcon
    );


    attachedMusic.addEventListener(
        "pause",
        updatePlayIcon
    );


    attachedMusic.addEventListener(
        "ended",
        updatePlayIcon
    );

}


/* ==================================================
   PROGRESS BAR
================================================== */

if (progressBar) {

    progressBar.addEventListener(
        "input",
        () => {

            if (
                !attachedMusic ||
                !Number.isFinite(
                    attachedMusic.duration
                ) ||
                attachedMusic.duration <= 0
            ) {

                return;

            }


            attachedMusic.currentTime =
                (
                    Number(
                        progressBar.value
                    ) / 100
                ) *
                attachedMusic.duration;


            updateMusicUI();

        }
    );

}


/* ==================================================
   BACK 10 SECONDS
================================================== */

if (backBtn) {

    backBtn.addEventListener(
        "click",
        () => {

            if (!attachedMusic) {

                return;

            }


            attachedMusic.currentTime =
                Math.max(
                    0,
                    attachedMusic.currentTime - 10
                );

        }
    );

}


/* ==================================================
   FORWARD 10 SECONDS
================================================== */

if (forwardBtn) {

    forwardBtn.addEventListener(
        "click",
        () => {

            if (!attachedMusic) {

                return;

            }


            const maxTime =
                Number.isFinite(
                    attachedMusic.duration
                )
                    ? attachedMusic.duration
                    : attachedMusic.currentTime + 10;


            attachedMusic.currentTime =
                Math.min(
                    maxTime,
                    attachedMusic.currentTime + 10
                );

        }
    );

}


/* ==================================================
   PREVIOUS
================================================== */

if (prevBtn) {

    prevBtn.addEventListener(
        "click",
        () => {

            if (!attachedMusic) {

                return;

            }


            attachedMusic.currentTime =
                0;

        }
    );

}


/* ==================================================
   NEXT
================================================== */

if (nextBtn) {

    nextBtn.addEventListener(
        "click",
        () => {

            if (!attachedMusic) {

                return;

            }


            if (
                Number.isFinite(
                    attachedMusic.duration
                )
            ) {

                attachedMusic.currentTime =
                    attachedMusic.duration;

            }

        }
    );

}


/* ==================================================
   REPEAT
================================================== */

if (repeatBtn) {

    repeatBtn.addEventListener(
        "click",
        () => {

            if (!attachedMusic) {

                return;

            }


            attachedMusic.loop =
                !attachedMusic.loop;


            repeatBtn.classList.toggle(
                "active",
                attachedMusic.loop
            );

        }
    );

}


/* ==================================================
   SHUFFLE
================================================== */

if (shuffleBtn) {

    shuffleBtn.addEventListener(
        "click",
        () => {

            shuffleBtn.classList.toggle(
                "active"
            );

        }
    );

}


/* ==================================================
   LIKE
================================================== */

if (likeBtn) {

    likeBtn.addEventListener(
        "click",
        () => {

            likeBtn.classList.toggle(
                "is-liked"
            );

        }
    );

}


/* ==================================================
   VOLUME
================================================== */

if (musicToggle) {

    musicToggle.addEventListener(
        "click",
        () => {

            const shouldMute =
                bgMusic
                    ? !bgMusic.muted
                    : false;


            if (bgMusic) {

                bgMusic.muted =
                    shouldMute;

            }


            if (attachedMusic) {

                attachedMusic.muted =
                    shouldMute;

            }


            if (shouldMute) {

                musicToggle.innerHTML = `
                    <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path d="M4 10v4h4l5 4V6l-5 4H4"></path>
                        <path d="m18 9-5 6"></path>
                        <path d="m13 9 5 6"></path>
                    </svg>
                `;

            } else {

                musicToggle.innerHTML = `
                    <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path d="M4 10v4h4l5 4V6l-5 4H4"></path>
                        <path d="M16 9a4 4 0 0 1 0 6"></path>
                        <path d="M18.5 6.5a7.5 7.5 0 0 1 0 11"></path>
                    </svg>
                `;

            }

        }
    );

}


/* ==================================================
   INITIALIZE
================================================== */

updatePlayIcon();

updateMusicUI();