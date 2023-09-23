class Gantt {

    /**
    * Init representation in HTML 
    * @param {array} the tasks list
    * 
    */
    constructor(tasks) { 
      this.tasks = tasks;
      this.dateWidth = 100;
      this.setMinAndMaxDate(); 
      document.getElementById('gantt').innerHTML = this.buildTableHeader() + this.buildTableBody();
    }
  
    setMinAndMaxDate(){
      var maxDates = [];
      var minDates = [];
  
      for(let i = 0; i < this.tasks.length; i++){
        minDates.push(new Date(this.tasks[i][2]));
        maxDates.push(new Date(this.tasks[i][3]));     
      }
      this.minDate = new Date(Math.min.apply(null,minDates));
      this.maxDate = new Date(Math.max.apply(null,maxDates)); 
  
    }   
    setName(){
      var name = [];
  
      for(let i = 0; i < this.tasks.length; i++){
        name.push(this.tasks[i][0]);     
      }
    }
  
  
    /**
    * @returns {Sting} Html code
    */
    buildTableHeader(){
      var html = '<table><thead><tr><th>Nombre</th>';
      var diffDays = this.diffInDays(this.maxDate, this.minDate) + 1;
      const actual = new Date(this.minDate);  
  
      for(let i = 0; i < diffDays; i++){
        actual.setDate(actual.getDate() + 1);
        html += '<th>'+actual.toISOString().substr(0, 10).replace('T', ' ')+"</th>";     
      }
      html += '</tr></thead><tbody>';
  
      return html;
    }
  
  
    /**
    * @returns {Sting} Html code
    */
    buildTableBody(){
      var html = '';
  
      for(let i = 0; i < this.tasks.length; i++){
        var task = this.tasks[i]; 
  
        var name = task[0];

        var dMin = new Date(task[2]);
        var dMax = new Date(task[3]);     
  
        var days = this.diffInDays(dMax, dMin) + 1;
        var daysBefore = this.diffInDays(this.minDate, dMin);
        var daysAfter = this.diffInDays(dMax, this.maxDate);
  
        if(this.minDate == dMin) daysBefore = 0;
        if(this.maxDate == dMax) daysAfter = 0;
  
        html += '<tr>';
        html += '<th id="name">' + name +'</th>';
        if(daysBefore > 0) for(let j = 0; j < daysBefore; j++) html += '<td></td>';
        html += '<td class="event-cell" colspan="'+days+'" style="background-color: '+task[4]+';">'+task[1]+'</td>';
        if(daysAfter > 0) for(let j = 0; j < daysAfter; j++) html += '<td></td>';
        html += '</tr>';
      }
  
      html += '</tbody></table>';
  
      return html;
  
    }
  
  
    /**
    * @param {date} the max date
    * @param {date} the min date
    * @returns {integer} num of days
    */
    diffInDays(max, min){
      var diffTime = Math.abs(max - min);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    }
  
  
  }

  function gantt(){
    
    var obj = new Gantt([
        ['Raul', 'Action 1', '2023-05-12', '2023-05-13', '#4287f5'],
				['Sofia', 'Action 2', '2023-05-12', '2023-05-14', '#c1409b'],
				['Rafa', 'Action 3', '2023-05-14', '2023-05-17', '#0b9971'],
				['Laura', 'Action 4', '2023-05-18', '2023-05-22', '#d26a52'],
				['Karla', 'Action 5', '2023-05-19', '2023-05-22', '#4287f5'],
				['Martin', 'Action 6', '2023-05-12', '2023-05-20', '#0b9971']
      //['0       ', '1         ', '2         ', '3      ','4      ']
				]);
    
  }