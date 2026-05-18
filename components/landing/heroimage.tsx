const heroimage = () => {
  return (
    <main>
      <div className="grow relative shrink-0 lg:w-165 md:w-96 w-full h-100 bg-muted/20 rounded-2xl mb-3">
        <div className="absolute -top-4 -right-4 flex items-center gap-2 text-[12px] px-6 p-3 bg-popover w-fit rounded-xl shadow-lg">
          <span className="w-2 h-2 bg-primary rounded-full block"></span> Live
          sync Active
        </div>
        <img src="hero_image.png" alt="" className="w-full h-full rounded-2xl object-cover" />
        <div className="absolute -left-4 -bottom-4 gap-2 text-[12px] px-6 p-3 bg-popover w-fit rounded-xl shadow-lg">
          <h1 className="text-[30px] font-bold text-primary">99.8%</h1>
          <p className="text-[12px] text-secondary">ACCURACY RATE</p>
        </div>
      </div>

      <div className="flex justify-self-end ">
        <div className="h-9  w-9 lg: shrink bg-[#8f8fac] rounded-full border-3 border-[#4c4848] z-0">
          <img src='https://xsgames.co/randomusers/avatar.php?g=female' className="rounded-full" alt="" />
        </div>
        <div className="h-9 w-9 bg-[#7f7f85] rounded-full -ml-4 border-3 border-[#4c4848] z-10">
          <img src='https://xsgames.co/randomusers/avatar.php?g=female&id=8' className="rounded-full" alt="" />
        </div>

        <div className="h-9 w-9 bg-[#727b95] rounded-full -ml-4 border-3 border-[#4c4848] z-20">
          <img src='https://xsgames.co/randomusers/avatar.php?g=male' className="rounded-full" alt="" />
        </div>

        <div className="ml-3 mt-auto mb-auto text-center font-bold">
          <h1 className="text-[#333d] "> Joined by <span className="text-black">500+</span> ICT Department </h1>
        </div>
      </div>
    </main>
  );
};

export default heroimage;
