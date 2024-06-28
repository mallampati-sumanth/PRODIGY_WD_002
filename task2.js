document.addEventListener('DOMContentLoaded', () => {
    let startTime;
    let difference = 0;
    let tInterval;
    let running = false;

    const timeDisplay = document.getElementById('time');
    const hourHand = document.getElementById('hour');
    const minuteHand = document.getElementById('minute');
    const secondHand = document.getElementById('second');

    const startButton = document.getElementById('start');
    const pauseButton = document.getElementById('pause');
    const resetButton = document.getElementById('reset');
    const saveButton = document.getElementById('save');
    const lapsList = document.getElementById('laps');

    // Function to change background color of body
    function changeBackgroundColor(color) {
        document.body.style.backgroundColor = color;
    }

    // Function to generate a random color
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Start button click handler
    startButton.addEventListener('click', () => {
        if (!running) {
            startTime = new Date().getTime() - difference;
            tInterval = setInterval(updateTime, 10); // Update every 10 milliseconds
            running = true;
            startButton.style.display = 'none';
            pauseButton.style.display = 'inline';
            changeBackgroundColor(getRandomColor()); // Change background color of body
        }
    });

    // Pause button click handler
    pauseButton.addEventListener('click', () => {
        if (running) {
            clearInterval(tInterval);
            difference = new Date().getTime() - startTime;
            running = false;
            startButton.style.display = 'inline';
            pauseButton.style.display = 'none';
            changeBackgroundColor(getRandomColor()); // Change background color of body
        }
    });

    // Reset button click handler
    resetButton.addEventListener('click', () => {
        clearInterval(tInterval);
        running = false;
        difference = 0;
        updateClockHands(0, 0, 0);
        updateDisplay('00:00:00.000');
        startButton.style.display = 'inline';
        pauseButton.style.display = 'none';
        lapsList.innerHTML = '';
        changeBackgroundColor(getRandomColor()); // Change background color of body
    });

    // Save Time (formerly Lap) button click handler
    saveButton.addEventListener('click', () => {
        if (running) {
            const lapTime = document.createElement('li');
            lapTime.innerHTML = timeDisplay.innerHTML;
            lapsList.appendChild(lapTime);
            changeBackgroundColor(getRandomColor()); // Change background color of body
        }
    });

    // Function to update time display
    function updateTime() {
        updatedTime = new Date().getTime() - startTime;
        let hours = Math.floor((updatedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((updatedTime % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((updatedTime % (1000 * 60)) / 1000);
        let milliseconds = Math.floor((updatedTime % 1000));

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        milliseconds = (milliseconds < 100) ? "0" + milliseconds : milliseconds;
        milliseconds = (milliseconds < 10) ? "00" + milliseconds : milliseconds;

        const displayTime = `${hours}:${minutes}:${seconds}.${milliseconds}`;
        updateDisplay(displayTime);
        updateClockHands(hours, minutes, seconds);
    }

    // Function to update time display
    function updateDisplay(display) {
        timeDisplay.innerHTML = display;
    }

    // Function to update clock hands
    function updateClockHands(hours, minutes, seconds) {
        const secondDeg = seconds * 6; // 360 degrees / 60 seconds
        const minuteDeg = minutes * 6 + seconds * 0.1; // 360 degrees / 60 minutes + 6 degrees per second
        const hourDeg = hours * 30 + minutes * 0.5; // 360 degrees / 12 hours + 0.5 degrees per minute

        secondHand.style.transform = `rotate(${secondDeg}deg)`;
        minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
        hourHand.style.transform = `rotate(${hourDeg}deg)`;
    }
});
