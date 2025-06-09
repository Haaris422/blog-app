import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <main>
        <div className="h-[100vh] w-full bg-gradient-to-br from-blue-300 to-red-200" />

        <section id={'hero'} className="bg-red-900 h-[100vh]">
          <p className="font-bold text-black">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus nobis expedita inventore, dolorum ducimus aut molestiae, culpa quasi deserunt neque quos odit accusamus praesentium doloremque sed ullam minus cumque eveniet! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius similique alias impedit non, iste rerum animi, perferendis, consequatur nobis ducimus quidem deleniti consequuntur officiis unde tenetur odio quam cumque cupiditate. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga quas exercitationem quidem sequi commodi corporis eius dolorem voluptates id inventore laboriosam, similique eos quia accusantium maxime quasi molestiae, beatae nisi?
          </p>
        </section>
      </main>
    </div>
  );
}
