$(document).ready(function() {
    
var characters =[
    ch1 = {name: "Sky Walker", img: "assets/image/Sky-Walker.png", power: 120, attackPower: 8 }, 
    ch2 = {name: "Count Dokoo", img: "assets/image/Count-Dokoo.png", power: 100, attackPower: 5 },
    ch3 = {name: "Dart Vader", img: "assets/image/Dart-Vader.png", power: 150, attackPower: 20 },
    ch4 = {name: "Qui Gon jinn", img: "assets/image/Qui-Gon-Jinn.png", power: 180, attackPower: 25 }
];
var audio;
var counter = 0;
var defenderName ="";
var enemyName ="";
var defenderRemainingpower = 0;
var defenderAttackPower =0;
var defenderBaseAttPower=0;
var enemyRemainingpower = 0;
var enemyAttackpower = 0;
var isCharSelected = false;
var opponentsSelected =false;
var audio = new Audio("");
audio.src="assets/sounds/fight.mp3";
$(".ch").on("click", function(){
    if(!isCharSelected && !opponentsSelected){
        var charSelect = this.id;
        isCharSelected = true;
        $("#"+charSelect).hide();
        $(".title").text("Opponents")
        $("#defender .name").html(characters[charSelect].name);
        $("#defender .img").attr("src", characters[charSelect].img);
        $("#defender .power").text(characters[charSelect].power);
        $("#defender").show();
        defenderName = characters[charSelect].name;
        defenderBaseAttPower = characters[charSelect].attackPower;
        defenderAttackPower = defenderBaseAttPower;
        defenderRemainingpower = characters[charSelect].power;
        counter++;
    }else if(isCharSelected && !opponentsSelected){
        charSelect = this.id;
        isCharSelected = false;
        $("#"+charSelect).hide();
        $("#enemy .name").html(characters[charSelect].name);
        $("#enemy .img").attr("src", characters[charSelect].img);
        $("#enemy .power").text(characters[charSelect].power);
        $("#enemy").show();
        enemyRemainingpower = characters[charSelect].power;
        enemyName = characters[charSelect].name;
        enemyAttackpower = characters[charSelect].attackPower;
        opponentsSelected = true;
        counter++;
        audio.play();
    }
    
});

$("#attack").on("click", function(){
    
    if (enemyRemainingpower > 0 && defenderRemainingpower > 0){
        enemyRemainingpower -= defenderAttackPower;
        if (enemyRemainingpower >0 ){ 
            defenderRemainingpower -= enemyAttackpower;
        }
        
        $(".defender-msg").text("you attacked " + enemyName + " for " + defenderAttackPower + " damage");
        $(".enemy-msg").text(enemyName + " attacked you back for " + enemyAttackpower + " damage");
        $("#defender .power").text(defenderRemainingpower);
        $("#enemy .power").text(enemyRemainingpower);
        defenderAttackPower += defenderBaseAttPower;
        
        if(defenderRemainingpower <= 0){
           
            $(".defender-msg ").text("You've Been Defeated ... Game Over");
            $(".enemy-msg").text("");
            $("#defender").hide();
            audio.src="assets/sounds/result.mp3";
            audio.play();
            
        }else if(enemyRemainingpower <= 0 && counter < 4){
            
            $(".defender-msg").text("Select Your Next opponent");
            $(".enemy-msg").text("");
            isCharSelected = true;
            opponentsSelected = false;
            $("#enemy").hide();
            
        }else if(enemyRemainingpower <= 0 && counter === 4){
            
            $(".defender-msg").text("You Won The Game ........ Game Over");
            $(".enemy-msg").text("");
            $("#enemy").hide();
            audio.src="assets/sounds/result.mp3";
            audio.play();
        }
    }                 
});
$("#restart").on("click", function(){
    location.reload();
});
});// doc-ready 