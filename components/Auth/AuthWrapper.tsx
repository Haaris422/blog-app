import { animationCalss } from "../Home/Constants/Data";
import { Divider } from "../Shared/Divider";
import { legalHighlights } from "./Constants/Data";
import { TypewriterHeading } from "./TypewriterHeading";

export function AuthWrapper({ children }: WrapperProps) {
    return (
        <div className="font-girassol flex flex-row-reverse bg-black w-screen h-screen">
            <div className="w-full md:w-[70%] lg:w-[60%] py-8 px-2 md:px-4  bg-white text-black ">
                <h1 className="animate-slide-down text-center mb-8">
                    <span className="text-6xl">Kanoon</span>
                    <span className="text-lg">.com</span>
                </h1>
                <div className="p-8">
                    {children}
                </div>
            </div>
            <div className="w-full  hidden md:block">
                <TypewriterHeading heading="Your Gateway to Indian Legal Intelligence" />
                <div className="flex justify-center">
                    <Divider color="white" variant="horizontal" className="w-[90%]" />
                </div>

                <div className="grid grid-cols-1 bg-black/70 backdrop-blur-lg py-8 place-items-center">
                    {legalHighlights.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <div key={idx}
                                className={`flex w-full overflow-hidden
                            justify-between my-4 space-x-8`}

                            >
                                <div style={{
                                    animationDelay: `${idx * 0.2}s`,
                                }} className={`${animationCalss} 
                                animate-slide-opp-right flex w-[20%] lg:w-[60%] justify-end`}>
                                    <Icon className="text-2xl" />
                                </div>
                                <div style={{
                                    animationDelay: `${idx * 0.2}s`,
                                }} className={`${animationCalss} animate-slide-right w-full`}>
                                    <h3 className="text-xl  font-semibold">{item.title}</h3>
                                    <p className="text-sm text-white/90">{item.description}</p>
                                </div>
                            </div>
                        );
                    })}

                </div>
                <div className="flex justify-center">
                    <Divider color="white" variant="horizontal" className="w-[90%]" />
                </div>
                <div className="overflow-hidden">
                    <p className={`${animationCalss} animate-slide-opp-up p-8 text-xl font-semibold text-center`}>
                        Empowering legal professionals, students, and citizens with accurate, timely, and comprehensive information about Indian law and the justice system.
                    </p>
                </div>
            </div>
        </div>
    )
}