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
      var html = '<table><thead><tr><th>Nombre</th>';
      var diffDays = 12;
      var actual   
  
      for(let i = 0; i < diffDays; i++){
        switch (i){
          case 0:
            actual = "Enero"
            break;
          case 1:
            actual = "Febrero"
            break;
          case 2:
            actual = "Marzo"
            break;
          case 3:
            actual = "Abril"
            break;
          case 4:
            actual = "Mayo"
            break;
          case 5:
            actual = "Junio"
            break;
          case 6:
            actual = "Julio"
            break;
          case 7:
            actual = "Agosto"
            break;
          case 8:
            actual = "Septiembre"
            break;
          case 9:
            actual = "Octubre"
            break;
          case 10:
            actual = "Noviembre"
            break;
          case 11:
            actual = "Diciembre"
            break;
        }
        html += '<th>'+actual+"</th>";     
      }
      html += '<th>Dias Totales</th>';
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
  
        var color                                                    //variable para el color

        var name = task[0];

        var dMin = new Date(task[2]);
        var ddmin = dMin.getMonth();//+ 1;                           //obtengo el num mes
        var dddmin = ddmin + 1;

        var dMax = new Date(task[3]);
        var ddmax = dMax.getMonth() //+ 1;                           // obtengo el num mes
        var dddmax = ddmax + 1;

        var days = this.diffInDays(dMax, dMin);                      //
        
        var distans = this.diferencias(dddmax, dddmin) +1;
        //var distans = Math.ceil(this.diffInDays(dMax, dMin)/30);     //
        if(distans == 13){
          distans = 12
        }

        var daysBefore = ddmin;                                      //
        var daysAfter = (11 - ddmax);                                //
        
  
        if(days <= 20){                                              //
          color = "#7FFF00";                                         //
        }else if(days > 20 && days <= 50){                           //
          color = "#FF8C00";                                         //
        }else if(days > 50){                                         //
          color = "#B22222"                                          //
        }                                                            //

        html += '<tr>';
        html += '<th id="name">' + name +'</th>';
        if(daysBefore > 0) for(let j = 0; j < daysBefore; j++) html += '<td></td>';
        html += '<td class="event-cell" colspan="'+distans+'" style="background-color: '+color+';">'+task[1]+'</td>';
        if(daysAfter > 0) for(let j = 0; j < daysAfter; j++) html += '<td></td>';
        html += '<td>'+days+'</td>';
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

  function gantt(){
    
    var obj = new Gantt([
        ['Raul', 'Action 1', '2023-01-1', '2023-12-31'],  //0
				['Sofia', 'Action 2', '2023-03-12', '2023-04-04'], //1
				['Rafa', 'Action 3', '2023-06-14', '2023-06-17'],  //2
				['Laura', 'Action 4', '2023-08-18', '2023-08-22'], //3
				['Karla', 'Action 5', '2023-05-19', '2023-05-22'], //4
				['Martin', 'Action 6', '2023-05-12', '2023-12-20'] //5
      //['0       ', '1         ', '2         ', '3      ']
				]);
    
  }