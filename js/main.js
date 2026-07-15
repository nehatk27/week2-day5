import { init as accordianInit } from "./components/accordian.js";
import { init as darkModeInit } from "./components/darkMode.js";
import { init as navInit } from "./components/nav.js";
import { init as navDrawerInit } from "./components/navDrawer.js";
import { init as apiContentInit } from "./components/apiContent.js";
import { init as liveSearchInit } from "./components/liveSearch.js";
import { init as scrollAnimationInit } from "./components/scrollAnimation.js";
import { init as formValidateInit } from "./components/formValidate.js";

performance.mark("start");
navInit();
accordianInit();
darkModeInit();
navDrawerInit();
apiContentInit();
liveSearchInit();
scrollAnimationInit();
formValidateInit();

performance.mark("end");

performance.measure("duration", "start", "end");

const measures = performance.getEntriesByType("measure");
measures.forEach((measure) => {
  console.log(`${measure.name}: ${measure.duration}ms`);
});

// navigator.connection
if ("connection" in navigator) {
  const connection = navigator.connection;
  console.log(connection);
  console.log("Connection Type:", connection.effectiveType);
  console.log("Download Speed (Mbps):", connection.downlink);
  console.log("RTT (ms):", connection.rtt);
  console.log("Data Saver Enabled:", connection.saveData);

  const isSlow = ["slow-2g", "2g"].includes(connection.effectiveType) || connection.saveData;

  if (isSlow) {
    document.documentElement.classList.add("optimize-performance");

    document.getAnimations().forEach((animation) => animation.cancel());

    document.querySelectorAll("video[autoplay], audio[autoplay]").forEach((media) => {
      media.removeAttribute("autoplay");
      media.pause(); // Forces the media to stop if it already started
    });
  }
} else {
  console.log("Network Information API not supported.");
}