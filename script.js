console.log("Welcome to Spotify");

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('ProgressBar');
let songPlayName = document.getElementById('songPlayName');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "Aik Zindagi - Angrezi medium", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Jeete Hai Chal - Neerja", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Khulke jeene ka - Dil bechara", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "O Maahi - Arijit Singh", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Hawayein - Jab Harry Met Sejal", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Keshariya Tera - Brahmastra", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Khairiyat poocho - Chhichhore", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Pehli Dafa - Atif Aslam", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
]

songItems.forEach((element, i) => {
    // console.log(element, i);
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
})

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
        // Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, i) => {
        //     console.log(element, i);
        //     if(songPlayName.innerText === songs[i].songName){
        //         element.getElementsByClassName('songItemPlay')[0].classList.remove('fa-circle-play');
        //         element.getElementsByClassName('songItemPlay')[0].classList.add('fa-circle-pause');
        //     }            
        // })
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
        // Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        //     element.classList.remove('fa-circle-pause');
        //     element.classList.add('fa-circle-play');
        // })
    }
})

audioElement.addEventListener('timeupdate', () => {
    // console.log("timeupdate");
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    // console.log('progress');
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

const makeAllStops = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        songIndex = parseInt(e.target.id);
        makeAllStops();
        if(audioElement.paused){
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.src = `songs/${songIndex}.mp3`;
            songPlayName.innerText = songs[songIndex-1].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
        }
        else {
            audioElement.pause();
            // songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            gif.style.opacity = 0;
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
        } 
    })
})

document.getElementById('Next').addEventListener('click', ()=>{
    if(songIndex >= 8) {
        songIndex = 1;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    songPlayName.innerText = songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('Previous').addEventListener('click', ()=>{
    if(songIndex <= 1) {
        songIndex = 8;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    songPlayName.innerText = songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})



