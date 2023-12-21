// lib c'est pour les fichiers partagés entre les totem

var pageList = []
var pageAccueil = []

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

$("#logo").click(function () {
    loadPageAt(0)
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
    loadPageAt(nextPageIndex)
}

function loadPageAt(pageIndex) {
    $("#content").load(pageList[pageIndex], function() {
        currentPage = pageIndex
        startAutomaticSwipe()
        if (pageAccueil.includes(pageList[currentPage])) {
            setArrowPosition(ArrowPosition.CENTER)
        } else {
            setArrowPosition(ArrowPosition.TOP)
        }
    })
}