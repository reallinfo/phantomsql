// ===========================================
//  PhantomSQL - a ghostly substitute for SQL
// ===========================================
//  Licensed under MIT
// ===========================================
//  Created by Harman Kang
//  (https://github.com/harmankang/phantomsql)
// ===========================================

var sql = new function () {
  /*
   * Creates new table
   */
  this.init = function (tableName, columnNames) {
    // Prevent override
    if (localStorage.getItem(tableName)) {
      return;
    }
    // Genesis item for table
    localStorage.setItem(tableName, JSON.stringify(columnNames));
    // Create additional items for each column and initialize with empty array
    for (var i = 0; i < columnNames.length; i++) {
      localStorage.setItem(tableName + "_" + columnNames[i], JSON.stringify([]));
    }
  }
  /*
   * Deletes table
   */
  this.drop = function (table) {
    var columns = delegate.getItem(table);
    for (var i = 0; i < columns.length; i++) {
      localStorage.removeItem(table + "_" + columns[i]);
    }
    localStorage.removeItem(table);
  }
  /*
   * Returns value given condition
   */
  this.select = function ( /**@SELECT**/ column, /**@FROM**/ table, /**@WHERE**/ column_match, /**@IS_EQUAL_TO**/ match) {
    var column_match_values = delegate.getItem(table + "_" + column_match);
    for (var i = 0; i < column_match_values.length; i++) {
      if (column_match_values[i] === match) {
        return delegate.getItem(table + "_" + column)[i];
      }
    }
  }
  /*
   * Determines if value exists in a given column and returns boolean
   */
  this.find = function ( /**@SELECT**/ column, /**@FROM**/ table, /**@WHERE column IS_EQUAL_TO**/ value) {
    var target_column = delegate.getItem(table + "_" + column);
    for (var i = 0; i < target_column.length; i++) {
      // Value exists in column
      if (target_column[i] === value) {
        return true;
      }
      // Value doesn't exist in colum
      if (i == (target_column.length - 1)) {
        return false;
      }
    }
  }
  /*
   * Insert new row to end of table
   */
  this.insert = function ( /**@INSERT INTO**/ table, /**@ (**/ column, /**@ ) VALUES (**/ value /**@ ) **/ ) {
    var t = delegate.getItem(table + "_" + column);
    t.push(value);
    localStorage.setItem(table + "_" + column, JSON.stringify(t));
  }
  /*
   * Insert new value into column using condition
   */
  this.update = function ( /**@UPDATE**/ table, /**@SET**/ column, /**@ = **/ value, /**@WHERE**/ column_match, /**@IS_EQUAL_TO**/ match) {
    var column_match_values = delegate.getItem(table + "_" + column_match);
    for (var i = 0; i < column_match_values.length; i++) {
      if (column_match_values[i] === match) {
        var t = delegate.getItem(table + "_" + column);
        t[i] = value;
        localStorage.setItem(table + "_" + column, JSON.stringify(t));
      }
    }
  }
  /*
   * Delete row
   */
  this.delete = function ( /**@DELETE FROM**/ table, /**@WHERE**/ column, /**@IS_EQUAL_TO**/ value) {
    var value_index = delegate.getItem(table + "_" + column);
    for (var i = 0; i < value_index.length; i++) {
      if (value_index[i] === value) {
        // Delete item at index "i" for other columns
        var columns = delegate.getItem(table);
        for (var c = 0; c < columns.length; c++) {
          var t = delegate.getItem(table + "_" + columns[c]);
          if (i > -1) {
            t.splice(i, 1);
          }
          localStorage.setItem(table + "_" + columns[c], JSON.stringify(t));
        }
      }
    }
  }
}
var delegate = new function () {
  this.getItem = function (e) {
    return JSON.parse(localStorage.getItem(e));
  }
}