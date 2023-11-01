import React, { useEffect, useRef, useState } from "react";
import searchData from "../faq.json";

const Collapsible = ({
  open,
  collapsibleClassName = "collapsible-card-edonec",
  headerClassName = "collapsible-header-edonec",
  titleClassName = "title-text-edonec",
  iconButtonClassName = "collapsible-icon-button-edonec",
  contentClassName = "collapsible-content-edonec",
  contentContainerClassName = "collapsible-content-padding-edonec",
  children,
  header,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(open ? undefined : 0);
  const ref = useRef(null);
  const handleFilterOpening = (e) => {
    setIsOpen((prev) => !prev);
    const itemHeight = document.getElementsByClassName(
      "collapsible-card-edonec"
    )[id].clientHeight;
    if (
      !isOpen &&
      e.clientY >
        window.innerHeight -
          itemHeight -
          ref.current?.getBoundingClientRect().height
    ) {
      const currentScrollY = window.scrollY;
      window.scrollTo({
        top: currentScrollY + ref.current?.getBoundingClientRect().height + 60,
        behavior: "smooth",
      });
      document.body.scrollTo(0, 100);
    }
  };
  useEffect(() => {
    if (!height || !isOpen || !ref.current) return undefined;
    // @ts-ignore
    const resizeObserver = new ResizeObserver((el) => {
      setHeight(el[0].contentRect.height);
    });
    resizeObserver.observe(ref.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, [height, isOpen]);
  useEffect(() => {
    if (isOpen) setHeight(ref.current?.getBoundingClientRect().height);
    else setHeight(0);
  }, [isOpen]);
  return (
    <>
      <div
        className={collapsibleClassName}
        id={id}
        onClick={handleFilterOpening}
      >
        <div>
          <div className={headerClassName}>
            <div className={titleClassName}>{header}</div>
            <div className={iconButtonClassName}>
              <div
                className={`${
                  isOpen
                    ? "rotate-center-edonec down"
                    : "rotate-center-edonec up"
                }`}
              >
                <img src="/images/arrow_less.svg" />
              </div>
            </div>
          </div>
        </div>
        <div className={contentClassName} style={{ height }}>
          <div ref={ref}>
            <div className={contentContainerClassName}>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Collapsible;
