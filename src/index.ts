import { Prisma, PrismaClient } from '@prisma/client'
import { newJwt, verifyJwt } from './utils/jwt';
import { User, Post } from './utils/types';
import express from 'express'
import cors from "cors"
import { checkIfUserAlreadyExists } from './utils/checkuser';
import { getUserDetailsWithId } from './utils/getuserdetails';
import { get } from 'http';
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient()
const app = express()

app.use(cors())
app.use(express.json())


type paginatedReq = {
  skip: number,
  take: number,
  orderBy: any
}


app.get('/', (req, res) => {
  res.json({ "data": "twitter clone api" })
})

// THE FOLLOWING ENDPOINTS ARE USER AND POST CREATION ENDPOINTS


// Creating user. 

app.post('/api/create/user', async(req, res) => {
  const {username, password, email} = req.body
  if( await checkIfUserAlreadyExists(username) ) {
    res.status(409).json({ "data": "user already exists" });
    return;
  } else {
  const token = newJwt({
    username: username,
    email: email,
    password: password
  });
  try {
    const user = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: password
      }
    })
    console.log({"data": "successfully created user!", "user": user})
    res.status(200).json({"data": "success", "user": user, "token": token});
  } 
  catch (e) {
    res.status(500).json({ "data": "internal server error", "errorinfo": e, "summary": "invalid `req.body`, check types and keys" })
  }
  }
})


// Creating posts via token auth. I did good code this time :)
app.post('/api/create/post', async (req, res) => {
  const { postTitle, postContent, token } = req.body;

  const tokenData = verifyJwt(token);
  if (tokenData) {
    const userName = tokenData.data.username;
    const confUser = await prisma.user.findFirst({
      where: {
        username: userName
      }
    })
    if (!confUser) {
      res.status(404).json({ "data": "invalid username" })
      return;
    }
    if (!(confUser.password === tokenData.data.password)) {
      res.status(401).json({ "data": "invalid credentials" })
      return;
    }
    try {
      const post = await prisma.post.create({
        data: {
          postTitle: postTitle,
          postContent: postContent,
          user: { connect: { username: userName }}
        }
      })
      console.log({"data": "successfully created post!", "post": post})
      res.status(200).json({"data": "success", "post": post});
    } catch (e) {
      res.status(500).json({ "data": "internal server error", "errorinfo": e, "summary": "idk figure it out" })
    }
  } else {
    res.status(401).json({ "data": "invalid token" })
  }

})

// THE FOLLOWING ARE AUTH ENDPOINTS
app.post('/api/login', async(req, res) => {
  const { username, password } = req.body;
  const confUser = await prisma.user.findFirst({
    where: {
      username: username
    }
  });
  if (!confUser) {
    res.status(404).json({ "data": "user not found" });
    return;
  }
  else if (!(confUser.password === password)) {
    res.status(401).json({ "data": "invalid credentials" })
    return;
  } else {
    const data: User = {
      username: username,
      password: password
    }
    const token = newJwt(data);
    res.status(200).json({"data": "success", "token": token})
  }
})




// THE FOLLOWING ARE DB QUERY ENDPOINTS

// A get request to display posts to the user. This uses pagination so things dont get extremely overloaded
app.get('/api/getposts/:pageNumber', async (req, res) => {
  try {
    const postsPerPage: number = 25;
    const pageNumber: number = parseInt(req.params.pageNumber);
    const posts = await prisma.post.findMany<paginatedReq>({
      skip: (pageNumber - 1) * postsPerPage,
      take: postsPerPage,
      orderBy: {
        createdAt: 'desc'
      }
    });
    let newPosts = [];

    let i: any;
    for (i in posts) {
      let fixedPost: any = posts[i];
      let userDetails = await getUserDetailsWithId(posts[i].userId);
      fixedPost.username = userDetails.username;
      fixedPost.email = userDetails.email;
      newPosts.push(fixedPost);
    }
    console.log(newPosts);
    res.status(200).json({ "data": posts })
  } catch (e) {
    res.status(500).json({ "data": "internal server error", "summary": "no clue why this happened, read the error report", "report": e })
  }
})

app.listen(3000, () => {
  console.log("App running on port 3000")
})