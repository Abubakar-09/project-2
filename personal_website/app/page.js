import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="w-screen md:h-screen relative min-h-screen flex justify-center items-center">
        <section class="text-gray-600 body-font">
          <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
            <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
              <h1 class="title-font sm:text-6xl text-4xl mb-4 font-extrabold text-gray-900">Hello My
                <br class="hidden lg:inline-block" />Name is AbuBakar!
              </h1>
              <p class="mb-8 max-md:text-sm leading-relaxed">Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant cold-pressed tacos poke beard tote bag. Heirloom echo park mlkshk tote bag selvage hot chicken authentic tumeric truffaut hexagon try-hard chambray.</p>
              <div class="flex justify-center">
                <Link href={'/about'}><button class="inline-flex max-md:text-sm bg-white border-[1px] py-2 px-6 rounded-full focus:outline-none border-black   text-black text-md">About Me</button></Link>
                <Link href={'/contact'}><button class="ml-4 inline-flex bg-white max-md:text-sm rounded-full border-[1px] py-2 px-6 focus:outline-none text-black  border-black text-md">Contact Page</button></Link>
              </div>
            </div>
            <div class="lg:max-w-lg relative lg:w-full max-md:flex max-md:justify-center md:w-[70%] w-5/6">
              <img class=" w-full h-full max-md:absolute  max-md:top-[0%] max-md:left-[0%] max-md:w-[242px] max-md:h-[177px]  rounded" alt="hero" src="/person.jpeg" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
