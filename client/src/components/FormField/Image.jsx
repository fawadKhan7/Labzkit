import React, { forwardRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
// @mui
import { alpha, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

// Utility function to calculate the ratio

// ----------------------------------------------------------------------

const Image = forwardRef(
  (
    {
      ratio,
      overlay,
      disabledEffect = true,
      alt,
      src,
      afterLoad,
      delayTime,
      threshold,
      beforeLoad,
      delayMethod,
      placeholder,
      wrapperProps,
      scrollPosition,
      effect = "blur",
      visibleByDefault,
      wrapperClassName,
      useIntersectionObserver,
      sx,
      ...other
    },
    ref
  ) => {
    const theme = useTheme();
    function getRatio(ratio = "1/1") {
      return {
        "4/3": "calc(100% / 4 * 3)",
        "3/4": "calc(100% / 3 * 4)",
        "6/4": "calc(100% / 6 * 4)",
        "4/6": "calc(100% / 4 * 6)",
        "16/9": "calc(100% / 16 * 9)",
        "9/16": "calc(100% / 9 * 16)",
        "21/9": "calc(100% / 21 * 9)",
        "9/21": "calc(100% / 9 * 21)",
        "1/1": "100%",
      }[ratio];
    }

    // Define styles for the overlay if it's present
    const overlayStyles = !!overlay && {
      "&:before": {
        content: "''",
        top: 0,
        left: 0,
        width: 1,
        height: 1,
        zIndex: 1,
        position: "absolute",
        background: overlay || alpha(theme.palette.grey[900], 0.48),
      },
    };

    const content = (
      <Box
        component={LazyLoadImage}
        alt={alt}
        src={src}
        afterLoad={afterLoad}
        delayTime={delayTime}
        threshold={threshold}
        beforeLoad={beforeLoad}
        delayMethod={delayMethod}
        placeholder={placeholder}
        wrapperProps={wrapperProps}
        scrollPosition={scrollPosition}
        visibleByDefault={visibleByDefault}
        effect={disabledEffect ? undefined : effect} // Ensure blur effect is disabled when `disabledEffect` is true
        useIntersectionObserver={useIntersectionObserver}
        wrapperClassName={wrapperClassName || "component-image-wrapper"}
        sx={{
          width: 1,
          height: 1,
          objectFit: "cover",
          verticalAlign: "bottom",
          ...(!!ratio && {
            top: 0,
            left: 0,
            position: "absolute",
          }),
        }}
      />
    );

    return (
      <Box
        ref={ref}
        component="span"
        className="component-image"
        sx={{
          overflow: "hidden",
          position: "relative",
          verticalAlign: "bottom",
          display: "inline-block",
          ...(!!ratio && {
            width: 1,
          }),
          "& span.component-image-wrapper": {
            width: 1,
            height: 1,
            verticalAlign: "bottom",
            backgroundSize: "cover !important",
            ...(!!ratio && {
              pt: getRatio(ratio),
            }),
          },
          ...overlayStyles,
          ...sx,
        }}
        {...other}
      >
        {content}
      </Box>
    );
  }
);

export default Image;
