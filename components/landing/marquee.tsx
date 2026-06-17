const marquee = () => {
  return (
    <div className="w-full overflow-hidden mx-auto max-w-[80%] relative mt-10 before:z-50 before:w-[30%] before:absolute before:h-full before:block before:top-0 before:bg-linear-to-r before:from-(--color-card) before:to-card/30 before:left-0  after:w-[30%] after:absolute after:h-full after:block after:top-0 after:bg-linear-to-l after:from-(--color-card) after:to-card/30 after:right-0">
      <div className="flex w-max animate-marquee mt-5">
        <div className="flex shrink-0 whitespace-nowrap">
          <span className="text-5xl mx-8 ">
            <img
              src="/IMG (1).jpg"
              alt=""
              className="w-15 h-15 md:h-15 md:w-15 rounded-full object-contain"
            />
          </span>

          <span className="text-5xl mx-8 ">
            <img
              src="/IMG (2).jpg"
              alt=""
              className="w-15 h-15 md:h-15 md:w-15 rounded-full object-cover"
            />
          </span>
          <span className="text-5xl mx-8 ">
            <img
              src="/IMG (3).jpg"
              alt=""
              className="w-15 h-15 md:h-15 md:w-15 rounded-full object-cover"
            />
          </span>
          <span className="text-5xl mx-8 ">
            <img
              src="/IMG (4).jpg"
              alt=""
              className="w-15 h-15 md:h-15 md:w-15 rounded-full object-cover"
            />
          </span>
          <span className="text-5xl mx-8 ">
            <img
              src="/IMG (5).jpg"
              alt=""
              className="w-15 h-15 md:h-15 md:w-15 rounded-full object-cover"
            />
          </span>
          <span className="text-5xl mx-8 ">
            <img
              src="/IMG (6).jpg"
              alt=""
              className="w-15 h-15 md:h-15 md:w-15 rounded-full object-cover"
            />
          </span>
          <span className="text-5xl mx-8 ">
            <img
              src="/IMG (7).jpg"
              alt=""
              className="w-15 h-15 md:h-15 md:w-15 rounded-full object-cover"
            />
          </span>
        </div>

        <div className="flex shrink-0 whitespace-nowrap">
          <span className="text-5xl mx-8 ">
            <img
              src="/IMG (1).jpg"
              alt=""
              className="w-15 h-15 md:h-15 md:w-15 rounded-full object-contain"
            />
          </span>

          <span className="text-5xl mx-8 ">
            <img
              src="/IMG (2).jpg"
              alt=""
              className="w-15 h-15 md:h-15 md:w-15 rounded-full object-cover"
            />
          </span>
          <span className="text-5xl mx-8 ">
            <img
              src="/IMG (3).jpg"
              alt=""
              className="w-15 h-15 md:h-15 md:w-15 rounded-full object-cover"
            />
          </span>
          <span className="text-5xl mx-8 ">
            <img
              src="/IMG (4).jpg"
              alt=""
              className="w-15 h-15 md:h-15 md:w-15 rounded-full object-cover"
            />
          </span>
          <span className="text-5xl mx-8 ">
            <img
              src="/IMG (5).jpg"
              alt=""
              className="w-15 h-15 md:h-15 md:w-15 rounded-full object-cover"
            />
          </span>
          <span className="text-5xl mx-8 ">
            <img
              src="/IMG (6).jpg"
              alt=""
              className="w-15 h-15 md:h-15 md:w-15 rounded-full object-cover"
            />
          </span>
          <span className="text-5xl mx-8 ">
            <img
              src="/IMG (7).jpg"
              alt=""
              className="w-15 h-15 md:h-15 md:w-15 rounded-full object-cover"
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default marquee;
