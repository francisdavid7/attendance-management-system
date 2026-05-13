const heroimage = () => {
  return (
    <div className="grow relative shrink-0 lg:w-125 md:w-96 w-full h-100 bg-muted/20 rounded-2xl">
      <div className="absolute -top-4 -right-4 flex items-center gap-2 text-[12px] px-6 p-3 bg-popover w-fit rounded-xl shadow-lg">
        <span className="w-2 h-2 bg-primary rounded-full block"></span> Live
        sync Active
      </div>

      <div className="absolute -left-4 -bottom-4 gap-2 text-[12px] px-6 p-3 bg-popover w-fit rounded-xl shadow-lg">
        <h1 className="text-[30px] font-bold text-primary">99.8%</h1>
        <p className="text-[12px] text-secondary">ACCURACY RATE</p>
      </div>
    </div>
  );
};

export default heroimage;
