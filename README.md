# RESTful API vs MongoDB vs Mysql

> Tìm hiểu về Backend một cách cơ bản nhất qua việt sử dụng Nodejs, Exprss, cơ sở dữ liệu dạng SQL vs NoSQL
> 
> Project được clone lại từ khóa học Backend Zero Restful APIs của youtuber "Hoidanit"
> 
> Trong tài liệu này tôi sẽ cố gắng xây dựng lại những kiến thức tôi cho rằng quan trọng để xem lại trong tương lai 


> Link youtube: [Backend Zero Restful APIs](https://www.youtube.com/playlist?list=PLncHg6Kn2JT734qFpgJeSfFR0mMOklC_3) 
> 

*** 

## Chapter 1. Website hoạt động thế nào ?

> Một Website có phức tạp đến mấy cũng cấu tạo theo CRUD viết tắt của Creat, Read, Update, Delete
>
> **Mô hình hoạt động:**
> - *client-server*: 
> 
>       - Client: khách hàng, người sử dụng trình duyệt 
>       - Server: máy chủ hiểu đơn giản là một máy tính hoạt động 24/24, gồm có 2 phần tên miền là hosting nơi chứa tất cả SCR của backend, và domain là một tên miền dễ nhớ cho khách hàng 
> - *Hoạt động Client-Server*: 
>
>       - Client: gửi requets tức là gửi yêu cầu lên máy chủ
>       - Server: gửi reponse tức là gưỉ trả lời cho khách để hiển thì trên máy khách 
>
> **Vận hành một website:**
> - *Chạy local*: Localhost cho mình chạy trên chính máy tính cá nhân của bản thân với tên miền cho sẵn 
> - *Chạy trên hosting*: chúng ta phải mua một tên miền domain và có hosting dể deloy code của mình trên đó và theo dõi hoạt động của nó 
>
> **Dữ liệu hiển thị trên Website:**
> - *Dữ liệu tĩnh ( static )*: dữ liệu cố định không thay đổi theo thời gian, ví dụ như ảnh thương hiệu thông tin chính của công ty --> hard-code fix cứng trong code vì vậy không thể thay đổi được.
> - *Dữ liệu động ( dynaic )*: dữ liệu động có thể thay đổi theo thời gian, cái này - cần code logic để xử lý
>
> **Lưu trữ dữ liệu:**
> - ở đây chung ta nên chỉ bàn đến database:
>
>       - SQL: quản lý theo dạng table các rows columns liên hệ với nhau
>       - NoSQL: cơ sở dữ liệu phi quan hệ quản lý dưới dạng documents - objects
>       - lưu ý khi bắt đầu học thì cần phải học các câu lệnh cho DB sau thì có thể học ORM, ODM cơ bản dùng các lệnh để dùng trực tiếp trên server

*** 

> ## Chapter 2. Web Server Node.js
>
> tải Node.js, VScode, Git, 
>
> **Các thành phần của URL:**
> - Ví dụ: scheme://host:port/path?query
> - *Scheme:* HTTP hoặc HTTPs có thêm SSL
> - *HOST:* là nơi chứa Sever --> www.excampl.com (domain) với dev hay dùng http://localhost:80
> - *Path:* là nguồn tài nguyên mở mà client muốn truy cập
> - *Query:* là nơi cung cấp những thông tin mà client muốn truyền lên sever
>
> **Cài thư Viện cần thiết bằng npm cho node.js:**
> - npm init --> tạo ra file package.json
> - cài đặt express 
> - để chạy code dùng npm run start
> - cài Babel để ứng dụng có thể chạy với mọi phiên bản js
> - Mô Hình hoạt động của Express
>
>       - Cài server.js:
``` js
require("dotenv").config(); //dotenv
const express = require("express"); //common js
const path = require("path"); //path


const app = express(); //app express
const port = process.env.PORT || 8080; //port
const hostname = process.env.HOST_NAME;


//Routes
app.use("/", webRoutes);

//app listen nạp các thông tin đã khai báo rồi chạy
app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`);
});

   ```
>       - More routes: 
>       app.method(path, handler)
>       app -- express 
>       method -- get, post, push, delete, ...
>       handler -- function xử lý khi routes được match
> Có thể trả về qua dynamic contmen --> nhưng không thể làm vậy đc --> template engine 
> ở đây dùng EJS:
>
*** 

> ## Chapter 3. Project Structure
>
> **.env :**
>
> - tham số môi trường là thiết lập chung thay vì hardcode thì ta có thể cấu hinhf thiết lập chung
> - các tham số trong file .env được thiết lập theo định dạng KEY=VALUE
> - sử dụng trong node.js cần thêm thự viện dotenv
> 
> **Nodemon :**
> - chủ yếu để mỗi lần reset lại những thay đổi 
> 
> **Static file:**
> - gồm các loại dữ liệu như img, css, ...
> 
> **Mô hình MVC:** là Model - View - Controller
>
> - View:
>
>       - View là kết quả mà client nhìn thấy 
>
> - Controller:
>
>       - chính là các câu lệnh điều kiển lấy data cung cấp cho view
>
> - Model: 
>
>       - là các mô hình hoá code thành các thành phần có thể tái sử dụng trong các ứng dụng 
>       - bằng cách sử dụng model tạo các hình thù data lưu trữ sẽ giảm bớt gánh nặng cho controller
>
> **Tổ chức thư mục Projects:**
> - tạo controller, sever, view
> - chia code theo mô hình view engine - routes
> - chia code theo mô hình controller
> - xem kỹ video ở 23,24,25 
>
> - tạo file config:
```js
const path = require("path");
const express = require("express");

