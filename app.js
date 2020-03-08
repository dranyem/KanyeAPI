class KanyeQuote {
    constructor(quote) {
        this.kanyeWisdom = quote;
    }
    whisper() {
        $('#quote').html("<p style='font-size:.7em'>" + this.kanyeWisdom + "</p>");
    }
    shout() {
        $('#quote').html("<p style='font-size: 7em'>" + this.kanyeWisdom + "</p>");
    }
    animate() {
        $('#quote').html("<h1 class='ml3'>" + this.kanyeWisdom + "</h1>");
    }
}

$('button').on('click', function () {
    $.ajax(
        {
            "url": 'https://api.kanye.rest',
            "data:": {},
            "type": "GET",
            "dataType": "json"
        }
    )
        .done(function (resultJson) {
            var kanye = new KanyeQuote(resultJson.quote);
            $('#quote').html("<button id='whisperBtn'>whisper</button>"
                + "<button id='shoutBtn'>SHOUT</button>"
                + "<button id='animateBtn'>Animate</button>");
            $('#whisperBtn').on('click', function () {
                kanye.whisper();
            });
            $('#shoutBtn').on('click', function () {
                kanye.shout();
            });
            $('#animateBtn').on('click', function () {
                kanye.animate();
                var textWrapper = document.querySelector('.ml3');
                textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

                anime.timeline({ loop: true })
                    .add({
                        targets: '.ml3 .letter',
                        opacity: [0, 1],
                        easing: "easeInOutQuad",
                        duration: 2250,
                        delay: (el, i) => 150 * (i + 1)
                    }).add({
                        targets: '.ml3',
                        opacity: 0,
                        duration: 1000,
                        easing: "easeOutExpo",
                        delay: 1000
                    });
            });
        })
        .fail(function (xhr, status, error) {
            $(document).html("error! " +error);
        })
        .always(function () {
        });
});