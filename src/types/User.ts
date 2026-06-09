type Role = {
    role: 'student' | 'monitor' | 'admin'
}

type UserId = {
    firstName: string,
    lastName: string,
    registration: string,
    role: Role,
}

type User = {
    id: UserId
}

export type { User }
