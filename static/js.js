let $scrollbar = $("#scrollbar1")
$scrollbar.tinyscrollbar()
let $scrollbarData = $scrollbar.data("plugin_tinyscrollbar");

let nick = prompt("podaj nick:")
document.cookie = `nick=${nick}`
document.cookie = `color=${randomColor = Math.floor(Math.random()*16777215).toString(16)}`


function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function stop() {
    fetch("/stop", {
        method: "POST"
    })
}

let messageNum = 0
let message
let positionVal = 0
const audio = new Audio('yachad.mp3')
// $('.wrapper').scrollbar();

function send() {
    const date = new Date()
    let formattedDate
    if (date.getMinutes() < 10) {
        formattedDate = `${date.getHours()}:0${date.getMinutes()}`
    }
    else {
        formattedDate = `${date.getHours()}:${date.getMinutes()}`
    }
    if (document.getElementById("messageInput").value[0] != '/') {
        message = { nick: getCookie("nick"), time: formattedDate, content: document.getElementById("messageInput").value , color: getCookie("color")}
        console.log(message)
        fetch("/messageOut", {
            method: "POST",
            body: JSON.stringify(message),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then(data => {
                console.log("success " + data)
            })
        // window.setTimeout(stop(), 1000)
    }
    else {
        if (document.getElementById("messageInput").value == "/chatPosition") {
            if (positionVal == 0) {
                document.getElementById("main").style.marginLeft = '35vw'
                document.getElementById("messageInput").style.marginLeft = '35vw'
                positionVal ++
            }
            else if(positionVal ==1){
                document.getElementById("main").style.marginLeft = '0'
                document.getElementById("messageInput").style.marginLeft = '0'
                positionVal--
            }
            document.getElementById("messageBox").innerHTML += `<div class="msg"><div class="command">Position Changed!</div></div>`
            $scrollbarData.update("bottom");
        }
        else if (document.getElementById("messageInput").value == "/darkMode") {
            document.getElementById("messageBox").style.backgroundColor = "black"
            document.getElementById("messageBox").style.color = "white"
            document.getElementById("messageBox").style.border = "1px solid white"
            document.body.style.backgroundColor = "black"
            document.getElementById("messageBox").innerHTML += `<div class="msg"><div class="command">Back in black!</div></div>`
            $scrollbarData.update("bottom");
        }
        else if(document.getElementById("messageInput").value == "/whiteMode"){
            document.getElementById("messageBox").style.backgroundColor = "white"
            document.getElementById("messageBox").style.color = "black"
            document.getElementById("messageBox").style.border = "1px solid black"
            document.body.style.backgroundColor = "white"
            document.getElementById("messageBox").innerHTML += `<div class="msg"><div class="command">Thats racist...</div></div>`
            $scrollbarData.update("bottom");
        }
        else if (document.getElementById("messageInput").value == "/music") {
            audio.play()
            document.getElementById("messageBox").innerHTML += `<div class="msg"><div class="command">Yachaaaad!!!</div></div>`
            $scrollbarData.update("bottom");
        }
        else if (document.getElementById("messageInput").value == "/help") {
            document.getElementById("messageBox").innerHTML += `<div class="msg"><div class="command">/darkMode /whiteMode /music /chatPosition</div></div>`
            $scrollbarData.update("bottom");
        }
        document.getElementById("messageInput").value = ''
    }

}

form.onsubmit = (e) => {
    e.preventDefault()
    send()
    document.getElementById("messageInput").value = ''
}

let poll = function () {
    $.ajax({
        url: "http://localhost:3000/poll",
        success: async function (data) {
            console.log(data);
            console.log(messageNum)
            if (data.length != 0 && data[messageNum] != undefined) {
                console.log(messageNum)
                document.getElementById("messageBox").innerHTML += `<div class="msg">[${data[messageNum].time}]<@${data[messageNum].nick.fontcolor(data[messageNum].color)}> <span class="comment">${data[messageNum].content}</span></div>`
                $('.comment').emoticonize();
                $scrollbarData.update("bottom");
            }
            poll();
        },
        error: function () {
            poll();
        },
        timeout: 1000
    });
};
poll();