var currentTabIndex = 0;

var timeList_Monday = [];
var timeList_Tuesday = [];
var timeList_Wednesday = [];
var timeList_Thursday = [];
var timeList_Friday = [];
var timeList_Saturday = [];
var timeList_Sunday = [];

function calculateFree(busyList, day) {
    let allMins = Array.from({ length: 1441 }, (_, i) => i);
    let freeList = [];

    for (let event of busyList) {
        let start = event[0];
        let end = event[1];

        for (let minute = start; minute <= end; minute++) {
            allMins[minute] = 'X';
        }
    }

    let freeBlock = [];
    for (let minute = 0; minute < 1441; minute++) {
        if (typeof allMins[minute] !== 'string') {
            freeBlock.push(minute);
        } else if (allMins[minute] === 'X' && freeBlock.length > 0) {
            freeList.push(freeBlock);
            freeBlock = [];
        }
    }

    if (freeBlock.length > 0) {
        freeList.push(freeBlock);
    }

    let output = `${day}: `;
    
    for (let i = 0; i < freeList.length; i++) {
        const startMinute = freeList[i][0];
        const endMinute = freeList[i][freeList[i].length - 1];

        if (i > 0) {
            output += ', ';
        }

        const startTime = formatMinutesToTime(startMinute);
        const endTime = formatMinutesToTime(endMinute);

        output += `${startTime} to ${endTime}`;
    }
    output += '\n';

    document.getElementById(`outputContainer-${day}`).innerText = output;
    return output;
}

function formatMinutesToTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}

function calculateAllFree() {
    console.log("Button clicked!")
    console.log("Free time on Monday: ", calculateFree(timeList_Monday, 'Monday'));
    console.log("Free time on Tuesday: ", calculateFree(timeList_Tuesday, 'Tuesday'));
    console.log("Free time on Wednesday: ", calculateFree(timeList_Wednesday, 'Wednesday'));
    console.log("Free time on Thursday: ", calculateFree(timeList_Thursday, 'Thursday'));
    console.log("Free time on Friday: ", calculateFree(timeList_Friday, 'Friday'));
    console.log("Free time on Saturday: ", calculateFree(timeList_Saturday, 'Saturday'));
    console.log("Free time on Sunday: ", calculateFree(timeList_Sunday, 'Sunday'));
}


function btnClick(event, info) {
  modal.style.display = "block";
  document.getElementById('selectedDay').value = info;
}

