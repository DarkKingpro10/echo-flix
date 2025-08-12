interface MenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export function MenuButton({ isOpen, onClick }: MenuButtonProps) {
  return (
    <button
      onClick={onClick}
      className="relative z-50 flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
      aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
    >
      <span
        className={`h-0.5 w-6 transform rounded-full bg-white transition-all duration-300 ease-in-out ${
          isOpen ? "translate-y-2 rotate-45" : ""
        }`}
      />
      <span
        className={`h-0.5 w-6 rounded-full bg-white transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-0" : ""
        }`}
      />
      <span
        className={`h-0.5 w-6 transform rounded-full bg-white transition-all duration-300 ease-in-out ${
          isOpen ? "-translate-y-2 -rotate-45" : ""
        }`}
      />
    </button>
  );
}
