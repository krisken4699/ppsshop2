var Loading = true;

window.location.href.includes("https://") || window.location.href.includes("127") || window.location.href.includes("localhost:3000") || window.location.href.includes("192.168") || window.location.href.includes("172.20.10.4") || (window.location.href = "https://" + window.location.href.substring(7, window.location.href.length)), console.log(window.location.href);

// const options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, }; fetch('/views/bootstrapLink.html', options).then((response) => { return response.json() }).then((response) => { document.getElementsByTagName('head')[0].innerHTML += (response) });

// const Embed = ['<script src="crypto-js.min.js"integrity="sha512-nOQuvD9nKirvxDdvQ9OMqe2dgapbPB7vYAMrzJihw5m+aNcf0dX53m6YxM4LgA9u8e9eg9QX+/+mPu8kCNpV2A=="crossorigin="anonymous"></script>',
// '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">',
// '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">',
// '<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"crossorigin="anonymous"></script>',
// '<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js"integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx"crossorigin="anonymous"></script>',
// '<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"crossorigin="anonymous"></script>',
// '<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN"crossorigin="anonymous"></script>',
// '<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js"integrity="sha384-w1Q4orYjBQndcko6MimVbzY0tgp4pWB4lZ7lr30WKz0vr/aWKhXdBNmNb5D92v7s"crossorigin="anonymous"></script>'
// <script src="crypto-js.min.js"
{ /* <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script> */ }
// integrity="sha512-nOQuvD9nKirvxDdvQ9OMqe2dgapbPB7vYAMrzJihw5m+aNcf0dX53m6YxM4LgA9u8e9eg9QX+/+mPu8kCNpV2A=="
// crossorigin="anonymous"></script>
//<link rel="stylesheet"  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
{ /* <link href="example" rel="stylesheet/scss" type="text/css"></link> */ }
//]

document.addEventListener('contextmenu', event => event.preventDefault());
var head = document.getElementsByTagName('head')[0];
const EmbedLink = [
    { href: 'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css', integrity: 'sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2', crossorigin: 'anonymous' },
    { href: "//use.fontawesome.com/releases/v5.15.2/css/all.css", integrity: '', crossorigin: 'anonymous' },
    { href: "/views/style/css/transition.css", integrity: '', crossorigin: 'anonymous' },
    { href: "/views/style/css/animations.css", integrity: '', crossorigin: 'anonymous' },
    { href: "/views/style/css/style.css", integrity: '', crossorigin: 'anonymous' },
];


if (window.location.pathname == '/admin/report/transaction') {
    EmbedLink[2].href = '';
}

