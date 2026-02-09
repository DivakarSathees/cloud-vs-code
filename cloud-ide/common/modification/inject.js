// let focusEvent, blurEvent,visibilityEvent, messageEvent, pasteEvent, copyEvent, cutEvent;
// let isFocused,
//   isBlurred = false,
//   enableCopyPaste = false,
//   pastedMetaData = {
//     length : 0,
//     firstLetter : "",
//     lastLetter : ""
//   };

// function createListener(eventName, eventFunction) {
//   return window.addEventListener(eventName, eventFunction);
// }

// //removing window events
// window.removeEventListener("focus", focusFunction);
// window.removeEventListener("blur", blurFunction);
// window.removeEventListener("visibilitychange", visibilityFunction);
// window.removeEventListener("message",handleMessage );
// window.removeEventListener("paste",handlePaste, true);
// window.removeEventListener("copy",trackCopy, true);
// window.removeEventListener("cut",trackCopy, true);


// //creating window events
// focusEvent = createListener("focus", focusFunction);
// blurEvent = createListener("blur", blurFunction);
// visibilityEvent= createListener("visibilitychange", visibilityFunction);
// visibilityEvent= createListener("message", handleMessage);
// pasteEvent = window.addEventListener("paste", handlePaste, true);
// copyEvent = createListener("copy", trackCopy);
// cutEvent = createListener("cut", trackCopy);

// //tracking copied data
// async function trackCopy(e){
//   if(enableCopyPaste){
//     return
//   }
//   const value =  e?.clipboardData?.getData('Text')

//   //extracting meta of copied data
//   pastedMetaData.length = value.length;
//   pastedMetaData.firstLetter = value.length > 1 ? value[0] : ""
//   pastedMetaData.lastLetter = value.length > 1 ? value[pastedMetaData.length - 1] : "";
// }


// async function focusFunction() {
//   isFocused = true;
//   if (isBlurred && !enableCopyPaste) {
//     await navigator.clipboard.writeText("Could not paste");
//   }
//   isBlurred = false;
// }

// function blurFunction() {
//   isBlurred = true;
// }

// function visibilityFunction(){
//   callParent("vscode_" + document.visibilityState)
// }

// //to handle paste event
// async function handlePaste(event){
//   if(enableCopyPaste){
//     return
//   }
//   const pastedData = event?.clipboardData?.getData('Text');
//   if(pastedData === "Could not paste"){
//     return
//   }

//   //extracting meta for data to be pasted
//   let temp = {}
//   temp.length = pastedData.length;
//   temp.firstLetter = pastedData.length > 1 ? pastedData[0] : ""
//   temp.lastLetter = pastedData.length > 1 ? pastedData[pastedData.length - 1] : "";

//   //comparing copied and paste meta
//   if(pastedData &&
//     temp.length === pastedMetaData.length &&
//     temp.firstLetter === pastedMetaData.firstLetter &&
//     temp.lastLetter === pastedMetaData.lastLetter
//   ){
//     return
//   }

//   //if meta doesn't matches, preventing paste
//   event.preventDefault();
//   event.stopImmediatePropagation();
//   event.stopPropagation();

//   await navigator.clipboard.writeText("Could not paste");
//   pastedMetaData = {
//     length : 15,
//     firstLetter : "C",
//     lastLetter : "e"
//   }
// }

// async function handleMessage(message){
//     if(message.data === "enable_copy_paste"){
//         enableCopyPaste = true;
//     }
//     else if(message.data === "disable_copy_paste"){
//         enableCopyPaste = false;
//     }
// }

// function callParent(msg,origin = "*"){
//     parent.postMessage(msg,origin);
// }

// document.addEventListener("drop",async(event)=>{
//     if(!enableCopyPaste){
//         event.dataTransfer.clearData();
//         event.stopImmediatePropagation();
//         event.preventDefault();
//         event.stopPropagation();
//     }
// },true)