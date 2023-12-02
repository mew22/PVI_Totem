const pageList = [
    "page/accueil.html",
    "page/histoire.html",
    "page/metiers.html",
    "page/epi.html",
    "page/nomination.html",
    "page/restaurant.html",
    "page/bonne_journee.html",
    "page/noel.html",
    "page/acces.html",
    "page/vehicule_fonction.html",
    "page/projet_entreprise.html",
    "page/projet_entreprise.html",
    "page/traffic_etech.html",
]

let timeoutId;

let currentPage = 0;

const automaticSwipeTimeoutInMilliSecond = 30000

const SwipeDirection = {
    Left: "gauche",
    Right: "droite",
}

const ArrowPosition = {
    TOP: "haut",
    CENTER: "centre",
}

$(document).ready(function () {
    $("#content").load(pageList[0], function() {
        startAutomaticSwipe()
        setArrowPosition(ArrowPosition.CENTER)
    })
})

$("#fleche_droite").click(function () {
    swipe(SwipeDirection.Right)
})

$("#fleche_gauche").click(function () {
    swipe(SwipeDirection.Left)
})

$(document).on("click", "#welcome", function () {
    swipe(SwipeDirection.Right)
})

function setArrowPosition(position) {
    if (position === ArrowPosition.CENTER) {
        $("#arrows").css({"position": "absolute", "top": "50vh"})
    } else {
        $("#arrows").css({"position": "absolute", "top": "9vh"})
    }
}

function startAutomaticSwipe() {
    timeoutId = setTimeout(() => { swipe(SwipeDirection.Right)}, automaticSwipeTimeoutInMilliSecond)

}

function stopAutomaticSwipe() {
    clearTimeout(timeoutId)
}

function swipe(direction) {
    stopAutomaticSwipe()
    let offset
    if (direction === SwipeDirection.Right) {
        offset = 1
    } else offset = -1
    const length = pageList.length
    const nextPageIndex = ((currentPage + offset) % length + length) % length
    $("#content").load(pageList[nextPageIndex], function() {
        currentPage = nextPageIndex
        startAutomaticSwipe()
        if (pageList[currentPage] === "page/bonne_journee.html" || pageList[currentPage] === "page/accueil.html") {
            setArrowPosition(ArrowPosition.CENTER)
        } else {
            setArrowPosition(ArrowPosition.TOP)
        }
    })
}