const configViewengine = (app) => {
  app.set("views", path.join("./src", "views"));
  app.set("view engine", "ejs");
  //config static files
  app.use(express.static(path.join("./src", "public")));
};

module.exports = configViewengine;
```
> khi này ở server sẽ liên kết trực tiếp đến configs
> - tạo file controllers: 
```js
const getHomepage = async (req, res) => {
  let results = await getAllUsers();
  return res.render("home.ejs", { listUses: results });
};
```

*** 

> ## Chapter 4. Setup Docker and database SQL
>
> - Cần cài docker và học cách sử dụng 
> - hiểu về docker hub giống như 1 nơi lưu trữ tải lên đấy và có thể gọi về 
>
*** 

> ## Chapter 5. Setup database SQL
>
> - Tải file cài đặt để tạo database trên docker
``` bash
docker compose -f mysql.yml -p nodejs-sql -d 
-f file name
-p project name
-d depatch, run as background
```
> - Tải file mysql.yml - file này sẽ cấu hình tải từ docker hub về và tạo nên một database trên docker của mình nó sẽ ngốn bộ nhớ kha khá vì vậy chú ý tải khi còn bộ nhớ nha 
``` yml

services:
  db-mysql:
    image: mysql:8.0.33
    restart: always
    environment:
      - MYSQL_DATABASE=kiong_nguyen
      - MYSQL_ROOT_PASSWORD=123456
      - MYSQL_ROOT_HOST=%
    ports:
      - "3307:3306"
    command: --default-authentication-plugin=mysql_native_password

```
> - khi sử dụng database cần mở docker lên và cần để ý phần mên dbeveri chỉ dùng để truy cập vào sửa database trên docker
>
> - Tải Mysql2 về để sử dụng trong node js
> - Tạo fake data cho db - Taọ bảng trong mysql
 ```sql
CREATE TABLE Users(
id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
email varchar(255),
name varchar(255),
city varchar(255)
);
 ```
 > - Tạo thêm giá trị cho bảng:
 ```sql
INSERT INTO Users
VALUES (1,'cuong@gmail.com','Kiong','HaiDuong');
 ```
 > - Kết nối với database tạo trong thư mục config một file ***database.js***:
 ```js
require("dotenv").config(); //dotenv
const mysql = require("mysql2/promise"); //sql

//test create connections

// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT, //default: 3306
//   user: process.env.DB_USER, //default: empty
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

