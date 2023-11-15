let startTime, endTime;
let imageSize = ''
let image = new Image();
let bitSpeed = document.getElementById('bits'),
 kbSpeed = document.getElementById('kbps'),
 mbSpeed = document.getElementById('mbps'),
 info = document.getElementById('info')


let totalBitSpeed =0;
let totalKbSpeed =0;
let totalMbSpeed =0;
let numTest =1;
let testCompleted = 0;

// get random image from unsplash
let imageApi = 'https://source.unsplash.com/random?topic=nature' ;
// function love(){

//     fetch(imageApi).then((response)=>{
//         console.log(response)
//     })
// }
image.onload = async function(){
    endTime = new Date().getTime();

    await fetch(imageApi).then((response)=>{
        imageSize = response.headers.get('content-length');
        calculateSpeed();
    });
};
function calculateSpeed(){
    // time taken in seconds
    let timeDuration = (endTime -startTime)/1000

    // total bits
    let loadedBits = imageSize * 8;
    let speedInBts = loadedBits / timeDuration;
    let speedInKbs = speedInBts /1024;
    let speedInMbs = speedInKbs /1024;

    totalBitSpeed += speedInBts;
    totalKbSpeed +=speedInKbs;
    totalMbSpeed +=speedInMbs;

    testCompleted++;

    // if all test completed

    if(testCompleted === numTest){
        let averageSpeedInBps = (totalBitSpeed/numTest).toFixed(2);
        let averageSpeedInKbps = (totalKbSpeed/numTest).toFixed(2);
        let averageSpeedInMbps = (totalMbSpeed/numTest).toFixed(2);

        bitSpeed.innerHTML =`${averageSpeedInBps} <span>bps</span>`
        kbSpeed.innerHTML =`${averageSpeedInKbps} <span>kbps</span>`
        mbSpeed.innerHTML =`${averageSpeedInMbps} <span>mbps</span>`
        info.innerHTML = 'Tests completed!'
        info.style.visibility='visible'
    }
    else{
        //run the next test
        startTime = new Date().getTime();
        image.src = imageApi;
        info.style.visibility='visible'
    }
}

async function firstRun(){
    info.innerHTML = 'Loading...';
    info.style.visibility='visible';

    startTime = new Date().getTime();
    image.src = imageApi;
    
}

const btn = document.getElementById('btn').addEventListener('click',()=>{
    info.style.visibility='hidden';
    testCompleted = 0
    for(let i=0;i<numTest;i++){
        firstRun();
    }
});