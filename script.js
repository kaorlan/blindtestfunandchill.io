var buzzerEnabled = true;
var currentPlayer = null;
var timerInterval = null;
var timeLeft = 10;
var gameOver = false;

function buzz(team) {
    if (buzzerEnabled) {
      buzzerEnabled = false;
      currentPlayer = team;
  
      var teamBoxes = document.getElementsByClassName("team");
      for (var i = 0; i < teamBoxes.length; i++) {
        if (team === i + 1) {
          teamBoxes[i].classList.add("active");
        } else {
          teamBoxes[i].classList.remove("active");
          var buzzers = teamBoxes[i].getElementsByClassName("buzzer");
          for (var j = 0; j < buzzers.length; j++) {
            buzzers[j].disabled = true;
          }
        }
      }
  
      // Play the buzzer sound
      var audioPlayer = document.getElementById("audioPlayer");
      audioPlayer.currentTime = 0; // Rewind the audio to the beginning
      audioPlayer.play();
  
      // Start the timer
      startTimer();
    }
  }

  function startTimer() {
    var timerDisplay = document.getElementById("timer");
    timerDisplay.textContent = timeLeft + "s";
  
    timerInterval = setInterval(function () {
      timeLeft--;
      timerDisplay.textContent = timeLeft + "s";
  
      if (timeLeft === 0) {
        clearInterval(timerInterval);
        if (!gameOver) {
          resetGame();
        }
      }
    }, 1000);
  }

function resetGame() {
  gameOver = true;
  buzzerEnabled = true;
  currentPlayer = null;
  timeLeft = 5;
  
  var teamBoxes = document.getElementsByClassName("team");
  for (var i = 0; i < teamBoxes.length; i++) {
    teamBoxes[i].classList.remove("active");
  }
  
  var buzzers = document.getElementsByClassName("buzzer");
  for (var i = 0; i < buzzers.length; i++) {
    buzzers[i].disabled = false;
  }
  
  document.getElementById("audioPlayer").play();
}

function joinTeam() {
    var usernameInput = document.getElementById("username");
    var username = usernameInput.value;
    
    if (username !== "") {
      var selectedTeam = prompt("Choisissez une équipe (1, 2 ou 3) :");
      
      if (selectedTeam === "1" || selectedTeam === "2" || selectedTeam === "3") {
        var playerBox = document.getElementById("player" + selectedTeam);
        playerBox.textContent = username;
      } else {
        alert("Équipe invalide !");
      }
    } else {
      alert("Veuillez saisir un pseudo !");
    }
  }


  function assignPoints() {
    var pointsInput = document.getElementById("pointsInput");
    var points = parseInt(pointsInput.value);
    
    if (isNaN(points) || points <= 0) {
      alert("Veuillez entrer un nombre de points valide !");
      return;
    }
    
    var selectedTeam = prompt("Choisissez l'équipe à qui attribuer les points (1, 2 ou 3) :");
    
    if (selectedTeam === "1" || selectedTeam === "2" || selectedTeam === "3") {
      var teamPoints = document.getElementById("team" + selectedTeam + "-points");
      
      if (!teamPoints) {
        teamPoints = document.createElement("div");
        teamPoints.classList.add("points");
        teamPoints.id = "team" + selectedTeam + "-points";
        
        var selectedTeamElement = document.getElementById("team" + selectedTeam);
        selectedTeamElement.appendChild(teamPoints);
      }
      
      var currentPoints = parseInt(teamPoints.textContent) || 0;
      teamPoints.textContent = currentPoints + points;
    } else {
      alert("Équipe invalide !");
    }
  }


  
  