//test create connections pool
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT, //default: 3306
  user: process.env.DB_USER, //default: empty
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = connection;
```

> - cấu trúc file .env: thêm những giá trị của các cổng Database
```js
DB_HOST=localhost
DB_PORT=3307
DB_USER=root
DB_PASSWORD=123456
DB_NAME=kiong_nguyen
```
> - cần tạo pool để giới hạn truy cập tránh bị sập server
> - tạo connection :
```js
const connection = require("../configs/database");

const getAllUsers = async (req, res) => {
  let [results, fields] = await connection.query("SELECT * from Users u");
  return results;
};
```
> Tạm thời chúng ta chưa dùng ODM, ORM nên cần sử dụng các câu lệnh của sql
> - Từ những gì đã có chúng ta có một cái khung cơ bản gồm:
>       - client -- sẽ là web thực tế sẽ là xuất ra api 
>       - server -- sẽ là nơi sử lý dữ liệu từ DB cụ thể dùng theo MCV
>       - DB -- khởi tạo trên localhost dùng docker compose với dùng mysql để quản lý cơ sở dữ liệu 
> - từ chương tiếp theo chúng ta tập chung vào sây dựng giao diện với client và kết nối DB với server
>
***
## Chapter 5. Setup CRUD with Node.js

> Các công việc cần làm: 
> - tạo layout -- ở đây chỉ cần thanh nabar: dùng trực tiếp html - ejs
> - tạo các trang cơ bản: - home - create - delete - update 
> - kết nối các phần từ server.js -> routes/web -> homeController.js -> view  (.ejs)
>                                                   
>                                  CRUDservices.js -- dùng để gọi, thêm, xoá dữ liệu trên database
> cái này xem code sẽ hiểu về cấu trúc 
> - Read: 
> 
>       - services: get dữ liệu tứ DB
```js
const getAllUsers = async (req, res) => {
  let [results, fields] = await connection.query("SELECT * from Users u");
  return results;
};
```
>       - Controllers: kết lối dữ liệu vào view
```js
const getHomepage = async (req, res) => {
  let results = await getAllUsers();
  return res.render("home.ejs", { listUses: results });
};
```
>       - view: home.ejs -- tạo form table:
```js
 <table>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Name</th>
              <th>City</th>
              <th>Actions</th>
            </tr>

            <% for (var i = 0; i < listUses.length; i++) { %>
                <tr>
                    <td><%=listUses[i].id %></td>
                    <td><%=listUses[i].email %></td>
                    <td><%=listUses[i].name %></td>
                    <td><%=listUses[i].city %></td>
                    <td>
                      <a href="/update/<%=listUses[i].id %>">Edit</a>
                      <form action="/delete-user/<%=listUses[i].id %>" method="post"><button>Delete</button></form>
                    </td>
                  </tr>
            <% } %>

           
          </table>
```
> - Create: 
> 
>       - services: get dữ liệu tứ DB
```js
const CreateNewUser = async (email, name, city) => {
  let [results, fields] = await connection.query(
    `INSERT INTO Users (email, name, city) VALUES (?,?,?)`,
    [email, name, city]
  );
};
```
>       - Controllers: kết lối dữ liệu vào view
```js
  const postCreateUser = async (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let city = req.body.city;
  // let {email, name, city} = req.body;

  await CreateNewUser(email, name, city);

  // res.send("Create user succeed! ");
  res.redirect("/");
};
```
>       - view: create.ejs -- tạo form new user:
```js
 <div class="form">
        <form action="/create-user" method="post">
            <fieldset>
                <legend>Add new users</legend>
                <div class="input-group">
                    <label>Email: </label>
                    <input type="text" name="email"/>
                </div>
                <div class="input-group">
                    <label>Name: </label>
                    <input type="text" name="name"/>
                </div>
                <div class="input-group">
                    <label>City: </label>
                    <input type="text" name="city"/>
                </div>
                <div>
                    <button> Save </button>
                </div>
            </fieldset>
        </form>
    </div>
