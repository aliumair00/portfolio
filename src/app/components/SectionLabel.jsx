"use client";



/**
 * Standardized Section Label / Header badge component.
 * Supports different layout variants (with line, without line, line at start, etc.)
 * matching the design patterns of all section indicators.
 * 
 * @param {Object} props
 * @param {string} [props.number] - The section index number (e.g., "01", "02").
 * @param {string} props.label - The text name of the section (e.g., "About", "Services").
 * @param {string} [props.className=""] - Extra classes for the container.
 * @param {"middle" | "start" | "none"} [props.linePosition="middle"] - The visual style of the line.
 * @param {string} [props.textClass="text-white"] - Classes for the label text.
 * @param {string} [props.numberClass="text-[#22C55E]"] - Classes for the number.
 * @param {string} [props.gapClass="gap-5"] - Flex spacing classes.
 */
export default function SectionLabel({
  number,
  label,
  className = "",
  linePosition = "middle",
  textClass = "text-white",
  numberClass = "text-[#22C55E]",
  gapClass = "gap-5"
}) {
  return (
    <div className={`flex items-center ${gapClass} ${className}`}>
      {number && linePosition === "middle" && (
        <span className={`${numberClass} font-mono text-xs md:text-sm font-bold tracking-[0.3em]`}>
          {number}
        </span>
      )}
      
      {number && linePosition === "none" && (
        <span className={`${numberClass} font-mono text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] font-semibold`}>
          ({number})
        </span>
      )}

      {linePosition === "start" && (
        <div className="h-px w-10 bg-[#22C55E]"></div>
      )}

      {linePosition === "middle" && (
        <div className="h-px w-16 bg-[#22C55E]/50"></div>
      )}

      <span className={`${textClass} font-mono text-xs md:text-sm font-semibold tracking-[0.2em] md:tracking-[0.3em] uppercase`}>
        {label}
      </span>
    </div>
  );
}
