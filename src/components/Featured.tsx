"use client"
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";
import { motion } from "framer-motion";

import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

import '../css/swiper.css';

// import required modules
import { EffectCards } from 'swiper/modules';
import Image from "next/image";



const Featured = () => {
    return (
        <div className="bg-white p-6">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row items-center  gap-10 p-4">
                    <motion.div
                        className="flex-1 text-gray-800"
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <p className="uppercase text-[#D77343]">Featured</p>

                        <h2 className="text-4xl font-bold mt-2 font-libertinus">
                            This season's finest
                        </h2>

                        <p className="mt-4 text-gray-600 leading-relaxed max-w-[350px]">
                            A rotating selection curated by our regional editors — the
                            experiences we'd send our best friends on.
                        </p>

                        <motion.div
                            whileHover={{ x: 6 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Link
                                href="/"
                                className="text-[var(--primary)] flex items-center gap-1 py-1 px-1 hover:text-green-950 transition-colors"
                            >
                                View All <GoArrowRight />
                            </Link>
                        </motion.div>
                    </motion.div>










                    <motion.div
                        className="flex-1"
                        initial={{ opacity: 0, x: 60, scale: 0.95 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <div className="flex-1">
                            <Swiper
                                effect={'cards'}
                                grabCursor={true}
                                modules={[EffectCards]}
                                className="mySwiper"
                            >
                                <SwiperSlide>
                                    <Image src="/images/cards/img1.png" alt="Img1" height={350} width={300} className="h-auto w-[350px]"/>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Image src="/images/cards/img2.png" alt="Img2" height={350} width={300} className="h-auto w-[350px]"/>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Image src="/images/cards/img3.png" alt="Img3" height={350} width={300} className="h-auto w-[350px]"/>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Image src="/images/cards/img4.png" alt="Img4" height={350} width={300} className="h-auto w-[350px]"/>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Image src="/images/cards/img5.png" alt="Img5" height={350} width={300} className="h-auto w-[350px]"/>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Image src="/images/cards/img6.png" alt="Img6" height={350} width={300} className="h-auto w-[350px]"/>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Image src="/images/cards/img7.png" alt="Img7" height={350} width={300} className="h-auto w-[350px]"/>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Image src="/images/cards/img8.png" alt="Img8" height={350} width={300} className="h-auto w-[350px]"/>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Image src="/images/cards/img9.png" alt="Img9" height={350} width={300} className="h-auto w-[350px]"/>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>

    );
};

export default Featured;