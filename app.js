const intro = document.querySelector(".intro"); // intro
const video = intro.querySelector("video"); // video
const text = intro.querySelector(".text_scroll"); // Correctly target the text_scroll class
const text2 = intro.querySelector(".text_2"); // image
const section = document.querySelector("section"); // END SECTION

// SCROLLMAGIC
const controller = new ScrollMagic.Controller();

// Scene 1: Video Pinning and Playback
let scene = new ScrollMagic.Scene({
  duration: 8000, // Video playback duration
  triggerElement: intro,
  triggerHook: 0
})
  .setPin(intro)
  .addTo(controller);

// Scene 2: "Scroll to Explore" Fade Out
const textAnim = TweenMax.fromTo(text, 3, { opacity: 1 }, { opacity : 0 });

let scene2 = new ScrollMagic.Scene({
  duration: 800, // Fades out over 500px of scrolling
  triggerElement: intro,
  triggerHook: 0
})
  .setTween(textAnim )
  .on("progress", (event) => {
    console.log(`Scene progress: ${event.progress}`); // Logs the progress of the fade-out animation
    if (event.progress === 1) {
      console.log("Text animation completed after 500px of scrolling.");
      console.log(text);
    }
  })
  .addTo(controller);

// Scene 3: Blank Video Transition
const blankAnim = TweenMax.fromTo(video, 0.5, { opacity: 1 }, { opacity: 0 });

let scene3 = new ScrollMagic.Scene({
  duration: 500, // Quick transition for blanking out the video
  triggerElement: intro,
  triggerHook: 0,
  offset: 6000 // Starts near the end of video playback
})
  .setTween(blankAnim)
  .addTo(controller);

// Scene 4: Image Fade-In
const imageAnim = TweenMax.fromTo(
  text2,
  1,
  { opacity: 0, scale: 0.8 },
  { opacity: 1, scale: 1 }
);

let scene4 = new ScrollMagic.Scene({
  duration: 800, // Image fade-in duration
  triggerElement: intro,
  triggerHook: 0,
  offset: 6300 // Starts immediately after the blank screen
})
  .setTween(imageAnim)
  .addTo(controller);

// Video Scroll Animation
let accelamount = 0.2;
let scrollpos = 0;
let delay = 0;

// Smooth video playback animation logic (without time cutoff)
scene.on("update", (e) => {
  scrollpos = e.scrollPos / 1000; // Synchronize video playback with scroll position
});

setInterval(() => {
  delay += (scrollpos - delay) * accelamount; // Smooth video syncing
  video.currentTime = delay; // Update video playback
}, 33.3);
