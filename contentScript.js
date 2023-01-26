(() => {
  //Variables declared to get the current status of them
  let testStatus = false,
    micWorking = false,
    camWorking = false;
  let totalTabsOpened = 0;

  //this is a method that adds an event listener to the extension to listen for messages sent by other scripts
  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, len } = obj;
    totalTabsOpened = len;
    if (type === "PageLoaded") {
      Dashboard();
    }
    //We send back response that we recieved the message sent to us
    response({ response: "Response from background script" });
  });

  //A function to check availibility of mic
  const checkMyMic = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(function (stream) {
        console.log("Microphone is available.");
        micWorking = true;
        alert("Mic Working Fine");
      })
      .catch(function (error) {
        alert("Microphone is not available.");
      });
  };

  //Function to check availability of camera
  const checkMyCam = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (stream) {
        camWorking = true;
        alert("Camera detected and working Fine");
      })
      .catch(function (error) {
        alert("Camera is not available.");
      });
  };


  //Code to Create the Start Test Button
  const createStartTestButton = () => {
    let startTest = document.createElement("button");
    startTest.className = "button";
    startTest.innerText = "Start Test";
    startTest.title = "Click to begin the test";
    document.body.append(startTest);
    startTest.addEventListener("click", startTestEvent);
  };

  //Code to Create the End Test Button
  const createEndTestButton = () => {
    let endTest = document.createElement("button");
    let nextLine = document.createElement("br");
    endTest.className = "button";
    endTest.innerText = "End Test";
    endTest.title = "Click to end Test";
    document.body.append(endTest);
    document.body.append(nextLine);
    endTest.addEventListener("click", endTestEvent);
  };

  //Code to Create the Check Cam Button
  const createCheckCamButton = () => {
    let checkCam = document.createElement("button");
    let nextLine = document.createElement("br");
    checkCam.className = "check-button";
    checkCam.innerText = "Check Availability of Camera";
    checkCam.title = "Click to check Cam";
    document.body.append(checkCam);
    document.body.append(nextLine);
    checkCam.addEventListener("click", checkMyCam);
  };

  //Code to Create the Check Mic Button
  const createCheckMicButton = () => {
    let checkMic = document.createElement("button");
    let nextLine = document.createElement("br");
    checkMic.className = "check-button";
    checkMic.innerText = "Check Availability of Mic";
    checkMic.title = "Click to check Mic";
    document.body.append(checkMic);
    document.body.append(nextLine);
    checkMic.addEventListener("click", checkMyMic);
  };


  //This loads our dashboard
  const Dashboard = () => {
    createStartTestButton();
    createEndTestButton();
    createCheckCamButton();
    createCheckMicButton();
    // createInternetButton();
  };

  //This thing works when we click on start test
  const startTestEvent = () => {
    testStatus = true;
    //If the cam or mic is not working then we wont let user start the test
    if (!camWorking || !micWorking) {
      alert("Please recheck your camera and mic");
    } else {
      //If number of tabs currently running are more than one
      if (totalTabsOpened > 1) {
        alert("Please Close all other tabs");
      } else {
        /* Full Screen */
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
          //Alert after user switches tab
          document.addEventListener("visibilitychange", function () {
            if (testStatus && document.hidden) {
              alert("Warning!! You switched tabs");
            }
          });
        }
      }
    }
  };

  //When we end test
  const endTestEvent = () => {
    testStatus = false;
    document.exitFullscreen();
    window.location.reload();
  };
})();
