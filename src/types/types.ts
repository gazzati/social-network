export type UserDataType = {
    id: string | null
    name: string | null
    surname: string | null
    photo: string | null
}

export type ProfileType = {
    _id: string
    info: ProfileInfoType
    status: string
    photo?: string
    posts: PostType[] | []
    following: string[]
    followers: string[]
}

export type ProfileInfoType = {
    name: string
    surname: string
    aboutMe?: string
    lookingForAJob?: boolean
    lookingForAJobDescription?: string
    contacts: ContactsType
}

export type ContactsType = {
    github?: string
    vk?: string
    facebook?: string
    instagram?: string
    twitter?: string
    youtube?: string
}

export type PostType = {
    _id: string
    date: string
    message: string
    likesCount: number
}

export type NewsType = {
    title: string
    description: string
    url: string
    urlToImage: string
    publishedAt: string
    source: {
        name: string
    }
}

export type ChatType = {
    _id: string
    participants: string[]
    title: string
    photo: string
    //isGroup: boolean
    messages: MessageType[]
}
export type MessageType = {
    _id: string
    text: string
    senderId: string
    date: string
}

export type ChatsAndMessagesType = {
    chats: ChatType[],
    messages: MessageType[]
}
