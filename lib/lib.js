// lib c'est pour les fichiers partagés entre les totem

var pageList = []
var pageAccueil = []

let timeoutId;

let currentPage = 0;

const automaticSwipeTimeoutInMilliSecond = 60000

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
        setArrowLogo(false)
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
        $("#arrows").css({"position": "absolute", "top": "46.5vh"})
    } else {
        $("#arrows").css({"position": "absolute", "top": "5.5vh"})
    }
}

function setArrowLogo(isVisible) {
    const visible = isVisible ? "visible" : "hidden"
    $("#logo").css("visibility", visible)
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
            setArrowLogo(false)
        } else {
            setArrowPosition(ArrowPosition.TOP)
            setArrowLogo(true)
        }
    })
}