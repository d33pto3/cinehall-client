"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./CarouselScrollButton";
import Image from "next/image";

type PropType = { slides: string[]; options?: EmblaOptionsType };

function MovieCarousel(props: PropType) {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel({ ...options, loop: true }, [
    AutoScroll({ playOnInit: true, stopOnInteraction: false, speed: 1 }),
  ]);
  const [isPlaying, setIsPlaying] = useState(false);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const onButtonAutoplayClick = useCallback(
    (callback: () => void) => {
      const autoScroll = emblaApi?.plugins()?.autoScroll;
      if (!autoScroll) return;

      const resetOrStop =
        autoScroll.options.stopOnInteraction === false
          ? autoScroll.reset
          : autoScroll.stop;

      resetOrStop();
      callback();
    },
    [emblaApi]
  );

  //   const toggleAutoplay = useCallback(() => {
  //     const autoScroll = emblaApi?.plugins()?.autoScroll;
  //     if (!autoScroll) return;

  //     const playOrStop = autoScroll.isPlaying()
  //       ? autoScroll.stop
  //       : autoScroll.play;
  //     playOrStop();
  //   }, [emblaApi]);

  useEffect(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll;
    if (!autoScroll) return;

    setIsPlaying(autoScroll.isPlaying());
    emblaApi
      .on("autoScroll:play", () => setIsPlaying(true))
      .on("autoScroll:stop", () => setIsPlaying(false))
      .on("reInit", () => setIsPlaying(autoScroll.isPlaying()));
  }, [emblaApi]);

  return (
    <div className="embla text-white">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number relative w-full h-full overflow-hidden">
                <Image
                  src={slide}
                  alt={`Movie Slide ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="100vw"
                  quality={90}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4 pointer-events-none z-30">
        <PrevButton
          onClick={() => onButtonAutoplayClick(onPrevButtonClick)}
          disabled={prevBtnDisabled}
          className="pointer-events-auto bg-black/50 hover:bg-black/80 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all bg-opacity-40"
        />
        <NextButton
          onClick={() => onButtonAutoplayClick(onNextButtonClick)}
          disabled={nextBtnDisabled}
          className="pointer-events-auto bg-black/50 hover:bg-black/80 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all bg-opacity-40"
        />
      </div>
    </div>
  );
}

export default MovieCarousel;
