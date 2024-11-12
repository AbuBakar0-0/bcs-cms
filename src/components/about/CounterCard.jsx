"use client";
import React, { useState, useEffect, useRef } from 'react';

const CounterCard = ({ title, number }) => {
    const [counter, setCounter] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const counterRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (counterRef.current) {
            observer.observe(counterRef.current);
        }

        return () => {
            if (counterRef.current) {
                observer.unobserve(counterRef.current);
            }
        };
    }, []);
    var intervalTime = 20;


    useEffect(() => {
        let interval;
        if (isVisible) {
            interval = setInterval(() => {
                setCounter((prevCounter) => {
                    if (prevCounter < number) {
                        return prevCounter + 1;
                    } else {
                        clearInterval(interval);
                        return prevCounter;
                    }
                });
            }, intervalTime);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isVisible]);

    var suffix = "M";
    switch (counter) {
        case 73: suffix = "%"; break;
        case 101: suffix = "K"; break;
    }

    return (
        <div className='w-full md:w-1/5 flex flex-row justify-center md:justify-center items-center gap-4 text-white'>
            <div className="flex flex-col items-center justify-center w-4/5" ref={counterRef}>
                <p className="text-6xl font-bold h-20">
                    {counter}{suffix}
                </p>
                <p className='w-full h-20 text-center text-xl flex flex-col justify-start items-start'>
                    {title}
                </p>
            </div>

        </div>
    );
};

export default CounterCard;
