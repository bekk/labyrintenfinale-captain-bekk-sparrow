
type Props = {
  onClick?: () => void;
  picturePath: string;
  alt?: string;
}

export function ButtonWithIcon({ onClick, picturePath, alt = "" }: Props) {
  return (
    <button
      onClick={onClick}
      aria-label={alt || undefined}
      className="p-0 border-0 bg-transparent rounded-full cursor-pointer transition-transform duration-150 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400/70"
    >
      <img
        src={picturePath}
        alt={alt}
        className="w-full h-full object-contain pointer-events-none select-none"
      />
    </button>
  )
}