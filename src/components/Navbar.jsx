import React, { useEffect, useRef, useState } from 'react'
import Button from './Button'
import { TiLocationArrow } from 'react-icons/ti'
import { useWindowScroll } from 'react-use'
import gsap from 'gsap'


const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"]


const Navbar = () => {
    const [isPlaying, setIsPlaying] =useState(false)
    const [isActive, setIsActive] =useState(false)
    const [lastScroll, setLastScroll] = useState(0)
    const [isVisiable, setIsVisiable] = useState(false)
    const navRef = useRef(null)
    const aduioElementRef = useRef(null)
    const {y: currenScrollY} = useWindowScroll()
    
    useEffect(()=>{
        if(currenScrollY === 0){
            setIsVisiable(true)
            navRef.current.classList.remove('floating-nav')
        }
        else if(currenScrollY > lastScroll){
            setIsVisiable(false)
            navRef.current.classList.add('floating-nav')
        }
        else if(currenScrollY < lastScroll){
            setIsVisiable(true)
            navRef.current.classList.add('floating-nav')
        }
        setLastScroll(currenScrollY)
    },[currenScrollY, lastScroll])


    useEffect(()=>{
        gsap.to(navRef.current,{
            y: isVisiable ? 0 : -100,
            opacity: isVisiable ? 1 : 0,
            duration: 0.2 
        })
    },[isVisiable])

    const toggleAudioIndicator = () =>{
        setIsPlaying((prev) => !prev)
        setIsActive((prev) => !prev)
    }

    useEffect(()=>{
        if(isPlaying){
            aduioElementRef.current.play()
        }else{
            aduioElementRef.current.pause()
        }
    },[isPlaying])



    return (
    <div ref={navRef} className=' fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6'>
        <header className=' absolute top-1/2 w-full -translate-y-1/2'>
        <nav className=' flex size-full items-center justify-between p-4'>
            <div className=' flex items-center gap-7'>
                <img src="/img/logo.png" alt="logo"  className=' w-10'/>
                <Button 
                id="product-button"
                title="products"
                rightIcon={<TiLocationArrow/>}
                containerClass=" bg-blue-50 md:flex hidden items-center justify-center gap-1"
                />
            </div>
            <div className=' flex h-full items-center'>
                <div className=' hidden md:block'>
                    {
                        navItems.map((item) => (
                            <a className='nav-hover-btn' key={item} href={`#${item.toLowerCase()}`}>{item}</a>
                        ))
                    }
                </div>
                <button className=' ml-10 flex items-center space-x-0.5' onClick={toggleAudioIndicator}>
                    <audio ref={aduioElementRef} className='hidden' src='/audio/loop.mp3' loop/>
                    {[1,2,3,4].map((bar) => (
                        <div key={bar} className={`indicator-line ${isActive ? 'active' : ''}`} style={{animationDelay:`${bar * 0.1}s`}}/>
                        
                    ))}
               
                </button>
            </div>
        </nav>
        </header>
    </div>
  )
}

export default Navbar