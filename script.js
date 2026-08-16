/* ==================================================
   KNOCK KNOCK
   CLEAN / RESPONSIVE VERSION
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

let noButtonMoved = false;


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
   HELPERS
================================================== */

function wait(ms) {

    return new Promise((resolve) => {

        window.setTimeout(
            resolve,
            ms
        );

    });

}


function formatTime(seconds) {

    if (
        !Number.isFinite(seconds) ||
        seconds < 0
    ) {

        return "0:00";

    }


    const minutes =
        Math.floor(seconds / 60);


    const secondsPart =
        Math.floor(seconds % 60)
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
        mainContent.querySelector(
            ".beg-image"
        );


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

        [-115, -90, 20, "💗", -18],
        [-155, -25, 22, "😼", -25],
        [-95, -145, 18, "✨", 15],
        [105, -105, 21, "💕", 18],
        [150, -30, 21, "🌸", 25],
        [100, -150, 17, "✦", -15],
        [145, 65, 20, "💖", 20],
        [85, 125, 21, "🌷", 15],
        [-95, 125, 20, "♡", -15],
        [-150, 65, 21, "🌸", -25],
        [-55, 145, 17, "✨", 20],
        [50, 145, 19, "💗", -18]

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
                effect[3];


            particle.style.left =
                `${originX}px`;


            particle.style.top =
                `${originY}px`;


            particle.style.fontSize =
                `${effect[2]}px`;


            particle.style.setProperty(
                "--x",
                `${effect[0]}px`
            );


            particle.style.setProperty(
                "--y",
                `${effect[1]}px`
            );


            particle.style.setProperty(
                "--rotate",
                `${effect[4]}deg`
            );


            particle.style.animationDelay =
                `${index * 0.025}s`;


            celebration.appendChild(
                particle
            );

        }
    );


    window.setTimeout(
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


        await wait(55);

    }


    cursor.remove();

}


async function startTyping() {

    if (typingStarted) {
        return;
    }


    typingStarted = true;


    await wait(600);


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

            await wait(160);

        }

    }


    await wait(350);


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


    bgMusic.volume = 0.5;

    bgMusic.loop = true;


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


            doorOpening = true;


            door.style.pointerEvents =
                "none";


            door.classList.add(
                "open"
            );


            await wait(900);


            doorScene?.classList.add(
                "hidden"
            );


            mainContent?.classList.remove(
                "hidden"
            );


            playHeartBurst();


            startHomeMusic();


            await wait(800);


            startTyping();

        }
    );

}


/* ==================================================
   NO BUTTON
   - Desktop: หนีเมื่อเมาส์เข้าใกล้
   - Mobile: หนีเมื่อแตะ
   - อยู่ในพื้นที่ .buttons
   - และไม่ออกนอก viewport
================================================== */

function moveNoButton() {

    if (!noBtn) {
        return;
    }


    const area =
        noBtn.closest(".buttons");


    if (!area) {
        return;
    }


    /*
     * ก่อนย้ายครั้งแรก:
     * เปลี่ยนเป็น absolute แต่รักษาตำแหน่งเดิม
     */
    if (!noButtonMoved) {

        const areaRect =
            area.getBoundingClientRect();

        const buttonRect =
            noBtn.getBoundingClientRect();


        const startLeft =
            buttonRect.left -
            areaRect.left +
            area.scrollLeft;


        const startTop =
            buttonRect.top -
            areaRect.top +
            area.scrollTop;


        noBtn.classList.add(
            "is-running"
        );


        noBtn.style.left =
            `${startLeft}px`;


        noBtn.style.top =
            `${startTop}px`;


        noButtonMoved = true;

    }


    /*
     * ให้ browser วาง absolute ก่อน
     */
    requestAnimationFrame(
        () => {

            const areaRect =
                area.getBoundingClientRect();

            const buttonRect =
                noBtn.getBoundingClientRect();


            const padding = 8;


            /*
             * พื้นที่ใน .buttons
             */
            let minLeft =
                padding;

            let maxLeft =
                areaRect.width -
                buttonRect.width -
                padding;


            let minTop =
                padding;

            let maxTop =
                areaRect.height -
                buttonRect.height -
                padding;


            /*
             * จำกัดด้วยขอบจอด้วย
             * กันไม่ให้ปุ่มหายไปจากจอ
             */

            const viewportMinLeft =
                padding -
                areaRect.left;

            const viewportMaxLeft =
                window.innerWidth -
                padding -
                buttonRect.width -
                areaRect.left;


            const viewportMinTop =
                padding -
                areaRect.top;

            const viewportMaxTop =
                window.innerHeight -
                padding -
                buttonRect.height -
                areaRect.top;


            minLeft =
                Math.max(
                    minLeft,
                    viewportMinLeft
                );


            maxLeft =
                Math.min(
                    maxLeft,
                    viewportMaxLeft
                );


            minTop =
                Math.max(
                    minTop,
                    viewportMinTop
                );


            maxTop =
                Math.min(
                    maxTop,
                    viewportMaxTop
                );


            /*
             * ถ้าพื้นที่แคบมาก
             * ให้ใช้จุดกึ่งกลางแทน
             */
            if (maxLeft < minLeft) {

                minLeft =
                    maxLeft =
                    Math.max(
                        0,
                        (
                            areaRect.width -
                            buttonRect.width
                        ) / 2
                    );

            }


            if (maxTop < minTop) {

                minTop =
                    maxTop =
                    Math.max(
                        0,
                        (
                            areaRect.height -
                            buttonRect.height
                        ) / 2
                    );

            }


            /*
             * สุ่มตำแหน่งใหม่
             */
            const left =
                minLeft +
                Math.random() *
                Math.max(
                    0,
                    maxLeft - minLeft
                );


            const top =
                minTop +
                Math.random() *
                Math.max(
                    0,
                    maxTop - minTop
                );


            noBtn.style.left =
                `${left}px`;


            noBtn.style.top =
                `${top}px`;

        }
    );

}


/*
 * Desktop
 */
if (noBtn) {

    noBtn.addEventListener(
        "mouseenter",
        (event) => {

            if (
                event.pointerType === "touch"
            ) {

                return;

            }


            moveNoButton();

        }
    );


    /*
     * Mobile + Desktop touch
     */
    noBtn.addEventListener(
        "pointerdown",
        (event) => {

            event.preventDefault();

            moveNoButton();

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


            mainContent?.classList.add(
                "hidden"
            );


            musicPage?.classList.remove(
                "hidden"
            );


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


    if (attachedMusic.paused) {

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
   PREVIOUS / NEXT
================================================== */

if (prevBtn) {

    prevBtn.addEventListener(
        "click",
        () => {

            if (!attachedMusic) {
                return;
            }

            attachedMusic.currentTime = 0;

        }
    );

}


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
