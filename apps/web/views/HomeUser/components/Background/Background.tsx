import Image from "next/image";
// there is an issue with relative imports https://github.com/vercel/turbo/issues/2372
// so you can't import directly from "/main-bg.jpg";
import bgImage from "../../../../public/main-bg.jpg";

const Background: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <>
      <div className={className}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-fuchsia-600 opacity-30 dark:opacity-60 z-10" />
        <Image
          src={bgImage}
          alt="Background image"
          fill
          className="object-cover z-0"
        />
      </div>
    </>
  );
};

export default Background;
