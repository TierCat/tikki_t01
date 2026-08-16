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
   HEART + FLOWER BURST
   พุ่งออกมาพร้อมรูป
================================================== */

function playHeartBurst() {

    if (!celebration || !mainContent) {
        return;
    }

    celebration.innerHTML = "";


    /*
     * หา "รูปหลัก" ในหน้าปัจจุบัน
     * เพื่อให้เอฟเฟกต์พุ่งออกจากบริเวณรูป
     */
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


    /*
     * หัวใจ + ดอกไม้ + ประกาย
     *
     * จำนวนไม่เยอะ
     * เพื่อไม่ให้บังข้อความ
     */
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


    /*
     * สร้าง particle
     */
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


            /*
             * ให้พุ่งออกเกือบพร้อมกัน
             * แต่ไม่พร้อมเป๊ะจนดูแข็ง
             */
            particle.style.animationDelay =
                `${index * 0.025}s`;


            celebration.appendChild(
                particle
            );

        }
    );


    /*
     * ล้างหลัง animation
     */
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


    /*
     * สร้าง cursor
     */
    const cursor =
        document.createElement(
            "span"
        );


    cursor.className =
        "typing-cursor";


    element.appendChild(
        cursor
    );


    /*
     * พิมพ์ทีละตัว
     */
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


    /*
     * สำคัญมาก
     *
     * พอจบบรรทัด
     * cursor ของบรรทัดนี้หายทันที
     */
    cursor.remove();

}


async function startTyping() {

    /*
     * ป้องกัน animation ซ้ำ
     */
    if (typingStarted) {

        return;

    }


    typingStarted = true;


    /*
     * ให้คนดูรูปก่อน
     */
    await wait(700);


    /*
     * พิมพ์ทีละบรรทัด
     */
    for (
        let i = 0;
        i < messageText.length;
        i++
    ) {

        await typeOneLine(
            typedLines[i],
            messageText[i]
        );


        /*
         * เว้นจังหวะระหว่างบรรทัด
         */
        if (
            i <
            messageText.length - 1
        ) {

            await wait(220);

        }

    }


    /*
     * ข้อความจบแล้ว
     * เว้นนิดหนึ่งก่อนให้ปุ่มขึ้น
     */
    await wait(500);


    if (messageButtons) {

        messageButtons.classList.add(
            "buttons-show"
        );

    }

}


/* ==================================================
   HOME MUSIC
   เพลงปก.mp3 เริ่มที่ 1:06
================================================== */

function startHomeMusic() {

    if (!bgMusic) {

        return;

    }


    /*
     * 1:06 = 66 วินาที
     */
   


    bgMusic.volume =
        0.5;


    bgMusic.loop =
        true;


    const promise =
        bgMusic.play();


    /*
     * กัน browser block autoplay
     */
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

            /*
             * ถ้ากำลังเปิดอยู่
             * ห้ามกดซ้ำ
             */
            if (doorOpening) {

                return;

            }


            /*
             * Animation เคาะ
             */
            door.classList.remove(
                "knock"
            );


            void door.offsetWidth;


            door.classList.add(
                "knock"
            );


            knocks += 1;


            /*
             * ต้องเคาะ 2 ครั้ง
             */
            if (knocks < 2) {

                return;

            }


            /*
             * เริ่มเปิดประตู
             */
            doorOpening =
                true;


            door.style.pointerEvents =
                "none";


            door.classList.add(
                "open"
            );


            /*
             * =================================================
             * สำคัญ
             *
             * รอให้ประตูเปิดจนสุดก่อน
             * ยังไม่ให้รูปหรือพลุขึ้น
             * =================================================
             */
            await wait(1000);


            /*
             * =================================================
             * ตุ้ม!!
             *
             * รูป + เอฟเฟกต์พุ่งพร้อมกัน
             * =================================================
             */


            /*
             * ซ่อนหน้าแรก
             */
            if (doorScene) {

                doorScene.classList.add(
                    "hidden"
                );

            }


            /*
             * แสดงหน้ารูป
             */
            if (mainContent) {

                mainContent.classList.remove(
                    "hidden"
                );

            }


            /*
             * 💗✨ พุ่งออกมา
             */
            playHeartBurst();


            /*
             * เพลงเริ่มที่ 1:06
             */
            startHomeMusic();


            /*
             * =================================================
             * รอให้เห็นรูป + เอฟเฟกต์
             * =================================================
             */
            await wait(950);


            /*
             * =================================================
             * หลังเอฟเฟกต์จบ
             * ค่อยเริ่มพิมพ์
             * =================================================
             */
            startTyping();

        }
    );

}


/* ==================================================
   NO BUTTON
   กดแล้ววิ่งหนีด้วย TRANSFORM
================================================== */


/*
 * ตำแหน่งที่สามารถวิ่งไปได้
 *
 * ไม่ใช้ fixed
 * ไม่ใช้ left
 * ไม่ใช้ top
 */
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


    /*
     * สุ่มจนกว่าจะได้ตำแหน่งใหม่
     */
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


    /*
     * จำตำแหน่งใหม่
     */
    noButtonX =
        move.x;


    noButtonY =
        move.y;


    /*
     * ใส่ class
     */
    noBtn.classList.add(
        "is-running"
    );


    /*
     * ให้ CSS transition
     * ทำหน้าที่วิ่งจากจุดเดิม
     * ไปจุดใหม่
     */
    noBtn.style.transform =
        `translate(
            ${noButtonX}px,
            ${noButtonY}px
        )`;

}


/*
 * Desktop
 */
if (noBtn) {

    noBtn.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            moveNoButton();

        }
    );


    /*
     * Mobile
     */
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
   เปิด MUSIC WIDGET
================================================== */

if (yesBtn) {

    yesBtn.addEventListener(
        "click",
        () => {

            /*
             * หยุดเพลงหน้าแรก
             */
            if (bgMusic) {

                bgMusic.pause();

            }


            /*
             * ซ่อนหน้าข้อความ
             */
            if (mainContent) {

                mainContent.classList.add(
                    "hidden"
                );

            }


            /*
             * เปิด Music Widget
             */
            if (musicPage) {

                musicPage.classList.remove(
                    "hidden"
                );

            }


            /*
             * เริ่มเพลงแนบ
             */
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


    if (
        progressBar &&
        Number.isFinite(
            attachedMusic.duration
        ) &&
        attachedMusic.duration > 0
    ) {

        progressBar.value =
            (
                attachedMusic.currentTime /
                attachedMusic.duration
            ) * 100;

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


            /*
             * Mute icon
             */
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

            }


            /*
             * Volume icon
             */
            else {

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