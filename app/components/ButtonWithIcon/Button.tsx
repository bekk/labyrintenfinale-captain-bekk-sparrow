
type Props = {
  onClick?: () => void;
}

export function Button({ onClick }: Props) {
  return (
    <button
      className="font-bold py-21 px-37 rounded inline-flex items-center cursor-pointer gap-2"
      onClick={onClick}
    >
    </button>
  )
}
