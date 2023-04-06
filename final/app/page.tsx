import React from "react";
import ColorfulHeader from "@/components/ColorfulHeader";
import Image from "next/image";
function HomePage() {
  return (
    <div className="flex flex-col items-center h-full">
      <div className="md:max-w-[800px] w-full flex flex-col items-center justify-center h-full">
        <ColorfulHeader
          text="Fix, Refactor and Comment"
          size="md:text-5xl text-4xl"
          from="from-primary"
          to="to-secondary"
        />

        <p className="prone w-full md:text-lg text-md text-center mt-4">
          Upgrade your code review process with our app powered by{" "}
          <strong className="text-success font-bold">OpenAI</strong>. Upload
          your code files and let AI{" "}
          <span className="underline decoration-primary">fix</span>,{" "}
          <span className="underline decoration-secondary">refactor</span>, and{" "}
          <span className="underline decoration-accent">comment</span> your code
          in minutes. Enhance your productivity and code quality with our
          streamlined solution. Try it now!
        </p>
      </div>
      <div className="flex items-center gap-2 h-20 mt-auto text-3xl">
        <ColorfulHeader
          size="md:text-3xl text-2xl"
          text="Powered by"
          from="from-success"
          to="to-accent"
        />
        <Image
          src="/openai.svg"
          width={100}
          height={10}
          style={{ height: "2.25rem" }}
          alt="OpenAI Logo"
        />
      </div>
    </div>
  );
}

export default HomePage;
