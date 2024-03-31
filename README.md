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

## Chapter 6. NoSQL - MongoDB 

>Link document: [Mongoose](https://mongoosejs.com/)

> #57 connetion vs mongoDB , liên kết và sử dụng cách kiển tra kết nối 
> 

```ts
    const mongoose = require("mongoose");
   
    var dbState = [
    {
        value: 0,
        label: "disconnected",
    },
    {
        value: 1,
        label: "connected",
    },
    {
        value: 2,
        label: "connecting",
    },
    {
        value: 3,
        label: "disconnecting",
    },
    ];
        //test create connections
    const connection = async () => {
    try {
        await mongoose.connect("mongodb://root:123456@127.0.0.1:27018");
        const state = Number(mongoose.connection.readyState);
        console.log(dbState.find((f) => f.value == state).label, "to db"); // connected to db
    } catch (error) {
        console.log(">>> ERROR connection ...", error);
    }
    };
```

> #58 connection options
>config env for database --> mongoDB

```
    DB_HOST=mongodb://localhost:27018
    DB_PORT=3307
    DB_USER=root
    DB_PASSWORD=123456
    DB_NAME=hoidanit
```

>tìm hiểu về self running function: Loại function chạy nội bộ trong chính nó 
```
(() => {
    //code here
})()
```
> #59 Create Database
> Add Schema vs Mode
>
```ts
    const kittySchema = new mongoose.Schema({
    name: String,
    });

    const Kitten = mongoose.model("Kitten", kittySchema);
    const silence = new Kitten({ name: "Kiong" });
    silence.save();
```

> #60 Schema vs Model
> schema --> quy định hình thù database giống định nghĩa dạng type
> model --> là công cụ thao tác với database như query, create,update, delete, ....
> Dùng model thì chúng ta dùng code để thông qua model để thay đổi database chứ khồn sửa chực tiếp trên database
>
> #61 Create A User
>  Cùng nhau sửa lại MongoDB cho User với những giá trị theo email, name, city
>
```js
    const mongoose = require("mongoose");

    const UserSchema = new mongoose.Schema({
    //_id===uid
    name: String,
    email: String,
    city: String,
    });

    const User = mongoose.model("User", UserSchema);

    module.exports = User;
```

> Lưu ý với MongoseDB tạo ra id _id với mã ngẫu nhiên và không trùng nhau không cần khai báo id
>
> #62 display list users
>
> Chủ yếu học đọc dorcument
> 
``` ts
    model.find({})
```

> #63 Update a User
> dùng:
```ts
    Model.updateOne({condition},{data-update})
```
> Exec() --> promise có tác dụng khi xảy ra lỗi 

>#64 Delete a User
> dùng: Model.deleteOne({condition})
```ts
    const postDeleteUser = async (req, res) => {
    const userId = req.params.id;
    let user = await User.findById(userId).exec();
    res.render("delete.ejs", { userEdit: user });
    };
    const postHandleRemoveUser = async (req, res) => {
    const id = req.body.userId;

    await User.deleteOne({ _id: id });
    res.redirect("/");
    };
```

## Chapter 7. RESTful APIs

>#65 Setup Postman:

>Frontend --> test API mà backend gửi cho chúng ta
>Backend --> test API trước khi gửi đi cho frontend

>#66 Setup dự án Frontend (To do ưith docker)
>#67 Vai Trò của Web Server

> SSR vs CSR ==> thì CSR sẽ là xu hướng mới 
> client (react) <--> server (express) <--> database(mongoDB)
> Scale , security ==> frontend phơi ra ngoài internet ==> backend là nơi kiểm soát dữ liệu truy xuất data dữ liệu từ user
> Sẽ không viết dao diện trên server nữa giờ sẽ đưa ra khái niệm về API !

>#68  JSON & APIs

> giao tiếp giữa client và server: công cụ giao tiếp là JSON
>
> 1.JSON:
> lập trình hướng đối tượng là sản phẩm xây dựng về một hiện tượng trong cuộc sống , cố gắng mô phỏng những tính chất của đối tượng bằng những dòng code
> Object: là một kiểu đối tượng trong JS
> JSON chuyển đổi gt Object ra giá trị String
> 2.sử dụng JSON
> Str --> Obj : JSON.parse()
> Obj --> Str : JSON.stringlfy()
> 3.APIs:
> applicationprogramming interface:
> Reacts run in: localhost:3000
> Node.js run in: localhost:8000
> APIs share list users : localhost:8000/get-all-user
> ==> APIs --> 1 URL
> client : URL có dữ liệu để chích ra hiển thị
> server : tạo ra một route có địa chỉ URL và chứa dữ liệu dạng JSON
> API: [covid19](https://api.covid19api.com/summary)
>
> #69 RESTful APIS
> REST : representational State Transfer :
> -là 1 kiến truc phần mềm 
> -quy định cách thức API hoạt động thế nào hiệu quả trong mạng internet
> REST <---> GraphQL của facebook
> RESTful APIs là cấu trúc hoạt động của hệ thống sử dụng API
> Thành phần chính của RESTful APIs:
> -client request:
>   mỗi nguồi tài nguyên cần đinh danh với REST đây là 1 URL
> thường đc sử dụng với HTTP dùng chủ yếu:
> GET
> POST
> PUT
> DELETE
>
> -Server response
> status (200)
> message body (JSON)
>
> #70 Status Code
> Dorcument: [Status](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
> 
Informational responses (100 – 199)
Successful responses (200 – 299): 200 --> lấy thông tin thành công 201 --> tạo mới thành công trên server
Redirection messages (300 – 399)
Client error responses (400 – 499)
Server error responses (500 – 599): 500 --> lỗi của server

>#71 GET Method
>[GET](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
>sử dụng để lấy nguồn tài nguyên từ database về client

>#72 GET all Users API
> sử dụng postman để get api
> cấu trúc 1 API:
> status --> báo cáo trả về vd 200,500,...
> body --> nội dung api trả về 
> cách đặt tên một API cơ bản nó là 1 đường route như web bình thường nhưng nó sẽ không còn hiển thị ra trên web nữa mà chỉ cần nhìn dưới dạng Json mà thôi
> apiController --> giống như homeController nhưng nó dùng cho api
```js
    const User = require("../models/user");

    const getUserAPI = async (req, res) => {
    let results = await User.find({});
    return res.status(200).json({
        errorCode: 0,
        data: results,
    });
    };

    module.exports = {
    getUserAPI,
    };

```
>API --> trong routes như trong file web --> tạo các đường dẫn cho người dùng cái này sẽ config trên postman
```js
    const express = require("express");
    const routerAPI = express.Router();
    const { getUserAPI } = require("../controllers/apiController");

    //GET
    routerAPI.get("/", (req, res) => {
    res.send("hello APIs!");
    });

    routerAPI.get("/test", (req, res) => {
    res.status(200).json({
        data: "hello wolrd with Kiong!",
    });
    });

    routerAPI.get("/users", getUserAPI);

    //POST

    module.exports = routerAPI;
```
> khai báo trên server đương routes đầu tiên:
```ts
    app.use("/v1/api/", APIRoutes);
```

>#73 POST method
> mục đích là gửi data lên server --> muốn thay đổi data
> khác với GET thì POST cần kèm theo data ở trong body
>
>#74 Create User API
> Phân biệt application/json vs application/x-www-form-urlencoded
> `application/json` và `application/x-www-form-urlencoded` là hai loại MIME khác nhau được sử dụng để mã hóa dữ liệu khi gửi các yêu cầu HTTP. Thông thường, chúng được sử dụng cho các mục đích khác nhau và có định dạng khác nhau để biểu diễn dữ liệu.

1. **application/json**:
   - Loại MIME này được sử dụng để gửi dữ liệu dưới định dạng JSON (JavaScript Object Notation).
   - JSON là một định dạng trao đổi dữ liệu nhẹ nhàng dễ đọc và viết cho con người và dễ phân tích và tạo ra cho máy móc.
   - Thường được sử dụng để truyền dữ liệu giữa máy chủ web và máy khách web, đặc biệt là khi xây dựng các API RESTful.
   - Ví dụ:
     ```json
     {
       "name": "John",
       "age": 30,
       "city": "New York"
     }
     ```

2. **application/x-www-form-urlencoded**:
   - Loại MIME này được sử dụng để gửi dữ liệu biểu mẫu dưới dạng mã hóa URL.
   - Trong định dạng này, dữ liệu được mã hóa dưới dạng các cặp key-value được phân tách bằng dấu và (&), với các key và value được mã hóa URL.
   - Đây là định dạng thông thường được sử dụng khi gửi biểu mẫu HTML.
   - Ví dụ:
     ```
     name=John&age=30&city=New+York
     ```

Khi nào sử dụng mỗi loại:
- **application/json**: Sử dụng khi bạn muốn gửi dữ liệu có cấu trúc, đặc biệt là trong các trường hợp như yêu cầu/phản hồi API nơi bạn cần truyền đối tượng phức tạp.
- **application/x-www-form-urlencoded**: Sử dụng khi bạn đang làm việc với các gửi biểu mẫu đơn giản nơi dữ liệu được biểu diễn dưới dạng các cặp key-value.
- Khi lựa chọn giữa application/json và application/x-www-form-urlencoded với phương thức POST, nên cân nhắc dựa trên loại dữ liệu bạn đang gửi và các yêu cầu của ứng dụng. Nếu dữ liệu có cấu trúc phức tạp, hoặc nếu bạn đang giao tiếp với một API, application/json thường là lựa chọn tốt nhất. Trong khi đó, nếu bạn chỉ đơn giản là gửi dữ liệu biểu mẫu từ một trang web, thì application/x-www-form-urlencoded có thể là lựa chọn phù hợp hơn.
  
>#75 PUT Method
> tương tự như POST để gửi kèm data lên server
> POST sẽ tạo nhiều lần có id khác nhau 
> PUT thì khác sẽ tạo duy nhất một records

>#76 Update User API
> by id
> method update

>#77 PUT vs PATCH 

    Phương thức PUT và PATCH đều được sử dụng trong giao thức HTTP để cập nhật nguồn tài nguyên trên máy chủ, nhưng chúng có một số điểm khác nhau quan trọng:

  1. **PUT (Replace)**:
     - Phương thức PUT được sử dụng để tạo hoặc thay thế toàn bộ nguồn tài nguyên bằng dữ liệu mới được cung cấp. Nếu tài nguyên không tồn tại, PUT sẽ tạo một tài nguyên mới. Nếu tồn tại, nó sẽ thay thế tài nguyên hiện có bằng dữ liệu mới.
     - Ví dụ: Nếu bạn gửi một yêu cầu PUT để cập nhật thông tin của một người dùng, bạn sẽ cung cấp toàn bộ thông tin mới của người dùng đó. Nếu người dùng không tồn tại, nó sẽ được tạo mới.

  2. **PATCH (Modify)**:
     - Phương thức PATCH được sử dụng để thay đổi hoặc cập nhật một phần của nguồn tài nguyên. Nó không thay thế toàn bộ tài nguyên như PUT. Thay vào đó, nó chỉ cập nhật các trường dữ liệu cụ thể được chỉ định.
     - Ví dụ: Nếu bạn chỉ muốn cập nhật địa chỉ email của một người dùng, bạn có thể gửi một yêu cầu PATCH chỉ với trường dữ liệu email mới, trong khi các trường dữ liệu khác vẫn giữ nguyên.

  Tóm lại, PUT thường được sử dụng khi bạn muốn thay thế toàn bộ tài nguyên hoặc tạo mới tài nguyên, trong khi PATCH thích hợp khi bạn chỉ muốn cập nhật một phần nhỏ của tài nguyên mà không cần gửi lại toàn bộ dữ liệu.


>#78 DELETE method
    Sự dụng để xóa data trên server

>#79 Delete User APi

get user by id
or
delete diredtly

>CRUD:
```js
    //GET
    routerAPI.get("/", (req, res) => {res.send(" APIs ");});

    routerAPI.get("/users", getUserAPI);

    //POST
    routerAPI.post("/users", postCreateUserAPI);

    //PUT
    routerAPI.put("/users", putUpdateUserAPI);

    //DELETE
    routerAPI.delete("/users", deleteUserAPI);
```