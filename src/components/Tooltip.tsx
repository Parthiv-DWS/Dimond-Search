// components/Tooltip.tsx
import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type TooltipProps = {
  children: React.ReactNode;
  content: string;
  placement?: "top" | "bottom" | "left" | "right";
};

export const Tooltip = ({ children, content, placement = "top" }: TooltipProps) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState(placement);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const tooltipPosition = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const handleMouseEnter = () => {
    setVisible(true);

    setTimeout(() => {
      const triggerRect = triggerRef.current?.getBoundingClientRect();
      const tooltipRect = tooltipRef.current?.getBoundingClientRect();

      if (triggerRect && tooltipRect) {
        const spaceAbove = triggerRect.top;

        // Choose best position
        setPosition(spaceAbove > tooltipRect.height + 16 ? "top" : "bottom");
      }
    }, 0);
  };

  const handleMouseLeave = () => {
    setVisible(false);
  };

  return (
    <div
      className="relative inline-block"
      ref={triggerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}

      <AnimatePresence>
        {visible && (
          <motion.div
            ref={tooltipRef}
            className={`absolute z-50 px-2 py-1 text-sm text-white bg-gray-900 rounded-lg shadow-md whitespace-nowrap ${tooltipPosition[position]}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            <div
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
