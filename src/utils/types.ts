export type User = {
    username: String,
    email?: String,
    password: String,
}

export type Post = {
    postTitle?: String,
    postContent: String,
    user: any
}