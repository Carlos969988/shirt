import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';
import {
    headContainerAnimation,
    headContentAnimation,
    headTextAnimation,
    slideAnimation
} from '../config/motion';
import state from '../store';
import { CustomButton } from '../components';

const Home = () => {
    const snap = useSnapshot(state);


    return (
        <AnimatePresence>
            {snap.intro && (
                <motion.div className='home' {...slideAnimation('left')}>
                    <motion.header {...slideAnimation('down')}>
                        <img
                            src='./kamaxtli.png'
                            alt='logo'
                            className='w-10 h-10 object-contain'
                        />
                    </motion.header>
                    <motion.div className='home-content' {...headContainerAnimation}>
                        <motion.div {...headTextAnimation}>
                            <h1 className='head-text'>
                                T - shirt <br className='cl:block hidden'/>
                            </h1>
                        </motion.div>
                        <motion.div {...headContentAnimation}
                        className='flex flex-col gap-5'>
                            {/* <p className='max-w-md font-normal text-gray-600 text-base'>
                                Create your unique and exclusive shirt with our brand-new
                                3D customization tool. <strong>Unleash your imagination</strong>
                                {' '} and define your own style.
                            </p> */}
                            <CustomButton
                            type='filled'
                            title='Personalizar'
                            handleClick={() => state.intro = false}
                            customStyles='w-fit px-4 py-2.5 font-bold text-sm'
                            />
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Home