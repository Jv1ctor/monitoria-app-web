import { Spinner } from "../ui/spinner"

export const SpinnerFallback = () => {
  return (
    <>
      <div className="h-svh flex items-center justify-center">
        <Spinner />
      </div>
    </>
  )
}
