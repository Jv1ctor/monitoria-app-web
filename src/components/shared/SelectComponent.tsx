import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

type SelectComponentProps = {
    placeholder: string,
    label: string,
    items: {
        key?: string | number
        value: string
        label: string
    }[]
    value?: string
    onValueChange?: (value: string) => void
    className?: string
}

export default function SelectComponent(props: SelectComponentProps) {
    return (
        <Select value={props.value} onValueChange={props.onValueChange}>
            <SelectTrigger className={props.className}>
                <SelectValue placeholder={props.placeholder}/>
            </SelectTrigger>
            <SelectContent 
                position='popper'
            >
                <SelectGroup>
                    <SelectLabel>{props.label}</SelectLabel>
                    {props.items.map(({key, value, label}) => (
                        <SelectItem key={key ?? value} value={value}>{label}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}