function TableScan() {
    var search = document.getElementById("search");
    search.onclick = function() {
        var table_id = document.getElementById("table_id").value;
        var column = document.getElementById("column").value;
        var sum = TableScan.sumColumn(table_id, column);
        document.getElementById("col").innerHTML = column;
        document.getElementById("tbl").innerHTML = table_id;
        document.getElementById("sum").innerHTML = sum;
    }
    
}

TableScan.sumColumn = function(table_id, column_id) {
    if(!document.getElementById(table_id)) {
        return 0;
    }
    var tbl = document.getElementById(table_id).children[0];
    var numRow = tbl.children.length;
    var numCol = tbl.children[0].children.length; 
    var colID = -1;
    for(var col = 0; col < numCol; col++) {
        if(tbl.children[0].children[col].innerHTML == column_id) {
            colID = col;
            break;
        }
    }
    if(colID == -1) {
        return 0;
    }
    var sum = 0;
    for(var row = 1; row < numRow; row++) {
        if(tbl.children[row].children[colID] && !isNaN(parseFloat(tbl.children[row].children[colID].innerHTML)) && isFinite(tbl.children[row].children[colID].innerHTML) ) {
            sum += parseFloat(tbl.children[row].children[colID].innerHTML);
        }
    }
    return +sum.toFixed(2);
}
    