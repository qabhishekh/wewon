"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MainHeading = ({
  top,
  bottom,
  align = "center",
  className,
}: {
  top: string;
  bottom?: string;
  align?: "left" | "center" | "right";
  className?: string;
}) => {
  const [typedTop, setTypedTop] = useState("");
  const [typedBottom, setTypedBottom] = useState("");
  const [typingBottom, setTypingBottom] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    const typeSpeed = 60;
    const pauseAfter = 1000;

    const startTyping = () => {
      setTypedTop("");
      setTypedBottom("");
      let i = 0;
      let j = 0;
      let typingBottomStarted = false;
      const typeTop = setInterval(() => {
        if (isCancelled) return clearInterval(typeTop);
        setTypedTop(top.slice(0, i));
        i++;
        if (i > top.length) {
          clearInterval(typeTop);
          typingBottomStarted = true;
          // Wait a short moment before starting bottom typing for smoothness
          setTimeout(() => {
            const typeBottom = setInterval(() => {
              if (isCancelled) return clearInterval(typeBottom);
              setTypedBottom((bottom || "").slice(0, j));
              j++;
              if (j > (bottom ? bottom.length : 0)) {
                clearInterval(typeBottom);
                setTimeout(() => {
                  if (!isCancelled) startTyping();
                }, pauseAfter);
              }
            }, typeSpeed);
          }, 300);
        }
      }, typeSpeed);
    };
    startTyping();
    return () => {
      isCancelled = true;
    };
  }, [top, bottom]);

  return (
    <h1
      className={`text-2xl sm:text-3xl md:text-5xl font-bold text-[var(--primary)] leading-tight md:leading-tight pt-14 pb-2 text-${align} ${className}`}
    >
      <motion.span
        // initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{ whiteSpace: "pre" }}
      >
        {typedTop}
        {typedTop.length < top.length && (
          <span className="inline-block animate-pulse">|</span>
        )}
      </motion.span>
      <br />
      <motion.span
        // initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{ whiteSpace: "pre" }}
      >
        {/* Reserve space for bottom line until typing starts */}
        {typedTop.length < top.length ? (
          <span className="opacity-0 select-none">{bottom || " "}</span>
        ) : (
          typedBottom
        )}
        {bottom &&
          typedTop.length === top.length &&
          typedBottom.length < bottom.length && (
            <span className="inline-block animate-pulse">|</span>
          )}
      </motion.span>
    </h1>
  );
};

export default MainHeading;
