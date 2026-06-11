import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type CardPublicProps = {
  step: string,
  title: string,
  description: string
}

function CardPublic(props : CardPublicProps) {
  return (
    <Card className="mx-auto w-full max-w-sm border-0 shadow-none">
      <CardHeader className="flex flex-col items-center text-center space-y-3">
        <div className="flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-full font-bold">
        {props.step}
        </div>
      <CardTitle>{props.title}</CardTitle>
      </CardHeader>
        <CardContent className="text-center">
        <CardDescription>{props.description}</CardDescription>
      </CardContent>
    </Card>
  )
}

export { CardPublic }