const EmbedScript = [
    { src: '/crypto-js.min.js', integrity: 'sha512-nOQuvD9nKirvxDdvQ9OMqe2dgapbPB7vYAMrzJihw5m+aNcf0dX53m6YxM4LgA9u8e9eg9QX+/+mPu8kCNpV2A==', crossorigin: 'anonymous' },
    { src: 'https://code.jquery.com/jquery-3.5.1.slim.min.js', integrity: 'sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj', crossorigin: 'anonymous' },
    { src: 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js', integrity: '', crossorigin: 'anonymous' },
    // { src: 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js', integrity: '', crossorigin: 'anonymous' },
    { src: 'https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js', integrity: 'sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN', crossorigin: 'anonymous' },
    { src: 'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js', integrity: 'sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx', crossorigin: 'anonymous' },
];
// { src: 'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js', integrity : 'sha384-w1Q4orYjBQndcko6MimVbzY0tgp4pWB4lZ7lr30WKz0vr/aWKhXdBNmNb5D92v7s', crossorigin: 'anonymous' }


EmbedLink.forEach(e => {
    var r = document.createElement("link");
    r.rel = "stylesheet", r.type = "text/css", r.href = e.href, "" != e.integrity && (r.integrity = e.integrity), r.crossOrigin = e.crossorigin, head.appendChild(r)
}), EmbedScript.forEach(e => {
    var r = document.createElement("script");
    r.src = e.src, r.integrity = e.integrity, r.crossOrigin = e.crossorigin, head.appendChild(r)
});
//Add but compressed

// @keyframes jump{
//     0%{
//       transform: translateY(30px);
//     }
//     50%{
//       transform: translateY(30px);
//     }
//   }

const DelayedLoop = async (milliseconds, times, func) => {
    for (k = 0; k < times; k++) {
        const sleep = (milliseconds) => {
            return new Promise(resolve => setTimeout(resolve, milliseconds));
        }
        func();
        await sleep(milliseconds);
    }
}
// setTimeout(() => {
//     DelayedLoop(10, 10000, function () {
//     createParticle(10, 0, document.querySelector('.loadingBrocket').children[0]);
// });
// }, 100);
function ShowLoading() {
    console.log('Loading page Show')
    DelayedLoop(10, 10000, function () {
        createParticle(10, 0, document.querySelector('.loadingBrocket').children[0]);
    });
    $('#loading').fadeIn();
}

function createParticle(x, y, target) {
    const particle = document.createElement('particle');
    particle.style.opacity = 0.1;
    target.appendChild(particle);

    // Calculate a random size from 5px to 25px
    const size = Math.floor(Math.random() * 20 + 5);
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    // Generate a random color in a blue/purple palette
    particle.style.background = 'white';
    // particle.style.background = `hsl(${Math.random() * 90 + 180}, 70%, 60%)`;
    particle.style.background = `rgba(0, 0, 0, ${Math.random()} /2)`;
    particle.style.position = 'absolute';

    // Generate a random x & y destination within a distance of 75px from the mouse
    var destinationX = x + (Math.random() - 0.3) * 2 * 50;
    var destinationY = y + (Math.random() + 1) * 2 * 60;
    // Store the animation in a variable as we will need it later
    const animation = particle.animate([{
        transform: `translate(-50%, -50%) `,
        opacity: 0.6
    },
    {
        // We define the final coordinates as the second keyframe
        transform: "translate(" + -destinationX + "px, " + destinationY + "px)",
        opacity: 0
    }
    ], {
        // Set a random duration from 500 to 1500ms
        duration: Math.random() * 1000 + 500,
        easing: 'cubic-bezier(0, .9, .57, 1)',
        // Delay every particle with a random value of 200ms
        delay: Math.random() * 200
    });

    // When the animation is complete, remove the element from the DOM
    animation.onfinish = () => {
        particle.remove();
    };
}


var language = {};
window.onload = function () {
    $('body').attr("lang", false);
    fetch('/share/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ path: 'Language.json' }) }).then((response2) => { return response2.json() }).then((responseJson2) => {
        language = JSON.parse(responseJson2);
    });
    setTimeout(() => {
        checkLanguage();
    }, 100);
}
var Lang = "Thai";

function checkLanguage() {
    if (Lang = 'Thai') {
        var temp = {};
        if (document.getElementsByClassName('translated-ltr'))
            setTimeout(() => {
                document.querySelectorAll('[ChangeLanguage]').forEach(element => {
                    while (element.innerText.includes("  ") || element.innerText.includes('\n'))
                        element.innerText = element.innerText.replace("  ", "").replace('\n', "");
                    if (element.innerText.charAt(element.innerText.length - 1) == " ")
                        element.innerText = element.innerText.substring(0, element.innerText.length - 1);
                    // console.log(element.innerText);
                    if (language[Lang][element.innerText.replace("  ", "").replace('\n', "")] != undefined) {
                        console.log(element.style.fontWeight)  
                        element.innerHTML = language[Lang][element.innerText].replace("  ", "").replace('\n', "");
                        element.style.fontFamily = 'Athiti, sans-serif';
                    }
                    else{
                        console.log(element.innerText)
                    }
                    // console.log(element.innerText);
                });
                // console.log(JSON.stringify(temp));
            }, 1000);
    }
}

document.addEventListener("click", e => {
    console.log(Loading);
    if (Loading) {
        e.stopPropagation();
        e.preventDefault();
    }
}, true);

function removeSpace(sender) {
    while (sender.value.substring(sender.value.length - 1) == ' ')
        sender.value = sender.value.substring(0, sender.value.length - 1);
    while (sender.value.substring(0, 1) == ' ')
        sender.value = sender.value.substring(1, sender.value.length);
}