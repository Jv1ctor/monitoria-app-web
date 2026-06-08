export type FullName = {
    firstName: string,
    lastName: string
}

export function getInitials(props: FullName) {
    const letterFirstName = props.firstName.charAt(0)
    const letterLastName = props.lastName.charAt(0)

    const initials = (letterFirstName + letterLastName).toUpperCase()
    return initials
}