```
> - Delete: 
>
>  - services: get dữ liệu tứ DB
```js
const deleteUserById = async (id) => {
  let [results, fields] = await connection.query(
    `DELETE FROM Users WHERE id=?;`,
    [id]
  );
};
```
>       - Controllers: kết lối dữ liệu vào view
```js
  const postDeleteUser = async (req, res) => {
  const userId = req.params.id;
  let user = await getUserById(userId);
  res.render("delete.ejs", { userEdit: user });
};
```
>       - view: delete.ejs -- tạo form new user:
```js
    <div class="form">
        <form action="/delete-user" method="post">
            <fieldset>
                <legend>Delete a users</legend>
                <div class="input-group d_none">
                    <label>user Id: </label>
                    <input type="text" name="userId" value="<%= userEdit.id%>"/>
                </div>
                <div class="input-group">
                    <label>Are you sure to delete this user with Email: </label>
                    <input type="text" name="email" value="<%= userEdit.email%>"/>
                </div>
              
                <div>
                    <button> Confim </button>
                </div>
            </fieldset>
        </form>
    </div>
```
> - Update: 
>
>  - services: get dữ liệu tứ DB
```js
const updateUserById = async (email, name, city, userId) => {
  let [results, fields] = await connection.query(
    `UPDATE Users
      SET email=?, name = ?, city= ?
      WHERE id = ?`,
    [email, name, city, userId]
  );
};
```
>       - Controllers: kết lối dữ liệu vào view
```js
  const postUpdateUser = async (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let city = req.body.city;
  let userId = req.body.userId;

  await updateUserById(email, name, city, userId);
  // res.send("Update user succeed! ");
  res.redirect("/");
};
```
>       - view: update.ejs -- tạo form edit user:
```js
    <div class="form">
        <form action="/update-user" method="post">
            <fieldset>
                <legend>Update a users</legend>
                <div class="input-group d_none">
                    <label>user Id: </label>
                    <input type="text" name="userId" value="<%= userEdit.id%>"/>
                </div>
                <div class="input-group">
                    <label>Email: </label>
                    <input type="text" name="email" value="<%= userEdit.email%>"/>
                </div>
                <div class="input-group">
                    <label>Name: </label>
                    <input type="text" name="name" value="<%= userEdit.name%>"/>
                </div>
                <div class="input-group">
                    <label>City: </label>
                    <input type="text" name="city" value="<%= userEdit.city%>"/>
                </div>
                <div>
                    <button> Save </button>
                </div>
            </fieldset>
        </form>
    </div>
```

> ***Ưu điểm nhược điểm của cách làm hiện tại:***
>
> - SSR - Server Side Rendering - là cách tạo ra giao diện bằng server theo mô hình client-server ứng với request của client gửi lên, serve sẽ nhìn theo routes sau đó render ra trang web theo yêu cầu 
> client chỉ làm 1 NV là gửi yêu cầu và còn lại là server gánh hết
>
>       - ưu điểm: người dùng máy cấu hình thấp cũng rất ổn do server gánh hết client chỉ hiển thị kết quả 
>       - nhược điểm: nếu nhiều người dùng sẽ gây gánh nặng cực lớn lên server
> - CSR - Client Side Rendering - là cách mà giúp bớt gánh nặng cho server cách mà chúng ta sẽ dùng với react.js
>
> - Nên làm gì tiếp theo: 
>
>       - học cách dùng ORM, ...
>       - muốn sau khoá học này kết hợp với hiểu biết bản thân có thể thay đổi project này theo hướng  Next.js-Nest.js-MongosDB:
> > Link youtube: [Dự án Booking cera](https://www.youtube.com/playlist?list=PLncHg6Kn2JT734qFpgJeSfFR0mMOklC_3) 

***

## Chapter 6. NoSQL - mongoDB

> Git checkout mongodb 
>
> Từ chương 6 sẽ làm việc trên nhánh khác để giữ lại giữ liệu cũ bên phần mới sẽ có dữ liệu của phần mới 

***
***THE END - SQL***