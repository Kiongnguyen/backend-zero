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

## Chapter 7. NoSQL - MongoDB 

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

