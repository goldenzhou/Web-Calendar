function Calendar(div_id) {
  this.div_id = div_id;   
}
    
Calendar.prototype.render = function(d) {  
  var obj = this;
  var month_name = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var month = d.getMonth(); //0-11
  var year = d.getFullYear(); //2014
  var first_date = month_name[month] + " " + 1 + " " + year;
  var tmp = new Date(first_date).toDateString();
  //Mon Sep 01 2014 ...
  var first_day = tmp.substring(0, 3); //Mon
  var day_name = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  var day_no = day_name.indexOf(first_day); //1
  var days = new Date(year, month+1, 0).getDate(); //30
  //Tue Sep 30 2014 ...
  var lmdays = new Date(year, month, 0).getDate();
  var header = document.createElement('div');
  var left = document.createElement("a");
  var right = document.createElement("a");
  left.onclick = function() {
      var el = document.getElementById(obj.div_id);
      el.innerHTML = '';
      var newD = new Date(d.getFullYear(), d.getMonth() - 1);
      obj.render(newD);
  }
  right.onclick = function() {
      var el = document.getElementById(obj.div_id);
      el.innerHTML = '';
      var newD = new Date(d.getFullYear(), d.getMonth() + 1);
      obj.render(newD);
  }
  left.innerHTML = "<<";
  left.className = "left";
  right.className = "right";
  right.innerHTML = ">>";
  header.appendChild(left);
  var title = document.createElement("div");
  title.className = "title";
  title.innerHTML = month_name[month]+" "+year;
  header.appendChild(title);
  header.appendChild(right);
  document.getElementById(obj.div_id).appendChild(header);
  var calendar = this.get_calendar(day_no, days, lmdays);
  document.getElementById(obj.div_id).appendChild(calendar);
}
     
Calendar.prototype.get_calendar = function(day_no, days, lmdays){
  var table = document.createElement('table');    
  var tr = document.createElement('tr');
  //row for the day letters
  for(var c=0; c<=6; c++){
    var td = document.createElement('td');
    td.innerHTML = ["SU", "MO","TU", "WE", "TH", "FR", "SA"][c];
    tr.appendChild(td);
  }
  table.appendChild(tr);
  //create 2nd row
  tr = document.createElement('tr');
  var c;
  for(c=0; c<=6; c++){
    if(c == day_no){
      break;
    }
    var ntd = document.createElement('td');
    ntd.innerHTML = lmdays - day_no + c + 1;
    ntd.className = "ntd";
    tr.appendChild(ntd);
  }
  var count = 1;
  for(; c<=6; c++){
    var td = document.createElement('td');
    td.innerHTML = count;
    count++;
    tr.appendChild(td);
  }
  table.appendChild(tr);
  //rest of the date rows
  for(var r=3; r<=7; r++){
    tr = document.createElement('tr');
    for(var c=0; c<=6; c++){
      if(count > days){
          var next = 1;
          for(;c<=6;c++) {
            var ntd = document.createElement('td');
            ntd.innerHTML = next;
            ntd.className = "ntd";
            next++;
            tr.appendChild(ntd);
          }
            table.appendChild(tr);
            return table;
      } 
      var td = document.createElement('td');
      td.innerHTML = count;
      count++;
      tr.appendChild(td);
      if(count > days && c == 6) {
          table.appendChild(tr);
          return table;
      }   
    }
    table.appendChild(tr);
  }    
  return table;
}
