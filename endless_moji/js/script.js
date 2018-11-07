$(document).ready(function () {
    var letters = ["あ", "い", "う", "え", "お"]; //Japanese Letters in an ARRAY!!!
    var randLet; //this will be used later
    var life = 3; //3 lives to live
    var score = 0; //no score yet
    var first = 0; //if its the first time page has loaded
    var timeTotal = 800; //total timer time
    var timeLeft = timeTotal; //time left on timer
    var shrink; //timer shrinking
    var refreshSpeed = 10; //shrinking refresh speed
    var fontSizeUp = 35; //increase letter size
    var heightSizeDown = 65; //fixing the position of the letter
    var info = 0; //if the info tab is open
    var lesson = 0; //if the lesson tab is open
    function closeInfo() {
        if (window.innerWidth <= 700) {
            $('#menuleft').animate({ //shrink that menu
                height: "75px"
                , width: "75px"
                , borderBottomRightRadius: "100%"
                , borderTopRightRadius: "100%"
            }, 300, function () {});
        }
        else {
            $('#menuleft').animate({ //shrink that menu
                height: "75px"
                , width: "75px"
            }, 300, function () {});
        };
        $("#infotext").fadeOut(200);
        $("#infoimg").fadeOut(200);
        $('#infohand').fadeOut(200);
        $('#ix').fadeOut(100);
        $('#info').fadeIn(200);
        first += 1;
        if (first == 1) { //if its the first time force open the lesson
            openLesson();
        }
        info = 0;
    }

    function openInfo() {
        if (window.innerWidth <= 700) {
            $('#menuleft').animate({ //grow dat menu
                height: "100%"
                , width: "100%"
                , borderRadius: 0
            }, 300, function () {});
        }
        else {
            $('#menuleft').animate({
                height: "670px"
                , width: "670px"
            }, 300, function () {});
        }
        $("#infotext").fadeIn(700);
        $("#infoimg").fadeIn(1000);
        $('#infohand').fadeIn(1000);
        $('#ix').fadeIn(800);
        $('#info').fadeOut(200);
        info = 1;
    }

    function openLesson() {
        if (window.innerWidth <= 700) {
            $('#menuright').animate({ //grow dat menu
                height: "100vh"
                , width: "100vw"
                , borderRadius: 0
            }, 300, function () {});
        }
        else {
            $('#menuright').animate({ //gro menu
                height: "670px"
                , width: "670px"
            }, 300, function () {});
        }
        $("#lessontext").fadeIn(700);
        $('#lx').fadeIn(800);
        $('#lesson').fadeOut(200);
        lesson = 1;
    }

    function closeLesson() {
        if (window.innerWidth <= 700) {
            $('#menuright').animate({ //smol menoo
                height: "75px"
                , width: "75px"
                , borderBottomRightRadius: "100%"
                , borderTopRightRadius: "100%"
            }, 300, function () {});
        }
        else {
            $('#menuright').animate({ //smol menoo
                height: "75px"
                , width: "75px"
            }, 300, function () {});
        }
        $("#lessontext").fadeOut(200);
        $('#lx').fadeOut(200);
        $('#lesson').fadeIn(200);
        first += 1;
        if (first === 2) { //fade in the actual game
            $('#alerts').fadeIn(400);
            $('#gameover').hide();
            $('#win').hide();
        }
        lesson = 0;
    }

    function firstLoad() { // hide everything........ yup
        $('#redright').hide();
        $('#infotext').hide()
        $("#redleft").hide();
        $('#stage').hide();
        $('#info').hide();
        $('#lx').hide();
        $('#ix').hide();
        $("#infoimg").hide();
        $('#infohand').hide();
        $('#lessontext').hide();
        $('#alerts').hide();
        openInfo();
    }

    function gameStart() {
        randLet = letters[Math.floor(Math.random() * letters.length)]; //random japanese letter
        shrink = setInterval(progress, refreshSpeed); //set an interval so it reloads at refreshSpeed and runs progress function.
        $("#actor").text(randLet);
        $('#alerts').hide();
        $('#ready').hide();
        $("#stage").show();
        $("#score").text("Score : " + score) //show the score and stuff
        $(document).keypress(function (event) {
            if (randLet === "あ") { //if letter is あ and a is pressed it is correct if not wrong
                event.preventDefault();
                //a
                if (event.which == 97 || event.which == 65) {
                    buttonCorrect(); //go to button correct 
                }
                else {
                    buttonWrong();
                }
            }
            else if (randLet === "い") { //same as above but for the other lettersssss
                event.preventDefault();
                //i
                if (event.which == 105 || event.which == 73) {
                    buttonCorrect();
                }
                else {
                    buttonWrong();
                }
            }
            else if (randLet === "う") {
                event.preventDefault();
                //u
                if (event.which == 117 || event.which == 85) {
                    buttonCorrect();
                }
                else {
                    buttonWrong();
                }
            }
            else if (randLet === "え") {
                event.preventDefault();
                //e
                if (event.which == 101 || event.which == 69) {
                    buttonCorrect();
                }
                else {
                    buttonWrong();
                }
            }
            else if (randLet === "お") {
                event.preventDefault();
                //o
                if (event.which == 111 || event.which == 79) {
                    buttonCorrect();
                }
                else {
                    buttonWrong();
                }
            }
        });
    };

    function loseLife() { //if you lose you lose a little person symbol.
        if (life == 3) {
            $("#lives").text("Lives 人 人");
            life = 2;
        }
        else if (life == 2) {
            $("#lives").text("Lives 人 ");
            life = 1;
        }
        else if (life <= 1) {
            gameOver();
        };
    }

    function progress() {
        var progressBarWidth = timeLeft / timeTotal; //width of the bar
        $("#timebar").css("transform", "scale( " + progressBarWidth + ",1)"); //transform scale it horizontally
        if (timeLeft > 0) {
            timeLeft -= 1; //remove time every time this runs
        }
        else {
            //no more time
            $("#timebar").stop(); //stop the bar
            if (life >= 1) {
                loseLife(); //you lose a life if youve got em
                $('#timebar').css("width", "75vw"); //reset everything
                timeLeft = timeTotal;
                randLet = letters[Math.floor(Math.random() * letters.length)];
            }
            else {
                gameOver(); //go to gameover
                return; //end the function for good measure :)
            }
        }
    }

    function gameOver() { //remove the bar interval and clear everything and fade in gameover
        clearInterval(shrink);
        $('#stage').fadeOut(600);
        $('#alerts').show();
        $('#gameover').fadeIn(400);
    }

    function buttonCorrect() { //if the button is correct
        if (heightSizeDown > 0) {
            heightSizeDown -= 1;
        }
        fontSizeUp += 5; //increace the size
        score += (timeLeft * 50) + 420 //420 blaze it
        $('#timebar').css("width", "75vw"); //reset bar
        timeLeft = timeTotal;
        randLet = letters[Math.floor(Math.random() * letters.length)];
        $("#score").text("Score : " + score); //show new score
        $("#actor").text(randLet);
        $("#actor").css("padding", heightSizeDown + "vh 0 0 0");
        $("#actor").css("font-size", fontSizeUp + "px");
        if (score >= 1500000) { //if score is greater than 26000 then go to win
            $('#stage').fadeOut(600);
            $('#alerts').show();
            $('#gameover').hide();
            $('#win').fadeIn(400);
        }
    }

    function buttonWrong() { //if the button is wrong
        loseLife();
        $('#timebar').css("width", "75vw");
        timeLeft = timeTotal;
        randLet = letters[Math.floor(Math.random() * letters.length)];
        $("#actor").text(randLet);
    }
    firstLoad(); //run the first load right off the bat
    $('#ix').click(closeInfo); // a whole bunch of click listeners on errythin
    $('#lx').click(closeLesson);
    $('#ready').click(gameStart);
    $('#gameover').click(function () { //if gameover is clicked reload the page
        $("body").fadeOut(800);
        $("#gameover").text('Please Wait.');
        location.reload().delay(1500);
    });
    $('#win').click(function () { //if win is clicked reload the page
        $("body").fadeOut(800);
        $("#gameover").text('Please Wait.');
        location.reload().delay(1500);
    });
    $('#info').click(function () { //if info is open and you try to open lesson close info and open lesson and vise versa
        if (info == 0 && lesson == 0) {
            openInfo();
        }
        else if (info == 0 && lesson == 1) {
            closeLesson();
            openInfo();
        }
    });
    $('#lesson').click(function () {
        if (info == 0 && lesson == 0) {
            openLesson();
        }
        else if (info == 1 && lesson == 0) {
            closeInfo();
            openLesson();
        }
    });
});