function createTabs() {
    finalBtn.style.display = "block";
    const numberOfTabs = document.getElementById('numSchedules').value;
    const tabsContainer = document.getElementById('tabsContainer');
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];


    tabsContainer.innerHTML = '';


    for (let i = 0; i < numberOfTabs; i++) {
        const tab = document.createElement('div');
        tab.classList.add('tab');

        const header = document.createElement('div');
        header.classList.add('tab-header');
        header.textContent = 'Schedule ' + (i + 1);

        header.onclick = function() {
            const content = this.nextElementSibling;
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
            currentTabIndex = i;
        };

        const content = document.createElement('div');
        content.classList.add('tab-content')

        content.style.display = 'none';
        content.onclick = function() {
            currentTabIndex = i;
        };

        for(const [index, day] of daysOfWeek.entries()) {     
            let button = document.createElement("button");
            button.id =  daysOfWeek[index] + "-" + currentTabIndex;
            button.type = "submit"
            button.className = "open-modal-btn";
            button.setAttribute('data-day', day)
            button.innerHTML = "+"
            let formContent = document.createElement("div")
            formContent.className = "day-container";
            formContent.id= day-i;
            formContent.innerHTML = `       
              <div id="${day}-${i}" class="day-container">
                  <label>${day}:</label>
                  <!-- This is where events for each day will go -->
              </div>
              <br><br>   
          `;
          formContent.querySelector(".day-container").appendChild(button)
          button.addEventListener("click", function(e) {
            modal.style.display = "block";
            currentTabIndex = i;
            document.getElementById('selectedDay').value = daysOfWeek[index] + "-" + currentTabIndex;
          });
          content.appendChild(formContent);
        
        }



        var modal = document.getElementById("myModal");


        var span = document.getElementsByClassName("close")[0];
        

        span.onclick = function() {
          modal.style.display = "none";
        }
        
        window.onclick = function(event) {
          if (event.target == modal) {
            modal.style.display = "none";
          }
        }


        tab.appendChild(header);
        tab.appendChild(content);
        tabsContainer.appendChild(tab)
    }


    document.getElementById("eventForm").onsubmit = function(event) {
      event.preventDefault();
      var selectedDay = document.getElementById("selectedDay").value;
      var startTime = document.getElementById("timeDropDown1").value;
      var endTime = document.getElementById("timeDropDown2").value;
      var title = document.getElementById("eventTitle").value;

      const [hours_start, minutes_start] = startTime.split(':');
      const hoursInt = parseInt(hours_start, 10) * 60; //turning this into integer
      const minutesInt = parseInt(minutes_start, 10);
      const sum_min_start = minutesInt + hoursInt

      const [hours_end, minutes_end] = endTime.split(':');
      const hoursInt_e = parseInt(hours_end, 10) * 60;
      const minutesInt_e = parseInt(minutes_end, 10);
      const sum_min_end = hoursInt_e + minutesInt_e //finding the total minutes of end time
      //console.log([sum_min_start, sum_min_end])

      const start_end_list = [sum_min_start, sum_min_end] //looped list, which is appended

      console.log("Monday:", timeList_Monday);
      console.log("Tuesday:", timeList_Tuesday);
      console.log("Wednesday:", timeList_Wednesday);
      console.log("Thursday:", timeList_Thursday);
      console.log("Friday:", timeList_Friday);
      console.log("Saturday:", timeList_Saturday);
      console.log("Sunday:", timeList_Sunday);

      
 
      
      if (sum_min_start > sum_min_end){
        alert("Start time is later than end time! Please try again :)")
      }
      else{
        var tabIndex = currentTabIndex;
          if (selectedDay.toLowerCase().includes('monday')) {
            timeList_Monday.push(start_end_list);
        } else if (selectedDay.toLowerCase().includes('tuesday')) {
            timeList_Tuesday.push(start_end_list);
        } else if (selectedDay.toLowerCase().includes('wednesday')) {
            timeList_Wednesday.push(start_end_list);
        } else if (selectedDay.toLowerCase().includes('thursday')) {
            timeList_Thursday.push(start_end_list);
        } else if (selectedDay.toLowerCase().includes('friday')) {
            timeList_Friday.push(start_end_list);
        } else if (selectedDay.toLowerCase().includes('saturday')) {
            timeList_Saturday.push(start_end_list);
        } else if (selectedDay.toLowerCase().includes('sunday')) {
            timeList_Sunday.push(start_end_list);
        }

        console.log("Monday:", timeList_Monday);
        console.log("Tuesday:", timeList_Tuesday);
        console.log("Wednesday:", timeList_Wednesday);
        console.log("Thursday:", timeList_Thursday);
        console.log("Friday:", timeList_Friday);
        console.log("Saturday:", timeList_Saturday);
        console.log("Sunday:", timeList_Sunday);
        // Find the specific day's container within the current tab
        const dayContainer = document.getElementById(selectedDay);
        if (dayContainer) {
            const newEventDiv = document.createElement('div');
            newEventDiv.textContent = `• ${title} (${startTime} - ${endTime})`;
            dayContainer.appendChild(newEventDiv);
        }
      }
      

      //console.log(selectedDay)
      //console.log(startTime)
      //console.log(endTime)
      //console.log(title)
      
      // Process the event (e.g., display it on the calendar or save it)


      // Close the modal
      modal.style.display = "none";
    }

}