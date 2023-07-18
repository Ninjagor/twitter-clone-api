# Badly Made twitter-clone-api
Hello 👋
<br><br>
This is an API for a twitter clone that I have created. It uses TypeScript, Prisma, and a PlanetScale MySQL database.
<br>
Anyone can use this API for their project, but please do not abuse, spam, or exploit. Below are endpoints that you can use to access the API!
<br><br>
## Endpoints
### `/api/create/user`
This is a POST request which is used to create a new user. Inside of the body that you send, the required parameters are `username` and `password`, while the optional parameter is `email`. All fields must be Strings. If the request is successful, the output will contain a JWT token in the key `token` that should be used for auth. 
<br><br>
### `/api/create/post`
This is a POST request used to make a new post. Required fields are `postContent` and `token` and the Optional field is `postTitle`. If the operation is successful, you will recieve `{"data": "success"}` as an output.
<br><br>
### `/api/login`
This is a POST request used for logging in. It accepts two required fields `username` and `password`. The username must be that of a valid user, and the password must be correct. If not, the API will return an output that says `invalid credentials`. If the operation is successful, you will recieve a JWT token in `token`.
<br><br>
### `/api/getposts/:pageNumber`
This is a GET request that returns all of the posts. Since it is possible that there are thousands of posts, this endpoint uses pagination to make things more effecient. It accepts `pageNumber` in the URL which must be a valid number 1 or greater. Any value less than 1 or any non int will be met with a prisma error notification. There is an unchangeable value of 25 posts per page. I might make the valur changeable in the future. If a really high value for `pageNumber` is provided, and no posts are on that page, then an empty array will be returned.
<br><br>
Have fun using this API, and contact me if you see any bugs!