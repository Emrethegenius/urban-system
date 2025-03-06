(function() {
    // List of localStorage keys related to game state that we want to clear at the start of a new day.
    const KEYS_TO_CLEAR = [
      'dailyQuestions',
      'dailyQuestionsDate',
      'dailyQuestionsVersion',
      'gameState',
      'lastPlayed',
      'dailyGuesses'
    ];
  
    // Clear the stored game state data and reload the page to get a fresh start.
    function clearDailyData() {
      KEYS_TO_CLEAR.forEach(key => localStorage.removeItem(key));
      // Force a page reload so script.js starts with a fresh state.
      location.reload();
    }
  
    // Set a timer to automatically clear the game state at the user’s local midnight.
    function setMidnightReset() {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      // Set hours to midnight (00:00:00)
      tomorrow.setHours(0, 0, 0, 0);
      const timeUntilMidnight = tomorrow.getTime() - now.getTime();
      setTimeout(() => {
        clearDailyData();
        // Optionally, reset the timer to handle subsequent days.
        setMidnightReset();
      }, timeUntilMidnight);
    }
  
    // Check if the user has already played today (by checking the 'lastPlayed' key).
    // If they have, update the UI so that the start button shows a "played" message and is disabled.
    function enforceDailyPlay() {
      const lastPlayed = localStorage.getItem('lastPlayed');
      const today = new Date().toDateString();
      if (lastPlayed === today) {
        const startButton = document.getElementById('start-game');
        if (startButton) {
          startButton.innerHTML = "<span>You've already played today!</span>";
          startButton.disabled = true;
        }
      }
    }
  
    // When the page loads, check if the stored date is not today and reset if necessary.
    window.addEventListener('load', () => {
      const currentDateString = new Date().toDateString();
      const storedDate = localStorage.getItem('dailyQuestionsDate');
      if (storedDate && storedDate !== currentDateString) {
        clearDailyData();
      }
      enforceDailyPlay();
      setMidnightReset();
    });
  })();
  