import Image from "next/image";

const Home = () => {
  return (
    <div>
      <div className="flex flex-row justify-center">
        <Image
          className="h-auto row-span-3 col-span-1 m-8"
          src="/paper.jpg"
          alt="paper"
          width={600}
          height={735}
        />
        <textarea className="h-auto ml-8 border rounded px-2 py-2" cols={50} />
      </div>
    </div>
  );
};

export default Home;
