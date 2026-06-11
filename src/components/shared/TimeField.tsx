import { Input } from "../ui/input";

type TimeFieldProps = {
  id?: string;
  value: string;                  // "HH:MM"
  onChange: (value: string) => void;
  withSeconds?: boolean;
};

export default function TimeField({ id, value, onChange, withSeconds = false }: TimeFieldProps) {
  return (
    <Input
      type="time"
      id={id}
      step={withSeconds ? "1" : undefined}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden"
    />
  );
}