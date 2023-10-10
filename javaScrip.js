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
    /**
    * @returns {Sting} Html code
    */
    buildTableHeader(){
      var html = '<table><thead><tr><th>Nombre</th>';        //
      var diffDays = 12;                                     //
      var actual;                                            //   
  
      for(let i = 0; i < diffDays; i++){
        actual=["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        html += '<th>'+actual[i]+"</th>";                    //
      }
      html += '<th>Dias Totales</th>';                       //
      html += '</tr></thead><tbody>';                        //
  
      return html;
    }
  
  
    /**
    * @returns {Sting} Html code
    */
    buildTableBody(){
      var html = '';
  
      for(let i = 0; i < this.tasks.length; i++){
        var task = this.tasks[i]; 
  
        var color;                                           //variable para el color

        var name = task[0];

        var dMin = new Date(task[2]);
        var ddmin = dMin.getMonth();//+ 1;                   //obtengo el num mes
        var dddmin = ddmin + 1;

        var dMax = new Date(task[3]);
        var ddmax = dMax.getMonth(); //+ 1;                  // obtengo el num mes
        var dddmax = ddmax + 1;

        var days = this.diffInDays(dMax, dMin);              //
        var dayss = days;

        var distans = this.diferencias(dddmax, dddmin) +1;   //
        if(distans == 13){
          distans = 12;
        }

        var daysBefore = ddmin;                              //
        var daysAfter = (11 - ddmax);                        //
        
  
        if(days <= 20){                                      //
          color = "#7FFF00";
          if(days >= 10){
            dayss = days/2;
          }                                                  //
          if(days <= 5){                                     //
            dayss = (days * 2);                              //
          }                                             
        }else if(days > 20 && days <= 50){                   //
          color = "#FF8C00";                                 //
          dayss = (days/2);                                  //
          if(dayss >= 10){
            dayss = 7
          }
        }else if(days > 50){                                 //
          color = "#B22222";                                 //
          dayss = (days/10)/1.1                              //
        }                                                    //

        html += '<tr>';
        html += '<th id="name">' + name +'</th>';
        if(daysBefore > 0) for(let j = 0; j < daysBefore; j++) html += '<td></td>';
        html += '<td class="event-cell" colspan="'+distans+'">'+'<li style="background-color:'+color+';'+'width:'+ (dayss*10) +'%;">'+task[1]+'</li>'+'</td>';
        if(daysAfter > 0) for(let j = 0; j < daysAfter; j++) html += '<td></td>';
        html += '<th>'+days+'</th>';
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
      return Math.ceil(diffTime / (86400000)); //tomaremos milisegundos de un dia
    }
  
    diferencias(max, min){
      var diferencias = (max - min);
      return diferencias;
    }
  
  }