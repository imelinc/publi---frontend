import { cn } from "@/lib/utils";

interface SquareSpec {
  className: string;
}

interface FloatingSquaresProps {
  squares?: SquareSpec[];
}

const defaultSquares: SquareSpec[] = [
  {
    className:
      "left-4 top-12 h-8 w-8 -rotate-6 bg-primary/55 md:left-10 md:h-12 md:w-12",
  },
  {
    className:
      "right-6 top-8 h-12 w-12 rotate-3 bg-accent/55 md:right-10 md:h-16 md:w-16",
  },
  {
    className:
      "left-12 bottom-16 h-10 w-10 rotate-12 bg-primary-light/75 md:left-24 md:h-14 md:w-14",
  },
  {
    className:
      "right-12 bottom-10 h-6 w-6 -rotate-3 bg-primary/40 md:h-9 md:w-9",
  },
  {
    className:
      "bottom-28 right-24 hidden h-5 w-5 rotate-6 bg-accent/45 md:block",
  },
];

export function FloatingSquares({
  squares = defaultSquares,
}: FloatingSquaresProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {squares.map((square) => (
        <div
          key={square.className}
          className={cn("absolute rounded-[2px]", square.className)}
        />
      ))}
    </div>
  );
}
