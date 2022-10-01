var score = 222; // this score is based on how safe the website is, higher the score, safer it is
 
if (score >= 50) {
      
      document.getElementById("red").style.display = "none";    // unsafe website | red theme
      document.getElementById("navbar_red").style.display = "none"; // safe website | blue theme

}
else{
      document.getElementById("blue").style.display = "none"; // safe website | blue theme
      document.getElementById("navbar_blue").style.display = "none"; // safe website | blue theme
}
$('body').css('top', -(document.documentElement.scrollTop) + 'px')
         .addClass('noscroll');