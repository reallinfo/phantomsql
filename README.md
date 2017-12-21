<h1 align="center">PhantomSQL 👻</h1>
  <p align="center">A substitute for SQL when prototyping on the web.</p>
<p align="center">PhantomSQL provides a mechanism for storing and retrieving data in-browser.</p>
  <p align="center"><a href="https://travis-ci.org/harmankang/phantomsql"><img src="https://travis-ci.org/harmankang/phantomsql.svg?branch=master"></a></p>

> Check out this [demo](https://harmankang.github.io/web-demos/registration-demo/index.html).

The PhantomSQL API is straightforward:

```javascript
// New table with two columns
sql.init("user_table", ["username", "password"]);

// Insert new user to table
if (!sql.find("username", "user_table", username)) {
  sql.insert("user_table", "username", username);
  sql.insert("user_tble", "password", password);
}
```
### Table of Contents
- [Install](#install)
- [PhantomSQL operations](#operations)
- [Demo](#demo)
- [Architecture](#architecture)
- [Compatibility](#compatibility)

## Install

Clone

```sh
git clone https://github.com/harmankang/phantomsql.git
```
or use npm
```sh
npm install phantomsql
```
and add it to your `.html` file

```html
<script src="phantomsql.js"></script>
```

## Operations

### Create table
Override resistant (i.e. existing table with same name will not be replaced).
```javascript
sql.init("table_name", ["column_1", "column_2"]);
```
### Drop table
```javascript
sql.drop("table_name");
```
### Selecting with condition
Returns value given condition
```javascript
// Read: SELECT column_1 FROM table_name WHERE column_2 = value
sql.select("column_1", "table_name", "column_2", "value");
```
### Find if value exists in column
Returns boolean
```javascript
// Read: SELECT column_1 FROM table_name WHERE column_1 = value
sql.find("column_1", "table_name", "value");
```
### Insert new row
Void return
```javascript
// Read: INSERT INTO table_name (column) VALUES (value)
sql.insert("table_name", "column", "value");
```
### Update existing row
Void return
```javascript
// Read: UPDATE table_name SET column = value WHERE column_2 = value_2
sql.update("table_name", "column", "value", "column_2", "value_2");
```
### Delete existing row
Void return
```javascript
// Read: DELETE FROM table_name WHERE column = value
sql.delete("table_name", "column", "value");
```

## Demo

Check out this [demo](https://harmankang.github.io/web-demos/registration-demo/index.html) that uses PhantomSQL in order to allow you to register, login, change your password, and delete your account.

## Architecture

PhantomSQL is built-on the Web Storage API, specifically the [`window.localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) property. Therefore, the nature of PhantomSQL's functionality corresponds to localStorage:

- It will store data across browser sessions without expiration, even if the browser is closed.
- Data stored using PhantomSQL is specific to the protocol of the page (e.g. `file://` vs `https://`).
- Depending on your browser configuration, PhantomSQL may not work properly for a certain origin (i.e. Web Storage may be denied for a certain protocol, port, or host).

#### PhantomSQL is by no means an actual database. 

With that, it is worth discussing the table architecture.

One or more columns will consitute a table. PhantomSQL creates a "genesis" item and stores it in localStorage. The genesis item `key` is the table name and the `value` is an array of all the column names.

The genesis item is used to generate an additional n items, where n represents the number of columns. The `key` for each these items is equal to the table name with `_x` concatenated on, where `x` represents the column's name. The `value` is set to an array the column data.

> For example, let's create a new table with PhantomSQL:

```javascript
sql.init("users", ["id", "username", "password"]);
```
This will create the so-called genesis item and additional items for the columns:

|Key | Value |
| --- | --- |
| users | ["id", "username", "password"] |
| users_id | [] |
| users_username | [] |
| users_password | [] |

> Let's insert a row:

```javascript
sql.insert("users", "id", "1");
sql.insert("users", "username", "jimmy_neutron");
sql.insert("users", "password", "hunter2");
```
This will replace the appropriate items:

|Key | Value |
| --- | --- |
| users | ["id", "username", "password"] |
| users_id | ["1"] |
| users_username | ["jimmy_neutron"] |
| users_password | ["hunter2"] |

## Compatibility
*This data corresponds to that of localStorage. 

| | Chrome | Edge | Firefox (Gecko) | IE | Opera | Safari (WebKit) |
| --- | --- | --- | --- | --- | --- | --- |
| localStorage | 4 | Yes | 3.5 | 8 | 10.50 | 4 |

## License

PhantomSQL is licensed under the MIT License.

Copyright &copy; 2017 [Harman Kang](https://github.com/harmankang)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
