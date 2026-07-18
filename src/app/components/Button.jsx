"use client";


import Magnetic from "./Magnetic";

/**
 * Reusable Button component that standardizes different button styles in the portfolio
 * and optionally wraps them in the Magnetic hover effect.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button content.
 * @param {string} [props.href] - If provided, renders an <a> link instead of a <button>.
 * @param {Function} [props.onClick] - Click handler.
 * @param {"primary" | "secondary" | "outline" | "icon"} [props.variant="primary"] - Styling variant.
 * @param {boolean} [props.magnetic=true] - Whether to apply the magnetic pull effect.
 * @param {string} [props.className=""] - Optional extra CSS classes.
 */
export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  magnetic = true,
  className = "",
  target,
  rel,
  download,
  ...props
}) {
  // Styles aligned with the original layouts
  const baseStyles = {
    primary: "group relative overflow-hidden rounded-full bg-[#22C55E] text-[#050505] px-8 py-4 md:px-10 md:py-5 font-bold uppercase tracking-widest text-xs md:text-sm transition-all duration-300 hover:shadow-[0_0_40px_rgba(34,197,94,0.4)] hover:scale-105 w-full sm:w-auto text-center block",
    secondary: "rounded-full border border-white/15 text-white px-8 py-4 md:px-10 md:py-5 font-bold uppercase tracking-widest text-xs md:text-sm transition-all duration-300 hover:border-[#22C55E]/50 hover:text-[#22C55E] hover:shadow-[0_0_30px_rgba(34,197,94,0.15)] w-full sm:w-auto text-center block",
    outline: "inline-flex items-center gap-2 px-6 py-3 border border-[#22C55E]/30 text-[#22C55E] font-mono text-sm tracking-wider rounded-lg hover:bg-[#22C55E]/10 hover:border-[#22C55E]/60 transition-all duration-300 w-fit group",
    icon: "w-12 h-12 border border-white/10 rounded-md flex items-center justify-center text-zinc-500 hover:text-white hover:border-white/30 transition-all duration-300 group"
  };

  const combinedClass = `${baseStyles[variant] || ""} ${className}`;

  const content = (
    <>
      {variant === "primary" ? (
        <span className="relative z-10">{children}</span>
      ) : (
        children
      )}
    </>
  );

  const element = href ? (
    <a
      href={href}
      className={combinedClass}
      target={target}
      rel={rel}
      download={download}
      {...props}
    >
      {content}
    </a>
  ) : (
    <button
      onClick={onClick}
      className={combinedClass}
      {...props}
    >
      {content}
    </button>
  );

  if (magnetic) {
    return <Magnetic>{element}</Magnetic>;
  }

  return element;
}
