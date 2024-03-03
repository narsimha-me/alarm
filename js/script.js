// Array to store active alarms
let alarms = [];


// Function to validate input values
function validateInput(id, min, max) {
    const input = document.getElementById(id);
    const value = parseInt(input.value);
    if (isNaN(value) || value < min || value > max) {
        input.classList.add('is-invalid');
        return false;
    } else {
        input.classList.remove('is-invalid');
        return true;
    }
}

// Function to display current time
function displayCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const meridian = hours >= 12 ? 'PM' : 'AM';
    const currentTime = `${hours}:${minutes}:${seconds} ${meridian}`;
    document.getElementById('currentTime').textContent = currentTime;
    return currentTime;
}

// Function to set alarm
function setAlarm() {
    if (!validateInput('hours', 1, 12) || !validateInput('minutes', 0, 59) || !validateInput('seconds', 0, 59)) {
        return;
    }

    const hours = document.getElementById('hours').value;
    const minutes = document.getElementById('minutes').value;
    const seconds = document.getElementById('seconds').value;
    const meridian = document.getElementById('meridian').value;
    const alarmTime = `${hours}:${minutes}:${seconds} ${meridian}`;
    const alarm = { id: Date.now(), time: alarmTime, active: true };
    for (let alarm of alarms) {
        if (alarm.time === alarmTime) {

            if (alarm.active == false) {
                alarm.active = true;
                updateAlarmsList();
            }
            else {
                alert('Alarm is already active');
            }
            return;
        }
    }
    alarms.push(alarm);
    updateAlarmsList();
}

// Function to update alarms list
function updateAlarmsList() {
    const activeAlarms = document.getElementById('activeAlarms');
    activeAlarms.innerHTML = '';
    alarms.forEach(alarm => {
        const listItem = document.createElement('div');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        listItem.textContent = alarm.time;

        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'd-flex justify-content-between align-items-center';

        const switchContainer = document.createElement('div');
        switchContainer.className = 'form-check form-switch';
        const toggleSwitch = document.createElement('input');
        toggleSwitch.type = 'checkbox';
        toggleSwitch.checked = alarm.active;
        toggleSwitch.className = 'form-check-input';
        switchContainer.appendChild(toggleSwitch);

        toggleSwitch.addEventListener('change', function () {
            alarm.active = this.checked;
        });


        // listItem.appendChild(switchContainer);
        buttonsContainer.appendChild(switchContainer);
        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger btn-sm';
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteAlarm(alarm.id);
        buttonsContainer.appendChild(deleteButton);
        listItem.appendChild(buttonsContainer);
        activeAlarms.appendChild(listItem);
    });
}

// Function to delete alarm
function deleteAlarm(id) {
    alarms = alarms.filter(alarm => alarm.id !== id);
    updateAlarmsList();
}

// Function to check and trigger alarms
function checkAlarms(currentTime) {
    alarms.forEach(alarm => {
        if (alarm.active && alarm.time === currentTime) {
            alert('Wake, Up!');
        }
    });
}




function shiftFocus() {

    document.getElementById('hours').addEventListener('input', function (event) {
        if (event.target.value.length >= 2) {

            document.getElementById('minutes').focus();
        }
    });

    document.getElementById('minutes').addEventListener('input', function (event) {
        if (event.target.value.length >= 2) {

            document.getElementById('seconds').focus();
        }
    });

    document.getElementById('seconds').addEventListener('input', function (event) {
        if (event.target.value.length >= 2) {

            document.getElementById('meridian').focus();
        }
    });
}

// Initialize current time and alarms list
displayCurrentTime();
updateAlarmsList();
shiftFocus();

// Update current time every second
setInterval(() => {
    let currentTime = displayCurrentTime();
    checkAlarms(currentTime);
}, 1000);



