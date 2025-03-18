let alarmTime = null;
let alarmTimeout = null;

function updateCurrentTime() {
    const now = new Date();
    const currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    document.getElementById('current-time').textContent = currentTime;

    if (alarmTime && currentTime === alarmTime) {
        triggerAlarm();
    }
}

function setAlarm() {
    const alarmInput = document.getElementById('alarm-time');
    alarmTime = alarmInput.value;

    if (alarmTime) {
        clearTimeout(alarmTimeout);
        alarmTimeout = setTimeout(() => {
            triggerAlarm();
        }, calculateTimeUntilAlarm(alarmTime));

        document.getElementById('alarm-message').textContent = `Alarm set for ${alarmTime}`;
        document.getElementById('alarm-message').classList.remove('hidden');
    }
}

function calculateTimeUntilAlarm(alarmTime) {
    const now = new Date();
    const [hours, minutes] = alarmTime.split(':');
    const alarmDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0, 0);

    if (alarmDate <= now) {
        alarmDate.setDate(alarmDate.getDate() + 1);
    }

    return alarmDate - now;
}

function triggerAlarm() {
    alert("Alarm ringing!");
    document.getElementById('alarm-message').textContent = "Alarm is ringing!";
    document.getElementById('alarm-message').classList.remove('hidden');
    alarmTime = null; 
}

document.getElementById('set-alarm').addEventListener('click', setAlarm);
setInterval(updateCurrentTime, 1000);