export type Notification = {
  id: string
  type: 'error' | 'success' | 'info'
  message: string
}

export enum NotificationType {
  success = 'success',
  info = 'info',
  error = 'error'
}

export type LoginFormValuesType = {
  email: string
  password: string
}

export type RegistrationFormValuesType = {
  email: string
  name: string
  surname: string
  password: string
  isMale: boolean
}

export type UserDataType = {
  id: string | null
  name: string | null
  surname: string | null
  photo: string | null
  isMale: boolean
}

export type ProfileType = {
  _id: string
  info: ProfileInfoType
  status: string
  photo?: {
    url: string
    urlOriginal: string
  }
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
  isMale: boolean
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
  image: string
  published_at: string
  source: string
}

export type ChatType = {
  _id: string
  participants: string[]
  title: string
  photo: string
  isMale: boolean
  messages: MessageType[]
  isUnreadFor: string[]
  updatedAt: string
}
export type MessageType = {
  _id: string
  text: string
  senderId: string
  date: string
}
