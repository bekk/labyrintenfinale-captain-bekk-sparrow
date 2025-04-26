type Props = {
  onClick?: () => void;
  picturePath: string;
  alt?: string;
  size?: string;
}

export function ButtonWithIcon({ onClick, picturePath, alt = "", size = "w-100 h-62.5" }: Props) {
  return (
    <button
      onClick={onClick}
      aria-label={alt || undefined}
      className={`${size} bg-transparent cursor-pointer transition-transform duration-150 hover:scale-105`}
    >
      <img
        src={picturePath}
        alt={alt}
        className="w-full h-full object-contain pointer-events-none select-none"
      />
    </button>
  )
}