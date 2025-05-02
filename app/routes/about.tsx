export default function About() {
  return (
    <div className="bg-base-100 font-urbanist mx-auto max-w-7xl">
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold md:text-5xl">About me</h1>
          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="bg-primary h-px w-16" />
            <span className="text-primary">since 2020</span>
            <div className="bg-primary h-px w-16" />
          </div>
          <p className="text-base-content/80 mt-6 text-lg md:text-xl">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus,
            mollitia!
          </p>
        </div>
      </section>


    </div>
  );
}
