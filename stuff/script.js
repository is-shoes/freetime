var currentTabIndex = 0;

var timeList_Monday = [];
var timeList_Tuesday = [];
var timeList_Wednesday = [];
var timeList_Thursday = [];
var timeList_Friday = [];
var timeList_Saturday = [];
var timeList_Sunday = [];


function btnClick(event, info) {
  modal.style.display = "block";
  document.getElementById('selectedDay').value = info;
}
function createTabs() {
    const numberOfTabs = document.getElementById('numSchedules').value;
    const tabsContainer = document.getElementById('tabsContainer');
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    // Clear existing tabs
    tabsContainer.innerHTML = '';

    
    
    // Create new tabs
    for (let i = 0; i < numberOfTabs; i++) {
        const tab = document.createElement('div');
        tab.classList.add('tab');

        const header = document.createElement('div');
        header.classList.add('tab-header');
        header.textContent = 'Schedule ' + (i + 1);
        //listens for user click and expands the tab if clicked upon
        header.onclick = function() {
            const content = this.nextElementSibling;
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
            currentTabIndex = i;
        };

        const content = document.createElement('div');
        content.classList.add('tab-content')
        content.textContent = 'Content for Schedule '+(i+1);
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



        // Add an event listener or any additional functionality to each tab
        var modal = document.getElementById("myModal");

        // Get the button that opens the modal
        // var btns = document.querySelectorAll(".open-modal-btn"); // Replace with your button class
        
      
      
        
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];
        
        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
          modal.style.display = "none";
        }
        
        // When the user clicks anywhere outside of the modal, close it
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
      // Get form values
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
            newEventDiv.textContent = `${title} (${startTime} - ${endTime})`;
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